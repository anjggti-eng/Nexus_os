/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["localhost", "nexus.orbitan.com.br"],
  },
};

module.exports = nextConfig;
