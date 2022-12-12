/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'arweave.net',
      'res.cloudinary.com',
      'turquoise-changing-crane-15.mypinata.cloud',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.**.link',
      },
    ],
  },
  env: {
    IFRAMELY_API_KEY: process.env.IFRAMELY_API_KEY,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    PINATA_GATEWAY: process.env.PINATA_GATEWAY,
    PROJECT_CONTEXT: process.env.PROJECT_CONTEXT,
  },
};

module.exports = nextConfig;
