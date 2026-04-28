// Erzeugt das Whitepaper als HTML + rendert via headless Chrome zu PDF.
// Output: public/Pragmatische_KI_im_Mittelstand.pdf  (überschreibt das alte
// NotebookLM-PDF mit dem brand-konformen Re-Build)
//
// Aufruf:  node generate-whitepaper.mjs

import { generateWhitepaperHTML } from './src/lib/whitepaper-pdf.js'
import { writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { resolve } from 'path'

const html = generateWhitepaperHTML()

// 1) HTML in Temp-Pfad ohne Spaces (Chrome-Workaround für Windows-Pfade)
const tmpDir = `${process.env.LOCALAPPDATA}\\Temp\\kk_wp_render`
execSync(`cmd /c mkdir "${tmpDir}" 2>nul || rem`)
const tmpHtml = `${tmpDir}\\whitepaper.html`
const tmpPdf = `${tmpDir}\\whitepaper.pdf`
writeFileSync(tmpHtml, html, 'utf8')
console.log(`HTML: ${tmpHtml} (${html.length} chars)`)

// 2) Chrome / Edge headless rendern
const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const browser = candidates.find((p) => existsSync(p))
if (!browser) {
  console.error('Kein Chrome/Edge gefunden')
  process.exit(1)
}
console.log(`Browser: ${browser}`)

const fileUrl = `file:///${tmpHtml.replace(/\\/g, '/')}`
const cmd = `"${browser}" --headless=new --disable-gpu --no-sandbox --virtual-time-budget=15000 --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${tmpPdf}" "${fileUrl}"`
execSync(cmd, { stdio: 'inherit' })

// 3) Nach public/ kopieren (überschreibt NotebookLM-PDF)
const target = resolve('./public/Pragmatische_KI_im_Mittelstand.pdf')
execSync(`cmd /c copy /Y "${tmpPdf}" "${target}"`, { stdio: 'inherit' })
console.log(`✓ Geschrieben: ${target}`)
