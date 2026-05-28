"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const anim = (delay: number) => ({
    transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
  });

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* ============================================================
          BACKGROUND IMAGE — replace the div below with your photo.

          HOW TO ADD YOUR IMAGE:
          1. Put your photo in:  public/images/hero.jpg
          2. Delete the placeholder <div> (the beige gradient block)
          3. Uncomment the <Image> tag below it

          The image should be landscape, at least 1400px wide.
          ============================================================ */}

      {/* PLACEHOLDER — delete this when you add the real photo */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(110deg, #C8A96E 0%, #E8C98A 30%, #D4A855 55%, #8B6914 100%)",
        }}
      >
        {/* Simulated figure silhouette */}
        <div className="absolute bottom-0 left-[8%] w-[38%] h-[88%] opacity-20"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-[5%] right-[50%] h-full opacity-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
        <p className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs tracking-[0.3em] uppercase font-[300] select-none"
          style={{ fontFamily: "var(--font-sans)" }}>
          [ Додади ја твојата фотографија овде ]
        </p>
      </div>

     
      <Image
        src="/images/hero.jpg"
        alt="Angela Parfemi"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay — bottom fade + right side for text legibility */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.72) 100%),
            linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)
          `
        }} />

      {/* ── TEXT OVERLAY ── right side, vertically centered */}
      <div className="relative z-10 h-screen flex flex-col justify-center px-6 lg:px-16">
        <div className="ml-auto w-full max-w-[480px] lg:max-w-[520px]">

          {/* Logo mark */}
          <div style={anim(200)} className="mb-8 lg:mb-10">
            <div className="flex flex-col leading-none mb-1">
              <span className="text-[9px] tracking-[0.45em] uppercase font-[200]"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.7)" }}>
                AI
              </span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-[11px] tracking-[0.5em] uppercase font-[300]"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.55)" }}>
                EAU DE PARFUM
              </span>
            </div>
          </div>

          {/* Brand name — large */}
          <h1 style={{ fontFamily: "var(--font-serif)", ...anim(350) }}
            className="font-[300] text-white leading-[0.9] tracking-[0.06em] mb-6 lg:mb-8"
            /* Responsive font size matching the Layéna reference */
            >
            <span style={{ fontSize: "clamp(52px, 10vw, 110px)", display: "block" }}>Angela</span>
            <span style={{
              fontSize: "clamp(52px, 10vw, 110px)",
              display: "block",
              fontStyle: "italic",
              background: "linear-gradient(100deg, rgba(255,255,255,0.95) 0%, rgba(212,175,80,0.9) 60%, rgba(184,151,46,0.85) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Parfemi</span>
          </h1>

          {/* Tagline */}
          <p style={{ fontFamily: "var(--font-sans)", ...anim(520) }}
            className="text-xs lg:text-sm tracking-[0.28em] uppercase font-[200] mb-10 lg:mb-12"
            /* Matches "EAU DE PARFUM" style in reference */
            >
            <span style={{ color: "rgba(255,255,255,0.65)" }}>
              Твојот потпис. Твојот мирис.
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3" style={anim(680)}>
            <button
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-dark px-8 py-4 text-[10px] w-auto"
              style={{ background: "white", color: "var(--onyx)", letterSpacing: "0.18em" }}>
              РАЗГЛЕДАЈ КОЛЕКЦИЈА
            </button>
            <a href="tel:075263594"
              className="flex items-center justify-center gap-2 px-6 py-4 text-[11px] tracking-[0.12em] font-[400] transition-all"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.35)",
                letterSpacing: "0.12em",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}>
              📞 075 263 594
            </a>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          transition: `opacity 1s ease 1000ms`,
          opacity: mounted ? 1 : 0,
        }}>
        <div className="max-w-2xl mx-auto grid grid-cols-3 divide-x divide-[rgba(255,255,255,0.1)]">
          {[["99%","Сличност"],["3–4","Дена Достава"],["100%","Оригинал"]].map(([v,l]) => (
            <div key={l} className="flex flex-col items-center py-4">
              <span className="text-lg lg:text-xl font-[400] gold-shimmer"
                style={{ fontFamily: "var(--font-serif)" }}>{v}</span>
              <span className="text-[8px] lg:text-[9px] tracking-[0.25em] uppercase font-[300] mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: "68px", transition: "opacity 1s ease 1300ms", opacity: mounted ? 0.6 : 0 }}>
        <div className="w-px h-8 animate-pulse"
          style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
      </div>
    </section>
  );
}
