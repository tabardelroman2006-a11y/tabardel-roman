import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i1-c.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: '*.pinimg.com',
      },
    ],
  },
};

export default nextConfig;
