import type { LexiconDef } from '../types'
import { FieldTable } from './FieldTable'
import { CodeBlock } from './CodeBlock'

const colorStyles = {
  teal:   { badge: 'bg-teal-light text-teal border border-[#b8d8d6]' },
  purple: { badge: 'bg-purple-light text-purple border border-[#c8c4e8]' },
  coral:  { badge: 'bg-coral-light text-coral border border-[#dfcbc6]' },
  amber:  { badge: 'bg-amber-light text-amber border border-[#e8d098]' },
}

const LEXICON_NAMES: Record<string, string> = {
  'lex-proof':    'at.ofwork.proof',
  'lex-purchase': 'at.ofwork.purchase',
  'lex-consent':  'at.ofwork.consent',
  'lex-aipolicy': 'at.ofwork.aiPolicy',
}

const AIPOLICY_REVOCATION = (
  <p className="text-[15.5px] text-ink-2 font-light mb-4 max-w-2xl">
    This record is intentionally mutable and deletable. <strong className="font-medium text-ink">Deletion constitutes revocation.</strong>{' '}
    Verifiers encountering no <code className="font-mono text-[0.88em] bg-paper-2 border border-paper-3 rounded px-1.5 text-accent">aiPolicy</code> for a given proof
    MUST default to <code className="font-mono text-[0.88em] bg-paper-2 border border-paper-3 rounded px-1.5 text-accent">unspecified</code> — not permissive.
    When multiple records exist for the same proof, the latest <code className="font-mono text-[0.88em] bg-paper-2 border border-paper-3 rounded px-1.5 text-accent">createdAt</code> wins.
  </p>
)

interface LexiconSectionProps {
  lexicon: LexiconDef
}

export function LexiconSection({ lexicon }: LexiconSectionProps) {
  const styles = colorStyles[lexicon.color]
  const name = LEXICON_NAMES[lexicon.id]

  return (
    <section id={lexicon.id} className="scroll-mt-16 mb-20">
      <div className="flex items-start gap-4 mb-7 pb-6 border-b border-rule">
        <div className={`shrink-0 mt-1 px-3.5 py-1.5 rounded-md font-mono text-[13px] font-medium ${styles.badge}`}>
          record
        </div>
        <div>
          <div className="font-mono text-[20px] font-medium text-ink mb-1 tracking-tight">{name}</div>
          <p className="text-[14px] text-ink-3 font-light m-0">{lexicon.description}</p>
        </div>
      </div>

      <h3 className="font-sans text-[15px] font-medium text-ink mb-3 mt-8">Record key</h3>
      <p className="text-[15.5px] text-ink-2 font-light mb-4 max-w-2xl">
        Type: <code className="font-mono text-[0.88em] bg-paper-2 border border-paper-3 rounded px-1.5 text-accent">tid</code> — {lexicon.recordKey}
      </p>

      {lexicon.sections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <h3 className="font-sans text-[15px] font-medium text-ink mb-3 mt-8">{section.title}</h3>
          )}
          {section.title === 'Revocation model' && AIPOLICY_REVOCATION}
          {section.fields && <FieldTable fields={section.fields} />}
          {section.example && <CodeBlock>{section.example}</CodeBlock>}
        </div>
      ))}
    </section>
  )
}
