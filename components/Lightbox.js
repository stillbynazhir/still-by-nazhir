"use client";

import { useEffect } from "react";

export default function Lightbox({ src, alt, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(4,4,4,0.94)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "lbIn 0.25s ease forwards", cursor: "zoom-out",
      }}
    >
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#666", fontSize: 28, cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 300, lineHeight: 1 }}>×</button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", fontSize: 32, cursor: "pointer", padding: 12 }}>‹</button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", fontSize: 32, cursor: "pointer", padding: 12 }}>›</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        onClick={(e) => e.stopPropagation()}
        src={src}
        alt={alt || ""}
        style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", cursor: "default" }}
      />
    </div>
  );
}
