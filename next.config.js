/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
    imageSizes: [240, 360, 480],
  },
};

module.exports = nextConfig;
