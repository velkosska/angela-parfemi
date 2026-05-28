"use client";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types";
import { getLinePrice, getQtyOptions } from "@/lib/pricing";
import { cartTotal } from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";

interface Props {
  items: CartItem[];
  onRemove: (i: number) => void;
  onQuantityChange: (i: number, qty: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ items, onRemove, onQuantityChange, onCheckout }: Props) {
  const { closeCart } = useCart();
  const total = cartTotal(items);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-12 px-4">
        <p
          className="text-base mb-2"
          style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
        >
          Кошничката е празна
        </p>
        <p
          className="text-xs font-[300] mb-6"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          Изберете парфем од колекцијата
        </p>
        <Link
          href="/#collection"
          className="btn-outline no-underline text-center"
          onClick={closeCart}
        >
          Разгледај колекција
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto space-y-3">
        {items.map((item, i) => {
          const p = getLinePrice(item.size, item.quantity);
          const qtyOptions = getQtyOptions(item.size);
          const qtyLabel = item.quantity === 1 ? "1 парче" : `${item.quantity} парчиња`;
          return (
            <div
              key={`${item.perfume.id}-${item.size.ml}-${i}`}
              className="flex gap-3 p-3"
              style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
            >
              <div
                className="relative w-14 h-14 flex-shrink-0"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <Image
                  src={`/images/${item.perfume.id}.jpg`}
                  alt={item.perfume.name}
                  fill
                  className="object-contain p-1.5"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <p
                    className="text-sm font-[400] leading-tight"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
                  >
                    {item.perfume.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemove(i)}
                    className="text-[var(--mid)] hover:text-red-400 text-xs flex-shrink-0"
                    aria-label="Отстрани"
                  >
                    ✕
                  </button>
                </div>
                <p
                  className="text-[10px] font-[300] mb-2"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
                >
                  {item.size.type} {item.size.ml}ml · {qtyLabel}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {qtyOptions.map((q) => (
                      <button
                        key={q}
                        type="button"
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
                  <span
                    className="text-sm font-[400]"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
                  >
                    {p} ден
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="flex-shrink-0 pt-4 mt-4 space-y-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex justify-between items-baseline px-1">
          <span
            className="text-[10px] tracking-[0.15em] uppercase font-[300]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
          >
            Меѓувкупно
          </span>
          <span
            className="text-2xl font-[400]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
          >
            {total}{" "}
            <span className="text-sm font-[300]" style={{ fontFamily: "var(--font-sans)" }}>
              ден
            </span>
          </span>
        </div>
        <button type="button" onClick={onCheckout} className="btn-dark w-full">
          Продолжи кон наплата →
        </button>
        <a
          href="tel:075263594"
          className="flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.15em] uppercase font-[400] transition-colors hover:text-[var(--gold)] no-underline"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)", border: "1px solid var(--border)" }}
        >
          📞 075 263 594
        </a>
      </div>
    </div>
  );
}
