"use client";
import { useCart } from "@/context/CartContext";

export default function CartNavButton() {
  const { cartOpen, setCartOpen, cartItemCount } = useCart();

  return (
    <button
      type="button"
      onClick={() => setCartOpen(!cartOpen)}
      className="relative w-10 h-10 flex items-center justify-center rounded-sm border border-[var(--border)] bg-white text-[var(--onyx)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
      aria-label={`Кошничка${cartItemCount > 0 ? `, ${cartItemCount} производи` : ""}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {cartItemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] font-[600] text-white"
          style={{ background: "var(--gold)", fontFamily: "var(--font-sans)" }}
        >
          {cartItemCount}
        </span>
      )}
    </button>
  );
}
