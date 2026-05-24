import { IdentifierSection } from '../components/IdentifierSection'
import { Callout } from '../components/Callout'
import { Code } from '../components/Code'
import { identifierCategories } from '../data/identifiers'

const colorStyles = {
  teal:   { badge: 'bg-teal-light text-teal border border-[#b8d8d6]', overline: 'text-teal' },
  purple: { badge: 'bg-purple-light text-purple border border-[#c8c4e8]', overline: 'text-purple' },
  coral:  { badge: 'bg-coral-light text-coral border border-[#dfcbc6]', overline: 'text-coral' },
  amber:  { badge: 'bg-amber-light text-amber border border-[#e8d098]', overline: 'text-amber' },
}

const HIERARCHY = [
  { layer: 'Contributor', ids: ['ISNI', 'IPI'], color: 'bg-amber-light text-amber border-[#e8d098]' },
  { layer: 'Work', ids: ['ISWC', 'ISAN'], color: 'bg-teal-light text-teal border-[#b8d8d6]' },
  { layer: 'Recording / Asset', ids: ['ISRC', 'EIDR', 'V-ISAN'], color: 'bg-purple-light text-purple border-[#c8c4e8]' },
  { layer: 'Product', ids: ['GTIN', 'GRId', 'ISBN'], color: 'bg-coral-light text-coral border-[#dfcbc6]' },
]

function SectionHeader({ overline, title }: { overline: string; title: string }) {
  return (
    <>
      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-accent-2 mb-3">{overline}</span>
      <h2 className="font-serif text-[32px] font-normal text-ink mb-5 tracking-tight">{title}</h2>
    </>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15.5px] text-ink-2 font-light mb-4 max-w-2xl">{children}</p>
}

export function IdentifiersPage() {
  return (
    <>
      {/* Overview */}
      <section id="identifiers" className="scroll-mt-16 mb-20">
        <div className="inline-flex items-center gap-2 bg-paper-2 border border-rule rounded-full px-3.5 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-ink-3" />
          <span className="font-mono text-[11px] text-ink-3 tracking-[0.05em]">at.ofwork.id.*</span>
        </div>
        <SectionHeader overline="Industry identifiers" title="Identifier extensions" />
        <P>
          The <Code>at.ofwork.id</Code> namespace associates industry-standard identifiers with proofs.
          These records do not replace or modify the provenance chain — they annotate it, linking a
          DID-anchored artifact to the identifiers assigned by external registries and rights organizations.
        </P>
        <P>
          Each identifier record references a proof via <Code>com.atproto.repo.strongRef</Code> and is
          written into the creator's or rights-holder's own repo. Like <Code>at.ofwork.aiPolicy</Code>, they
          are intentionally decoupled from the proof so that identifiers can be added, updated, or registered
          after the fact without invalidating the provenance record.
        </P>
        <Callout variant="info">
          <><strong className="font-medium">One record type per identifier class.</strong> Each standard has distinct semantics, issuing authority, and lifecycle. Collapsing them into a generic <Code>identifier</Code> record would obscure these differences and make validation harder.</>
        </Callout>

        {/* Hierarchy diagram */}
        <h3 className="font-sans text-[15px] font-medium text-ink mb-4 mt-10 tracking-[0.01em]">Identifier hierarchy</h3>
        <P>Identifiers map to four conceptual layers. A fully described commercial music recording might carry records at all four.</P>
        <div className="my-6 bg-ink rounded-xl px-6 py-6 flex flex-col gap-0">
          {HIERARCHY.map((row, i, arr) => (
            <div key={row.layer}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3">
                <div className="w-32 shrink-0 font-mono text-[10px] tracking-[0.12em] uppercase text-[#3a3830]">
                  {row.layer}
                </div>
                <div className="flex flex-wrap gap-2">
                  {row.ids.map((id) => (
                    <span key={id} className={`inline-block px-2.5 py-0.5 rounded border font-mono text-[11px] font-medium ${row.color}`}>
                      {id}
                    </span>
                  ))}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="text-[#2a2925] font-mono text-[11px] pl-0 sm:pl-36 py-0.5">↓</div>
              )}
            </div>
          ))}
        </div>

        <P>
          Multiple identifier records may reference the same proof simultaneously — there is no uniqueness constraint at the lexicon level.
          Identifier records do not interact with <Code>at.ofwork.purchase</Code> or <Code>at.ofwork.consent</Code> directly;
          they annotate the proof, not the transaction.
        </P>
      </section>

      <hr className="border-0 border-t border-rule my-12" />

      {/* Category sections */}
      {identifierCategories.map((category) => {
        const styles = colorStyles[category.color]
        return (
          <section key={category.id} className="mb-20">
            <span className={`block font-mono text-[10px] tracking-[0.2em] uppercase mb-3 ${styles.overline}`}>
              {category.overline}
            </span>
            <h2 className="font-serif text-[28px] font-normal text-ink mb-10 tracking-tight">{category.label}</h2>
            {category.identifiers.map((identifier) => (
              <IdentifierSection key={identifier.id} identifier={identifier} />
            ))}
          </section>
        )
      })}
    </>
  )
}
