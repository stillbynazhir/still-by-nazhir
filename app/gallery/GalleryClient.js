"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Lightbox from "@/components/Lightbox";
import { GALLERY_WORKER_URL, GALLERY_FILTER_ORDER } from "@/lib/constants";

const ASPECT_MAP = { portrait: "3 / 4", landscape: "4 / 3", square: "1 / 1" };

function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export default function GalleryClient() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(!!GALLERY_WORKER_URL);
  const [fetchError, setFetchError] = useState(
    GALLERY_WORKER_URL ? null : "Gallery worker URL not configured."
  );
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    if (!GALLERY_WORKER_URL) return;
    fetch(GALLERY_WORKER_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`Worker returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setGalleryItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setFetchError("Couldn't load gallery. Try again shortly.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const presentCategories = Array.from(new Set(galleryItems.map((g) => g.category)));
  const knownPresent = GALLERY_FILTER_ORDER.filter((f) => presentCategories.includes(f));
  const extraPresent = presentCategories.filter((c) => !GALLERY_FILTER_ORDER.includes(c));
  const visibleFilters = galleryItems.length > 0 ? ["all", ...knownPresent, ...extraPresent] : [];

  // Derived rather than synced via effect: if the stored filter no longer
  // exists (e.g. gallery just loaded), fall back to "all" for this render.
  const effectiveFilter =
    visibleFilters.length > 0 && !visibleFilters.includes(activeFilter) ? "all" : activeFilter;

  // "Collections" is a category like any other (driven entirely by the
  // worker — a photo with key "collections__{Name}__{aspect}__{file}.jpg"
  // comes back as { category: "collections", collection: "{Name}", ... }).
  // What's special is only how it's *displayed*: instead of one flat grid,
  // photos are grouped into named sections using each item's `collection`
  // field as the header — so a name like "Flow and Form" becomes the title
  // for every photo tagged with that collection, automatically.
  const isCollectionsView = effectiveFilter === "collections";

  const filteredGallery = effectiveFilter === "all"
    ? galleryItems
    : galleryItems.filter((g) => g.category === effectiveFilter);

  const collectionSections = isCollectionsView
    ? Object.entries(
        filteredGallery.reduce((acc, item) => {
          const name = (item.collection || "").trim() || "Collection";
          (acc[name] = acc[name] || []).push(item);
          return acc;
        }, {})
      ).sort((a, b) => naturalCompare(a[0], b[0]))
    : null;

  // Flattened, section-ordered view used for both rendering and the
  // lightbox's prev/next indices, so they always stay in sync with what's
  // actually on screen.
  const displayGallery = isCollectionsView
    ? collectionSections.flatMap(([, items]) => items)
    : filteredGallery;

  return (
    <div style={{ minHeight: "100vh" }} className="gallery-page">
      {lightboxIdx !== null && (
        <Lightbox
          src={displayGallery[lightboxIdx].src}
          alt={displayGallery[lightboxIdx].collection || displayGallery[lightboxIdx].category}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + displayGallery.length) % displayGallery.length)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % displayGallery.length)}
        />
      )}

      <div className="section-pad" style={{ paddingTop: 32, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        <Link href="/" className="text-link" style={{ marginBottom: 40, display: "inline-flex", alignItems: "center", gap: 8 }}>
          ← Back
        </Link>

        <SectionHeading index="—" eyebrow="Browse" title="Gallery" watermark="GALLERY" />
        <FadeIn>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#333", lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
            A selection of recent work across portraits, weddings, events, landscapes, and curated collections.
          </p>
        </FadeIn>

        {visibleFilters.length > 0 && (
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid #161616", marginBottom: 32 }}>
              {visibleFilters.map((f) => (
                <button
                  key={f}
                  className={`gallery-tab${effectiveFilter === f ? " active" : ""}`}
                  onClick={() => { setActiveFilter(f); setLightboxIdx(null); }}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#333", letterSpacing: "0.1em" }}>Loading...</p>
          </div>
        )}

        {fetchError && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#555" }}>{fetchError}</p>
          </div>
        )}

        {!loading && !fetchError && displayGallery.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#333" }}>No photos in this category yet.</p>
          </div>
        )}

        {!loading && !fetchError && displayGallery.length > 0 && (
          isCollectionsView ? (
            (() => {
              let runningIndex = 0;
              return collectionSections.map(([name, items]) => {
                const startIdx = runningIndex;
                runningIndex += items.length;
                return (
                  <div key={name} style={{ marginBottom: 56 }}>
                    <FadeIn>
                      <h3 className="collection-heading">{name}</h3>
                    </FadeIn>
                    <div className="gallery-grid">
                      {items.map((item, i) => (
                        <FadeIn key={item.src} delay={Math.min(i * 0.06, 0.4)} className="gallery-cell">
                          <div
                            className="gallery-img-wrap"
                            style={{ aspectRatio: ASPECT_MAP[item.aspect] || "3 / 4" }}
                            onClick={() => setLightboxIdx(startIdx + i)}
                          >
                            <Image
                              src={item.src}
                              alt={name}
                              fill
                              sizes="(max-width: 768px) 50vw, 33vw"
                              style={{ objectFit: "cover" }}
                            />
                            <div className="gallery-overlay" />
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                );
              });
            })()
          ) : (
            <div className="gallery-grid">
              {displayGallery.map((item, i) => (
                <FadeIn key={item.src} delay={Math.min(i * 0.06, 0.4)} className="gallery-cell">
                  <div
                    className="gallery-img-wrap"
                    style={{ aspectRatio: ASPECT_MAP[item.aspect] || "3 / 4" }}
                    onClick={() => setLightboxIdx(i)}
                  >
                    <Image
                      src={item.src}
                      alt={item.category}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="gallery-overlay" />
                  </div>
                </FadeIn>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
