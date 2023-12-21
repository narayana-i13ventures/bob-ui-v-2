/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Dashboard',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
