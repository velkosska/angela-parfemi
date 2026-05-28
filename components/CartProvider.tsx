"use client";
import { useState, useCallback, useMemo } from "react";
import { CartItem } from "@/types";
import { CartContext, DrawerView } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { getMaxQty } from "@/lib/pricing";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<DrawerView>("cart");

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
    setDrawerView("cart");
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

  const openCheckout = useCallback(() => {
    if (cart.length > 0) {
      setDrawerView("checkout");
      setCartOpen(true);
    }
  }, [cart.length]);

  const backToCart = useCallback(() => setDrawerView("cart"), []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
    setTimeout(() => setDrawerView("cart"), 300);
  }, []);

  const openCart = useCallback(() => {
    setDrawerView("cart");
    setCartOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartOpen,
      drawerView,
      setCartOpen,
      setDrawerView,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartItemCount,
      openCheckout,
      backToCart,
      closeCart,
      openCart,
    }),
    [
      cart,
      cartOpen,
      drawerView,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartItemCount,
      openCheckout,
      backToCart,
      closeCart,
      openCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}
