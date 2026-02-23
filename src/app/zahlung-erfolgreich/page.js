'use client'

export default function ZahlungErfolgreich() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-lg mx-auto px-4">
        <div className="card text-center">
          {/* Success Animation */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Zahlung erfolgreich!</h1>
          <p className="text-gray-600 mb-8">
            Vielen Dank f&uuml;r Ihre Bestellung. Ihre Zahlung wurde erfolgreich verarbeitet.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <svg className="w-8 h-8 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold text-green-800 mb-1">Zugangscode per E-Mail gesendet</p>
            <p className="text-green-700 text-sm">
              Ihr pers&ouml;nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.
              Bitte pr&uuml;fen Sie auch Ihren Spam-Ordner.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">So geht es weiter:</h3>
            <ol className="text-left text-blue-800 text-sm space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>&Ouml;ffnen Sie die E-Mail mit Ihrem Zugangscode</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Klicken Sie auf den Link zum Premium Assessment</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Beantworten Sie die 30+ Detailfragen</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Erhalten Sie Ihren individuellen KI-Readiness Report</span>
              </li>
            </ol>
          </div>

          <a href="/" className="btn-primary">
            Zur&uuml;ck zur Startseite
          </a>
        </div>
      </div>
    </div>
  )
}
