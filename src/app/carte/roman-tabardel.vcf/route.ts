import { CARTE } from '@/components/carte/carte-data'
import { PHOTO_JPEG_BASE64 } from './photo'

export const dynamic = 'force-static'

function plier(ligne: string) {
  if (ligne.length <= 75) return ligne
  const morceaux = [ligne.slice(0, 75)]
  for (let i = 75; i < ligne.length; i += 74) morceaux.push(' ' + ligne.slice(i, i + 74))
  return morceaux.join('\r\n')
}

export function GET() {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Tabardel;Roman;;;',
    'FN:Roman Tabardel',
    'ORG:Roman Tabardel',
    `TITLE:${CARTE.metier}`,
    `TEL;TYPE=CELL,VOICE:${CARTE.telInternational}`,
    `EMAIL;TYPE=INTERNET,WORK:${CARTE.email}`,
    `URL:${CARTE.site}`,
    `X-SOCIALPROFILE;TYPE=instagram:${CARTE.instagram}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${CARTE.linkedin}`,
    `NOTE:${CARTE.metier}. ${CARTE.site}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${PHOTO_JPEG_BASE64}`,
    'END:VCARD',
  ]

  return new Response(lines.map(plier).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Roman-Tabardel.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
