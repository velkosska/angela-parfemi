"use client";
import { CartItem } from "@/types";
import { getLinePrice, getQtyOptions } from "@/lib/pricing";

interface Props {
  items: CartItem[];
  onRemove: (i: number) => void;
  onQuantityChange: (i: number, qty: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ items, onRemove, onQuantityChange, onCheckout }: Props) {
  const total = items.reduce((s, item) => s + getLinePrice(item.size, item.quantity), 0);

  if (items.length === 0)
    return (
      <div className="text-center py-16 px-6">
        <p className="text-base mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}>
          Нарачката е празна
        </p>
        <p className="text-xs font-[300]" style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
          Кликни на парфем за да го додадеш
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const p = getLinePrice(item.size, item.quantity);
        const qtyOptions = getQtyOptions(item.size);
        return (
          <div key={i} className="flex gap-3 p-3" style={{ border: "1px solid var(--border)" }}>
            <span className="text-3xl">{item.perfume.imageEmoji}</span>
            <div className="flex-1 min-w-0">
              <p
                className="text-base font-[400] leading-tight"
                style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
              >
                {item.perfume.name}
              </p>
              <p
                className="text-[10px] font-[300] mb-2"
                style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
              >
                {item.perfume.brand} · {item.size.type} {item.size.ml}ml
              </p>
              <div className="flex gap-1 flex-wrap">
                {qtyOptions.map((q) => (
                  <button
                    key={q}
                    onClick={() => onQuantityChange(i, q)}
                    className={`min-w-7 h-7 px-1 text-[11px] border transition-all ${
                      item.quantity === q
                        ? "bg-[var(--onyx)] border-[var(--onyx)] text-white"
                        : "bg-white border-[var(--border)] text-[var(--onyx)]"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => onRemove(i)}
                className="text-[var(--mid)] hover:text-red-400 transition-colors text-xs p-1"
              >
                ✕
              </button>
              <span
                className="text-base font-[400]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
              >
                {p} ден
              </span>
            </div>
          </div>
        );
      })}

      <div className="h-px" style={{ background: "var(--border)" }} />
      <div className="flex justify-between items-baseline px-1">
        <span
          className="text-[10px] tracking-[0.15em] uppercase font-[300]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          Вкупно
        </span>
        <span className="text-2xl font-[400]" style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}>
          {total} <span className="text-sm font-[300]" style={{ fontFamily: "var(--font-sans)" }}>ден</span>
        </span>
      </div>

      <button onClick={onCheckout} className="btn-dark">
        Продолжи со Нарачка →
      </button>
      <a
        href="tel:075263594"
        className="flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.15em] uppercase font-[400] transition-colors hover:text-[var(--gold)]"
        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)", border: "1px solid var(--border)" }}
      >
        📞 075 263 594
      </a>
    </div>
  );
}
