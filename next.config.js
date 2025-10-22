/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure content files under ./posts are included in serverless output
    outputFileTracingIncludes: {
      "/app/posts/[slug]/page": ["./posts/**/*"],
      "/app/ko/posts/[slug]/page": ["./posts/**/*"],
      "/app/posts/page": ["./posts/**/*"],
      "/app/ko/posts/page": ["./posts/**/*"],
      "/app/blog/[slug]/page": ["./posts/**/*"],
    },
  },
};

module.exports = nextConfig;
