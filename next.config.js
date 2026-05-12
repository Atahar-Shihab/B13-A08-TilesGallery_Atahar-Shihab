/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },
  allowedDevOrigins: ['192.168.0.101', '192.168.1.*', '10.0.0.*', '172.16.*.*'],
}

module.exports = nextConfig
