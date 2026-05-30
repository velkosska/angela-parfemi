import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "Angela Parfemi — Твојот потпис. Твојот мирис.",
  description:
    "Премиум инспирирани парфеми со 99% сличност со оригиналот. EDP 30ml, 50ml и Oil rolon 10ml. Достава 3-4 дена.",
  keywords: ["парфеми", "angela parfemi", "инспирирани парфеми", "македонија"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
