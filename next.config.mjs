/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/servicios/bautizos',
        destination: '/servicios/infantiles',
        permanent: true,
      },
      {
        source: '/servicios/primeras-comuniones',
        destination: '/servicios/fiestas',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
