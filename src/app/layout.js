import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Kostenloser KI-Readiness Check für KMU | In 5 Min wissen, wo Sie stehen | KI-Kompass',
  description: 'Prüfen Sie in 5 Minuten, wie bereit Ihr Unternehmen für Künstliche Intelligenz ist. Kostenloser KI-Readiness Check mit konkreten Handlungsempfehlungen, Quick-Wins und Fördermittel-Übersicht für den Mittelstand.',
  keywords: 'KI Readiness, KI für KMU, Künstliche Intelligenz Mittelstand, KI Check, KI Beratung, Digital Transformation, AI Readiness Assessment, Fördermittel KI',
  openGraph: {
    title: 'KI-Kompass | Wie bereit ist Ihr Unternehmen für KI?',
    description: 'Kostenloser KI-Readiness Check für den Mittelstand. In 5 Minuten wissen Sie, wo Sie stehen.',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function NavBar() {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-3">
            <img src="/frimalo logo.png" alt="frimalo" className="h-10 w-auto" />
            <span className="text-lg font-bold text-primary-700">KI-Kompass</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#so-funktionierts" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">So funktioniert&apos;s</a>
            <a href="/#preise" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">Preise</a>
            <a href="/ueber-mich" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">&Uuml;ber mich</a>
            <a href="/assessment" className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
              Jetzt starten
              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Mobile */}
          <a href="/assessment" className="md:hidden inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
            Jetzt starten
          </a>
        </div>
      </div>
    </nav>
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
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Weitere Angebote</h4>
            <p className="text-xs text-slate-500 mb-2 italic">Im Aufbau &ndash; bei Interesse gerne anfragen</p>
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-slate-500">Online-Kurs</span></li>
              <li><span className="text-slate-500">KI-Toolbox</span></li>
              <li><span className="text-slate-500">KI-Zertifikat</span></li>
              <li><span className="text-slate-500">Branchen-Benchmark</span></li>
              <li><span className="text-slate-500">KI-Monitoring</span></li>
            </ul>
            <a href="mailto:steffenhefter@googlemail.com?subject=Interesse%20an%20weiteren%20Angeboten" className="inline-block mt-2 text-xs text-primary-300 hover:text-white transition-colors underline">
              Individuelles Angebot anfragen
            </a>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Kontakt</h4>
            <ul className="space-y-1.5 text-xs">
              <li>frimalo &ndash; Steffen Hefter</li>
              <li>06120 Halle (Saale)</li>
              <li>steffenhefter@googlemail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} frimalo &ndash; KI-Kompass</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
