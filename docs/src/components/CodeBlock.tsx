interface CodeBlockProps {
  children: string
  label?: string
}

// Simple tokenizer for JSON-like syntax highlighting
function highlight(code: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  // Split on string literals, keys, booleans/numbers
  const regex = /("(?:[^"\\]|\\.)*")|(true|false|null)|(-?\d+(?:\.\d+)?)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(code)) !== null) {
    if (match.index > last) {
      parts.push(code.slice(last, match.index))
    }
    const [full, str, bool, num] = match
    if (str) {
      // Key (followed by colon) vs string value
      const after = code.slice(match.index + full.length).trimStart()
      if (after.startsWith(':')) {
        parts.push(<span key={match.index} style={{ color: '#7ecfc9' }}>{str}</span>)
      } else {
        parts.push(<span key={match.index} style={{ color: '#a8d5a2' }}>{str}</span>)
      }
    } else if (bool || num) {
      parts.push(<span key={match.index} style={{ color: '#e8b88a' }}>{full}</span>)
    }
    last = match.index + full.length
  }
  if (last < code.length) parts.push(code.slice(last))
  return parts
}

export function CodeBlock({ children, label = 'JSON' }: CodeBlockProps) {
  return (
    <div className="relative bg-ink rounded-xl px-7 py-6 overflow-x-auto my-5 mb-8">
      <span className="absolute top-3 right-4 font-mono text-[10px] text-[#2e2d2a] tracking-[0.1em] uppercase">
        {label}
      </span>
      <pre className="font-mono text-[12.5px] leading-[1.7] text-[#b8b4ac] whitespace-pre">
        {highlight(children)}
      </pre>
    </div>
  )
}
