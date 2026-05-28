"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { homeHref } from "@/lib/nav";

export default function Footer() {
  const pathname = usePathname();
  const { cart, openCart, openCheckout } = useCart();
  const isHome = pathname === "/";

  const handleOrder = () => {
    if (cart.length > 0) openCheckout();
    else openCart();
  };

  const navItems = [
    { href: homeHref("collection"), label: "Колекција" },
    { href: homeHref("about"), label: "За Нас" },
  ] as const;

  return (
    <footer className="py-14 px-5 lg:px-10" style={{ background: "var(--onyx)", color: "white" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <Link href="/" className="no-underline inline-block">
              <div
                className="text-[7px] tracking-[0.35em] uppercase mb-0.5 font-[200]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
              >
                AI
              </div>
              <div
                className="text-lg tracking-[0.25em] uppercase font-[300] mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Angela
              </div>
              <div
                className="text-[8px] tracking-[0.4em] uppercase mb-4 font-[200]"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.3)" }}
              >
                Parfemi
              </div>
            </Link>
            <p
              className="text-[11px] font-[300] leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.4)" }}
            >
              99% сличност со оригиналот. Твојот потпис. Твојот мирис.
            </p>
          </div>

          <div>
            <p
              className="text-[8px] tracking-[0.3em] uppercase mb-5 font-[400]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
            >
              Контакт
            </p>
            <a
              href="tel:075263594"
              className="flex items-center gap-2 text-sm font-[400] mb-3 hover:text-[var(--gold)] transition-colors no-underline"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              📞 075 263 594
            </a>
            <p
              className="text-[11px] font-[300]"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.4)" }}
            >
              🚚 Достава 3–4 работни дена
            </p>
            <p
              className="text-[11px] font-[300] mt-1"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.4)" }}
            >
              💳 Плаќање при достава
            </p>
          </div>

          <div>
            <p
              className="text-[8px] tracking-[0.3em] uppercase mb-5 font-[400]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
            >
              Навигација
            </p>
            {navItems.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="block text-[11px] font-[300] mb-3 hover:text-[var(--gold)] transition-colors no-underline"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </Link>
            ))}
            {isHome ? (
              <button
                type="button"
                onClick={handleOrder}
                className="block text-[11px] font-[300] mb-3 hover:text-[var(--gold)] transition-colors text-left"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)" }}
              >
                Нарачај
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOrder}
                className="block text-[11px] font-[300] mb-3 hover:text-[var(--gold)] transition-colors text-left"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)" }}
              >
                Нарачај
              </button>
            )}
          </div>
        </div>

        <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <p
            className="text-[9px] font-[200]"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.2)" }}
          >
            © {new Date().getFullYear()} Angela Parfemi.
          </p>
          <p
            className="text-[9px] font-[200]"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.15)" }}
          >
            Инспирирани парфеми — не се оригинални брендирани производи.
          </p>
        </div>
      </div>
    </footer>
  );
}
