export const NAV_LINKS = [
  { label: "Portfolio", href: "/gallery" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    title: "Weddings",
    price: "From $1,500",
    desc: "Full-day wedding coverage that captures every unscripted moment. Sneak peeks within 48 hours, full gallery in 3 weeks.",
  },
  {
    title: "Portraits",
    price: "From $200",
    desc: "Headshots, photoshoots and personal branding portraits that are true to you. No filters, no pretense.",
  },
  {
    title: "Events",
    price: "From $300",
    desc: "Birthdays, gatherings, corporate events. Every moment captured with intention.",
  },
  {
    title: "Sports & Fitness",
    price: "By Inquiry",
    desc: "Athletic portraits and movement-driven work — strength, discipline, and the body in motion.",
  },
];

export const STATS = [
  { value: "PA", label: "Philadelphia" },
  { value: "24h", label: "Turnaround" },
  { value: "3+", label: "Specialties" },
];

// Preferred display order for known categories. Any category not listed here
// still shows up automatically, appended after the known ones — and any
// category with zero photos stays hidden.
export const GALLERY_FILTER_ORDER = ["portraits", "weddings", "events", "sports & fitness", "landscape"];

export const GALLERY_WORKER_URL = process.env.NEXT_PUBLIC_GALLERY_WORKER_URL || "";
