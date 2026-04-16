export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/zahlung-erfolgreich', '/benchmark-zugang', '/kurs-zugang', '/monitoring-zugang', '/toolbox-zugang'],
      },
    ],
    sitemap: 'https://www.derhefter.com/sitemap.xml',
    host: 'https://www.derhefter.com',
  }
}
