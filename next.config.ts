import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All current images are local files in /public. No remote hosts are needed.
    // If remote images are added, list each approved hostname here explicitly.
    remotePatterns: [],
  },
};

export default nextConfig;
