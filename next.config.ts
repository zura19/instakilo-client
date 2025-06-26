import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "media.licdn.com",
      "cdn.logojoy.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://instakilo-server.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
