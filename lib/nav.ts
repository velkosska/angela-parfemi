export type NavCategory = "woman" | "man";

/** Link to a home page section; works from any route */
export function homeHref(section: string, category?: NavCategory) {
  const base = category ? `/?category=${category}` : "/";
  if (section === "collection") return `${base}#collection`;
  return `${base}#${section}`;
}

export const NAV_FILTERS: { key: string; label: string; category?: NavCategory }[] = [
  { key: "collection", label: "Колекција" },
  { key: "collection", label: "За Жени", category: "woman" },
  { key: "collection", label: "За Мажи", category: "man" },
];
