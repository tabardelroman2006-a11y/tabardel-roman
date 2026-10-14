import { CARTE } from '@/components/carte/carte-data'
import { PHOTO_JPEG_BASE64 } from './photo'

export const dynamic = 'force-static'

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
    `NOTE:${CARTE.metier}. ${CARTE.site}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${PHOTO_JPEG_BASE64}`,
    'END:VCARD',
  ]

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="Roman-Tabardel.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
