export interface Field {
  name: string
  type: string
  required?: boolean
  description: string
}

export interface LexiconDef {
  id: string
  color: 'teal' | 'purple' | 'coral' | 'amber'
  description: string
  recordKey: string
  sections: LexiconSection[]
}

export interface LexiconSection {
  title?: string
  fields?: Field[]
  example?: string
}

export interface NavSection {
  label: string
  links: NavLink[]
}

export interface NavLink {
  href: string
  label: string
  variant?: 'proof' | 'purchase' | 'consent' | 'aipolicy' | 'id-music' | 'id-av' | 'id-books' | 'id-cross'
}

export interface IdentifierDef {
  id: string
  name: string
  shortName: string
  color: 'teal' | 'purple' | 'coral' | 'amber'
  scope: string
  issuer: string
  format: string
  description: string
  fields: Field[]
  notes?: string
}

export interface IdentifierCategory {
  id: string
  label: string
  overline: string
  color: 'teal' | 'purple' | 'coral' | 'amber'
  identifiers: IdentifierDef[]
}
