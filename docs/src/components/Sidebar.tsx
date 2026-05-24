import { useEffect, useState } from 'react'
import { navSections } from '../data/nav'
import type { NavLink } from '../types'

const SUFFIXES = ['.proof', '.purchase', '.consent', '.aiPolicy']

const variantStyles: Record<string, string> = {
  proof:    'lex-proof',
  purchase: 'lex-purchase',
  consent:  'lex-consent',
  aipolicy: 'lex-aipolicy',
}

interface NavLinkItemProps {
  link: NavLink
  active: boolean
  onClick: () => void
}

function NavLinkItem({ link, active, onClick }: NavLinkItemProps) {
  const isLexicon = !!link.variant
  const variantClass = link.variant ? variantStyles[link.variant] : ''

  const baseClass = [
    'nav-link block py-1.5 text-[#8a8780] no-underline font-light',
    'border-l-2 border-transparent transition-colors duration-150',
    isLexicon ? 'pl-10 pr-7 font-mono text-[12px]' : 'px-7 text-[13.5px]',
    variantClass,
    active ? 'active' : '',
  ].join(' ')

  return (
    <a href={link.href} className={baseClass} onClick={onClick}>
      {link.label}
    </a>
  )
}

interface SidebarProps {
  activeId: string
  onNavClick: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ activeId, onNavClick, isOpen, onClose }: SidebarProps) {
  const [suffixIndex, setSuffixIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setSuffixIndex((i) => (i + 1) % SUFFIXES.length)
        setFading(false)
      }, 320)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <nav className={[
        'sidebar-scroll flex flex-col overflow-y-auto bg-ink border-r border-[#1e1d1a]',
        'fixed inset-y-0 left-0 z-50 w-72',
        'md:sticky md:top-0 md:h-screen md:w-64 md:z-auto md:shrink-0',
        'transition-transform duration-200 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ].join(' ')}>

        {/* Brand */}
        <div className="px-7 pt-8 pb-6 border-b border-[#2a2925] relative">
          <button
            className="md:hidden absolute top-4 right-4 p-1.5 text-[#4a4840] hover:text-paper rounded transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="block font-mono text-[11px] tracking-[0.12em] uppercase text-accent-2 mb-1.5">
            lexicon
          </span>
          <div className="font-serif text-[22px] text-paper leading-tight">
            at.ofwork
            <span
              className="brand-suffix font-mono text-[13px] italic text-accent-2 ml-px"
              style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.3s ease' }}
            >
              {SUFFIXES[suffixIndex]}
            </span>
          </div>
          <span className="block font-mono text-[10px] text-[#4a4840] mt-2">revision 1 · draft</span>
        </div>

        {/* Nav */}
        <div className="py-5 flex-1">
          {navSections.map((section) => (
            <div key={section.label} className="pb-4">
              <span className="block font-mono text-[9px] tracking-[0.18em] uppercase text-[#3a3830] px-7 pt-2 pb-1">
                {section.label}
              </span>
              {section.links.map((link) => (
                <NavLinkItem
                  key={link.href}
                  link={link}
                  active={activeId === link.href.slice(1)}
                  onClick={() => onNavClick(link.href.slice(1))}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-[#1e1d1a] font-mono text-[10px] text-[#2e2d2a]">
          <div>at.ofwork namespace</div>
          <div className="mt-1 text-[#1e1d1a]">atproto lexicon spec</div>
        </div>
      </nav>
    </>
  )
}
