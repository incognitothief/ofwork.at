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
  variant?: 'proof' | 'purchase' | 'consent' | 'aipolicy'
}
