"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/sbn-logo.svg";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const pathname = usePathname();
  const isGallery = pathname === "/gallery";
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const navOpaque = scrollY > 60 || isGallery;

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "16px 24px" : "20px 48px",
        background: navOpaque || mobileMenuOpen ? "rgba(8,8,8,0.97)" : "transparent",
        backdropFilter: navOpaque || mobileMenuOpen ? "blur(12px)" : "none",
        borderBottom: navOpaque || mobileMenuOpen ? "1px solid #111" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "inline-flex", cursor: "pointer" }}>
          <Image src={logo} alt="Still By Nazhir" height={isMobile ? 36 : 44} style={{ width: "auto", height: isMobile ? 36 : 44 }} priority />
        </Link>

        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {isGallery ? (
              <>
                <Link href="/" className="nav-link">Home</Link>
                <span className="nav-link is-active">Gallery</span>
              </>
            ) : (
              NAV_LINKS.map((l) =>
                l.href.startsWith("/") ? (
                  <Link key={l.label} href={l.href} className="nav-link">{l.label}</Link>
                ) : (
                  <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
                )
              )
            )}
          </div>
        )}

        {isMobile ? (
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
          >
            <span style={{ display: "block", width: 22, height: 1, background: mobileMenuOpen ? "#555" : "#fff", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1, background: mobileMenuOpen ? "#555" : "#fff", transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 1, background: mobileMenuOpen ? "#555" : "#fff", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        ) : (
          <Link
            href={isGallery ? "/#contact" : "#contact"}
            style={{
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "#080808",
              background: "#fff", padding: "9px 22px", textDecoration: "none",
              transition: "opacity 0.2s", cursor: "pointer",
            }}
          >
            Book a Shoot
          </Link>
        )}
      </div>

      {isMobile && mobileMenuOpen && (
        <div style={{ animation: "slideDown 0.25s ease forwards", paddingTop: 8, paddingBottom: 8 }}>
          {isGallery ? (
            <>
              <Link href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <span className="mobile-nav-link" style={{ color: "#fff" }}>Gallery</span>
            </>
          ) : (
            NAV_LINKS.map((l) =>
              l.href.startsWith("/") ? (
                <Link key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{l.label}</Link>
              ) : (
                <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
              )
            )
          )}
          <Link
            href={isGallery ? "/#contact" : "#contact"}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "inline-block", marginTop: 20,
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "#080808",
              background: "#fff", padding: "10px 24px", textDecoration: "none",
            }}
          >
            Book a Shoot
          </Link>
        </div>
      )}
    </nav>
  );
}
