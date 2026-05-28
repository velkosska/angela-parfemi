"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";

export default function CartCheckout() {
  const { cart, clearCart, backToCart, setDrawerView } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          note: form.note,
          cartItems: cart,
          website: form.website,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        clearCart();
        setForm({ name: "", phone: "", address: "", city: "", note: "", website: "" });
        setDrawerView("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Грешка при испраќање.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Грешка при испраќање.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <OrderSummary items={cart} compact />

        <div className="space-y-4">
          <p
            className="text-[9px] tracking-[0.25em] uppercase font-[400]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
          >
            Податоци за достава
          </p>

          <input
            type="text"
            name="website"
            value={form.website}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            aria-hidden="true"
          />

          {[
            { name: "name", label: "Име и презиме", placeholder: "Марија Петрова" },
            { name: "phone", label: "Телефон", placeholder: "07X XXX XXX" },
            { name: "city", label: "Град", placeholder: "Скопје" },
            { name: "address", label: "Адреса", placeholder: "ул. Македонија 12" },
          ].map((f) => (
            <div key={f.name} className="flex flex-col gap-1.5">
              <label
                className="text-[9px] tracking-[0.22em] uppercase font-[400]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
              >
                {f.label} *
              </label>
              <input
                name={f.name}
                value={(form as Record<string, string>)[f.name]}
                onChange={onChange}
                required
                placeholder={f.placeholder}
                className="luxury-input"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label
              className="text-[9px] tracking-[0.22em] uppercase font-[400]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
            >
              Напомена
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={onChange}
              rows={2}
              placeholder="Посебни барања..."
              className="luxury-input resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-xs font-[300]" style={{ fontFamily: "var(--font-sans)" }}>
              {errorMsg}
            </p>
          )}
        </div>
      </div>

      <div
        className="flex-shrink-0 p-5 space-y-2"
        style={{ borderTop: "1px solid var(--border)", background: "white" }}
      >
        <button type="submit" disabled={status === "sending"} className="btn-dark w-full">
          {status === "sending" ? "Се испраќа..." : "Потврди нарачка →"}
        </button>
        <button
          type="button"
          onClick={backToCart}
          className="w-full py-3 text-[10px] tracking-[0.15em] uppercase font-[400] transition-colors hover:text-[var(--gold)]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          ← Назад кон кошничка
        </button>
      </div>
    </form>
  );
}
