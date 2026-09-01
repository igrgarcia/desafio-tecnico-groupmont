import { companies, kpis } from '../data/mockData'
import type {
  AlertSeverity,
  Channel,
  Company,
  CompanyFilter,
  Deal,
  FilterState,
  Forecast,
  FunnelSnapshot,
  MarketingCampaign,
  Period,
  SalesRep,
} from '../types'

// A referência fixa torna os cenários mockados reproduzíveis em demonstrações.
export const DATA_REFERENCE_DATE = new Date('2026-08-31T12:00:00')

export const formatCurrency = (value: number, compact = false) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)

export const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR').format(Math.round(value))
export const formatPercent = (value: number, digits = 0) =>
  new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
export const formatDate = (value: string) => new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T12:00:00`))

export const sumBy = <T>(items: T[], selector: (item: T) => number | undefined) =>
  items.reduce((total, item) => total + (selector(item) ?? 0), 0)

const dateAtNoon = (date: string) => new Date(`${date}T12:00:00`)

export function getPeriodStart(period: Period) {
  const end = new Date(DATA_REFERENCE_DATE)
  if (period === '7d') {
    end.setDate(end.getDate() - 6)
    return end
  }
  if (period === 'month') return new Date(end.getFullYear(), end.getMonth(), 1, 12)
  if (period === 'quarter') return new Date(end.getFullYear(), Math.floor(end.getMonth() / 3) * 3, 1, 12)
  return new Date(end.getFullYear(), 0, 1, 12)
}

export const isDateInPeriod = (date: string, period: Period) => {
  const value = dateAtNoon(date)
  return value >= getPeriodStart(period) && value <= DATA_REFERENCE_DATE
}

export const periodMultiplier = (period: Period) => ({ '7d': 7 / 31, month: 1, quarter: 3, year: 8 }[period])

export const companyTarget = (company: Company, period: Period) => company.targetMonthlyRevenue * periodMultiplier(period)

export function matchesBaseFilters(
  item: { companyId: string; channel?: Channel; salesRepId?: string },
  filters: FilterState,
) {
  return (
    (filters.companyId === 'all' || item.companyId === filters.companyId) &&
    (filters.channel === 'all' || item.channel === filters.channel) &&
    (filters.salesRepId === 'all' || item.salesRepId === filters.salesRepId)
  )
}

export const filterDeals = (items: Deal[], filters: FilterState) =>
  items.filter((item) => matchesBaseFilters(item, filters) && isDateInPeriod(item.createdAt, filters.period))

export const filterCampaigns = (items: MarketingCampaign[], filters: FilterState) =>
  items.filter((item) => matchesBaseFilters(item, filters) && isDateInPeriod(item.date, filters.period))

export interface CompanyMetrics {
  revenue: number
  target: number
  attainment: number
  pipeline: number
  marketingSpend: number
  leads: number
  sales: number
  cac: number
  operatingProfit: number
  margin: number
  previousRevenue: number
  change: number
}

export function getCompanyMetrics(
  company: Company,
  deals: Deal[],
  campaigns: MarketingCampaign[],
  filters: FilterState,
): CompanyMetrics {
  const companyFilters: FilterState = { ...filters, companyId: company.id }
  const scopedDeals = filterDeals(deals, companyFilters)
  const scopedCampaigns = filterCampaigns(campaigns, companyFilters)
  const revenue = sumBy(scopedDeals, (deal) => deal.actualRevenue)
  const target = companyTarget(company, filters.period)
  const pipeline = sumBy(scopedDeals.filter((deal) => deal.probability < 1), (deal) => deal.amount * deal.probability)
  const marketingSpend = sumBy(scopedCampaigns, (campaign) => campaign.spend)
  const leads = sumBy(scopedCampaigns, (campaign) => campaign.leads)
  const sales = sumBy(scopedCampaigns, (campaign) => campaign.sales)
  const snapshot = kpis.find((item) => item.companyId === company.id)
  const operatingProfit = snapshot ? snapshot.operatingProfit * periodMultiplier(filters.period) : 0
  const previousRevenue = snapshot ? snapshot.previousRevenue * periodMultiplier(filters.period) : 0
  return {
    revenue,
    target,
    attainment: target ? revenue / target : 0,
    pipeline,
    marketingSpend,
    leads,
    sales,
    cac: sales ? marketingSpend / sales : 0,
    operatingProfit,
    margin: revenue ? operatingProfit / revenue : 0,
    previousRevenue,
    change: previousRevenue ? (revenue - previousRevenue) / previousRevenue : 0,
  }
}

export function getAggregateMetrics(deals: Deal[], campaigns: MarketingCampaign[], filters: FilterState) {
  const visibleCompanies = companies.filter((company) => filters.companyId === 'all' || company.id === filters.companyId)
  const metrics = visibleCompanies.map((company) => getCompanyMetrics(company, deals, campaigns, filters))
  const revenue = sumBy(metrics, (item) => item.revenue)
  const target = sumBy(metrics, (item) => item.target)
  const previousRevenue = sumBy(metrics, (item) => item.previousRevenue)
  return {
    revenue,
    target,
    attainment: target ? revenue / target : 0,
    pipeline: sumBy(metrics, (item) => item.pipeline),
    marketingSpend: sumBy(metrics, (item) => item.marketingSpend),
    leads: sumBy(metrics, (item) => item.leads),
    sales: sumBy(metrics, (item) => item.sales),
    cac: sumBy(metrics, (item) => item.sales) ? sumBy(metrics, (item) => item.marketingSpend) / sumBy(metrics, (item) => item.sales) : 0,
    operatingProfit: sumBy(metrics, (item) => item.operatingProfit),
    margin: revenue ? sumBy(metrics, (item) => item.operatingProfit) / revenue : 0,
    previousRevenue,
    change: previousRevenue ? (revenue - previousRevenue) / previousRevenue : 0,
  }
}

export function getFunnelMetrics(company: Company, snapshots: FunnelSnapshot[], filters: FilterState) {
  const values = snapshots.filter(
    (snapshot) => snapshot.companyId === company.id && isDateInPeriod(snapshot.date, filters.period),
  )
  return company.funnel.map((stage, index) => {
    const volume = values.find((item) => item.stage === stage.id)?.volume ?? 0
    const previous = index === 0 ? volume : values.find((item) => item.stage === company.funnel[index - 1].id)?.volume ?? 0
    return {
      ...stage,
      volume,
      conversion: previous ? volume / previous : 0,
      loss: previous ? 1 - volume / previous : 0,
    }
  })
}

export function getSalesRanking(deals: Deal[], reps: SalesRep[], filters: FilterState) {
  const relevantReps = reps.filter(
    (rep) => (filters.companyId === 'all' || rep.companyId === filters.companyId) && (filters.salesRepId === 'all' || rep.id === filters.salesRepId),
  )
  const scopedDeals = filterDeals(deals, filters)
  return relevantReps.map((rep) => {
    const repDeals = scopedDeals.filter((deal) => deal.salesRepId === rep.id)
    const revenue = sumBy(repDeals, (deal) => deal.actualRevenue)
    const pipeline = sumBy(repDeals.filter((deal) => deal.probability < 1), (deal) => deal.amount * deal.probability)
    return {
      ...rep,
      revenue,
      pipeline,
      cycleDays: repDeals.length ? sumBy(repDeals, (deal) => deal.cycleDays) / repDeals.length : 0,
      attainment: rep.target ? revenue / (rep.target * periodMultiplier(filters.period)) : 0,
      deals: repDeals.length,
    }
  }).sort((a, b) => b.revenue + b.pipeline - (a.revenue + a.pipeline))
}

export function getMarketingChannels(campaigns: MarketingCampaign[], filters: FilterState) {
  const scoped = filterCampaigns(campaigns, filters)
  const grouped = new Map<string, MarketingCampaign[]>()
  scoped.forEach((campaign) => grouped.set(campaign.channel, [...(grouped.get(campaign.channel) ?? []), campaign]))
  return [...grouped.entries()].map(([channel, items]) => {
    const spend = sumBy(items, (item) => item.spend)
    const leads = sumBy(items, (item) => item.leads)
    const sales = sumBy(items, (item) => item.sales)
    const revenue = sumBy(items, (item) => item.revenue)
    return {
      channel,
      spend,
      leads,
      opportunities: sumBy(items, (item) => item.opportunities),
      meetings: sumBy(items, (item) => item.meetings),
      sales,
      revenue,
      cpl: leads ? spend / leads : 0,
      cac: sales ? spend / sales : 0,
      roas: spend ? revenue / spend : 0,
      quality: sumBy(items, (item) => item.qualityScore) / items.length,
    }
  }).sort((a, b) => b.revenue - a.revenue)
}

export function getForecast(deals: Deal[], filters: FilterState): Forecast {
  const monthlyFilters: FilterState = { ...filters, period: 'month' }
  const actual = sumBy(filterDeals(deals, monthlyFilters), (deal) => deal.actualRevenue)
  const visibleCompanies = companies.filter((company) => filters.companyId === 'all' || company.id === filters.companyId)
  const target = sumBy(visibleCompanies, (company) => company.targetMonthlyRevenue)
  const elapsedDays = 21
  const remainingDays = 10
  const dailyRunRate = actual / elapsedDays
  const projected = dailyRunRate * (elapsedDays + remainingDays)
  const gap = Math.max(target - projected, 0)
  return { target, actual, projected, gap, dailyRunRate, requiredDailyRate: gap / remainingDays, elapsedDays, remainingDays }
}

export const getStatus = (attainment: number): AlertSeverity => (attainment >= 0.9 ? 'success' : attainment >= 0.6 ? 'warning' : 'critical')

export const statusLabel: Record<AlertSeverity, string> = {
  success: 'No ritmo',
  warning: 'Atenção',
  critical: 'Risco crítico',
}

export const periodLabels: Record<Period, string> = {
  '7d': 'Últimos 7 dias',
  month: 'Mês atual',
  quarter: 'Último trimestre',
  year: 'Ano atual',
}

export const companyName = (id: CompanyFilter) => companies.find((company) => company.id === id)?.name ?? 'Grupo Mont'
