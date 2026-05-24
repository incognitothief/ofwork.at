import type { Field } from '../types'

interface FieldTableProps {
  fields: Field[]
}

export function FieldTable({ fields }: FieldTableProps) {
  return (
    <div className="w-full overflow-x-auto my-4 mb-8">
      <table className="field-table w-full border-collapse text-[13.5px]">
        <thead>
          <tr className="border-b border-rule">
            {['Field', 'Type', 'Description'].map((h) => (
              <th key={h} className="text-left px-3 py-2 pb-2.5 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-4 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field, i) => (
            <tr key={field.name} className={i < fields.length - 1 ? 'border-b border-paper-3' : ''}>
              <td className="px-3 py-3 align-top whitespace-nowrap">
                <span className="font-mono text-[13px] text-ink font-medium">{field.name}</span>
                {field.required && (
                  <span className="inline-block bg-ink text-paper font-mono text-[9px] px-1.5 py-px rounded ml-1.5 tracking-[0.08em] align-middle">
                    required
                  </span>
                )}
              </td>
              <td className="px-3 py-3 align-top font-mono text-[12px] text-ink-3 whitespace-nowrap">
                {field.type}
              </td>
              <td className="px-3 py-3 align-top text-ink-2 font-light leading-relaxed">
                {field.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
