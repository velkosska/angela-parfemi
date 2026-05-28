import { getRecommendedPerfumes } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface Props {
  currentId: string;
}

export default function RecommendedPerfumes({ currentId }: Props) {
  const recommended = getRecommendedPerfumes(currentId, 4);
  if (recommended.length === 0) return null;

  return (
    <section
      className="py-16 lg:py-20 px-5 lg:px-10"
      style={{ background: "white", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-[9px] tracking-[0.4em] uppercase mb-3 font-[400]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
          >
            Препорачано
          </p>
          <h2
            className="text-2xl lg:text-3xl font-[300]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
          >
            Можеби ќе ви се допадне
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {recommended.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </div>
    </section>
  );
}
