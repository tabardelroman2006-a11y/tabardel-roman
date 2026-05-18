'use client'

const items = [
  'Création web',
  'Référencement SEO',
  'Sites vitrine',
  'E-commerce',
  'Refonte',
  'Audit SEO',
  'Motion design',
  'Sites premium',
]

export function Marquee() {
  const repeated = [...items, ...items, ...items]

  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-scroll 28s linear infinite' }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.35em] uppercase mx-6"
            style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)' }}
          >
            {item}
            <span className="mx-6" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
