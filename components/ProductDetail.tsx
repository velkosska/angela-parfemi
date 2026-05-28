"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Perfume, PerfumeSize } from "@/types";
import { useCart } from "@/context/CartContext";
import {
  getQtyOptions,
  getDefaultQty,
  getLinePrice,
  getCompareAtPrice,
} from "@/lib/pricing";

interface Props {
  perfume: Perfume;
}

export default function ProductDetail({ perfume }: Props) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>(perfume.sizes[0]);
  const [qty, setQty] = useState(getDefaultQty(perfume.sizes[0]));

  const qtyOptions = getQtyOptions(selectedSize);
  const price = getLinePrice(selectedSize, qty);
  const compareAt = getCompareAtPrice(selectedSize, qty);
  const isOilBundle = (selectedSize.minQty ?? 1) > 1;

  useEffect(() => {
    setQty(getDefaultQty(selectedSize));
  }, [selectedSize]);

  const handleSizeChange = (size: PerfumeSize) => {
    setSelectedSize(size);
    setQty(getDefaultQty(size));
  };

  const handleAddToCart = () => {
    addToCart({ perfume, size: selectedSize, quantity: qty });
  };

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "var(--cream)" }}>
      <div
        className="sticky top-14 lg:top-16 z-30 flex items-center px-5 lg:px-10 py-4 bg-white/95 backdrop-blur-sm"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <Link
          href="/#collection"
          className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-[400] transition-colors hover:text-[var(--gold)]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Назад кон колекцијата
        </Link>
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:min-h-0">
        <div
          className="relative w-full md:w-[45%] lg:w-[42%] flex-shrink-0 flex items-center justify-center"
          style={{ background: "var(--cream)", minHeight: "min(50vh, 420px)" }}
        >
          <div className="relative w-full h-[min(50vh,420px)] md:h-full md:min-h-[calc(100dvh-65px)]">
            <Image
              src={`/images/${perfume.id}.jpg`}
              alt={perfume.name}
              fill
              className="object-contain p-8 lg:p-14"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          </div>
          <p
            className="absolute bottom-4 left-5 lg:left-8 text-[9px] tracking-[0.3em] uppercase font-[400]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
          >
            {perfume.brand}
          </p>
        </div>

        <div className="flex-1 flex flex-col bg-white md:overflow-y-auto">
          <div className="flex-1 p-6 sm:p-8 lg:p-12 max-w-2xl">
            <p
              className="text-[9px] tracking-[0.3em] uppercase mb-2 font-[400]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
            >
              Парфеми
            </p>

            <h1
              className="font-[400] leading-tight mb-1"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--onyx)",
                fontSize: "clamp(28px, 5vw, 42px)",
              }}
            >
              {perfume.name}
            </h1>
            <p
              className="text-xs font-[400] mb-4"
              style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
            >
              {perfume.brand}
            </p>
            <p
              className="text-sm font-[300] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
            >
              {perfume.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {perfume.notes.map((n) => (
                <span
                  key={n}
                  className="text-[10px] px-3 py-1.5 tracking-wide font-[300]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    border: "1px solid var(--border)",
                    color: "var(--mid)",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <p
                className="text-[9px] tracking-[0.25em] uppercase mb-3 font-[400]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
              >
                Тип
              </p>
              <div className="flex gap-2 flex-wrap">
                {perfume.sizes.map((size) => (
                  <button
                    key={`${size.type}-${size.ml}`}
                    onClick={() => handleSizeChange(size)}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  >
                    {size.type} {size.ml}ml
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p
                className="text-[9px] tracking-[0.25em] uppercase mb-3 font-[400]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
              >
                Количина (парчиња)
              </p>
              {isOilBundle && (
                <p
                  className="text-[10px] font-[300] mb-3"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
                >
                  Oil 10ml: {selectedSize.price} ден по парче · нарачка минимум 5 парчиња (600 ден)
                </p>
              )}
              <div className="flex items-center gap-0 flex-wrap">
                {qtyOptions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQty(q)}
                    className={`min-w-12 h-12 px-2 text-sm font-[400] border transition-all ${
                      qty === q
                        ? "bg-[var(--onyx)] border-[var(--onyx)] text-white"
                        : "bg-white border-[var(--border)] text-[var(--onyx)] hover:border-[var(--onyx)]"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {q}
                  </button>
                ))}
                {compareAt != null && compareAt > price && (
                  <span
                    className="ml-3 text-[10px] font-[400] px-3 py-1.5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      background: "rgba(184,151,46,0.1)",
                      color: "var(--gold-dark)",
                    }}
                  >
                    -{compareAt - price} ден
                  </span>
                )}
              </div>
            </div>
          </div>

          <div
            className="sticky bottom-0 p-6 sm:p-8 lg:p-12 pt-5 bg-white"
            style={{ borderTop: "1px solid var(--border)", boxShadow: "0 -8px 32px rgba(0,0,0,0.04)" }}
          >
            <div className="max-w-2xl">
              <div className="flex items-baseline gap-2 mb-5">
                <span
                  className="font-[400]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--onyx)",
                    fontSize: "clamp(28px, 5vw, 40px)",
                  }}
                >
                  {price}
                </span>
                <span
                  className="text-base font-[300]"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
                >
                  ден
                </span>
                {compareAt != null && compareAt > price && (
                  <span
                    className="text-sm line-through font-[300] ml-1"
                    style={{ color: "var(--mid)", fontFamily: "var(--font-sans)" }}
                  >
                    {compareAt} ден
                  </span>
                )}
              </div>

              <button onClick={handleAddToCart} className="btn-dark mb-3">
                Додај во Нарачка
              </button>
              <a
                href="tel:075263594"
                className="flex items-center justify-center gap-2 py-3.5 text-[10px] tracking-[0.18em] uppercase font-[400] transition-colors hover:text-[var(--gold)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--mid)",
                  border: "1px solid var(--border)",
                }}
              >
                📞 Нарачај по телефон · 075 263 594
              </a>

              <div className="flex items-center gap-6 mt-5 flex-wrap">
                {[
                  ["🚚", "Достава 3–4 дена"],
                  ["💳", "Плаќање при достава"],
                ].map(([ic, t]) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span className="text-sm">{ic}</span>
                    <span
                      className="text-[10px] font-[300]"
                      style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
