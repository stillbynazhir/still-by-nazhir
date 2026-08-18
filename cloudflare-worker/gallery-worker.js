// gallery-worker.js
// Deployed as the "stillbynazhir-gallery" Worker, backed by the
// "stillbynazhir-gallery" R2 bucket. Lists photos and returns them as JSON
// for the site's /gallery page.
//
// Filenames must follow: <category>__<aspect>__<name>.<ext>
// e.g. landscape__landscape__kellysrun.jpg
//
// Collections are the one exception — they use a 4-segment key so each
// photo can belong to a named sub-gallery instead of a fixed category:
//   collections__{Collection Name}__{aspect}__{name}.<ext>
// e.g. collections__Flow and Form__portrait__01.jpg
// Any collection name works (not limited to "Volume N" or any pattern) —
// just avoid double underscores ("__") inside the name itself, since that's
// the field separator. These come back as
// { category: "collections", collection: "Flow and Form", aspect, src }.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }
    try {
      const listed = await env.GALLERY_BUCKET.list();
      const items = [];
      for (const obj of listed.objects) {
        const key = obj.key;
        if (!key.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
        const filename = key.split("/").pop();
        const parts = filename.split("__");
        if (parts.length < 2) continue;

        const prefix = parts[0].toLowerCase();
        // FIXED: "realestate" replaced with "weddings" to match the site's
        // current categories. "fitness" added for athletic/editorial work
        // (filenames use the short "fitness__" prefix, displayed as
        // "sports & fitness" to match the site copy).
        const validCategories = ["portraits", "weddings", "events", "fitness", "landscape", "collections"];
        const validAspects = ["portrait", "landscape", "square"];

        let category, aspect, collection = null;

        if (prefix === "collections") {
          if (parts.length < 4) continue;
          category = "collections";
          collection = parts[1].trim();
          aspect = parts[2].toLowerCase();
          if (!collection) continue;
        } else {
          category = prefix;
          aspect = (parts[1] || "").toLowerCase();
        }

        if (!validCategories.includes(category)) continue;
        if (!validAspects.includes(aspect)) continue;

        const categoryLabel = category === "fitness" ? "sports & fitness" : category;

        const item = {
          src: `${env.R2_PUBLIC_URL}/${key}`,
          category: categoryLabel,
          aspect
        };
        if (collection) item.collection = collection;
        items.push(item);
      }
      const order = ["collections", "portraits", "weddings", "events", "sports & fitness", "landscape"];
      items.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
      return new Response(JSON.stringify(items), {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    }
  }
};
