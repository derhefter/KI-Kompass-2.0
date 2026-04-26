import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import ConsentBanner from '../components/ConsentBanner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: 'KI-Kompass | Spart KI Ihrem Betrieb Zeit und Geld – oder nicht?',
    template: '%s | KI-Kompass',
  },
  description: 'In 5 Minuten wissen, wo KI in Ihrem Unternehmen wirklich etwas bringt – und wo nicht. Kostenloser Check für KMU, mit konkreten Handlungsempfehlungen und Fördermittel-Überblick.',
  keywords: 'KI für KMU, KI Check, KI Beratung Mittelstand, Künstliche Intelligenz Handwerk, Fördermittel KI Digitalisierung, go-digital, Digital Jetzt, KI Halle Sachsen-Anhalt',
  metadataBase: new URL('https://www.derhefter.com'),
  openGraph: {
    title: 'KI-Kompass | Spart KI Ihrem Betrieb Zeit und Geld?',
    description: 'In 5 Minuten wissen, wo KI in Ihrem Unternehmen wirklich etwas bringt – und wo nicht.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.derhefter.com',
    siteName: 'KI-Kompass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KI-Kompass | Kostenloser KI-Check für KMU',
    description: '5 Minuten. Sofortergebnis. Kein Fachwissen nötig.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Lädt GA erst nach explizitem Opt-In (DSGVO). */}
        <ConsentBanner />
      </body>
    </html>
  )
}


function Footer() {
  return (
    <footer className="bg-primary-700 text-slate-400 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <img src="/frimalo logo.png" alt="frimalo" className="h-7 w-auto brightness-0 invert" />
              <span className="text-base font-bold text-white">KI-Kompass</span>
            </div>
            <p className="text-xs leading-relaxed">Der KI-Readiness Check f&uuml;r den deutschen Mittelstand. Ein Angebot der frimalo.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Assessment</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/assessment" className="hover:text-white transition-colors">Kostenloser Check</a></li>
              <li><a href="/#preise" className="hover:text-white transition-colors">Premium Report</a></li>
              <li><a href="/beratung" className="hover:text-white transition-colors">Erstberatung buchen</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Rechtliches</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/impressum" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="/datenschutz" className="hover:text-white transition-colors">Datenschutzerkl&auml;rung</a></li>
              <li><a href="/ueber-mich" className="hover:text-white transition-colors">&Uuml;ber mich</a></li>
              <li><a href="mailto:ki-kompass@derhefter.com" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Kontakt</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/ueber-mich" className="hover:text-white transition-colors">frimalo &ndash; Steffen Hefter</a></li>
              <li>Halle (Saale)</li>
              <li><a href="mailto:ki-kompass@derhefter.com" className="hover:text-white transition-colors">ki-kompass@derhefter.com</a></li>
            </ul>
            <a href="/beratung" className="inline-block mt-4 text-xs text-primary-300 hover:text-white transition-colors underline">
              Kostenlose Erstberatung buchen &rarr;
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} frimalo &ndash; KI-Kompass &middot; Halle (Saale)</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
