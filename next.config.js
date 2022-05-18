/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com'],
    imageSizes: [240, 360, 480],
  },
};

module.exports = nextConfig;
