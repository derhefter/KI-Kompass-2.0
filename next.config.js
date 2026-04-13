/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/toolbox', destination: '/#preise', permanent: true },
      { source: '/toolbox-zugang', destination: '/#preise', permanent: true },
      { source: '/kurs', destination: '/beratung', permanent: true },
      { source: '/kurs-zugang', destination: '/beratung', permanent: true },
      { source: '/monitoring', destination: '/beratung', permanent: true },
      { source: '/monitoring-zugang', destination: '/beratung', permanent: true },
      { source: '/benchmarking', destination: '/assessment', permanent: true },
      { source: '/benchmark-zugang', destination: '/assessment', permanent: true },
      { source: '/white-label', destination: '/', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;",
          },
        ],
      },
      {
        // CORS: API-Endpunkte nur von eigener Domain erreichbar
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://www.derhefter.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
