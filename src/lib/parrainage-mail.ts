import { Resend } from 'resend'

/* Mails du parrainage envoyes a Roman, en francais, depuis le serveur.
   RESEND_API_KEY + PARRAINAGE_MAIL_TO sur Vercel. Sans eux : renvoie false
   et la page se rabat sur l'ancien envoi (Web3Forms). */

const ADMIN = 'https://www.tabardel-roman.fr/admin-maintenance'
const BLEU = '#0042A9'

type Ligne = [string, string]

const echapper = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function gabarit(titre: string, intro: string, lignes: Ligne[], bouton?: { texte: string; lien: string }) {
  const rangs = lignes
    .filter(([, v]) => v)
    .map(([k, v]) => `
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E6EAF2;color:#6B7280;font-size:13px;width:150px;vertical-align:top">${echapper(k)}</td>
        <td style="padding:10px 0;border-top:1px solid #E6EAF2;color:#111827;font-size:15px;font-weight:600;white-space:pre-wrap">${echapper(v)}</td>
      </tr>`)
    .join('')
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#F3F6FB;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F6FB;padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden">
        <tr><td style="background:${BLEU};padding:22px 28px;color:#ffffff">
          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:.8">Parrainage</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px">${echapper(titre)}</div>
        </td></tr>
        <tr><td style="padding:24px 28px 8px;color:#374151;font-size:15px;line-height:1.55">${echapper(intro)}</td></tr>
        <tr><td style="padding:4px 28px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rangs}</table>
        </td></tr>
        ${bouton ? `<tr><td style="padding:18px 28px 28px">
          <a href="${bouton.lien}" style="display:inline-block;background:${BLEU};color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:12px">${echapper(bouton.texte)}</a>
        </td></tr>` : ''}
      </table>
      <div style="color:#9CA3AF;font-size:12px;margin-top:14px">tabardel-roman.fr/parrainage</div>
    </td></tr>
  </table></body></html>`
}

const texteBrut = (intro: string, lignes: Ligne[]) =>
  [intro, '', ...lignes.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`), '', `Admin : ${ADMIN}`].join('\n')

async function envoyer(sujet: string, titre: string, intro: string, lignes: Ligne[], replyTo?: string): Promise<boolean> {
  const cle = process.env.RESEND_API_KEY
  const a = process.env.PARRAINAGE_MAIL_TO
  if (!cle || !a) return false
  const de = process.env.PARRAINAGE_MAIL_FROM || 'Parrainage Roman Tabardel <onboarding@resend.dev>'
  try {
    const { error } = await new Resend(cle).emails.send({
      from: de,
      to: a.split(',').map(s => s.trim()),
      subject: sujet,
      html: gabarit(titre, intro, lignes, { texte: 'Ouvrir mon admin', lien: ADMIN }),
      text: texteBrut(intro, lignes),
      ...(replyTo ? { replyTo } : {}),
    })
    if (error) { console.error('parrainage: mail refuse', error.message); return false }
    return true
  } catch (e) {
    console.error('parrainage: mail impossible', e instanceof Error ? e.message : e)
    return false
  }
}

const quand = () => new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' })

export function mailNouveauParrain(p: { prenom: string; nom: string; email: string; telephone: string }) {
  return envoyer(
    `Nouveau parrain : ${p.prenom} ${p.nom}`,
    'Nouveau parrain inscrit',
    `${p.prenom} ${p.nom} vient de s’inscrire au parrainage et peut maintenant vous recommander des personnes.`,
    [['Nom', `${p.prenom} ${p.nom}`], ['Téléphone', p.telephone], ['E-mail', p.email], ['Inscrit le', quand()]],
    p.email,
  )
}

export function mailRecommandation(
  parrain: { prenom: string; nom: string; telephone: string },
  f: { nom: string; entreprise: string; telephone: string; email: string; ville: string; projet: string },
) {
  return envoyer(
    `Nouvelle recommandation : ${f.nom}${f.entreprise ? ` (${f.entreprise})` : ''}`,
    `${f.nom} est à rappeler`,
    `${parrain.prenom} ${parrain.nom} vous recommande ${f.nom}. La personne est d’accord pour que vous l’appeliez de sa part.`,
    [
      ['Personne', f.nom],
      ['Entreprise', f.entreprise],
      ['Téléphone', f.telephone],
      ['E-mail', f.email],
      ['Ville', f.ville],
      ['Son projet', f.projet],
      ['Recommandé par', `${parrain.prenom} ${parrain.nom} (${parrain.telephone})`],
      ['Reçu le', quand()],
    ],
    f.email || undefined,
  )
}

export function mailQuestion(q: { prenom: string; nom: string; contact: string; question: string }) {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.contact) ? q.contact : undefined
  return envoyer(
    `Question sur le parrainage : ${q.prenom} ${q.nom}`,
    'Une question sur le parrainage',
    `${q.prenom} ${q.nom} vous pose une question depuis la page parrainage.${email ? ' Répondez directement à ce mail pour lui écrire.' : ''}`,
    [['Nom', `${q.prenom} ${q.nom}`], ['Pour répondre', q.contact], ['Question', q.question], ['Reçue le', quand()]],
    email,
  )
}
