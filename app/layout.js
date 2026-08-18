import { Cormorant_Garamond, Outfit, Anton } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://stillbynazhir.com"),
  title: "SBN",
  description:
    "Philadelphia photographer — weddings, portraits, events, and landscapes. Photographs that remain.",
  openGraph: {
    title: "SBN",
    description:
      "Philadelphia photographer — weddings, portraits, events, and landscapes.",
    url: "https://stillbynazhir.com",
    siteName: "SBN",
    images: ["/og-image.webp"],
    type: "website",
  },
  icons: {
    icon: "/sbn-favicon.svg",
    apple: "/sbn-logo.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${anton.variable}`}>
      <body>
        <div className="grain" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
