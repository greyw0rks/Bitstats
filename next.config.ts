import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root. Without this, Turbopack walks up and selects
    // /home/greyw0rks/package-lock.json, pulling an unrelated dependency tree
    // into the module graph.
    root: __dirname,
  },
};

export default nextConfig;
