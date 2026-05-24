import type { IdentifierCategory } from '../types'

export const identifierCategories: IdentifierCategory[] = [
  {
    id: 'id-music',
    label: 'Music',
    overline: 'Recording industry',
    color: 'teal',
    identifiers: [
      {
        id: 'id-iswc',
        name: 'at.ofwork.id.iswc',
        shortName: 'iswc',
        color: 'teal',
        scope: 'Musical work (song / composition)',
        issuer: 'CISAC via PRO (ASCAP, PRS, SOCAN, ...)',
        format: 'T-XXXXXXXXX-C  (T + 9 digits + check digit)',
        description:
          'Identifies the underlying musical work — the composition and its lyrics, independent of any specific recording. Assigned by CISAC through affiliated performing rights organizations.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record for the artifact.' },
          { name: 'iswc', type: 'string', required: true, description: 'The ISWC value.' },
          { name: 'registeredWith', type: 'string', description: 'The PRO through which registration was made (e.g. ASCAP, PRS, SOCAN).' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
        notes:
          'A single musical work may have only one ISWC. If multiple records exist for the same proof, verifiers should surface a conflict rather than silently preferring the latest.',
      },
      {
        id: 'id-isrc',
        name: 'at.ofwork.id.isrc',
        shortName: 'isrc',
        color: 'teal',
        scope: 'Sound recording (master)',
        issuer: 'National ISRC agencies; self-assignable with a registrant code',
        format: 'CC-XXX-YY-NNNNN  (country + registrant + year + designation)',
        description:
          'Identifies a specific sound recording — a particular recorded performance of a work. The most operationally critical identifier in music distribution; used by DSPs, collective management organizations, and royalty systems worldwide.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'isrc', type: 'string', required: true, description: 'The ISRC value.' },
          { name: 'iswcRef', type: 'com.atproto.repo.strongRef', description: 'Optional strong ref to at.ofwork.id.iswc. Links this recording to its underlying musical work.' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
        notes:
          'The optional iswcRef allows verifiers to traverse from a recording identifier to its composition without relying on external databases.',
      },
      {
        id: 'id-ipi',
        name: 'at.ofwork.id.ipi',
        shortName: 'ipi',
        color: 'teal',
        scope: 'Rights-holder identity (person or organization)',
        issuer: 'CISAC',
        format: '11-digit numeric string',
        description:
          'Identifies a rights-holder entity — a composer, lyricist, or publisher — as registered with a PRO. Unlike work identifiers, IPI identifies a party: this record asserts that the IPI number belongs to the proof\'s author DID.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'ipi', type: 'string', required: true, description: 'The IPI number (11-digit numeric string).' },
          { name: 'role', type: 'enum', required: true, description: 'composer | lyricist | arranger | publisher | subPublisher' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
      },
      {
        id: 'id-grid',
        name: 'at.ofwork.id.grid',
        shortName: 'grid',
        color: 'teal',
        scope: 'Release (commercial edition)',
        issuer: 'IFPI via national groups',
        format: 'A1-XXXXXXXXXXXX-Y-Z  (scheme + registrant + release number + check)',
        description:
          'Identifies a specific release — a distinct commercial edition of one or more recordings, such as a single, EP, or album released on a particular date through a particular channel. GRId sits between the recording (ISRC) and the product (GTIN) in the supply chain hierarchy.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'grid', type: 'string', required: true, description: 'The GRId value.' },
          { name: 'isrcRefs', type: 'array<strongRef>', description: 'Optional strong refs to at.ofwork.id.isrc records for the recordings included in this release.' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
      },
      {
        id: 'id-gtin',
        name: 'at.ofwork.id.gtin',
        shortName: 'gtin',
        color: 'teal',
        scope: 'Product / SKU',
        issuer: 'GS1 via national member organizations',
        format: 'GTIN-8, GTIN-12, GTIN-13, or GTIN-14 (digits only)',
        description:
          'Identifies the commercial product — the artifact as a SKU, whether a physical release or a digital storefront listing. Subsumes UPC (North America) and EAN (international); both are valid GTIN-12 or GTIN-13 values.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'gtin', type: 'string', required: true, description: 'The GTIN value (digits only, no hyphens).' },
          { name: 'gtinType', type: 'enum', required: true, description: 'GTIN-8 | GTIN-12 | GTIN-13 | GTIN-14' },
          { name: 'format', type: 'enum', description: 'cd | vinyl | cassette | digital | other' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
      },
    ],
  },
  {
    id: 'id-av',
    label: 'Audiovisual',
    overline: 'Film & television',
    color: 'purple',
    identifiers: [
      {
        id: 'id-isan',
        name: 'at.ofwork.id.isan',
        shortName: 'isan',
        color: 'purple',
        scope: 'Audiovisual work',
        issuer: 'ISAN-IA via national agencies',
        format: 'XXXXXXXX-XXXX-XXXX-X (root)  or  XXXXXXXX-XXXX-XXXX-X-XXXX-X (V-ISAN)',
        description:
          'Identifies an audiovisual work — a film, television episode, short, music video, or other time-based visual work. ISAN (ISO 15706) and V-ISAN share a record type: the presence of the version field distinguishes a specific version from the abstract work.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'isan', type: 'string', required: true, description: 'The root ISAN value.' },
          { name: 'version', type: 'string', description: 'The version segment. Presence indicates a V-ISAN (specific version of the work).' },
          { name: 'versionDescription', type: 'string', description: 'Human-readable version description (e.g. "Director\'s Cut", "Dubbed — French").' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
        notes:
          'When version is absent, the record asserts work-level identity. When present, it asserts a specific version. Verifiers should treat a root ISAN and a derived V-ISAN as related but distinct records.',
      },
      {
        id: 'id-eidr',
        name: 'at.ofwork.id.eidr',
        shortName: 'eidr',
        color: 'purple',
        scope: 'Audiovisual work or asset (DSP / broadcast supply chain)',
        issuer: 'EIDR Association',
        format: '10.5240/XXXX-XXXX-XXXX-XXXX-XXXX-C  (DOI format)',
        description:
          'Identifies an audiovisual work or asset within the Entertainment Identifier Registry, widely adopted by streaming platforms, studios, and broadcast supply chains. EIDR is DOI-based and provides persistent resolution.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'eidr', type: 'string', required: true, description: 'The EIDR DOI value.' },
          { name: 'isanRef', type: 'com.atproto.repo.strongRef', description: 'Optional strong ref to at.ofwork.id.isan if a corresponding ISAN record exists.' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
        notes:
          'ISAN and EIDR may coexist on the same proof. ISAN has stronger international coverage; EIDR has deeper operational adoption among major DSPs and studios. Where both are known, both records should be written.',
      },
    ],
  },
  {
    id: 'id-books',
    label: 'Books & Illustrated Works',
    overline: 'Publishing',
    color: 'coral',
    identifiers: [
      {
        id: 'id-isbn',
        name: 'at.ofwork.id.isbn',
        shortName: 'isbn',
        color: 'coral',
        scope: 'Published edition (format-specific)',
        issuer: 'National ISBN agencies (Bowker in the US, Nielsen in the UK)',
        format: 'ISBN-13 (preferred) or ISBN-10 (legacy)',
        description:
          'Identifies a specific edition and format of a book or book-like published work — including illustrated books, graphic novels, comics collections, and art books. Each distinct format (hardcover, paperback, ebook) receives its own ISBN.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'isbn', type: 'string', required: true, description: 'The ISBN value (hyphens permitted).' },
          { name: 'isbnType', type: 'enum', required: true, description: 'ISBN-10 | ISBN-13' },
          { name: 'format', type: 'enum', description: 'hardcover | paperback | ebook | audiobook | other' },
          { name: 'publisher', type: 'string', description: 'The registered publisher name at time of ISBN assignment.' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
        notes:
          'ISBN is a product-level identifier: it identifies this edition in this format, not the abstract work. A proof representing an unpublished manuscript may carry an ISBN if one has been obtained in anticipation of publication.',
      },
    ],
  },
  {
    id: 'id-cross',
    label: 'Cross-Domain',
    overline: 'Multi-medium identity',
    color: 'amber',
    identifiers: [
      {
        id: 'id-isni',
        name: 'at.ofwork.id.isni',
        shortName: 'isni',
        color: 'amber',
        scope: 'Public identity of a contributor (person or organization)',
        issuer: 'ISNI International Agency via member organizations',
        format: '16-digit numeric string  (XXXX XXXX XXXX XXXX)',
        description:
          'Identifies a creative contributor — an artist, author, illustrator, composer, performer, or other named party — via the International Standard Name Identifier (ISO 27729). Broader in scope than IPI, with strong adoption in library systems, MusicBrainz, Wikidata, and cross-industry metadata pipelines.',
        fields: [
          { name: 'proof', type: 'com.atproto.repo.strongRef', required: true, description: 'Strong reference to the at.ofwork.proof record.' },
          { name: 'isni', type: 'string', required: true, description: 'The ISNI value (spaces and formatting permitted).' },
          { name: 'createdAt', type: 'datetime', required: true, description: 'ISO 8601 creation timestamp.' },
        ],
        notes:
          'ISNI applies across all media types — a single contributor carries one ISNI across all their works regardless of medium. This record bridges the AT Proto identity layer with cross-industry contributor identity infrastructure.',
      },
    ],
  },
]
