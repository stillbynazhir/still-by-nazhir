import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_5o74hlo";
const EMAILJS_TEMPLATE_ID = "template_1coidbf";
const EMAILJS_PUBLIC_KEY = "gjAXzU_3ifSXKYl_p";
const NAV_LINKS = ["Portfolio", "Services", "About", "Contact"];

const SERVICES = [
  {
    title: "Real Estate",
    price: "From $150",
    desc: "Professional listing photography that sells. Delivered within 24 hours, MLS ready.",
    
  },
  {
    title: "Portraits",
    price: "From $100",
    desc: "Headshots, photoshoots and personal branding portraits that are true to you. No filters, no pretense.",
    
  },
  {
    title: "Events",
    price: "From $200",
    desc: "Birthdays, gatherings, corporate events. Every moment captured with intention.",
  
  },
];

const STATS = [
  { value: "PA", label: "Philadelphia" },
  { value: "24h", label: "Turnaround" },
  { value: "3+", label: "Specialties" },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function StillByNazhir() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", type: "Real Estate", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const navOpaque = scrollY > 60;

const [sending, setSending] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = (e) => {
  e.preventDefault();
  setSending(true);
  setError(null);

  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: formData.name,
      reply_to: formData.email,
      shoot_type: formData.type,
      message: formData.message,
    },
    EMAILJS_PUBLIC_KEY
  )
  .then(() => setSubmitted(true))
  .catch(() => setError("Something went wrong. Please email me directly."))
  .finally(() => setSending(false));
};

  return (
    <div style={{ background: "#080808", color: "#fff", fontFamily: "'Georgia', serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #333; }
        .nav-link {
          color: #888; font-size: 12px; font-family: 'Outfit', sans-serif;
          font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; transition: color 0.3s; cursor: pointer;
        }
        .nav-link:hover { color: #fff; }
        .service-card {
          border: 1px solid #161616; border-radius: 2px;
          padding: 36px 30px; transition: border-color 0.3s, background 0.3s;
          background: #0c0c0c;
        }
        .service-card:hover { border-color: #333; background: #111; }
        .grain {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 999; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        input, select, textarea {
          background: transparent; border: none; border-bottom: 1px solid #222;
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 14px;
          padding: 12px 0; width: 100%; outline: none; transition: border-color 0.3s;
        }
        input:focus, select:focus, textarea:focus { border-bottom-color: #fff; }
        input::placeholder, textarea::placeholder { color: #333; }
        select option { background: #111; }
        .submit-btn {
          background: #fff; color: #080808; border: none;
          padding: 14px 48px; font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase; cursor: pointer; transition: opacity 0.2s;
        }
        .submit-btn:hover { opacity: 0.85; }
        .divider { width: 1px; height: 60px; background: #1a1a1a; }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Grain overlay */}
      <div className="grain" />

      {/* Navigation */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px",
        background: navOpaque ? "rgba(8,8,8,0.95)" : "transparent",
        backdropFilter: navOpaque ? "blur(12px)" : "none",
        borderBottom: navOpaque ? "1px solid #111" : "none",
        transition: "all 0.4s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {/* Logo */}
          <div>
            <img src={process.env.PUBLIC_URL + "/sbn-logo.svg"} style={{ height: 44 }} alt="Still By Nazhir" />
          </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase", color: "#080808",
          background: "#fff", padding: "9px 22px", textDecoration: "none",
          transition: "opacity 0.2s",
        }}>Book a Shoot</a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", paddingTop: 50, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>

        {/* Hero image placeholder */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Placeholder — replace with your <img> tag */}
          <div style={{
            border: "1px dashed #1e1e1e", borderRadius: 2,
            padding: "24px 40px", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.2 }}>📷</div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <img src={process.env.PUBLIC_URL + "/hero.jpg"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} alt="Hero Photograph" />
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#222", marginTop: 4 }}>
              Replace this div with an img tag — src your-photo.jpg, style: position absolute, inset 0, width 100%, height 100%, objectFit cover
            </p>
          </div>
          {/* Dark overlay for when image is added */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.1) 100%)" }} />
        </div>

        {/* Hero text */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 72px", width: "100%" }}>
          <div style={{
            opacity: 1,
            animation: "fadeDown 1.2s ease forwards",
          }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: 20,
            }}>
               Philadelphia, PA
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: "-0.01em", color: "#fff",
              marginBottom: 28,
            }}>
              Photographs<br />
              <em style={{ fontStyle: "italic", color: "#888" }}>that remain.</em>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <a href="#contact" style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#fff", textDecoration: "none",
                borderBottom: "1px solid #444", paddingBottom: 2,
                transition: "border-color 0.3s",
              }}>Inquire Now</a>
              <a href="#portfolio" style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 11,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#444", textDecoration: "none",
                transition: "color 0.3s",
              }}>View Work ↓</a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", right: 48, bottom: 72,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #333)" }} />
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</p>
        </div>
      </section>

      {/* STATS BAR */}
      <FadeIn>
        <div style={{
          borderTop: "1px solid #111", borderBottom: "1px solid #111",
          display: "flex", justifyContent: "center", alignItems: "center",
          gap: 64, padding: "36px 48px",
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 64 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#fff", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* PORTFOLIO TEASER */}
      <section id="portfolio" style={{ padding: "100px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Selected Work</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#fff", lineHeight: 1.1 }}>
                The Portfolio
              </h2>
            </div>
            <a href="#contact" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#555",
              letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none",
              borderBottom: "1px solid #222", paddingBottom: 2,
            }}>Full Gallery Coming Soon →</a>
          </div>
        </FadeIn>

        {/* Portfolio grid */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
  {[
    { size: "span 2", height: 480, src: "portfolio-1.jpg", label: "Events", pos: "top" },
    { size: "span 1", height: 480, src: "portfolio-2.jpg", label: "Portraits", pos: "top" },
    { size: "span 1", height: 320, src: "portfolio-3.jpg", label: "Moments", pos: "center" },
    { size: "span 2", height: 320, src: "portfolio-4.jpg", label: "Interiors", pos: "center" },,
  ].map((item, i) => (
    <FadeIn key={i} delay={i * 0.1} style={{ gridColumn: item.size }}>
      <div
        style={{ height: item.height, background: "#0d0d0d", position: "relative", overflow: "hidden" }}
        onMouseEnter={e => e.currentTarget.querySelector(".label").style.opacity = 1}
        onMouseLeave={e => e.currentTarget.querySelector(".label").style.opacity = 0}
      >
        <img
          src={process.env.PUBLIC_URL + "/" + item.src}
          alt={item.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos, display: "block" }}
        />
        <div className="label" style={{
          position: "absolute", inset: 0,
          background: "rgba(8,8,8,0.55)",
          display: "flex", alignItems: "flex-end",
          padding: "20px 24px", opacity: 0,
          transition: "opacity 0.3s ease",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 300,
            color: "#fff", letterSpacing: "0.08em",
          }}>{item.label}</span>
        </div>
      </div>
    </FadeIn>
  ))}
</div>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#333", textAlign: "center", marginTop: 24, letterSpacing: "0.08em" }}>
          </p>
        </FadeIn>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 48px", borderTop: "1px solid #111" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>What I Offer</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 56 }}>
            Services
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, alignItems: "stretch"}}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.12}>
              <div className="service-card" style={{height: "100%"}}>
                <div style={{ fontSize: 20, marginBottom: 24, opacity: 0.6 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#555", fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em" }}>{s.price}</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#444", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 32, width: 24, height: 1, background: "#222" }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 48px", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <FadeIn>
            {/* About image placeholder */}
            <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#0d0d0d" }}>
            <img src={process.env.PUBLIC_URL + "/portrait-1.jpg"}
            alt="Nazhir Jackson"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}/>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>Behind the Lens</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 28 }}>
              Nazhir Jackson
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.9, marginBottom: 20 }}>
              Based in  Philadelphia, PA. I photograph real estate, portraits, and the moments in between — with an eye for what's true, not just what's pretty.
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.9 }}>
              Every shoot is approached with intention. Whether it's a listing that needs to sell or a portrait that needs to last, Still By Nazhir delivers images that hold up.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 24 }}>
              <a href="#contact" style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#fff", textDecoration: "none",
                borderBottom: "1px solid #444", paddingBottom: 2,
              }}>Work With Me</a>
              <a href="https://instagram.com/stillbynazhir" target="_blank" rel="noreferrer" style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 11,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#444", textDecoration: "none",
              }}>@stillbynazhir ↗</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 48px", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#fff", lineHeight: 1.0, marginBottom: 16 }}>
              Let's make<br /><em style={{ fontStyle: "italic", color: "#888" }}>something.</em>
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 56 }}>
              Based in  Philadelphia, PA and available throughout the city and suburbs. Reach out below and I'll respond within a few hours.
            </p>
          </FadeIn>

          {submitted ? (
            <FadeIn>
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: "#fff", marginBottom: 16 }}>✦</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Message received.</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#555" }}>I'll be in touch within a few hours.</p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.15}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                  <div style={{ marginBottom: 32 }}>
                    <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                    <input required placeholder="Your name" value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div style={{ marginBottom: 32 }}>
                    <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                    <input required type="email" placeholder="your@email.com" value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div style={{ marginBottom: 32, gridColumn: "1 / -1" }}>
                    <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Shoot Type</label>
                    <select value={formData.type} onChange={e => setFormData(f => ({ ...f, type: e.target.value }))}>
                      <option>Real Estate</option>
                      <option>Headshots</option>
                      <option>Portrait</option>
                      <option>Photoshoot</option>
                      <option>Event</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 48, gridColumn: "1 / -1" }}>
                    <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                    <textarea required rows={4} placeholder="Tell me about your project, preferred dates, location..."
                      value={formData.message}
                      onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: "none" }} />
                  </div>
                </div>
                {error && (
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#c0392b", marginBottom: 16 }}>
                {error}
                </p>
                )}
              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? "Sending..." : "Send Inquiry"}
              </button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #111", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#949494", letterSpacing: "0.1em" }}>Still By Nazhir</p>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#949494", letterSpacing: "0.08em" }}>© 2025 · Philadelphia, PA</p>
        <a href="https://instagram.com/stillbynazhir" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#949494", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
          Instagram ↗
        </a>
      </footer>
    </div>
  );
}