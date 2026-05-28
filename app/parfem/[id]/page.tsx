"use client";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import Footer from "@/components/Footer";
import { getPerfumeById } from "@/data/products";

interface Props {
  params: { id: string };
}

export default function PerfumePage({ params }: Props) {
  const perfume = getPerfumeById(params.id);
  if (!perfume) notFound();

  return (
    <main>
      <Navbar />
      <ProductDetail perfume={perfume} />
      <Footer />
    </main>
  );
}
