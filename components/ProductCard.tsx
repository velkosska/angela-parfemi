"use client";
import Image from "next/image";
import Link from "next/link";
import { Perfume } from "@/types";
import { getFromPrice } from "@/lib/pricing";

interface Props {
  perfume: Perfume;
}

export default function ProductCard({ perfume }: Props) {
  const categoryLabel =
    perfume.category === "woman"
      ? "За Жени"
      : perfume.category === "man"
        ? "За Мажи"
        : "Унисекс";

  return (
    <Link href={`/parfem/${perfume.id}`} className="block no-underline">
      <div className="product-card bg-white flex flex-col">
        <div
          className="relative overflow-hidden group"
          style={{ background: "var(--cream)", aspectRatio: "4/3" }}
        >
          <Image
            src={`/images/${perfume.id}.jpg`}
            alt={perfume.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          <span
            className="absolute top-3 left-3 text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 font-[400] bg-white"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--mid)",
              border: "1px solid var(--border)",
            }}
          >
            {categoryLabel}
          </span>

          {perfume.featured && (
            <span
              className="absolute top-3 right-3 text-[8px] tracking-[0.15em] uppercase px-2.5 py-1 font-[500]"
              style={{ fontFamily: "var(--font-sans)", background: "var(--gold)", color: "white" }}
            >
              Best seller
            </span>
          )}

          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.03)" }}
          >
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-[400] px-4 py-2 bg-white"
              style={{ fontFamily: "var(--font-sans)", color: "var(--onyx)" }}
            >
              Погледни →
            </span>
          </div>
        </div>

        <div className="p-4 lg:p-5 flex flex-col flex-1" style={{ borderTop: "1px solid var(--border)" }}>
          <p
            className="text-[9px] tracking-[0.25em] uppercase mb-1 font-[400]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
          >
            {perfume.brand}
          </p>
          <h3
            className="text-base lg:text-lg font-[400] mb-1 leading-tight"
            style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
          >
            {perfume.name}
          </h3>
          <p
            className="text-[11px] font-[300] leading-relaxed flex-1 mb-4 hidden lg:block"
            style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
          >
            {perfume.description}
          </p>

          <div
            className="flex items-baseline justify-between"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "10px" }}
          >
            <span
              className="text-[10px] tracking-[0.1em] uppercase font-[300]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
            >
              Од
            </span>
            <span
              className="text-lg lg:text-xl font-[400]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
            >
              {Math.min(...perfume.sizes.map(getFromPrice))}{" "}
              <span className="text-xs font-[300]" style={{ fontFamily: "var(--font-sans)" }}>
                ден
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
