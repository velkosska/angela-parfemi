"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartNavButton from "@/components/CartNavButton";
import { homeHref, NAV_FILTERS, NavCategory } from "@/lib/nav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart, openCart, openCheckout } = useCart();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const goToSection = (section: string, category?: NavCategory) => {
    setMenuOpen(false);
    const href = homeHref(section, category);
    if (isHome) {
      router.replace(href);
      const hash = href.includes("#") ? href.split("#")[1] : "";
      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      router.push(href);
    }
  };

  const handleOrder = () => {
    setMenuOpen(false);
    if (cart.length > 0) {
      openCheckout();
      return;
    }
    if (isHome) {
      goToSection("collection");
      setTimeout(() => openCart(), 500);
    } else {
      window.location.href = "/#collection";
    }
  };

  const navLinkClass =
    "text-[10px] tracking-[0.2em] font-[400] transition-colors duration-200 hover:text-[var(--gold)]";
  const navLinkStyle = { fontFamily: "var(--font-sans)", color: "var(--onyx-light)" };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
        }`}
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-14 lg:h-16">
          <div className="hidden lg:flex items-center gap-6">
            {NAV_FILTERS.map((item) =>
              isHome ? (
                <button
                  key={`${item.label}-${item.category ?? "all"}`}
                  type="button"
                  onClick={() => goToSection("collection", item.category)}
                  className={navLinkClass}
                  style={navLinkStyle}
                >
                  {item.label === "Колекција" ? "КОЛЕКЦИЈА" : item.label.toUpperCase()}
                </button>
              ) : (
                <Link
                  key={`${item.label}-${item.category ?? "all"}`}
                  href={homeHref("collection", item.category)}
                  className={`${navLinkClass} no-underline`}
                  style={navLinkStyle}
                >
                  {item.label === "Колекција" ? "КОЛЕКЦИЈА" : item.label.toUpperCase()}
                </Link>
              )
            )}
            {isHome ? (
              <button
                type="button"
                onClick={() => goToSection("about")}
                className={navLinkClass}
                style={navLinkStyle}
              >
                ЗА НАС
              </button>
            ) : (
              <Link href={homeHref("about")} className={`${navLinkClass} no-underline`} style={navLinkStyle}>
                ЗА НАС
              </Link>
            )}
          </div>

          <Link href="/" className="flex flex-col items-center leading-none gap-0.5 no-underline">
            <span
              className="text-[8px] tracking-[0.35em] uppercase font-[300]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
            >
              AI
            </span>
            <span
              className="text-lg lg:text-xl tracking-[0.3em] uppercase font-[400]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
            >
              Angela
            </span>
            <span
              className="text-[8px] tracking-[0.4em] uppercase font-[200]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
            >
              Parfemi
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:075263594"
              className="text-[10px] tracking-[0.15em] font-[500] flex items-center gap-1.5 transition-colors hover:text-[var(--gold)] no-underline"
              style={{ fontFamily: "var(--font-sans)", color: "var(--onyx)" }}
            >
              <span>📞</span>
              <span className="hidden xl:inline">075 263 594</span>
            </a>
            <CartNavButton />
            <button type="button" onClick={handleOrder} className="btn-dark py-2.5 px-5 text-[10px] w-auto">
              НАРАЧАЈ
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <CartNavButton />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 flex flex-col gap-[5px]"
              aria-label="Мени"
            >
              <span
                className={`block w-5 h-[1.5px] bg-[var(--onyx)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[var(--onyx)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[var(--onyx)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${menuOpen ? "max-h-80" : "max-h-0"}`}
          style={{ borderTop: menuOpen ? "1px solid var(--border)" : "none" }}
        >
          <div className="flex flex-col py-6 px-6 gap-4">
            <Link
              href="/"
              className="text-left text-sm tracking-[0.15em] font-[300] no-underline"
              style={{ fontFamily: "var(--font-sans)", color: "var(--onyx)" }}
              onClick={() => setMenuOpen(false)}
            >
              Почетна
            </Link>
            {NAV_FILTERS.map((item) => (
              <Link
                key={`m-${item.label}-${item.category ?? "all"}`}
                href={homeHref("collection", item.category)}
                className="text-left text-sm tracking-[0.15em] font-[300] no-underline"
                style={{ fontFamily: "var(--font-sans)", color: "var(--onyx-light)" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={homeHref("about")}
              className="text-left text-sm tracking-[0.15em] font-[300] no-underline"
              style={{ fontFamily: "var(--font-sans)", color: "var(--onyx-light)" }}
              onClick={() => setMenuOpen(false)}
            >
              За Нас
            </Link>
            <a
              href="tel:075263594"
              className="text-sm font-[500] no-underline"
              style={{ fontFamily: "var(--font-sans)", color: "var(--onyx)" }}
            >
              📞 075 263 594
            </a>
            <button type="button" onClick={handleOrder} className="btn-dark mt-1">
              НАРАЧАЈ СЕГА
            </button>
          </div>
        </div>
      </nav>
      <div className="h-14 lg:h-16 flex-shrink-0" aria-hidden="true" />
    </>
  );
}
