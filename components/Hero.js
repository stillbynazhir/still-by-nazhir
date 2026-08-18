"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_IMAGE_URL =
  "https://pub-10c80bcf7fa94ed989426c52be7d654f.r2.dev/fitness__landscape__weights%26rose.jpg";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 560, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <Image
        src={HERO_IMAGE_URL}
        alt="Weights and a rose — Still By Nazhir, Philadelphia photography"
        fill
        priority
        quality={92}
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.45) 42%, rgba(8,8,8,0.08) 68%, rgba(8,8,8,0.35) 100%)",
        }}
      />

      {!isMobile && (
        <p className="hero-edge-mark">Still By Nazhir · Philadelphia</p>
      )}

      <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px 56px" : "0 48px 72px", width: "100%" }}>
        <div style={{ animation: "fadeDown 1.2s ease forwards" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "#999" }}>01</span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: "#ccc", textTransform: "uppercase" }}>
              Philadelphia, PA
            </p>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: isMobile ? "clamp(44px, 13vw, 64px)" : "clamp(52px, 8vw, 96px)",
              fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.01em", color: "#fff", marginBottom: 28,
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            Photographs<br />
            <em style={{ fontStyle: "italic", color: "#eee" }}>that remain.</em>
          </h1>
          <p className="hero-tagline">Strength. Stillness. Movement.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="#contact" className="hero-cta">Inquire Now</a>
            <a href="#portfolio" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ddd", textDecoration: "none" }}>
              View Work ↓
            </a>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", right: 48, bottom: 72, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #ccc)" }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#ccc", letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-rl" }}>
            Scroll
          </p>
        </div>
      )}
    </section>
  );
}
