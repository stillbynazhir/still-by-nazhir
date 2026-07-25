import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ borderTop: "1px solid #111", position: "relative", overflow: "hidden" }}>
      <SectionHeading index="02" eyebrow="What I Offer" title="Services" watermark="OFFER" />
      <div className="services-list">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.1}>
            <div className="service-row">
              <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="service-row-title">
                {s.title}
                {s.isNew && <span className="new-badge"><span>New</span></span>}
              </h3>
              <p className="service-row-desc">{s.desc}</p>
              <span className="service-row-price">{s.price}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
