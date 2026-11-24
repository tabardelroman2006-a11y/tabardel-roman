import { randomBytes } from 'crypto'
import { mkdir, readFile, readdir, rm, writeFile } from 'fs/promises'
import { dirname, join, relative } from 'path'
import { del, get, list, put } from '@vercel/blob'
import type { Filleul, Parrain } from './parrainage'

/* Stockage prive Vercel Blob :
   parrainage/parrains/<id>.json            (l'id sert aussi de lien secret)
   parrainage/filleuls/<parrainId>/<id>.json
   En local, PARRAINAGE_TEST_DIR range tout dans un dossier de test : les
   essais ne touchent jamais les vraies donnees. Ignore sur Vercel. */

const P = 'parrainage/parrains/'
const F = 'parrainage/filleuls/'

export const nouvelId = (octets: number) => randomBytes(octets).toString('base64url')
export const idValide = (id: unknown): id is string => typeof id === 'string' && /^[\w-]{8,64}$/.test(id)

type Stock = {
  lire: (chemin: string) => Promise<string | null>
  ecrire: (chemin: string, texte: string) => Promise<void>
  lister: (prefixe: string) => Promise<string[]>
  supprimer: (chemins: string[]) => Promise<void>
}

const blob: Stock = {
  async lire(chemin) {
    const res = await get(chemin, { access: 'private', useCache: false }).catch(() => null)
    return res?.stream ? new Response(res.stream).text() : null
  },
  async ecrire(chemin, texte) {
    await put(chemin, texte, { access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true })
  },
  async lister(prefixe) {
    const out: string[] = []
    let cursor: string | undefined
    do {
      const page = await list({ prefix: prefixe, limit: 1000, cursor })
      out.push(...page.blobs.map(b => b.pathname))
      cursor = page.hasMore ? page.cursor : undefined
    } while (cursor)
    return out
  },
  async supprimer(chemins) {
    if (chemins.length) await del(chemins)
  },
}

function disque(racine: string): Stock {
  const abs = (c: string) => join(racine, ...c.split('/'))
  return {
    lire: c => readFile(abs(c), 'utf8').catch(() => null),
    async ecrire(c, t) {
      await mkdir(dirname(abs(c)), { recursive: true })
      await writeFile(abs(c), t)
    },
    async lister(prefixe) {
      const fichiers = await readdir(abs(prefixe), { recursive: true }).catch(() => [] as string[])
      return fichiers.filter(f => f.endsWith('.json')).map(f => relative(racine, join(abs(prefixe), f)).split(/[\\/]/).join('/'))
    },
    async supprimer(chemins) {
      await Promise.all(chemins.map(c => rm(abs(c), { force: true })))
    },
  }
}

const dossierTest = process.env.VERCEL ? '' : (process.env.PARRAINAGE_TEST_DIR || '')
const stock = dossierTest ? disque(dossierTest) : blob

async function lire<T>(chemin: string): Promise<T | null> {
  const texte = await stock.lire(chemin)
  if (!texte) return null
  try {
    return JSON.parse(texte) as T
  } catch {
    return null
  }
}

const ecrire = (chemin: string, data: unknown) => stock.ecrire(chemin, JSON.stringify(data))

async function toutLire<T>(prefixe: string): Promise<T[]> {
  const lus = await Promise.all((await stock.lister(prefixe)).map(c => lire<T>(c)))
  return lus.filter((x): x is NonNullable<typeof x> => x !== null) as T[]
}

export const lireParrain = (id: string) => lire<Parrain>(`${P}${id}.json`)
export const ecrireParrain = (p: Parrain) => ecrire(`${P}${p.id}.json`, p)
export const tousLesParrains = () => toutLire<Parrain>(P)

export const lireFilleul = (parrainId: string, id: string) => lire<Filleul>(`${F}${parrainId}/${id}.json`)
export const ecrireFilleul = (f: Filleul) => ecrire(`${F}${f.parrainId}/${f.id}.json`, f)
export const filleulsDe = (parrainId: string) => toutLire<Filleul>(`${F}${parrainId}/`)
export const tousLesFilleuls = () => toutLire<Filleul>(F)

export const supprimerFilleul = (parrainId: string, id: string) => stock.supprimer([`${F}${parrainId}/${id}.json`])

export async function supprimerParrain(id: string) {
  const filleuls = await filleulsDe(id)
  await stock.supprimer([`${P}${id}.json`, ...filleuls.map(f => `${F}${id}/${f.id}.json`)])
}
