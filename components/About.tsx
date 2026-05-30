"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ background: "var(--cream-2)" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal">
          {[
            { icon: "✦", title: "99% Сличност", desc: "Неразличливо од оригиналот" },
            { icon: "◈", title: "Долготраен Мирис", desc: "Останува цел ден на кожата" },
            { icon: "🚚", title: "Достава 3–4 дена", desc: "Низ цела Македонија" },
            { icon: "💳", title: "Плаќање при достава", desc: "Никакво ризично плаќање" },
          ].map(f => (
            <div key={f.title} className="flex flex-col items-center text-center py-6 px-4 bg-white"
              style={{ border: "1px solid var(--border)" }}>
              <span className="text-2xl mb-3">{f.icon}</span>
              <h4 className="text-sm lg:text-base font-[400] mb-1"
                style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}>{f.title}</h4>
              <p className="text-[10px] lg:text-[11px] font-[300] leading-relaxed"
                style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 py-16 lg:py-20">
          <div className="text-center mb-12 reveal">
            <p className="text-[9px] tracking-[0.4em] uppercase mb-3 font-[400]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}>
              Ценовник
            </p>
            <h3 className="text-3xl lg:text-4xl font-[300]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}>
              Повеќе земаш — повеќе заштедуваш
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 reveal" style={{ transitionDelay: "120ms" }}>
            {[
              {
                type: "EDP · 30ml",
                tiers: [
                  ["1 парче", "499 ден"],
                  ["2 парчиња", "900 ден"],
                  ["3 парчиња", "1200 ден"],
                ],
              },
              {
                type: "EDP · 50ml",
                tiers: [
                  ["1 парче", "600 ден"],
                  ["2 парчиња", "1100 ден"],
                  ["3 парчиња", "1500 ден"],
                ],
              },
              {
                type: "Oil Rolon · 10ml",
                tiers: [
                  ["1 парче", "299 ден"],
                  ["2 парчиња", "550 ден"],
                  ["3 парчиња", "750 ден"],
                ],
              },
            ].map(sec => (
              <div key={sec.type}>
                <p className="text-[9px] tracking-[0.25em] uppercase mb-4 font-[400]"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>{sec.type}</p>
                <div className="flex flex-col gap-2">
                  {sec.tiers.map(([qty, price], i) => (
                    <div key={qty} className={`flex justify-between items-center px-5 py-4 ${
                      i === 2 ? "bg-[var(--onyx)] text-white" : "bg-white"
                    }`}
                      style={{ border: i === 2 ? "none" : "1px solid var(--border)" }}>
                      <span className="text-xs tracking-wide font-[300]"
                        style={{ fontFamily: "var(--font-sans)" }}>{qty}</span>
                      <span className="text-xl font-[400]"
                        style={{ fontFamily: "var(--font-serif)" }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] font-[300] mt-6 reveal"
            style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
            Oil rolon 10ml — ист мирис, за нанесување директно на кожата
          </p>

          <div className="mt-12 text-center reveal" style={{ transitionDelay: "200ms" }}>
            <p className="text-sm font-[300] mb-4"
              style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}>
              Нарачај директно по телефон
            </p>
            <a href="tel:075263594"
              className="inline-flex items-center gap-3 text-xl lg:text-2xl font-[400] transition-colors hover:text-[var(--gold)]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}>
              📞 075 263 594
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
