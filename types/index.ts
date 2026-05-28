export type PerfumeCategory = "woman" | "man" | "unisex";
export type PerfumeType = "EDP" | "OIL";

export interface PerfumeSize {
  ml: number;
  type: PerfumeType;
  /** Price for 1 piece (or per-piece reference for bundle sizes) */
  price: number;
  /** 2 pieces, or bundle total when minQty > 1 */
  price2: number;
  /** 3 pieces, or 2× bundle when minQty > 1 */
  price3: number;
  /** Minimum order quantity (e.g. 5 for 10ml oil) */
  minQty?: number;
  /** Max tier count for quantity selector (default 3) */
  maxQty?: number;
  /** Explicit quantity buttons (overrides min/max tiers) */
  qtyOptions?: number[];
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: PerfumeCategory;
  description: string;
  notes: string[];
  sizes: PerfumeSize[];
  featured?: boolean;
  imageEmoji: string;
}

export interface CartItem {
  perfume: Perfume;
  size: PerfumeSize;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  note: string;
  items: CartItem[];
}
