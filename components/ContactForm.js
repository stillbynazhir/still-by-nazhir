"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "Wedding", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send.");
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <FadeIn>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 48, color: "#fff", marginBottom: 16 }}>✦</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Message received.</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#555" }}>I&apos;ll be in touch within a few hours.</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={0.15}>
      <form onSubmit={handleSubmit}>
        <div className="contact-grid">
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
            <input required placeholder="Your name" value={formData.name} onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
            <input required type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 32, gridColumn: "1 / -1" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Shoot Type</label>
            <select value={formData.type} onChange={(e) => setFormData((f) => ({ ...f, type: e.target.value }))}>
              <option>Wedding</option>
              <option>Headshots</option>
              <option>Portrait</option>
              <option>Photoshoot</option>
              <option>Event</option>
              <option>Other</option>
            </select>
          </div>
          <div style={{ marginBottom: 48, gridColumn: "1 / -1" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#333", letterSpacing: "0.16em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
            <textarea required rows={4} placeholder="Tell me about your project, preferred dates, location..." value={formData.message} onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))} style={{ resize: "none" }} />
          </div>
        </div>
        {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#c0392b", marginBottom: 16 }}>{error}</p>}
        <button type="submit" className="submit-btn" disabled={sending}>
          {sending ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </FadeIn>
  );
}
