import { Activity, ArrowUpRight, CircleAlert, CircleCheck, CircleX, Target } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { KpiCard } from '../components/KpiCard'
import { Panel } from '../components/Panel'
import { companies, deals, marketingCampaigns } from '../data/mockData'
import { useFilters } from '../context/FilterContext'
import { formatCurrency, formatPercent, getAggregateMetrics, getCompanyMetrics, getStatus, statusLabel } from '../utils/calculations'
import type { AlertSeverity } from '../types'

const statusStyle: Record<AlertSeverity, { icon: typeof CircleCheck; badge: string; ring: string }> = {
  success: { icon: CircleCheck, badge: 'bg-emerald-50 text-emerald-700', ring: 'border-emerald-100' },
  warning: { icon: CircleAlert, badge: 'bg-amber-50 text-amber-700', ring: 'border-amber-100' },
  critical: { icon: CircleX, badge: 'bg-rose-50 text-rose-700', ring: 'border-rose-100' },
}

export function CEOOverview() {
  const { filters } = useFilters()
  const aggregate = getAggregateMetrics(deals, marketingCampaigns, filters)
  const visibleCompanies = companies.filter((company) => filters.companyId === 'all' || company.id === filters.companyId)
  const comparison = visibleCompanies.map((company) => {
    const metrics = getCompanyMetrics(company, deals, marketingCampaigns, filters)
    return { ...company, ...metrics, attainmentPct: Math.round(metrics.attainment * 100) }
  })
  const marketingData = comparison.map((company) => ({ name: company.shortName, value: company.marketingSpend, color: company.color }))
  return (
    <div className="space-y-6">
      <section className="future-hero rounded-2xl p-6 text-white sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-sm font-semibold text-sky-200">Leitura executiva</p><h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">Crescimento com previsibilidade, sem misturar modelos de negócio.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Receita, aquisição e pipeline são consolidados; os indicadores operacionais preservam a lógica própria de cada empresa.</p></div>
          <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"><p className="text-xs font-medium text-sky-200">Atingimento consolidado</p><p className="mt-1 text-2xl font-bold">{formatPercent(aggregate.attainment)}</p><div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-sky-400" style={{ width: `${Math.min(aggregate.attainment * 100, 100)}%` }} /></div></div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Receita consolidada" value={formatCurrency(aggregate.revenue, true)} meta={`Meta ${formatCurrency(aggregate.target, true)}`} change={aggregate.change} description="Receita realizada pelos negócios fechados no período." tone="accent" />
        <KpiCard label="CAC geral" value={formatCurrency(aggregate.cac)} meta={`${aggregate.sales} vendas atribuídas`} change={-0.08} description="Investimento de marketing dividido pelas vendas atribuídas." />
        <KpiCard label="Pipeline ponderado" value={formatCurrency(aggregate.pipeline, true)} meta={`${formatPercent(aggregate.pipeline / Math.max(aggregate.target, 1))} da meta`} change={0.14} description="Valor em aberto multiplicado pela probabilidade da fase." />
        <KpiCard label="Margem operacional" value={formatPercent(aggregate.margin)} meta={formatCurrency(aggregate.operatingProfit, true)} change={0.03} description="Lucro operacional sobre a receita realizada." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <Panel title="Faturamento e atingimento por empresa" subtitle="Receita realizada comparada à meta do período">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="shortName" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tickFormatter={(value) => formatCurrency(value, true)} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={68} />
                <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name === 'revenue' ? 'Realizado' : 'Meta']} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="revenue" name="revenue" radius={[7, 7, 0, 0]}>{comparison.map((entry) => <Cell key={entry.id} fill={entry.color} />)}</Bar>
                <Bar dataKey="target" name="target" fill="#cbd5e1" radius={[7, 7, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Receita realizada</span><span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-slate-300" /> Meta do período</span></div>
        </Panel>
        <Panel title="Eficiência do investimento" subtitle="Distribuição do orçamento de marketing">
          <div className="flex h-72 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={marketingData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={94} paddingAngle={4}>{marketingData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip formatter={(value) => formatCurrency(Number(value))} /></PieChart>
            </ResponsiveContainer>
          </div>
          <div className="-mt-2 space-y-2">{comparison.map((company) => <div key={company.id} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-600"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: company.color }} />{company.name}</span><span className="font-semibold text-slate-800">{formatCurrency(company.marketingSpend, true)}</span></div>)}</div>
        </Panel>
      </div>

      <Panel title="Semáforo executivo" subtitle="Status composto por ritmo de receita e risco operacional prioritário">
        <div className="grid gap-4 lg:grid-cols-3">
          {comparison.map((company) => {
            const status = getStatus(company.attainment)
            const style = statusStyle[status]
            const Icon = style.icon
            const justification = company.id === 'montseguro' ? 'A perda entre contratação e implantação pede acompanhamento diário.' : company.id === 'prop5' ? 'Boa qualidade nas indicações, com ciclo consultivo ainda pressionando o caixa.' : 'Pipeline saudável, mas a ocupação de engenharia limita novas entregas.'
            return <article key={company.id} className={`rounded-xl border p-4 ${style.ring}`}>
              <div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900">{company.name}</p><p className="mt-1 text-sm text-slate-500">{formatCurrency(company.revenue, true)} de {formatCurrency(company.target, true)}</p></div><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${style.badge}`}><Icon size={14} />{statusLabel[status]}</span></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${Math.min(company.attainment * 100, 100)}%`, backgroundColor: company.color }} /></div>
              <p className="mt-3 text-sm leading-5 text-slate-600">{justification}</p>
            </article>
          })}
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"><Activity size={17} className="text-sky-600" /> <span><strong className="text-slate-800">Sinal de gestão:</strong> receita contratada, receita reconhecida e capacidade são acompanhadas separadamente.</span><ArrowUpRight size={16} className="ml-auto text-sky-600" /></div>
      </Panel>
    </div>
  )
}
