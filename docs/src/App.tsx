import { useEffect, useState, useCallback, Fragment } from 'react'
import { Sidebar } from './components/Sidebar'
import { Callout } from './components/Callout'
import { CodeBlock } from './components/CodeBlock'
import { FieldTable } from './components/FieldTable'
import { LexiconSection } from './components/LexiconSection'
import { Code } from './components/Code'
import { lexicons } from './data/lexicons'

const SECTION_IDS = [
  'overview', 'motivation', 'design-principles', 'record-chain',
  'signing', 'verification', 'strong-refs', 'ai-policy',
  'appendix', 'lex-proof', 'lex-purchase', 'lex-consent', 'lex-aipolicy',
]

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="step flex gap-4 mb-5">
      <div className="pt-1">
        <div className="font-medium text-[15px] text-ink mb-1">{title}</div>
        <p className="text-[14px] text-ink-3 font-light m-0">{children}</p>
      </div>
    </div>
  )
}

function SectionHeader({ overline, title }: { overline: string; title: string }) {
  return (
    <>
      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-accent-2 mb-3">{overline}</span>
      <h2 className="font-serif text-[32px] font-normal text-ink mb-5 tracking-tight">{title}</h2>
    </>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-sans text-[15px] font-medium text-ink mb-3 mt-8 tracking-[0.01em]">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15.5px] text-ink-2 font-light mb-4 max-w-2xl">{children}</p>
}

export default function App() {
  const [activeId, setActiveId] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavClick = useCallback((id: string) => {
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 z-30 bg-paper/95 backdrop-blur-sm border-b border-rule flex items-center px-5 gap-3">
        <button
          onClick={openSidebar}
          className="p-2 -ml-2 text-ink-3 hover:text-ink transition-colors"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="font-serif text-[19px] text-ink leading-none">at.ofwork</span>
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-accent-2 ml-auto">lexicon</span>
      </header>

      <Sidebar activeId={activeId} onNavClick={handleNavClick} isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 min-w-0 max-w-3xl px-5 md:px-16 pb-28">
        {/* Spacer for mobile fixed header */}
        <div className="h-14 md:hidden" />

        {/* Hero */}
        <div id="overview" className="pt-10 md:pt-16 pb-12 mb-4 scroll-mt-16">
          <div className="inline-flex items-center gap-2 bg-accent-light border border-[#b8d9c4] rounded-full px-3.5 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-2" />
            <span className="font-mono text-[11px] text-accent tracking-[0.05em]">AT Protocol Lexicons</span>
          </div>
          <h1 className="font-serif text-[clamp(28px,5vw,52px)] font-normal leading-[1.08] tracking-tight text-ink mb-6">
            Provenance, purchase, <em className="italic text-accent">and consent</em> on the open web.
          </h1>
          <p className="text-[17px] leading-relaxed text-ink-2 font-light mb-8 max-w-xl">
            The <Code>at.ofwork.*</Code> namespace defines four interlinked lexicons for asserting the authorship,
            acquisition, licensing, and AI consumption preferences of digital artifacts — using AT Protocol DIDs as the identity layer.
          </p>
        </div>

        <hr className="border-0 border-t border-rule my-12" />

        {/* Motivation */}
        <section id="motivation" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Why this exists" title="Motivation" />
          <P>Digital artifacts — images, music, writing, software, video — circulate across platforms without any durable record of who made them, who bought them, or under what terms they can be used. Existing solutions either live in closed platform databases (fragile, unportable) or on blockchains (expensive, technically inaccessible).</P>
          <P>AT Protocol offers a third path: <strong className="font-medium text-ink">open, content-addressed, DID-anchored records</strong> stored in portable personal data repositories. The <Code>at.ofwork</Code> namespace builds on this to provide four primitives that any application can read and verify without trusting a central authority.</P>
          <P>The design is intentionally minimal. These lexicons do not handle payments, enforce DRM, or manage royalties. They create <strong className="font-medium text-ink">verifiable records of facts</strong> — provenance, acquisition, license grant, and AI consumption preference — that other systems can build upon.</P>
          <Callout variant="info">
            <><strong className="font-medium">Scope note:</strong> <Code>at.ofwork</Code> records are attestations, not enforcement mechanisms. They establish a cryptographically verifiable paper trail; what applications do with that trail is outside this specification.</>
          </Callout>
        </section>

        {/* Design Principles */}
        <section id="design-principles" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Philosophy" title="Design principles" />
          <H3>Minimal trust surface</H3>
          <P>No central registry or authority is required. Every record can be verified using only AT Protocol's DID resolution and standard cryptographic primitives. A verifier needs only the AT Proto SDK and a network connection.</P>
          <H3>Content addressing over naming</H3>
          <P>Artifacts are identified by their CID — a hash of their raw bytes — not by URLs, filenames, or platform IDs. A <Code>proof</Code> record is valid as long as the artifact bytes are available anywhere; the storage layer is irrelevant.</P>
          <H3>Seller-issued attestations</H3>
          <P>Both <Code>purchase</Code> and <Code>consent</Code> records are written into the <strong className="font-medium text-ink">seller's</strong> repo, not the buyer's. This mirrors how paper receipts and licenses work: the seller issues them. Buyers are listed by DID but do not need to take any action in their own repo.</P>
          <H3>Immutability through strong references</H3>
          <P>All cross-record references use AT Protocol <em>strong refs</em> — a pair of <Code>(uri, cid)</Code> that pins the referenced record at a specific version. A <Code>purchase</Code> cannot be silently redirected to a different <Code>proof</Code> after the fact.</P>
          <H3>Consent subordinate to purchase</H3>
          <P>A <Code>consent</Code> record is always pegged to a specific <Code>purchase</Code>, not directly to a <Code>proof</Code>. The same artifact may be sold multiple times with different license terms. One <Code>proof</Code>, multiple <Code>purchase</Code>+<Code>consent</Code> pairs.</P>
        </section>

        {/* Record chain */}
        <section id="record-chain" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Architecture" title="Record chain" />
          <P>The three lexicons form an ordered dependency chain. A <Code>consent</Code> cannot exist without a <Code>purchase</Code>; a <Code>purchase</Code> cannot reference a nonexistent <Code>proof</Code>.</P>
          <div className="flex flex-col sm:flex-row items-center my-9 bg-ink rounded-xl px-6 sm:px-8 py-6 sm:py-7 gap-1 sm:gap-0">
            {[
              { pill: 'at.ofwork.proof', label: 'Creator publishes', color: 'bg-teal-light text-teal' },
              { pill: 'at.ofwork.purchase', label: 'Seller issues receipt', color: 'bg-purple-light text-purple' },
              { pill: 'at.ofwork.consent', label: 'Seller grants license', color: 'bg-coral-light text-coral' },
            ].map((node, i, arr) => (
              <Fragment key={node.pill}>
                <div className="w-full sm:flex-1 sm:min-w-[140px] text-center py-2 sm:py-0">
                  <div className={`inline-block px-4 py-2 rounded-md font-mono text-[12px] font-medium mb-2 tracking-[0.03em] ${node.color}`}>{node.pill}</div>
                  <div className="text-[11px] text-[#4a4840] font-light font-mono">{node.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="text-[#2a2925] text-xl px-2 shrink-0 rotate-90 sm:rotate-0">→</div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="steps my-6">
            <Step title="Creator mints a proof">The creator computes a CID from the artifact bytes and writes an <Code>at.ofwork.proof</Code> record into their own AT Proto repo. The repo's commit signature binds the CID to their DID.</Step>
            <Step title="Seller records the purchase">When a sale occurs, the seller writes an <Code>at.ofwork.purchase</Code> record into their own repo, referencing the proof via strong ref and naming the buyer's DID.</Step>
            <Step title="Seller issues consent">Immediately following (or atomically with) the purchase, the seller writes an <Code>at.ofwork.consent</Code> record referencing the purchase and specifying the license scope, territory, and transferability.</Step>
            <Step title="Buyer verifies independently">Any party can verify the chain: resolve the proof CID against the artifact, resolve the seller's DID, check the purchase <Code>buyerDid</Code>, and inspect consent scope — all without contacting any centralised authority.</Step>
          </div>
        </section>

        {/* Signing authority */}
        <section id="signing" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Cryptographic authority" title="Signing authority" />
          <P>Each record must be stored in the AT Proto repo of its designated signer. The AT Proto PDS enforces that every repo commit is signed by the repo owner's active signing key — this is the mechanism by which authority is asserted.</P>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
            {[
              { name: 'at.ofwork.proof', signer: 'Creator (signerDid)', note: "Must match the repo DID. Proves the creator claims authorship of the artifact CID." },
              { name: 'at.ofwork.purchase', signer: 'Seller (sellerDid)', note: "Must match the repo DID. Proves the seller attests to the transaction." },
              { name: 'at.ofwork.consent', signer: 'Seller (via purchaseRef)', note: "Stored in the same repo as the referenced purchase. The seller's key covers both records." },
            ].map((card) => (
              <div key={card.name} className="border border-rule rounded-lg p-4 bg-paper-2">
                <div className="font-mono text-[11px] text-ink-3 mb-1.5">{card.name}</div>
                <div className="font-medium text-[14px] text-ink mb-1.5">{card.signer}</div>
                <div className="text-[12px] text-ink-4 font-light leading-relaxed">{card.note}</div>
              </div>
            ))}
          </div>
          <Callout variant="warning">
            <><strong className="font-medium">DID rotation:</strong> If a creator rotates their AT Proto signing key, previously issued proof records remain valid — the commit signatures are preserved in the repo's historical log. Use <Code>previousProofUri</Code> on a new proof record to form an explicit chain of custody when re-attesting after a key migration.</>
          </Callout>
        </section>

        {/* Verification flow */}
        <section id="verification" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Verification" title="Verification flow" />
          <P>To verify that a given DID legitimately holds a license to a specific artifact:</P>
          <div className="steps my-6">
            <Step title="Resolve the consent record">Fetch the <Code>at.ofwork.consent</Code> AT URI from the seller's PDS. Confirm the record's CID matches the strong ref you hold.</Step>
            <Step title="Verify the purchase">Resolve the <Code>purchaseRef</Code> strong ref. Confirm <Code>buyerDid</Code> matches the claimant's DID, and that <Code>sellerDid</Code> matches the repo the consent is stored in.</Step>
            <Step title="Verify the proof">Resolve the <Code>proofRef</Code> strong ref. Independently compute the artifact's CID from its raw bytes using the stated <Code>algorithm</Code>. Confirm it matches <Code>artifactCid</Code>.</Step>
            <Step title="Check license validity">Inspect <Code>scope</Code>, <Code>territory</Code>, <Code>transferable</Code>, and <Code>expiresAt</Code> on the consent. If <Code>revocationUri</Code> is present, fetch it and confirm the license is not revoked.</Step>
          </div>
        </section>

        {/* Strong refs */}
        <section id="strong-refs" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Implementation note" title="Strong references" />
          <P>All cross-record references in this namespace use <Code>com.atproto.repo.strongRef</Code> — a two-field object containing both the AT URI and the CID of the target record at the time of referencing:</P>
          <CodeBlock>{`{
  "$type": "com.atproto.repo.strongRef",
  "uri":  "at://did:plc:abc123/at.ofwork.proof/3juqv7yxhm22h",
  "cid":  "bafyreihfsnz5qtbpf4kkpbwp46fafj6j5l3dh6ib6xz..."
}`}</CodeBlock>
          <P>The <Code>cid</Code> field is the key guarantee. AT Proto records are immutable once committed — a record's CID is a hash of its content. If a party later modifies the referenced record (which would produce a new CID), the strong ref's <Code>cid</Code> no longer matches and verification fails.</P>
          <P>Verifiers <strong className="font-medium text-ink">must</strong> check both components: confirm the <Code>uri</Code> resolves and that the resolved record's CID matches the stored <Code>cid</Code>. Checking only the URI is insufficient.</P>
        </section>

        <hr className="border-0 border-t border-rule my-12" />

        {/* AI Policy */}
        <section id="ai-policy" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Creator control" title="AI policy & revocation" />
          <P>The <Code>at.ofwork.aiPolicy</Code> lexicon lets creators express machine-readable preferences about how AI systems may interact with their artifacts — covering training data ingestion, inference-time use, indexing, and generative output. These preferences can be revoked at any time without disturbing the provenance chain.</P>
          <H3>Why a separate record, not a field on proof</H3>
          <P>The <Code>proof</Code> record's <Code>artifactCid</Code> is a content hash — immutable by design. Embedding an AI flag directly on the proof would mean that changing your preference requires a new proof record with a new CID, breaking every purchase and consent record that references it. Instead, <Code>aiPolicy</Code> is a <strong className="font-medium text-ink">sibling record</strong> that references the proof via strong ref. It can be written after the proof, updated, and deleted — all without touching the underlying provenance chain.</P>
          <Callout variant="warning">
            <><strong className="font-medium">Revocation by deletion:</strong> Deleting an <Code>aiPolicy</Code> record constitutes revocation. Verifiers that encounter no <Code>aiPolicy</Code> record for a given proof MUST treat the creator's preference as <Code>unspecified</Code> — not as permissive. The conservative default is intentional.</>
          </Callout>
          <H3>Allowance states</H3>
          <P>Each dimension of AI use — training, inference, indexing, generative output — uses a three-value enumeration:</P>
          <FieldTable fields={[
            { name: 'yes', type: '', description: 'Explicitly permitted without conditions.' },
            { name: 'no', type: '', description: 'Explicitly disallowed. Verifiers MUST treat this as a hard prohibition.' },
            { name: 'conditional', type: '', description: 'Permitted only under conditions described in the accompanying *Conditions field. Verifiers MUST treat conditional as no if conditions are absent or unsatisfied.' },
          ]} />
          <H3>Relationship to consent scope</H3>
          <P>The <Code>ai-training</Code> scope on <Code>at.ofwork.consent</Code> covers AI training rights granted to a <em>buyer</em>. The <Code>aiPolicy</Code> record is a separate, creator-level statement applicable to any AI system. Both can coexist: a creator may globally disallow AI training via <Code>aiPolicy</Code> while still granting it specifically to a trusted buyer via <Code>consent</Code>.</P>
          <H3>Updating preferences</H3>
          <P>To update an AI policy, write a new <Code>aiPolicy</Code> record referencing the same proof. When multiple records exist for a given proof, verifiers MUST use the one with the latest <Code>createdAt</Code> timestamp.</P>
          <Callout variant="info">
            <><strong className="font-medium">External registries:</strong> The <Code>optOutRegistries</Code> field accepts URIs for external do-not-train lists (e.g. Spawning's registry). These are informational — the structured fields on this record are authoritative.</>
          </Callout>
        </section>

        {/* Appendix index */}
        <section id="appendix" className="mb-20 scroll-mt-16">
          <SectionHeader overline="Appendix" title="Lexicon reference" />
          <P>Complete field definitions for all four <Code>at.ofwork</Code> lexicons.</P>
          <div className="bg-paper-2 border border-rule rounded-lg px-6 py-5 mb-12">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-4 mb-3">In this appendix</div>
            {[
              { href: '#lex-proof', label: 'at.ofwork.proof — artifact provenance' },
              { href: '#lex-purchase', label: 'at.ofwork.purchase — acquisition attestation' },
              { href: '#lex-consent', label: 'at.ofwork.consent — license grant' },
              { href: '#lex-aipolicy', label: 'at.ofwork.aiPolicy — AI consumption preferences' },
            ].map((item, i, arr) => (
              <a key={item.href} href={item.href} className={`block py-1 font-mono text-[13px] text-ink-3 no-underline hover:text-ink ${i < arr.length - 1 ? 'border-b border-dotted border-rule' : ''}`}>
                {item.label}
              </a>
            ))}
          </div>
        </section>

        {lexicons.map((lex) => (
          <LexiconSection key={lex.id} lexicon={lex} />
        ))}

      </main>
    </div>
  )
}
