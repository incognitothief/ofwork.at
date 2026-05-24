export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.88em] bg-paper-2 border border-paper-3 rounded px-1.5 text-accent">
      {children}
    </code>
  )
}
