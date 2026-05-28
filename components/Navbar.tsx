"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? "bg-white shadow-sm" : "bg-white/90 backdrop-blur-sm"
        }`}
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-14 lg:h-16">
          {/* Left nav */}
          <div className="hidden lg:flex items-center gap-8">
            {[["collection","КОЛЕКЦИЈА"],["collection","ЗА ЖЕНИ"],["collection","ЗА МАЖИ"]].map(([id,label]) => (
              <button key={label} onClick={() => scrollTo(id)}
                className="text-[10px] tracking-[0.2em] font-[400] transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--onyx-light)" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center leading-none gap-0.5">
            <span className="text-[8px] tracking-[0.35em] uppercase font-[300]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}>AI</span>
            <span className="text-lg lg:text-xl tracking-[0.3em] uppercase font-[400]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}>Angela</span>
            <span className="text-[8px] tracking-[0.4em] uppercase font-[200]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>Parfemi</span>
          </button>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="tel:075263594"
              className="text-[10px] tracking-[0.15em] font-[500] flex items-center gap-1.5 transition-colors hover:text-[var(--gold)]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--onyx)" }}>
              <span>📞</span> 075 263 594
            </a>
            <button onClick={() => scrollTo("order")}
              className="btn-dark py-2.5 px-5 text-[10px] w-auto">
              НАРАЧАЈ
            </button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a href="tel:075263594"
              className="text-[11px] font-[500] flex items-center gap-1"
              style={{ color: "var(--onyx)", fontFamily: "var(--font-sans)" }}>
              <span>📞</span> 075 263 594
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 flex flex-col gap-[5px]">
              <span className={`block w-5 h-[1.5px] bg-[var(--onyx)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-[var(--onyx)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-[var(--onyx)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${menuOpen ? "max-h-64" : "max-h-0"}`}
          style={{ borderTop: menuOpen ? "1px solid var(--border)" : "none" }}>
          <div className="flex flex-col py-6 px-6 gap-5">
            {[["collection","Колекција"],["about","За Нас"],["order","Нарачај"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-left text-sm tracking-[0.15em] font-[300]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--onyx-light)" }}>
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("order")} className="btn-dark mt-2">
              НАРАЧАЈ СЕГА
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
