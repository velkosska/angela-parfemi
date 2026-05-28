import { PerfumeSize } from "@/types";

/** Shared size/pricing for all perfumes */
export const SIZE_EDP_50: PerfumeSize = {
  ml: 50,
  type: "EDP",
  price: 600,
  price2: 1100,
  price3: 1500,
};

export const SIZE_EDP_30: PerfumeSize = {
  ml: 30,
  type: "EDP",
  price: 499,
  price2: 900,
  price3: 1200,
};

export const SIZE_OIL_10: PerfumeSize = {
  ml: 10,
  type: "OIL",
  price: 150,
  price2: 600,
  price3: 1200,
  minQty: 5,
  maxQty: 3,
};

export const DEFAULT_SIZES: PerfumeSize[] = [SIZE_EDP_50, SIZE_EDP_30, SIZE_OIL_10];
