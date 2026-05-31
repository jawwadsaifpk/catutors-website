import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/sitemap.xml",
          destination: "/api/sitemap-xml",
        },
      ],
    };
  },

  async redirects() {
    return [
      {
        source: "/other/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/other",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
