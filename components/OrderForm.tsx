"use client";
import { useState } from "react";
import { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { getLinePrice } from "@/lib/pricing";

interface Props {
  cartItems: CartItem[];
}

export default function OrderForm({ cartItems }: Props) {
  const { clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const total = cartItems.reduce((s, item) => s + getLinePrice(item.size, item.quantity), 0);

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
          cartItems,
          website: form.website,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", address: "", city: "", note: "", website: "" });
        clearCart();
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
    <section id="order" className="py-20 lg:py-28 px-5 lg:px-10" style={{ background: "white" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-[9px] tracking-[0.4em] uppercase mb-4 font-[400]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
          >
            Нарачај
          </p>
          <h2
            className="text-4xl lg:text-5xl font-[300] mb-5"
            style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
          >
            Направи Нарачка
          </h2>
          <div
            className="h-px w-16 mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
          />
          <p className="text-sm font-[300]" style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
            Пополни ги податоците и ние ќе те контактираме. Плаќање при достава.
          </p>
        </div>

        {cartItems.length > 0 && (
          <div
            className="mb-10 p-6"
            style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase mb-4 font-[400]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
            >
              Твојата нарачка
            </p>
            <div className="space-y-3">
              {cartItems.map((item, i) => {
                const p = getLinePrice(item.size, item.quantity);
                const qtyLabel =
                  item.quantity === 1 ? "1 парче" : `${item.quantity} парчиња`;
                return (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <span
                        className="text-sm font-[400]"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
                      >
                        {item.perfume.name}
                      </span>
                      <span
                        className="text-[10px] ml-2 font-[300]"
                        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
                      >
                        {item.size.type} {item.size.ml}ml · {qtyLabel}
                      </span>
                    </div>
                    <span
                      className="text-base font-[400]"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
                    >
                      {p} ден
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-px mt-4 mb-3" style={{ background: "var(--border)" }} />
            <div className="flex justify-between">
              <span
                className="text-[10px] tracking-[0.15em] uppercase font-[300]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
              >
                Вкупно
              </span>
              <span
                className="text-2xl font-[400]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
              >
                {total} ден
              </span>
            </div>
          </div>
        )}

        {status === "success" ? (
          <div className="text-center py-16" style={{ border: "1px solid var(--border)" }}>
            <div className="text-4xl mb-4">✓</div>
            <h3
              className="text-2xl font-[400] mb-3"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
            >
              Нарачката е примена!
            </h3>
            <p className="text-sm font-[300]" style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
              Ќе те контактираме наскоро. Очекувај достава за 3–4 дена.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              { name: "name", label: "Ime i Prezime", placeholder: "Марија Петрова", full: false },
              { name: "phone", label: "Телефон", placeholder: "07X XXX XXX", full: false },
              { name: "city", label: "Град", placeholder: "Скопје", full: false },
              { name: "address", label: "Адреса", placeholder: "ул. Македонија 12", full: false },
            ].map((f) => (
              <div key={f.name} className={`flex flex-col gap-1.5 ${f.full ? "sm:col-span-2" : ""}`}>
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

            <div className="flex flex-col gap-1.5 sm:col-span-2">
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
                rows={3}
                placeholder="Посебни барања или парфеми кои ги бараш..."
                className="luxury-input resize-none"
              />
            </div>

            <div
              className="sm:col-span-2 flex items-start gap-3 p-4"
              style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
            >
              <span className="text-lg mt-0.5">🚚</span>
              <div>
                <p
                  className="text-xs font-[400] mb-0.5"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--onyx)" }}
                >
                  Достава 3–4 работни дена · Плаќање при достава
                </p>
                <p className="text-[10px] font-[300]" style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
                  Или нарачај директно:{" "}
                  <a
                    href="tel:075263594"
                    className="font-[500] hover:text-[var(--gold)]"
                    style={{ color: "var(--onyx)" }}
                  >
                    075 263 594
                  </a>
                </p>
              </div>
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
              <button type="submit" disabled={status === "sending"} className="btn-dark flex-1">
                {status === "sending" ? "Се испраќа..." : "Потврди Нарачка →"}
              </button>
              <a href="tel:075263594" className="btn-outline flex-none sm:flex-1 justify-center no-underline">
                📞 075 263 594
              </a>
            </div>

            {status === "error" && (
              <p
                className="sm:col-span-2 text-center text-red-500 text-xs font-[300]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {errorMsg || "Грешка. Обиди се повторно или јави се на 075 263 594."}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
