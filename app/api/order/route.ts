import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";
import { validateOrderPayload, cartItemsToText, cartItemsTotal } from "@/lib/order";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Премногу барања. Обиди се повторно за минута." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validateOrderPayload(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { name, phone, city, address, note, cartItems } = validated.data;
  const cart = cartItemsToText(cartItems);
  const total = cartItemsTotal(cartItems);

  const emailResult = await sendOrderEmail({
    name,
    phone,
    city,
    address,
    note,
    cart,
    total,
  });

  if (!emailResult.ok) {
    console.error("Order email failed:", emailResult.error);
    return NextResponse.json(
      {
        error:
          emailResult.error ||
          "Не успеавме да ја испратиме нарачката. Јави се на 075 263 594.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
