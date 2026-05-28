import { PerfumeSize } from "@/types";

/** Available quantity options for a size */
export function getQtyOptions(size: PerfumeSize): number[] {
  if (size.qtyOptions?.length) return size.qtyOptions;
  const min = size.minQty ?? 1;
  const max = size.maxQty ?? 3;
  if (min > 1) {
    return Array.from({ length: max }, (_, i) => min * (i + 1));
  }
  return Array.from({ length: max }, (_, i) => i + 1);
}

export function getDefaultQty(size: PerfumeSize): number {
  return size.minQty ?? 1;
}

export function getMaxQty(size: PerfumeSize): number {
  if (size.qtyOptions?.length) return Math.max(...size.qtyOptions);
  const min = size.minQty ?? 1;
  const max = size.maxQty ?? 3;
  return min > 1 ? min * max : max;
}

/** Total price for a line item */
export function getLinePrice(size: PerfumeSize, qty: number): number {
  const min = size.minQty ?? 1;

  if (min > 1) {
    const bundles = qty / min;
    const bundlePrice = size.price2;
    return bundles * bundlePrice;
  }

  if (qty === 1) return size.price;
  if (qty === 2) return size.price2;
  return size.price3;
}

/** Compare-at price for savings display */
export function getCompareAtPrice(size: PerfumeSize, qty: number): number | null {
  const min = size.minQty ?? 1;
  const full = size.price * qty;
  const actual = getLinePrice(size, qty);
  return full > actual ? full : null;
}

/** Lowest “од …” price shown on product cards */
export function getFromPrice(size: PerfumeSize): number {
  return size.minQty && size.minQty > 1 ? size.price2 : size.price;
}

export function formatQtyLabel(qty: number): string {
  if (qty === 1) return "1 парче";
  return `${qty} парчиња`;
}
