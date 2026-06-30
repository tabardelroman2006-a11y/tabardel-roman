import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'
import { getAvailableDates, generateDaySlots, isValidSlot } from '@/lib/booking'

const KEY = 'booked_slots'

async function readBooked(): Promise<string[]> {
  try {
    const v = await get(KEY)
    return Array.isArray(v) ? (v as string[]) : []
  } catch {
    return []
  }
}

export async function GET() {
  const booked = await readBooked()
  return NextResponse.json(
    { dates: getAvailableDates(), slots: generateDaySlots(), booked },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: Request) {
  let body: { date?: string; time?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const date = body.date || ''
  const time = body.time || ''
  if (!isValidSlot(date, time)) {
    return NextResponse.json({ error: 'Créneau invalide.' }, { status: 400 })
  }

  const edgeConfigId = process.env.EDGE_CONFIG_ID
  const token = process.env.VERCEL_API_TOKEN
  if (!edgeConfigId || !token) {
    return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 })
  }

  const slotId = `${date}T${time}`
  const booked = await readBooked()
  if (booked.includes(slotId)) {
    return NextResponse.json({ error: 'Ce créneau vient d’être réservé. Choisissez-en un autre.' }, { status: 409 })
  }

  const next = [...booked, slotId]
  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ operation: 'upsert', key: KEY, value: next }] }),
    },
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur lors de la réservation.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, slot: slotId })
}
