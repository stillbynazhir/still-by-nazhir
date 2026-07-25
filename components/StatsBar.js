import FadeIn from "./FadeIn";
import { STATS } from "@/lib/constants";

export default function StatsBar() {
  return (
    <FadeIn>
      <div style={{ borderTop: "1px solid #111", borderBottom: "1px solid #111", display: "flex", justifyContent: "center", alignItems: "center", gap: 32, padding: "28px 24px", flexWrap: "wrap" }}
        className="stats-bar">
        {STATS.map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 300, color: "#fff", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#444", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
            </div>
            {i < STATS.length - 1 && <div className="divider" />}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
