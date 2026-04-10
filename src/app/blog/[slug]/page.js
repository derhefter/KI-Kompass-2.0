import { notFound } from 'next/navigation'
import { getPublishedPosts, getAllSlugs } from '../../../data/blog-posts'

export const revalidate = 1800

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      locale: 'de_DE',
      publishedTime: post.date,
    },
  }
}

async function fetchPost(slug) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
    const res = await fetch(`${base}/api/blog/post/${slug}`, { next: { revalidate: 1800 } })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.post
  } catch {
    return getPublishedPosts().find(p => p.slug === slug) || null
  }
}

async function fetchRelated(currentSlug, category) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
    const res = await fetch(`${base}/api/blog/posts`, { next: { revalidate: 1800 } })
    const data = await res.json()
    return (data.posts || [])
      .filter(p => p.slug !== currentSlug && p.category === category)
      .slice(0, 2)
  } catch {
    return getPublishedPosts().filter(p => p.slug !== currentSlug && p.category === category).slice(0, 2)
  }
}

const CATEGORY_BADGE = {
  'KI-Grundlagen':   'bg-primary-50 text-primary-600',
  'Förderung':       'bg-accent-50 text-accent-600',
  'Praxisbeispiele': 'bg-warm-50 text-warm-600',
  'Tools & Tipps':   'bg-green-50 text-green-600',
  'Rechtliches':     'bg-slate-100 text-slate-600',
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogArticle({ params }) {
  const post = await fetchPost(params.slug)
  if (!post) notFound()

  const related = await fetchRelated(params.slug, post.category)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
  const articleUrl = `${baseUrl}/blog/${post.slug}`

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 py-3">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <a href="/" className="hover:text-primary-500 transition-colors">Home</a>
            <span>›</span>
            <a href="/blog" className="hover:text-primary-500 transition-colors">Blog</a>
            <span>›</span>
            <span className="text-slate-700 truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_BADGE[post.category] || 'bg-slate-100 text-slate-600'}`}>
                {post.category}
              </span>
              <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
              <span className="text-xs text-slate-400">{post.readTime} Min. Lesezeit</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-700 leading-snug mb-4">
              {post.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed border-l-4 border-primary-200 pl-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
              <a href="/ueber-mich">
                <img src="/Steffen2025.jpg" alt="Steffen Hefter"
                  className="w-10 h-10 rounded-full object-cover object-top border border-slate-200 hover:opacity-80 transition-opacity" />
              </a>
              <div>
                <a href="/ueber-mich" className="text-sm font-semibold text-primary-700 hover:text-primary-500 transition-colors">{post.author || 'Steffen Hefter'}</a>
                <p className="text-xs text-slate-500">frimalo &ndash; KI-Beratung f&uuml;r KMU</p>
              </div>
              {/* Social Share */}
              <div className="ml-auto flex items-center gap-3">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-primary-500 transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-primary-500 transition-colors">
                  X/Twitter
                </a>
              </div>
            </div>
          </header>

          {/* Artikel-Inhalt */}
          <div
            className="prose prose-slate max-w-none prose-headings:text-primary-700 prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-primary-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA-Box */}
          <div className="mt-12 bg-primary-50 border border-primary-100 rounded-xl p-6">
            <h3 className="text-base font-bold text-primary-700 mb-2">Ihr n&auml;chster Schritt</h3>
            <p className="text-sm text-slate-600 mb-4">
              Pr&uuml;fen Sie in 5 Minuten kostenlos, wo KI in Ihrem Betrieb wirklich etwas bringt.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/assessment" className="btn-primary text-sm">
                Kostenlos starten
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/beratung" className="btn-secondary text-sm">
                30 Min. kostenlose Beratung
              </a>
            </div>
          </div>

          {/* Autor-Box */}
          <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6 flex gap-5">
            <a href="/ueber-mich" className="flex-shrink-0">
              <img src="/Steffen2025.jpg" alt="Steffen Hefter"
                className="w-16 h-16 rounded-xl object-cover object-top border border-slate-100 hover:opacity-80 transition-opacity" />
            </a>
            <div>
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">&Uuml;ber den Autor</p>
              <a href="/ueber-mich" className="text-sm font-bold text-primary-700 hover:text-primary-500 transition-colors mb-1 inline-block">Steffen Hefter</a>
              <p className="text-xs text-slate-600 leading-relaxed">
                KI-Berater bei frimalo, Halle (Saale). &Uuml;ber 20 Jahre Erfahrung in
                F&uuml;hrung, Digitalisierung und Change-Management. Hilft KMU, KI pragmatisch einzusetzen.
              </p>
              <a href="/ueber-mich" className="text-xs font-semibold text-primary-500 hover:underline mt-2 inline-block">Mehr erfahren →</a>
            </div>
          </div>

          {/* Verwandte Artikel */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-base font-bold text-primary-700 mb-5">Weitere Artikel</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {related.map(p => (
                  <a key={p.slug} href={`/blog/${p.slug}`}
                    className="block bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-primary-200 transition-colors">
                    <span className="text-xs text-slate-400 block mb-1">{formatDate(p.date)}</span>
                    <p className="text-sm font-semibold text-primary-700 leading-snug">{p.title}</p>
                  </a>
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="/blog" className="text-sm font-semibold text-primary-500 hover:text-primary-700 transition-colors">
                  Alle Artikel anzeigen →
                </a>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
