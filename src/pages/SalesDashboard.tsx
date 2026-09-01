import { AlertTriangle, BadgeDollarSign, Clock3, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { KpiCard } from '../components/KpiCard'
import { Panel } from '../components/Panel'
import { companies, deals, funnelSnapshots, marketingCampaigns, salesReps } from '../data/mockData'
import { useFilters } from '../context/FilterContext'
import { formatCurrency, formatPercent, getCompanyMetrics, getFunnelMetrics, getSalesRanking } from '../utils/calculations'
import type { CompanyId } from '../types'

export function SalesDashboard() {
  const { filters } = useFilters()
  const [selectedCompany, setSelectedCompany] = useState<CompanyId>('montseguro')
  const activeCompanyId = filters.companyId === 'all' ? selectedCompany : filters.companyId
  const company = companies.find((item) => item.id === activeCompanyId)!
  const scopedFilters = { ...filters, companyId: company.id }
  const metrics = getCompanyMetrics(company, deals, marketingCampaigns, scopedFilters)
  const funnel = getFunnelMetrics(company, funnelSnapshots, scopedFilters)
  const bottleneck = funnel.slice(1).reduce((worst, item) => item.loss > worst.loss ? item : worst, funnel[1])
  const ranking = getSalesRanking(deals, salesReps, scopedFilters)
  const maxVolume = Math.max(...funnel.map((item) => item.volume), 1)
  const funnelChart = funnel.map((item) => ({ name: item.label, volume: item.volume }))
  const finalStage = funnel[funnel.length - 1]
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm text-slate-500">Modelo comercial selecionado</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{company.name}</h2></div>
        <div className="section-tabs flex rounded-xl border p-1">{companies.map((item) => <button key={item.id} onClick={() => setSelectedCompany(item.id)} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${company.id === item.id ? 'tab-button--active text-white' : 'text-slate-500 hover:bg-white/70'}`}>{item.shortName}</button>)}</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Pipeline ponderado" value={formatCurrency(metrics.pipeline, true)} meta={`${formatPercent(metrics.pipeline / Math.max(metrics.target, 1))} da meta`} change={0.12} description="Valor esperado com base na probabilidade atual." tone="accent" />
        <KpiCard label="Conversão final" value={formatPercent((finalStage?.volume ?? 0) / Math.max(funnel[0]?.volume ?? 1, 1))} meta={`${finalStage?.volume ?? 0} operações no estágio final`} change={-0.04} description="Volume no último estágio sobre a entrada do funil." />
        <KpiCard label="Maior gargalo" value={formatPercent(bottleneck.loss)} meta={bottleneck.label} change={-bottleneck.loss} description="Maior perda de uma etapa para a seguinte." />
        <KpiCard label="Ciclo médio" value={`${Math.round(ranking.reduce((sum, rep) => sum + rep.cycleDays, 0) / Math.max(ranking.length, 1))} dias`} meta={`${ranking.length} responsáveis ativos`} change={-0.06} description="Tempo médio de avanço dos negócios em carteira." />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Panel title="Funil interativo" subtitle="Volume e conversão entre as etapas exatas desta operação">
          <div className="space-y-3">{funnel.map((stage, index) => <div key={stage.id} className="group grid grid-cols-[minmax(120px,1.1fr)_2fr_50px] items-center gap-3 text-sm"><div><p className="font-medium text-slate-700">{stage.label}</p>{index > 0 && <p className={`text-xs ${stage.loss === bottleneck.loss ? 'font-semibold text-rose-600' : 'text-slate-400'}`}>{index === 0 ? '' : `conv. ${formatPercent(stage.conversion)}`}</p>}</div><div className="h-8 overflow-hidden rounded-lg bg-slate-100"><div className={`flex h-full items-center rounded-lg px-3 text-xs font-bold text-white transition-all ${stage.loss === bottleneck.loss && index > 0 ? 'bg-rose-500' : ''}`} style={{ width: `${Math.max((stage.volume / maxVolume) * 100, 10)}%`, backgroundColor: stage.loss === bottleneck.loss && index > 0 ? undefined : company.color }}>{stage.volume}</div></div><span className="text-right font-semibold text-slate-700">{stage.volume}</span></div>)}</div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-800"><AlertTriangle className="mt-0.5 shrink-0" size={17} /><span><strong>Gargalo identificado:</strong> a transição para <strong>{bottleneck.label}</strong> perde {formatPercent(bottleneck.loss)} do volume anterior.</span></div>
        </Panel>
        <Panel title="Leitura de volume" subtitle="Distribuição das oportunidades no funil">
          <div className="h-[440px]"><ResponsiveContainer width="100%" height="100%"><BarChart layout="vertical" data={funnelChart} margin={{ left: 8, right: 12 }}><CartesianGrid horizontal={false} stroke="#e2e8f0" /><XAxis type="number" hide /><YAxis dataKey="name" type="category" width={142} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} /><Tooltip formatter={(value) => [Number(value), 'Volume']} cursor={{ fill: '#f8fafc' }} /><Bar dataKey="volume" fill={company.color} radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div>
        </Panel>
      </div>
      <Panel title="Produtividade por responsável" subtitle="Receita reconhecida, pipeline e velocidade de ciclo">
        <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><tr><th className="pb-3 font-semibold">Responsável</th><th className="pb-3 font-semibold">Realizado</th><th className="pb-3 font-semibold">Pipeline</th><th className="pb-3 font-semibold">Ciclo médio</th><th className="pb-3 font-semibold">Atingimento</th></tr></thead><tbody>{ranking.map((rep, index) => <tr key={rep.id} className="border-b border-slate-50 last:border-0"><td className="py-4"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">{index === 0 ? <Trophy size={15} className="text-amber-500" /> : rep.initials}</span><div><p className="font-semibold text-slate-800">{rep.name}</p><p className="text-xs text-slate-500">{rep.role}</p></div></div></td><td className="py-4 font-semibold text-slate-800">{formatCurrency(rep.revenue)}</td><td className="py-4 text-slate-600">{formatCurrency(rep.pipeline)}</td><td className="py-4 text-slate-600"><span className="inline-flex items-center gap-1"><Clock3 size={14} />{Math.round(rep.cycleDays)} dias</span></td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${rep.attainment >= .75 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{formatPercent(rep.attainment)}</span></td></tr>)}</tbody></table></div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><BadgeDollarSign size={15} className="text-sky-600" /> Pipeline e realizado não são equivalentes: apenas receita reconhecida compõe o realizado.</div>
      </Panel>
    </div>
  )
}
