"use client";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import OrderCta from "@/components/OrderCta";
import Footer from "@/components/Footer";
import HomeScrollHandler from "@/components/HomeScrollHandler";

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <HomeScrollHandler />
      </Suspense>
      <Navbar />
      <Hero />
      <ProductGrid />
      <About />
      <OrderCta />
      <Footer />
    </main>
  );
}
