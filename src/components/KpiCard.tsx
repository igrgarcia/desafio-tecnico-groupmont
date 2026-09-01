import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { formatPercent } from '../utils/calculations'

interface KpiCardProps {
  label: string
  value: string
  meta?: string
  change?: number
  description: string
  tone?: 'default' | 'accent'
}

export function KpiCard({ label, value, meta, change, description, tone = 'default' }: KpiCardProps) {
  return (
    <article className={`metric-card rounded-2xl border p-5 ${tone === 'accent' ? 'metric-card-accent' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {change !== undefined && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${change > 0 ? 'bg-emerald-50 text-emerald-700' : change < 0 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
            {change > 0 ? <ArrowUpRight size={13} /> : change < 0 ? <ArrowDownRight size={13} /> : <Minus size={13} />}
            {formatPercent(Math.abs(change))}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      {meta && <p className="mt-1 text-sm font-medium text-slate-600">{meta}</p>}
      <p className="mt-3 text-xs leading-5 text-slate-500">{description}</p>
    </article>
  )
}
