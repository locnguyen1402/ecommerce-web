/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    /**
     * Reference: https://mantine.dev/styles/sass/#usage-with-nextjs
     */
    prependData: `@import "./_mantine.scss";`,
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "themesflat.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
