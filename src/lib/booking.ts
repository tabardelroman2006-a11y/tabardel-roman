const SLOT_DURATION_MIN = 30
const MORNING = { start: 9, end: 12 }
const AFTERNOON = { start: 14, end: 18 }
const BOOKING_WINDOW_DAYS = 30

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

export function generateDaySlots(): string[] {
  const slots: string[] = []
  for (let h = MORNING.start; h < MORNING.end; h++) {
    slots.push(`${pad(h)}:00`, `${pad(h)}:30`)
  }
  for (let h = AFTERNOON.start; h < AFTERNOON.end; h++) {
    slots.push(`${pad(h)}:00`, `${pad(h)}:30`)
  }
  return slots
}

export function isBusinessDay(date: Date): boolean {
  const day = date.getDay()
  return day >= 1 && day <= 5
}

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function getAvailableDates(): string[] {
  const dates: string[] = []
  const now = new Date()
  for (let i = 1; i <= BOOKING_WINDOW_DAYS; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
    if (isBusinessDay(d)) dates.push(toISODate(d))
  }
  return dates
}

export function isValidSlot(dateStr: string, timeStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr) || !/^\d{2}:\d{2}$/.test(timeStr)) return false
  if (!getAvailableDates().includes(dateStr)) return false
  return generateDaySlots().includes(timeStr)
}

export function formatSlotLabel(dateStr: string, timeStr: string): string {
  const d = new Date(`${dateStr}T${timeStr}:00`)
  const dateLabel = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(d)
  return `${dateLabel} à ${timeStr.replace(':', 'h')}`
}

export const SLOT_DURATION_MINUTES = SLOT_DURATION_MIN
