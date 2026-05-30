import { Perfume, PerfumeSize, PerfumeType } from "@/types";
import { getFromPrice } from "@/lib/pricing";

export type CollectionFormat = "edp" | "oil";

export function parseCollectionFormat(value: string | null): CollectionFormat {
  return value === "oil" ? "oil" : "edp";
}

export function formatQueryParam(format: CollectionFormat): string {
  return format === "oil" ? "oil" : "edp";
}

export function sizesForType(sizes: PerfumeSize[], type: PerfumeType): PerfumeSize[] {
  return sizes.filter((s) => s.type === type);
}

export function getSizesForFormat(perfume: Perfume, format: CollectionFormat): PerfumeSize[] {
  return sizesForType(perfume.sizes, format === "oil" ? "OIL" : "EDP");
}

export function getFromPriceForFormat(perfume: Perfume, format: CollectionFormat): number {
  const sizes = getSizesForFormat(perfume, format);
  if (!sizes.length) return 0;
  return Math.min(...sizes.map(getFromPrice));
}

export function productHref(id: string, format: CollectionFormat = "edp"): string {
  return format === "oil" ? `/parfem/${id}?format=oil` : `/parfem/${id}`;
}
