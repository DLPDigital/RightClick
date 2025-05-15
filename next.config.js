/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Ensure no trailing slash is added to URLs
  trailingSlash: false,
}

module.exports = nextConfig