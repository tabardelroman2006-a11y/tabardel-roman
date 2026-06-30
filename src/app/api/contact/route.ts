import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, nom, telephone, email, description, sujet, message, type } = body

    const isDevis = type === 'devis'

    const subject = isDevis
      ? `📞 Nouvelle demande d'appel — ${prenom} ${nom}`
      : `✉️ Nouveau message — ${prenom} ${nom}`

    const html = isDevis
      ? `
        <h2 style="color:#1a3a52;margin-bottom:16px">Nouvelle demande de réservation d'appel</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700;width:140px">Prénom</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${prenom}</td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Nom</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${nom}</td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Téléphone</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0"><strong>${telephone}</strong></td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Projet</td><td style="padding:8px 12px">${description || '—'}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:13px;color:#888">Envoyé depuis tabardel-roman.fr</p>
      `
      : `
        <h2 style="color:#1a3a52;margin-bottom:16px">Nouveau message de contact</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700;width:140px">Prénom</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${prenom}</td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Nom</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${nom}</td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Téléphone</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${telephone || '—'}</td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Sujet</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${sujet || '—'}</td></tr>
          <tr><td style="padding:8px 12px;background:#f0f3f6;font-weight:700">Message</td><td style="padding:8px 12px;white-space:pre-wrap">${message || '—'}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:13px;color:#888">Envoyé depuis tabardel-roman.fr</p>
      `

    await resend.emails.send({
      from: 'Site tabardel-roman.fr <noreply@tabardel-roman.fr>',
      to: 'contact@tabardel-roman.fr',
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact API]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
