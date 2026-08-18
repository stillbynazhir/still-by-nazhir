import Image from "next/image";
import FadeIn from "./FadeIn";

const ABOUT_PHOTO_URL =
  "https://pub-10c80bcf7fa94ed989426c52be7d654f.r2.dev/non-gallery/behind-the-lens.jpeg";

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ borderTop: "1px solid #111" }}>
      <div className="about-grid">
        <FadeIn>
          <div className="about-photo">
            <Image
              src={ABOUT_PHOTO_URL}
              alt="Nazhir Jackson"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="(max-width: 768px) 320px, 50vw"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="section-heading-row" style={{ marginBottom: 20 }}>
            <span className="section-index">03</span>
            <p className="section-eyebrow">Behind the Lens</p>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 28 }}>Nazhir Jackson</h2>
          <p className="about-pull">
            &ldquo;An eye for what&apos;s true, not just what&apos;s pretty.&rdquo;
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#555", lineHeight: 1.9, marginBottom: 20 }}>
            Based in Philadelphia, PA. I photograph weddings, portraits, and the moments in between.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#444", lineHeight: 1.9 }}>
            Every shoot is approached with intention. Whether it&apos;s a wedding day that deserves to be remembered or a portrait that needs to last, Still By Nazhir delivers images that hold up.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 24 }}>
            <a href="#contact" className="hero-cta">Work With Me</a>
            <a href="https://instagram.com/stillbynazhir" target="_blank" rel="noreferrer" className="text-link">@stillbynazhir ↗</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
