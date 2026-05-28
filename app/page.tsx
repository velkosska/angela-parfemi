"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { cart } = useCart();

  return (
    <main>
      <HashScroll />
      <Navbar />
      <Hero />
      <ProductGrid />
      <About />
      <OrderForm cartItems={cart} />
      <Footer />
    </main>
  );
}
