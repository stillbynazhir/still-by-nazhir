import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import PortfolioTeaser from "@/components/PortfolioTeaser";
import Services from "@/components/Services";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PortfolioTeaser />
      <Services />
      <About />

      <section id="contact" className="section-pad" style={{ borderTop: "1px solid #111", position: "relative", overflow: "hidden" }}>
        <SectionHeading
          index="04"
          eyebrow="Get In Touch"
          title={<>Let&apos;s make<br /><em>something.</em></>}
          watermark="TALK"
        />
        <div style={{ maxWidth: 680 }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 48 }}>
              Based in Philadelphia, PA and available throughout the city and suburbs. Reach out below and I&apos;ll respond within a few hours.
            </p>
          </FadeIn>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
