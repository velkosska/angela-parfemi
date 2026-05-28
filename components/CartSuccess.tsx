"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartSuccess() {
  const { closeCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-12 text-center">
      <div
        className="w-16 h-16 flex items-center justify-center mb-6 text-2xl"
        style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
      >
        ✓
      </div>
      <h3
        className="text-2xl font-[400] mb-3"
        style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
      >
        Нарачката е примена!
      </h3>
      <p
        className="text-sm font-[300] mb-8 max-w-xs leading-relaxed"
        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
      >
        Ќе ве контактираме наскоро на телефон. Очекувајте достава за 3–4 работни дена.
      </p>
      <button type="button" onClick={closeCart} className="btn-dark w-full max-w-xs mb-3">
        Продолжи со купување
      </button>
      <Link
        href="/#collection"
        onClick={closeCart}
        className="text-[10px] tracking-[0.15em] uppercase font-[400] no-underline hover:text-[var(--gold)]"
        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
      >
        Назад кон колекцијата
      </Link>
    </div>
  );
}
