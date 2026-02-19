import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Reborn",
  transpilePackages: ["three"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
