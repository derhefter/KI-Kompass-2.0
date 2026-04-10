import { getPublishedPosts as getStaticPosts } from '../../data/blog-posts'

export const revalidate = 1800 // 30 Min. Cache

export const metadata = {
  title: 'Blog | KI-Kompass – Praxiswissen für den Mittelstand',
  description: 'Praxisnahes Wissen zu KI, Fördermitteln und Digitalisierung für kleine und mittlere Unternehmen. Kein Beratersprech – nur was wirklich hilft.',
  openGraph: {
    title: 'KI-Kompass Blog | Praxiswissen für KMU',
    description: 'Konkrete Tipps zu KI, Förderung und Digitalisierung für den Mittelstand.',
    type: 'website',
    locale: 'de_DE',
  },
}

async function getPosts() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
    const res = await fetch(`${base}/api/blog/posts`, {
      next: { revalidate: 1800 },
    })
    if (!res.ok) throw new Error('API nicht erreichbar')
    const data = await res.json()
    return data.posts || []
  } catch {
    return getStaticPosts()
  }
}

const CATEGORY_COLORS = {
  'KI-Grundlagen':   'bg-primary-50 text-primary-600',
  'Förderung':       'bg-accent-50 text-accent-600',
  'Praxisbeispiele': 'bg-warm-50 text-warm-600',
  'Tools & Tipps':   'bg-green-50 text-green-600',
  'Rechtliches':     'bg-slate-100 text-slate-600',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold mb-4">
            Praxiswissen für den Mittelstand
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            KI-Kompass Blog
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Keine Buzzwords, kein Beratersprech &ndash; nur was KMU wirklich weiterhilft.
            Von Fördertipps bis zum ersten ChatGPT-Prompt.
          </p>
        </div>
      </section>

      {/* Artikel */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500 py-20">Noch keine Artikel veröffentlicht.</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id || post.slug} className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-primary-200 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-slate-100 text-slate-600'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
                    <span className="text-xs text-slate-400">{post.readTime} Min. Lesezeit</span>
                    {post.source === 'ai' && (
                      <span className="text-xs text-slate-300">KI-generiert</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-primary-700 mb-2 leading-snug">
                    <a href={`/blog/${post.slug}`} className="hover:text-primary-500 transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <a href="/ueber-mich" className="text-xs text-slate-400 hover:text-primary-500 transition-colors">von {post.author || 'Steffen Hefter'}</a>
                    <a href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-primary-500 hover:text-primary-700 transition-colors">
                      Weiterlesen
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 bg-primary-700 rounded-xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">Wissen in die Praxis bringen?</h3>
            <p className="text-slate-300 text-sm mb-6">
              Starten Sie mit dem kostenlosen KI-Check &ndash; 5 Minuten, sofortiges Ergebnis.
            </p>
            <a href="/assessment" className="inline-flex items-center px-6 py-3 text-sm font-semibold text-primary-700 bg-white rounded-lg hover:bg-slate-50 transition-colors">
              Kostenlos starten
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
