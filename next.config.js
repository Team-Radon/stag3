/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'arweave.net',
      'res.cloudinary.com',
      'turquoise-changing-crane-15.mypinata.cloud',
      'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  env: {
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    PINATA_GATEWAY: process.env.PINATA_GATEWAY,
    PROJECT_CONTEXT: process.env.PROJECT_CONTEXT,
    DISCUSSION_CONTEXT: process.env.DISCUSSION_CONTEXT,
    STAGE_GROUP: process.env.STAGE_GROUP
  },
};

module.exports = nextConfig;
