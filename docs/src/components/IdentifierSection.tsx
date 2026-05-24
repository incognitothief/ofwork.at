import type { IdentifierDef } from '../types'
import { FieldTable } from './FieldTable'

const colorStyles = {
  teal:   { badge: 'bg-teal-light text-teal border border-[#b8d8d6]', scope: 'text-[#7ecfc9]' },
  purple: { badge: 'bg-purple-light text-purple border border-[#c8c4e8]', scope: 'text-[#b8a8e8]' },
  coral:  { badge: 'bg-coral-light text-coral border border-[#dfcbc6]', scope: 'text-[#e8a898]' },
  amber:  { badge: 'bg-amber-light text-amber border border-[#e8d098]', scope: 'text-[#e8c87a]' },
}

export function IdentifierSection({ identifier }: { identifier: IdentifierDef }) {
  const styles = colorStyles[identifier.color]

  return (
    <section id={identifier.id} className="scroll-mt-16 mb-14">
      <div className="flex items-start gap-4 mb-6 pb-5 border-b border-rule">
        <div className={`shrink-0 mt-0.5 px-3 py-1 rounded-md font-mono text-[11px] font-medium uppercase tracking-widest ${styles.badge}`}>
          {identifier.shortName}
        </div>
        <div>
          <div className="font-mono text-[18px] sm:text-[20px] font-medium text-ink mb-1 tracking-tight">{identifier.name}</div>
          <p className="text-[14px] text-ink-3 font-light m-0">{identifier.description}</p>
        </div>
      </div>

      {/* Scope / Issuer / Format */}
      <div className="bg-ink rounded-xl px-5 py-4 my-4 font-mono text-[11.5px] sm:text-[12px] leading-[2] overflow-x-auto">
        <div>
          <span className="text-[#3a3830] select-none mr-3">scope</span>
          <span className={styles.scope}>{identifier.scope}</span>
        </div>
        <div>
          <span className="text-[#3a3830] select-none mr-3">issuer</span>
          <span className="text-[#a8d5a2]">{identifier.issuer}</span>
        </div>
        <div>
          <span className="text-[#3a3830] select-none mr-3">format</span>
          <span className="text-[#b8b4ac]">{identifier.format}</span>
        </div>
      </div>

      <FieldTable fields={identifier.fields} />

      {identifier.notes && (
        <div className="rounded-lg px-5 py-4 my-5 border-l-[3px] bg-accent-light border-accent-2">
          <p className="text-[13.5px] leading-relaxed m-0 text-accent font-light">{identifier.notes}</p>
        </div>
      )}
    </section>
  )
}
