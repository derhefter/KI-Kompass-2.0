import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'KI-Kompass | KI-Readiness Check für KMU',
  description: 'Prüfen Sie in wenigen Minuten, wie bereit Ihr Unternehmen für Künstliche Intelligenz ist. Kostenloser KI-Readiness Check mit konkreten Handlungsempfehlungen für den Mittelstand.',
  keywords: 'KI Readiness, KI für KMU, Künstliche Intelligenz Mittelstand, KI Check, KI Beratung, Digital Transformation, AI Readiness Assessment',
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
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/frimalo logo.png" alt="frimalo" className="h-8 w-auto brightness-0 invert" />
                  <span className="text-lg font-bold text-white">KI-Kompass</span>
                </div>
                <p className="text-sm">Der KI-Readiness Check f&uuml;r den deutschen Mittelstand. Ein Angebot der frimalo &ndash; Steffen Hefter, KI-Berater f&uuml;r KMU in Mitteldeutschland.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Assessment</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/assessment" className="hover:text-white transition-colors">Kostenloser Check</a></li>
                  <li><a href="/#preise" className="hover:text-white transition-colors">Premium Report</a></li>
                  <li><a href="/zertifikat" className="hover:text-white transition-colors">KI-Zertifikat</a></li>
                  <li><a href="/benchmarking" className="hover:text-white transition-colors">Branchen-Benchmark</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Produkte &amp; Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/foerder-kompass" className="hover:text-white transition-colors">F&ouml;rder-Kompass</a></li>
                  <li><a href="/kurs" className="hover:text-white transition-colors">Online-Kurs</a></li>
                  <li><a href="/toolbox" className="hover:text-white transition-colors">KI-Toolbox</a></li>
                  <li><a href="/monitoring" className="hover:text-white transition-colors">KI-Monitoring</a></li>
                  <li><a href="/white-label" className="hover:text-white transition-colors">F&uuml;r Berater (White-Label)</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Kontakt</h4>
                <ul className="space-y-2 text-sm">
                  <li>frimalo &ndash; Steffen Hefter</li>
                  <li>Wilhelm-Schrader-Str. 27a</li>
                  <li>06120 Halle (Saale)</li>
                  <li>E-Mail: steffenhefter@googlemail.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
              <p>&copy; {new Date().getFullYear()} frimalo &ndash; KI-Kompass. Alle Rechte vorbehalten.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
