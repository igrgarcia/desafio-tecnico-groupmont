export type CompanyId = 'montseguro' | 'prop5' | 'techbrabo'
export type CompanyFilter = CompanyId | 'all'
export type Period = '7d' | 'month' | 'quarter' | 'year'
export type Channel = 'Google Ads' | 'Meta Ads' | 'Outbound' | 'Indicação' | 'Orgânico'
export type ChannelFilter = Channel | 'all'
export type DealType = 'health-plan' | 'real-estate' | 'project' | 'mrr' | 'support'
export type AlertSeverity = 'success' | 'warning' | 'critical'

export interface Company {
  id: CompanyId
  name: string
  shortName: string
  description: string
  color: string
  targetMonthlyRevenue: number
  marginTarget: number
  funnel: FunnelStage[]
}

export interface FunnelStage {
  id: string
  label: string
  probability: number
}

export interface SalesRep {
  id: string
  name: string
  initials: string
  companyId: CompanyId
  role: string
  target: number
}

export interface Lead {
  id: string
  companyId: CompanyId
  name: string
  channel: Channel
  salesRepId: string
  createdAt: string
  stage: string
  qualityScore: number
}

export interface Deal {
  id: string
  companyId: CompanyId
  title: string
  client: string
  salesRepId: string
  leadId: string
  channel: Channel
  stage: string
  type: DealType
  amount: number
  probability: number
  actualRevenue: number
  createdAt: string
  closedAt?: string
  cycleDays: number
  lives?: number
  operator?: string
  implementationStatus?: 'pending' | 'completed' | 'lost'
  propertyValue?: number
  country?: string
  projectRevenue?: number
  mrr?: number
  soldHours?: number
  capacityHours?: number
  churned?: boolean
}

export interface FunnelSnapshot {
  id: string
  companyId: CompanyId
  stage: string
  volume: number
  date: string
}

export interface MarketingCampaign {
  id: string
  companyId: CompanyId
  name: string
  channel: Channel
  date: string
  spend: number
  leads: number
  opportunities: number
  meetings: number
  sales: number
  revenue: number
  qualityScore: number
}

export interface KpiSnapshot {
  id: string
  companyId: CompanyId
  date: string
  operatingProfit: number
  marketingInvestment: number
  previousRevenue: number
}

export interface Alert {
  id: string
  companyId: CompanyId
  severity: AlertSeverity
  title: string
  detail: string
  metric: string
  createdAt: string
}

export interface FilterState {
  period: Period
  companyId: CompanyFilter
  channel: ChannelFilter
  salesRepId: string
}

export interface Forecast {
  target: number
  actual: number
  projected: number
  gap: number
  dailyRunRate: number
  requiredDailyRate: number
  elapsedDays: number
  remainingDays: number
}
