"use client";
import { useState, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartItem } from "@/types";
import { CartContext } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import { getMaxQty } from "@/lib/pricing";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (c) =>
          c.perfume.id === item.perfume.id &&
          c.size.type === item.size.type &&
          c.size.ml === item.size.ml
      );
      if (idx >= 0) {
        const u = [...prev];
        const max = getMaxQty(item.size);
        u[idx].quantity = Math.min(max, u[idx].quantity + item.quantity);
        return u;
      }
      return [...prev, item];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((p) => p.filter((_, j) => j !== index));
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setCart((p) => {
      const u = [...p];
      u[index].quantity = qty;
      return u;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartItemCount = useMemo(
    () => cart.reduce((s, item) => s + item.quantity, 0),
    [cart]
  );

  const goToOrder = useCallback(() => {
    setCartOpen(false);
    if (pathname === "/") {
      setTimeout(
        () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }),
        250
      );
    } else {
      router.push("/#order");
    }
  }, [pathname, router]);

  const value = useMemo(
    () => ({
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartItemCount,
      goToOrder,
    }),
    [
      cart,
      cartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartItemCount,
      goToOrder,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{ background: "var(--onyx)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
        aria-label="Кошничка"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {cartItemCount > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-[600]"
            style={{ background: "var(--gold)", color: "white", fontFamily: "var(--font-sans)" }}
          >
            {cartItemCount}
          </span>
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.3)" }}
        onClick={() => setCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-sm z-50 flex flex-col transition-transform duration-350 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "white",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3
            className="text-lg font-[400]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
          >
            Нарачка
          </h3>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
            style={{ color: "var(--mid)" }}
            aria-label="Затвори"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <CartSidebar
            items={cart}
            onRemove={removeFromCart}
            onQuantityChange={updateQty}
            onCheckout={goToOrder}
          />
        </div>
      </div>
    </CartContext.Provider>
  );
}
