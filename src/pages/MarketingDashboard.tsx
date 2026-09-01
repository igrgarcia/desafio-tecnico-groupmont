import { BadgeCheck, MousePointerClick, Sparkles, TrendingDown, UsersRound } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { KpiCard } from '../components/KpiCard'
import { Panel } from '../components/Panel'
import { marketingCampaigns } from '../data/mockData'
import { useFilters } from '../context/FilterContext'
import { formatCurrency, formatNumber, formatPercent, getMarketingChannels, sumBy } from '../utils/calculations'

export function MarketingDashboard() {
  const { filters } = useFilters()
  const channels = getMarketingChannels(marketingCampaigns, filters)
  const totals = { spend: sumBy(channels, (item) => item.spend), leads: sumBy(channels, (item) => item.leads), opportunities: sumBy(channels, (item) => item.opportunities), meetings: sumBy(channels, (item) => item.meetings), sales: sumBy(channels, (item) => item.sales), revenue: sumBy(channels, (item) => item.revenue) }
  const cpl = totals.leads ? totals.spend / totals.leads : 0
  const cac = totals.sales ? totals.spend / totals.sales : 0
  const roas = totals.spend ? totals.revenue / totals.spend : 0
  const sourceFunnel = [{ step: 'Investimento', value: totals.spend }, { step: 'Leads', value: totals.leads }, { step: 'Oportunidades', value: totals.opportunities }, { step: 'Reuniões', value: totals.meetings }, { step: 'Vendas', value: totals.sales }]
  const filteredCampaigns = marketingCampaigns.filter((campaign) => (filters.companyId === 'all' || campaign.companyId === filters.companyId) && (filters.channel === 'all' || campaign.channel === filters.channel))
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Investimento" value={formatCurrency(totals.spend, true)} meta={`${formatNumber(totals.leads)} leads gerados`} change={0.05} description="Verba de mídia, aquisição e programas de indicação." />
        <KpiCard label="CPL" value={formatCurrency(cpl)} meta="Custo por lead" change={-0.11} description="Custo de aquisição de cada novo contato." tone="accent" />
        <KpiCard label="CAC" value={formatCurrency(cac)} meta={`${formatNumber(totals.sales)} vendas atribuídas`} change={0.07} description="Investimento por cliente vendido pela origem." />
        <KpiCard label="ROAS atribuído" value={`${roas.toFixed(1)}x`} meta={formatCurrency(totals.revenue, true)} change={0.16} description="Receita atribuída dividida pela verba investida." />
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Panel title="Jornada de aquisição" subtitle="Investimento → Lead → oportunidade → reunião → venda">
          <div className="grid gap-3 sm:grid-cols-5">{sourceFunnel.map((item, index) => <div key={item.step} className="relative rounded-xl bg-slate-50 p-4 last:bg-sky-50"><p className="text-xs font-semibold text-slate-500">{item.step}</p><p className="mt-2 text-xl font-bold tracking-tight text-slate-900">{index === 0 ? formatCurrency(item.value, true) : formatNumber(item.value)}</p>{index > 0 && <p className="mt-1 text-xs text-slate-400">{formatPercent(item.value / Math.max(sourceFunnel[index - 1].value, 1))} da etapa anterior</p>}</div>)}</div>
          <div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={channels} margin={{ left: 0, right: 8 }}><CartesianGrid vertical={false} stroke="#e2e8f0" /><XAxis dataKey="channel" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} /><YAxis tickFormatter={(value) => formatCurrency(value, true)} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={60} /><Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name === 'spend' ? 'Investimento' : 'Receita']} /><Legend formatter={(value) => value === 'spend' ? 'Investimento' : 'Receita atribuída'} /><Bar dataKey="spend" fill="#cbd5e1" radius={[5, 5, 0, 0]} /><Bar dataKey="revenue" fill="#0ea5e9" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Qualidade por canal" subtitle="Qualidade combinada de perfil, intenção e avanço">
          <div className="space-y-4">{channels.map((item) => <div key={item.channel}><div className="flex justify-between gap-3 text-sm"><span className="font-medium text-slate-700">{item.channel}</span><span className="font-semibold text-slate-800">{Math.round(item.quality)}/100</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${item.quality}%` }} /></div><div className="mt-1.5 flex justify-between text-xs text-slate-400"><span>{formatNumber(item.opportunities)} oportunidades</span><span>ROAS {item.roas.toFixed(1)}x</span></div></div>)}</div>
          <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4"><div className="flex gap-2"><Sparkles className="shrink-0 text-emerald-600" size={18} /><div><p className="text-sm font-bold text-emerald-900">Prioridade de orçamento</p><p className="mt-1 text-sm leading-5 text-emerald-800">{channels[0]?.channel ?? '—'} combina maior receita atribuída e qualidade. Proteja esse investimento antes de escalar canais com CAC pressionado.</p></div></div></div>
        </Panel>
      </div>
      <Panel title="Campanhas e eficiência" subtitle="Resultados atribuídos à origem; receita reconhecida é acompanhada no cockpit comercial">
        <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><tr><th className="pb-3 font-semibold">Campanha</th><th className="pb-3 font-semibold">Canal</th><th className="pb-3 font-semibold">Leads</th><th className="pb-3 font-semibold">CPL</th><th className="pb-3 font-semibold">CAC</th><th className="pb-3 font-semibold">ROAS</th><th className="pb-3 font-semibold">Qualidade</th></tr></thead><tbody>{filteredCampaigns.map((campaign) => { const campaignCpl = campaign.spend / campaign.leads; const campaignCac = campaign.spend / campaign.sales; const campaignRoas = campaign.revenue / campaign.spend; return <tr key={campaign.id} className="border-b border-slate-50 last:border-0"><td className="py-4"><p className="font-semibold text-slate-800">{campaign.name}</p><p className="text-xs text-slate-400">{campaign.companyId === 'montseguro' ? 'Montseguro' : campaign.companyId === 'prop5' ? 'Prop5' : 'TechBrabo'}</p></td><td className="py-4 text-slate-600">{campaign.channel}</td><td className="py-4 text-slate-600">{formatNumber(campaign.leads)}</td><td className="py-4 text-slate-600">{formatCurrency(campaignCpl)}</td><td className="py-4 text-slate-600">{formatCurrency(campaignCac)}</td><td className="py-4 font-semibold text-slate-800">{campaignRoas.toFixed(1)}x</td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${campaign.qualityScore >= 80 ? 'bg-emerald-50 text-emerald-700' : campaign.qualityScore >= 65 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{campaign.qualityScore}/100</span></td></tr> })}</tbody></table></div>
        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-3"><span className="flex items-center gap-2"><MousePointerClick size={16} className="text-sky-600" /> CPL mede volume de entrada</span><span className="flex items-center gap-2"><UsersRound size={16} className="text-violet-600" /> CAC mede clientes adquiridos</span><span className="flex items-center gap-2"><BadgeCheck size={16} className="text-emerald-600" /> Qualidade prioriza avanço</span></div>
      </Panel>
      {channels.some((item) => item.cac > cac * 1.2) && <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900"><TrendingDown size={18} /><span>Há canais com CAC acima da média consolidada. Use a tabela para redistribuir orçamento com base em qualidade e receita atribuída.</span></div>}
    </div>
  )
}
