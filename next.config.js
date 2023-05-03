/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'bootcamp-singh.fra1.digitaloceanspaces.com'],
  }
}

module.exports = nextConfig
