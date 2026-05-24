import type { NavSection } from '../types'

export const navSections: NavSection[] = [
  {
    label: 'Introduction',
    links: [
      { href: '#overview', label: 'Overview' },
      { href: '#motivation', label: 'Motivation' },
      { href: '#design-principles', label: 'Design principles' },
    ],
  },
  {
    label: 'Architecture',
    links: [
      { href: '#record-chain', label: 'Record chain' },
      { href: '#signing', label: 'Signing authority' },
      { href: '#verification', label: 'Verification flow' },
      { href: '#strong-refs', label: 'Strong references' },
      { href: '#ai-policy', label: 'AI policy & revocation' },
    ],
  },
  {
    label: 'Appendix — Lexicons',
    links: [
      { href: '#appendix', label: 'Index' },
      { href: '#lex-proof', label: 'at.ofwork.proof', variant: 'proof' },
      { href: '#lex-purchase', label: 'at.ofwork.purchase', variant: 'purchase' },
      { href: '#lex-consent', label: 'at.ofwork.consent', variant: 'consent' },
      { href: '#lex-aipolicy', label: 'at.ofwork.aiPolicy', variant: 'aipolicy' },
    ],
  },
]
