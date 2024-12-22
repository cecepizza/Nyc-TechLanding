import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: backendUrl + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
