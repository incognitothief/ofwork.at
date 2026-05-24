import type { NavSection } from "../types";

export const navSections: NavSection[] = [
  {
    label: "Introduction",
    links: [
      { href: "#overview", label: "Overview" },
      { href: "#motivation", label: "Motivation" },
      { href: "#design-principles", label: "Design principles" },
    ],
  },
  {
    label: "Architecture",
    links: [
      { href: "#record-chain", label: "Record chain" },
      { href: "#signing", label: "Signing authority" },
      { href: "#verification", label: "Verification flow" },
      { href: "#strong-refs", label: "Strong references" },
      { href: "#ai-policy", label: "AI policy & revocation" },
    ],
  },
  {
    label: "Appendix — Lexicons",
    links: [
      { href: "#appendix", label: "Core" },
      { href: "#lex-proof", label: "at.ofwork.proof", variant: "proof" },
      {
        href: "#lex-purchase",
        label: "at.ofwork.purchase",
        variant: "purchase",
      },
      { href: "#lex-consent", label: "at.ofwork.consent", variant: "consent" },
      {
        href: "#lex-aipolicy",
        label: "at.ofwork.aiPolicy",
        variant: "aipolicy",
      },
    ],
  },
  {
    label: "",
    links: [
      { href: "#extensions", label: "Extensions" },
      { href: "#id-iswc", label: "at.ofwork.id.iswc", variant: "id-music" },
      { href: "#id-isrc", label: "at.ofwork.id.isrc", variant: "id-music" },
      { href: "#id-ipi", label: "at.ofwork.id.ipi", variant: "id-music" },
      { href: "#id-grid", label: "at.ofwork.id.grid", variant: "id-music" },
      { href: "#id-gtin", label: "at.ofwork.id.gtin", variant: "id-music" },
      { href: "#id-isan", label: "at.ofwork.id.isan", variant: "id-av" },
      { href: "#id-eidr", label: "at.ofwork.id.eidr", variant: "id-av" },
      { href: "#id-isbn", label: "at.ofwork.id.isbn", variant: "id-books" },
      { href: "#id-isni", label: "at.ofwork.id.isni", variant: "id-cross" },
    ],
  },
];
