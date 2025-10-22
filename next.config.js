/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure content files under ./posts are included in the serverless output for any route that might read them
    outputFileTracingIncludes: {
      "/app/**": ["./posts/**/*"],
      "/pages/**": ["./posts/**/*"],
    },
  },
};

module.exports = nextConfig;
