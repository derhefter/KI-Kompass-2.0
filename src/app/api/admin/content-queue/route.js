// ============================================================
// ADMIN: Content Queue – Freigabe-Workflow
// ============================================================
// GET  ?type=report|assessment|certificate|invoice  → Pending Items
// POST { rowIndex, personalNote?, invoiceEdits? }   → Freigeben & senden
// DELETE { rowIndex, reason? }                      → Ablehnen
// ============================================================
import { NextResponse } from 'next/server'
import { getPendingItems, approveItem, rejectItem, getItemByRow } from '../../../../lib/content-queue'
import { sendConfirmationToCustomer } from '../../../../lib/mail'

function checkAuth(request) {
  const token = request.headers.get('x-admin-token')
  return token === process.env.ADMIN_PASSWORD
}

// ── GET: Alle pendenden Items ODER Einzelitem für Vorschau ──
// ?type=report|assessment|certificate|invoice  → Listenansicht (ohne HTML-Inhalte)
// ?row=5                                       → Einzelansicht mit vollständigem htmlContent + attachmentHtml
export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const rowParam = searchParams.get('row')

  // Einzelitem für Vorschau
  if (rowParam) {
    try {
      const item = await getItemByRow(parseInt(rowParam))
      if (!item) return NextResponse.json({ error: 'Item nicht gefunden' }, { status: 404 })
      return NextResponse.json({ item })
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  // Liste
  const type = searchParams.get('type') || null
  try {
    const items = await getPendingItems(type)
    // attachmentHtml + htmlContent nicht ins Listing (zu groß)
    const summary = items.map(({ attachmentHtml: _att, htmlContent: _html, ...rest }) => rest)
    return NextResponse.json({ items: summary, total: summary.length })
  } catch (err) {
    console.error('content-queue GET Fehler:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ── POST: Item freigeben & E-Mail senden ──
export async function POST(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })

  try {
    const { rowIndex, personalNote = '', invoiceEdits = null } = await request.json()
    if (!rowIndex) return NextResponse.json({ error: 'rowIndex fehlt' }, { status: 400 })

    // Vollständiges Item laden (inkl. htmlContent + attachmentHtml)
    const item = await getItemByRow(rowIndex)
    if (!item) return NextResponse.json({ error: 'Item nicht gefunden' }, { status: 404 })
    if (item.status !== 'pending') return NextResponse.json({ error: 'Item ist nicht mehr ausstehend' }, { status: 409 })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'

    // E-Mail-Body aufbauen
    let emailHtml = item.htmlContent || ''

    // Persönliche Notiz einbauen (wenn vorhanden)
    if (personalNote && personalNote.trim()) {
      const noteBlock = `
        <div style="margin:0 0 24px;padding:20px;background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
          <p style="margin:0 0 8px;font-weight:bold;color:#92400e;">Persönliche Nachricht von Steffen Hefter:</p>
          <p style="margin:0;color:#78350f;white-space:pre-line;">${personalNote.replace(/[<>]/g, '')}</p>
        </div>`
      // Nach dem öffnenden body-div einfügen
      emailHtml = emailHtml.replace(
        /(<div[^>]*padding:[^>]*>)/,
        `$1${noteBlock}`
      )
      if (!emailHtml.includes(noteBlock)) {
        // Fallback: ans Ende des ersten Inhaltsblocks
        emailHtml = noteBlock + emailHtml
      }
    }

    // Anhang vorbereiten
    const attachments = []
    let attachmentHtml = item.attachmentHtml || ''

    // Rechnungs-Edits einarbeiten
    if (item.type === 'invoice' && invoiceEdits) {
      const { invoiceNumber, netto, leistungsbeschreibung, zahlungsziel } = invoiceEdits
      if (invoiceNumber && attachmentHtml) {
        attachmentHtml = attachmentHtml.replaceAll('[RE-XXXX]', invoiceNumber)
      }
      if (netto && attachmentHtml) {
        const ust = (parseFloat(netto) * 0.19).toFixed(2)
        const brutto = (parseFloat(netto) * 1.19).toFixed(2)
        // Netto-Beträge ersetzen (einfache String-Suche)
        attachmentHtml = attachmentHtml.replace(
          /(<td>)([0-9]+\.[0-9]{2}) &euro;<\/td>\s*<\/tr>\s*<tr class="summe">/,
          `$1${parseFloat(netto).toFixed(2)} &euro;</td></tr><tr class="summe">`
        )
        attachmentHtml = attachmentHtml
          .replace(/Nettobetrag:<\/td><td>[^<]+<\/td>/, `Nettobetrag:</td><td>${parseFloat(netto).toFixed(2)} &euro;</td>`)
          .replace(/zzgl\. 19% Umsatzsteuer:<\/td><td>[^<]+<\/td>/, `zzgl. 19% Umsatzsteuer:</td><td>${ust} &euro;</td>`)
          .replace(/Rechnungsbetrag:<\/td>\s*<td>[^<]+<\/td>/, `Rechnungsbetrag:</td><td>${brutto} &euro;</td>`)
      }
    }

    if (attachmentHtml) {
      const meta = item.metadata || {}
      let filename = 'Dokument.html'
      if (item.type === 'certificate') filename = meta.filename || `KI-Readiness-${item.companyName?.replace(/[^a-zA-Z0-9]/g, '-') || 'Zertifikat'}.html`
      if (item.type === 'invoice') filename = `Rechnung_frimalo_${item.companyName?.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, '_') || 'Kunde'}.html`
      if (item.type === 'report') filename = `KI-Report_${item.companyName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Report'}.html`
      attachments.push({ filename, content: attachmentHtml, contentType: 'text/html' })
    }

    // E-Mail senden (für Assessment + Report: kein Anhang nötig im E-Mail-Body selbst)
    const emailResult = await sendConfirmationToCustomer({
      to: item.recipientEmail,
      subject: item.subject,
      html: emailHtml || `<p>Hallo ${item.recipientName},</p><p>Ihr Dokument steht bereit. Bitte finden Sie es im Anhang.</p><p>Mit freundlichen Grüßen,<br><strong>Steffen Hefter</strong></p>`,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    // Status in Sheets aktualisieren
    await approveItem(rowIndex, personalNote)

    return NextResponse.json({
      success: true,
      emailSent: emailResult,
      recipient: item.recipientEmail,
      type: item.type,
      queueId: item.id,
    })
  } catch (err) {
    console.error('content-queue POST Fehler:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ── DELETE: Item ablehnen ──
export async function DELETE(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })

  try {
    const { rowIndex, reason = 'Abgelehnt' } = await request.json()
    if (!rowIndex) return NextResponse.json({ error: 'rowIndex fehlt' }, { status: 400 })

    const ok = await rejectItem(rowIndex, reason)
    return NextResponse.json({ success: ok })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ── GET einzelnes Item für Vorschau ──
// Aufruf: GET /api/admin/content-queue?row=5
// (rowIndex als Query-Parameter statt type)
