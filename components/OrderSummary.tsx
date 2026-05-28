"use client";
import Image from "next/image";
import { CartItem } from "@/types";
import { getLinePrice } from "@/lib/pricing";

interface Props {
  items: CartItem[];
  compact?: boolean;
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((s, item) => s + getLinePrice(item.size, item.quantity), 0);
}

export default function OrderSummary({ items, compact }: Props) {
  const total = cartTotal(items);

  if (items.length === 0) {
    return (
      <p className="text-xs font-[300] text-center py-4" style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
        Нема избрани производи
      </p>
    );
  }

  return (
    <div
      className={compact ? "p-4" : "p-5"}
      style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
    >
      <p
        className="text-[9px] tracking-[0.25em] uppercase mb-3 font-[400]"
        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
      >
        Резиме на нарачка
      </p>
      <ul className={compact ? "space-y-2" : "space-y-3"}>
        {items.map((item, i) => {
          const price = getLinePrice(item.size, item.quantity);
          const qtyLabel = item.quantity === 1 ? "1 парче" : `${item.quantity} парчиња`;
          return (
            <li key={`${item.perfume.id}-${item.size.ml}-${i}`} className="flex gap-3">
              <div
                className="relative w-12 h-12 flex-shrink-0"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <Image
                  src={`/images/${item.perfume.id}.jpg`}
                  alt={item.perfume.name}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-[400] leading-tight truncate"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
                >
                  {item.perfume.name}
                </p>
                <p
                  className="text-[10px] font-[300]"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
                >
                  {item.perfume.brand} · {item.size.type} {item.size.ml}ml · {qtyLabel}
                </p>
              </div>
              <span
                className="text-sm font-[400] flex-shrink-0"
                style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
              >
                {price} ден
              </span>
            </li>
          );
        })}
      </ul>
      <div className="h-px my-3" style={{ background: "var(--border)" }} />
      <div className="flex justify-between items-baseline">
        <span
          className="text-[10px] tracking-[0.15em] uppercase font-[300]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          Вкупно
        </span>
        <span
          className={`font-[400] ${compact ? "text-xl" : "text-2xl"}`}
          style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
        >
          {total}{" "}
          <span className="text-sm font-[300]" style={{ fontFamily: "var(--font-sans)" }}>
            ден
          </span>
        </span>
      </div>
      <p
        className="text-[10px] font-[300] mt-2"
        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
      >
        Плаќање при достава · Достава 3–4 дена
      </p>
    </div>
  );
}
