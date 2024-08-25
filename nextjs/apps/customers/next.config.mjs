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
};

export default nextConfig;
