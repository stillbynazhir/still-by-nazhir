/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Gallery photos are served from the Cloudflare R2 public bucket/worker.
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
    ],
  },
};

export default nextConfig;
