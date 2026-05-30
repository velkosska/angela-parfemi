"use client";
import type { ReactNode } from "react";
import { CollectionFormat } from "@/lib/formats";

interface Props {
  value: CollectionFormat;
  onChange: (format: CollectionFormat) => void;
  className?: string;
}

const OPTIONS: {
  id: CollectionFormat;
  title: string;
  subtitle: string;
  icon: ReactNode;
}[] = [
  {
    id: "edp",
    title: "EDP Парфем",
    subtitle: "30ml · 50ml",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 6h6v14a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
        <path d="M10 10h4M10 14h4" />
      </svg>
    ),
  },
  {
    id: "oil",
    title: "Oil Rolon",
    subtitle: "10ml · на кожа",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <rect x="9" y="3" width="6" height="3" rx="1" />
        <rect x="8" y="6" width="8" height="14" rx="3" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M12 6v4" />
      </svg>
    ),
  },
];

export default function CollectionFormatPicker({ value, onChange, className = "" }: Props) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto ${className}`}>
      {OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex-1 flex items-center gap-4 px-5 py-4 transition-all duration-250 text-left ${
              active ? "bg-[var(--onyx)] text-white" : "bg-white text-[var(--onyx)] hover:border-[var(--gold)]"
            }`}
            style={{
              border: active ? "1px solid var(--onyx)" : "1px solid var(--border)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span
              className={`flex-shrink-0 w-12 h-12 flex items-center justify-center ${
                active ? "text-white" : "text-[var(--gold)]"
              }`}
              style={{ border: active ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--border)" }}
            >
              {opt.icon}
            </span>
            <span>
              <span className="block text-[11px] tracking-[0.2em] uppercase font-[500]">{opt.title}</span>
              <span
                className={`block text-[10px] font-[300] mt-0.5 ${active ? "text-white/70" : ""}`}
                style={active ? undefined : { color: "var(--mid)" }}
              >
                {opt.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
