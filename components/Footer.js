export default function Footer() {
  return (
    <footer className="footer-wrap" style={{ borderTop: "1px solid #111" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "#949494", letterSpacing: "0.1em" }}>Still By Nazhir</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#949494", letterSpacing: "0.08em" }}>© {new Date().getFullYear()} · Philadelphia, PA</p>
      <a href="https://instagram.com/stillbynazhir" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#949494", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
        Instagram ↗
      </a>
    </footer>
  );
}
