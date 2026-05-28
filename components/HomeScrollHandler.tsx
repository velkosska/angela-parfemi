"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function HomeScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 200);

    return () => clearTimeout(t);
  }, [searchParams]);

  return null;
}
