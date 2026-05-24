type CalloutVariant = 'info' | 'warning'

interface CalloutProps {
  variant: CalloutVariant
  children: React.ReactNode
}

export function Callout({ variant, children }: CalloutProps) {
  const styles = {
    info: 'bg-accent-light border-accent-2 text-accent',
    warning: 'bg-[#fdf5e8] border-[#c8821a] text-[#7a4f10]',
  }
  return (
    <div className={`rounded-lg px-6 py-5 my-6 border-l-[3px] ${styles[variant]}`}>
      <p className="text-[14px] leading-relaxed m-0">{children}</p>
    </div>
  )
}
