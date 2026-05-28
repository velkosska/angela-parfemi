import { CartItem } from "@/types";
import { getLinePrice } from "@/lib/pricing";

export interface OrderPayload {
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  cartItems: CartItem[];
  website?: string;
}

export function cartItemsToText(items: CartItem[]): string {
  if (items.length === 0) return "Нема избрани парфеми";

  return items
    .map((item) => {
      const p = getLinePrice(item.size, item.quantity);
      const qtyLabel =
        item.quantity === 1 ? "1 парче" : `${item.quantity} парчиња`;
      return `${item.perfume.name} (${item.perfume.brand}) — ${item.size.type} ${item.size.ml}ml, ${qtyLabel} = ${p} ден`;
    })
    .join("\n");
}

export function cartItemsTotal(items: CartItem[]): number {
  return items.reduce((s, item) => s + getLinePrice(item.size, item.quantity), 0);
}

export function validateOrderPayload(body: unknown): { ok: true; data: OrderPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (b.website) {
    return { ok: false, error: "Spam detected" };
  }

  const name = String(b.name ?? "").trim();
  const phone = String(b.phone ?? "").trim();
  const city = String(b.city ?? "").trim();
  const address = String(b.address ?? "").trim();
  const note = b.note != null ? String(b.note).trim() : "";

  if (!name || name.length < 2) return { ok: false, error: "Името е задолжително" };
  if (!phone || phone.length < 8) return { ok: false, error: "Телефонот е задолжителен" };
  if (!city) return { ok: false, error: "Градот е задолжителен" };
  if (!address) return { ok: false, error: "Адресата е задолителна" };

  const cartItems = Array.isArray(b.cartItems) ? (b.cartItems as CartItem[]) : [];

  return {
    ok: true,
    data: { name, phone, city, address, note, cartItems },
  };
}
