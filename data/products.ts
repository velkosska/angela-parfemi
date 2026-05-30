import { Perfume } from "@/types";
import { DEFAULT_SIZES } from "@/lib/sizePresets";

export const perfumes: Perfume[] = [
  {
    id: "coco-mademoiselle",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    category: "woman",
    description: "Слободолубива, смела и неочекувана. Цветна ориентална фрагранца.",
    notes: ["Портокал", "Јасмин", "Роза", "Патчули"],
    featured: true,
    imageEmoji: "🌸",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "hypnotic-poison",
    name: "Hypnotic Poison",
    brand: "Dior",
    category: "woman",
    description: "Мистериозна и опојна. Ноќна фрагранца за жени со карактер.",
    notes: ["Бадем", "Сандаловина", "Ванила", "Јасмин"],
    featured: true,
    imageEmoji: "🖤",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "jadore",
    name: "J'adore",
    brand: "Dior",
    category: "woman",
    description: "Луксузна, женствена и вонвремена. Симбол на елеганција.",
    notes: ["Роза", "Иланг-иланг", "Јасмин", "Магнолија"],
    featured: true,
    imageEmoji: "✨",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "good-girl",
    name: "Good Girl",
    brand: "Carolina Herrera",
    category: "woman",
    description: "Дрска и неодолива. Двојна природа на модерната жена.",
    notes: ["Кафе", "Тунбергија", "Тонка боб", "Кашмир"],
    imageEmoji: "👠",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "n5",
    name: "N°5",
    brand: "Chanel",
    category: "woman",
    description: "Иконска. Вонвремена. Нема жена која не ја познава оваа мирисна легенда.",
    notes: ["Илданг", "Роза", "Сандаловина", "Ветивер"],
    featured: true,
    imageEmoji: "💛",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "sauvage",
    name: "Sauvage",
    brand: "Dior",
    category: "man",
    description: "Слободен дух, свежина на пустината. Доминантен и незаборавен.",
    notes: ["Бергамот", "Пипер", "Амброксан", "Сивет"],
    featured: true,
    imageEmoji: "🌊",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "aventus",
    name: "Aventus",
    brand: "Creed",
    category: "man",
    description: "Посветен на победниците. Воздишка на успех и амбиција.",
    notes: ["Ананас", "Бреза", "Мускус", "Дрво"],
    featured: true,
    imageEmoji: "🏆",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "1-million",
    name: "1 Million",
    brand: "Paco Rabanne",
    category: "man",
    description: "Дрзок, сензуален, незаборавен. Злато во шише.",
    notes: ["Крвав портокал", "Рузмарин", "Кожа", "Пачули"],
    imageEmoji: "💰",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "acqua-di-gio",
    name: "Acqua di Giò",
    brand: "Giorgio Armani",
    category: "man",
    description: "Свежина на медитеранот. Класик кој никогаш не застарува.",
    notes: ["Лимета", "Роузмари", "Патчули", "Морски мотиви"],
    imageEmoji: "🌊",
    sizes: DEFAULT_SIZES,
  },
  {
    id: "boss-orange",
    name: "Boss Orange",
    brand: "Hugo Boss",
    category: "man",
    description: "Смел, модерен и самоуверен. За мажи кои не се вклопуваат во калапи.",
    notes: ["Грејпфрут", "Кардамон", "Сандаловина", "Кедар"],
    imageEmoji: "🟠",
    sizes: DEFAULT_SIZES,
  },
];

export const featuredPerfumes = perfumes.filter((p) => p.featured);

export const getPerfumesByCategory = (category: string) =>
  category === "all" ? perfumes : perfumes.filter((p) => p.category === category);

export const getPerfumeById = (id: string) => perfumes.find((p) => p.id === id);

export const getRecommendedPerfumes = (currentId: string, limit = 4) => {
  const current = getPerfumeById(currentId);
  const others = perfumes.filter((p) => p.id !== currentId);
  const sameCategory = current
    ? others.filter((p) => p.category === current.category)
    : [];
  const rest = others.filter((p) => !sameCategory.some((s) => s.id === p.id));
  return [...sameCategory, ...rest].slice(0, limit);
};
