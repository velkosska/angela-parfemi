"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { perfumes } from "@/data/products";
import ProductCard from "./ProductCard";
import CollectionFormatPicker from "@/components/CollectionFormatPicker";
import { CollectionFormat, parseCollectionFormat } from "@/lib/formats";

const FILTERS = [
  { key: "all", label: "Сите" },
  { key: "woman", label: "За Жени" },
  { key: "man", label: "За Мажи" },
  { key: "unisex", label: "Унисекс" },
];

function ProductGridInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const formatParam = searchParams.get("format");
  const initialFilter =
    categoryParam && FILTERS.some((f) => f.key === categoryParam) ? categoryParam : "all";
  const initialFormat = parseCollectionFormat(formatParam);

  const [filter, setFilter] = useState(initialFilter);
  const [format, setFormat] = useState<CollectionFormat>(initialFormat);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryParam && FILTERS.some((f) => f.key === categoryParam)) {
      setFilter(categoryParam);
      setShowAll(false);
    }
  }, [categoryParam]);

  useEffect(() => {
    setFormat(parseCollectionFormat(formatParam));
  }, [formatParam]);

  const updateUrl = (nextFilter: string, nextFormat: CollectionFormat) => {
    const params = new URLSearchParams();
    if (nextFilter !== "all") params.set("category", nextFilter);
    if (nextFormat === "oil") params.set("format", "oil");
    const q = params.toString();
    router.replace(q ? `/?${q}#collection` : "/#collection", { scroll: false });
  };

  const filtered = filter === "all" ? perfumes : perfumes.filter((p) => p.category === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [displayed, format]);

  const formatLabel = format === "oil" ? "Oil rolon" : "EDP парфеми";

  return (
    <section id="collection" ref={ref} className="py-20 lg:py-28 px-5 lg:px-10 max-w-7xl mx-auto">
      <div className="text-center mb-10 reveal">
        <p
          className="text-[9px] tracking-[0.4em] uppercase mb-4 font-[400]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
        >
          Нашата Колекција
        </p>
        <h2
          className="text-4xl lg:text-5xl font-[300] leading-tight mb-5"
          style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
        >
          Инспирирани мириси
        </h2>
        <div
          className="h-px w-16 mx-auto mb-5"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
        <p
          className="text-sm font-[300] max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          {format === "oil"
            ? "Oil rolon 10ml — истиот мирис, за нанесување директно на кожата."
            : "Секоја фрагранца е внимателно одбрана — 99% сличност со оригиналот."}
        </p>
      </div>

      <div className="mb-10 reveal">
        <CollectionFormatPicker
          value={format}
          onChange={(next) => {
            setFormat(next);
            setShowAll(false);
            updateUrl(filter, next);
          }}
        />
      </div>

      <div className="flex justify-center gap-1 mb-12 flex-wrap reveal">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              setFilter(f.key);
              setShowAll(false);
              updateUrl(f.key, format);
            }}
            className={`px-5 py-2.5 text-[10px] tracking-[0.18em] uppercase font-[400] transition-all duration-250 ${
              filter === f.key
                ? "bg-[var(--onyx)] text-white"
                : "bg-white text-[var(--mid)] hover:text-[var(--onyx)]"
            }`}
            style={{ fontFamily: "var(--font-sans)", border: "1px solid var(--border)" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p
        className="text-center text-[9px] tracking-[0.25em] uppercase mb-8 font-[400] reveal"
        style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
      >
        {formatLabel} · {filtered.length} производи
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {displayed.map((perfume, i) => (
          <div key={perfume.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
            <ProductCard perfume={perfume} format={format} />
          </div>
        ))}
      </div>

      {filtered.length > 6 && (
        <div className="text-center mt-12 reveal">
          <button type="button" onClick={() => setShowAll(!showAll)} className="btn-outline">
            {showAll ? "Прикажи Помалку" : `Прикажи Сите ${filtered.length} ${format === "oil" ? "Rolon" : "Парфеми"}`}
          </button>
        </div>
      )}
    </section>
  );
}

export default function ProductGrid() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm" style={{ color: "var(--mid)" }}>Се вчитува...</div>}>
      <ProductGridInner />
    </Suspense>
  );
}
