import { Resend } from "resend";
import nodemailer from "nodemailer";

export const ORDER_EMAIL_TO = "parfemiangela@gmail.com";

export function formatOrderMessage(order: {
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  cart: string;
  total: number;
}): string {
  const lines = [
    "Нова нарачка — Angela Parfemi",
    "",
    `Име: ${order.name}`,
    `Телефон: ${order.phone}`,
    `Град: ${order.city}`,
    `Адреса: ${order.address}`,
  ];

  if (order.note?.trim()) {
    lines.push(`Напомена: ${order.note.trim()}`);
  }

  lines.push(
    "",
    "---",
    order.cart || "Нема избрани парфеми",
    "",
    `Вкупно: ${order.total} ден`
  );

  return lines.join("\n");
}

async function sendViaResend(
  subject: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Angela Parfemi <onboarding@resend.dev>",
    to: ORDER_EMAIL_TO,
    subject,
    text,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

async function sendViaGmail(
  subject: string,
  text: string
): Promise<{ ok: boolean; error?: string }> {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim().replace(/\s/g, "");

  if (!user || !pass) {
    return { ok: false, error: "Gmail not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Angela Parfemi" <${user}>`,
      to: ORDER_EMAIL_TO,
      subject,
      text,
    });

    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gmail send failed";
    return {
      ok: false,
      error:
        msg.includes("BadCredentials") || msg.includes("535")
          ? "Gmail App Password не е валидна."
          : msg,
    };
  }
}

export async function sendOrderEmail(order: {
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  cart: string;
  total: number;
}): Promise<{ ok: boolean; error?: string }> {
  const text = formatOrderMessage(order);
  const subject = `Нова нарачка — ${order.name} (${order.city})`;

  if (process.env.RESEND_API_KEY?.trim()) {
    const resend = await sendViaResend(subject, text);
    if (resend.ok) return resend;
    console.error("Resend failed:", resend.error);
  }

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return sendViaGmail(subject, text);
  }

  return {
    ok: false,
    error:
      "Email не е конфигуриран. Додај RESEND_API_KEY (Resend сметка на parfemiangela@gmail.com) или Gmail App Password.",
  };
}
