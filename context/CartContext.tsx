"use client";
import { createContext, useContext } from "react";
import { CartItem } from "@/types";

export interface CartContextValue {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  goToOrder: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
