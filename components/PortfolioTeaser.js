import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import p1 from "@/assets/images/portfolio-1.webp";
import p2 from "@/assets/images/portfolio-2.webp";
import p3 from "@/assets/images/portfolio-3.webp";
import p4 from "@/assets/images/portfolio-4.webp";

const ITEMS = [
  { src: p1, label: "Events", pos: "top", wide: true, height: 480, offset: false },
  { src: p2, label: "Portraits", pos: "top", wide: false, height: 480, offset: true },
  { src: p3, label: "Moments", pos: "center", wide: false, height: 320, offset: false },
  { src: p4, label: "Receptions", pos: "center", wide: true, height: 320, offset: true },
];

export default function PortfolioTeaser() {
  return (
    <section id="portfolio" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <SectionHeading index="01" eyebrow="Selected Work" title="The Portfolio" watermark="WORK" />
        <FadeIn delay={0.1} style={{ marginBottom: 56 }}>
          <Link href="/gallery" className="text-link" style={{ borderBottom: "1px solid #222", paddingBottom: 2 }}>
            View Full Gallery →
          </Link>
        </FadeIn>
      </div>
      <div className="portfolio-grid">
        {ITEMS.map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.1} className={`${item.wide ? "span-wide" : ""} ${item.offset ? "offset-down" : ""}`}>
            <Link
              href="/gallery"
              style={{ height: item.height, background: "#0d0d0d", position: "relative", overflow: "hidden", cursor: "pointer", display: "block" }}
              className="portfolio-tile"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: item.pos }}
              />
              <div className="portfolio-label" style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.55)", display: "flex", alignItems: "flex-end", padding: "20px 24px" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 300, color: "#fff", letterSpacing: "0.08em" }}>{item.label}</span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
