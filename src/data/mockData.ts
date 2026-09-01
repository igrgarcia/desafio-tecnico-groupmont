import type {
  Alert,
  Company,
  Deal,
  FunnelSnapshot,
  KpiSnapshot,
  Lead,
  MarketingCampaign,
  SalesRep,
} from '../types'

export const companies: Company[] = [
  {
    id: 'montseguro',
    name: 'Montseguro',
    shortName: 'Mont',
    description: 'Planos de saúde empresariais para PME e MEI',
    color: '#0ea5e9',
    targetMonthlyRevenue: 185000,
    marginTarget: 0.24,
    funnel: [
      { id: 'lead', label: 'Lead', probability: 0.05 },
      { id: 'attendance', label: 'Atendimento', probability: 0.1 },
      { id: 'qualification', label: 'Qualificação', probability: 0.18 },
      { id: 'quote', label: 'Simulação / Cotação', probability: 0.3 },
      { id: 'presentation', label: 'Apresentação', probability: 0.45 },
      { id: 'proposal', label: 'Proposta', probability: 0.6 },
      { id: 'contracting', label: 'Contratação', probability: 0.8 },
      { id: 'implementation', label: 'Implantação', probability: 0.92 },
      { id: 'active', label: 'Ativo', probability: 1 },
    ],
  },
  {
    id: 'prop5',
    name: 'Prop5 Investimentos',
    shortName: 'Prop5',
    description: 'Consultoria imobiliária para expatriados — Método M5',
    color: '#a855f7',
    targetMonthlyRevenue: 220000,
    marginTarget: 0.32,
    funnel: [
      { id: 'lead', label: 'Lead', probability: 0.03 },
      { id: 'contact', label: 'Contato', probability: 0.07 },
      { id: 'qualification', label: 'Qualificação', probability: 0.12 },
      { id: 'financial-diagnosis', label: 'Diagnóstico Financeiro', probability: 0.2 },
      { id: 'consultative-meeting', label: 'Reunião Consultiva', probability: 0.3 },
      { id: 'strategy', label: 'Estratégia', probability: 0.42 },
      { id: 'opportunity', label: 'Oportunidade', probability: 0.55 },
      { id: 'negotiation', label: 'Negociação', probability: 0.68 },
      { id: 'structuring', label: 'Estruturação', probability: 0.82 },
      { id: 'closed', label: 'Fechamento', probability: 0.95 },
      { id: 'follow-up', label: 'Acompanhamento', probability: 1 },
    ],
  },
  {
    id: 'techbrabo',
    name: 'TechBrabo',
    shortName: 'Tech',
    description: 'Software, APIs e projetos B2B',
    color: '#f97316',
    targetMonthlyRevenue: 260000,
    marginTarget: 0.28,
    funnel: [
      { id: 'lead', label: 'Prospecção / Lead', probability: 0.04 },
      { id: 'qualification', label: 'Qualificação', probability: 0.1 },
      { id: 'meeting', label: 'Reunião', probability: 0.18 },
      { id: 'diagnosis', label: 'Diagnóstico', probability: 0.28 },
      { id: 'proposal', label: 'Proposta', probability: 0.45 },
      { id: 'negotiation', label: 'Negociação', probability: 0.62 },
      { id: 'contract', label: 'Contrato', probability: 0.78 },
      { id: 'development', label: 'Desenvolvimento / Implantação', probability: 0.88 },
      { id: 'delivery', label: 'Entrega', probability: 0.95 },
      { id: 'support', label: 'Sustentação', probability: 1 },
    ],
  },
]

export const salesReps: SalesRep[] = [
  { id: 'm-camila', name: 'Camila Nunes', initials: 'CN', companyId: 'montseguro', role: 'Executiva PME', target: 90000 },
  { id: 'm-rafael', name: 'Rafael Lima', initials: 'RL', companyId: 'montseguro', role: 'Executivo MEI', target: 70000 },
  { id: 'p-helena', name: 'Helena Costa', initials: 'HC', companyId: 'prop5', role: 'Consultora M5', target: 110000 },
  { id: 'p-igor', name: 'Igor Martins', initials: 'IM', companyId: 'prop5', role: 'Consultor M5', target: 110000 },
  { id: 't-livia', name: 'Lívia Souza', initials: 'LS', companyId: 'techbrabo', role: 'Business Developer', target: 130000 },
  { id: 't-bruno', name: 'Bruno Reis', initials: 'BR', companyId: 'techbrabo', role: 'Enterprise AE', target: 130000 },
]

export const leads: Lead[] = [
  { id: 'l01', companyId: 'montseguro', name: 'Giro Foods', channel: 'Google Ads', salesRepId: 'm-camila', createdAt: '2026-08-29', stage: 'proposal', qualityScore: 84 },
  { id: 'l02', companyId: 'montseguro', name: 'Studio Sensa', channel: 'Meta Ads', salesRepId: 'm-rafael', createdAt: '2026-08-28', stage: 'quote', qualityScore: 76 },
  { id: 'l03', companyId: 'montseguro', name: 'Logway Express', channel: 'Indicação', salesRepId: 'm-camila', createdAt: '2026-08-23', stage: 'implementation', qualityScore: 94 },
  { id: 'l04', companyId: 'montseguro', name: 'Alfa Contábil', channel: 'Orgânico', salesRepId: 'm-rafael', createdAt: '2026-08-17', stage: 'qualification', qualityScore: 72 },
  { id: 'l05', companyId: 'montseguro', name: 'Rota 21', channel: 'Google Ads', salesRepId: 'm-camila', createdAt: '2026-08-10', stage: 'attendance', qualityScore: 65 },
  { id: 'l06', companyId: 'montseguro', name: 'Cometa Móveis', channel: 'Meta Ads', salesRepId: 'm-rafael', createdAt: '2026-07-25', stage: 'active', qualityScore: 88 },
  { id: 'l07', companyId: 'prop5', name: 'Ana Ribeiro', channel: 'Indicação', salesRepId: 'p-helena', createdAt: '2026-08-30', stage: 'strategy', qualityScore: 95 },
  { id: 'l08', companyId: 'prop5', name: 'Lucas Fernandes', channel: 'Google Ads', salesRepId: 'p-igor', createdAt: '2026-08-26', stage: 'financial-diagnosis', qualityScore: 78 },
  { id: 'l09', companyId: 'prop5', name: 'Marina Lopes', channel: 'Meta Ads', salesRepId: 'p-helena', createdAt: '2026-08-19', stage: 'negotiation', qualityScore: 89 },
  { id: 'l10', companyId: 'prop5', name: 'Victor Alves', channel: 'Outbound', salesRepId: 'p-igor', createdAt: '2026-08-12', stage: 'contact', qualityScore: 67 },
  { id: 'l11', companyId: 'prop5', name: 'Bruna Melo', channel: 'Orgânico', salesRepId: 'p-helena', createdAt: '2026-08-03', stage: 'opportunity', qualityScore: 86 },
  { id: 'l12', companyId: 'prop5', name: 'Renata Couto', channel: 'Indicação', salesRepId: 'p-igor', createdAt: '2026-07-22', stage: 'follow-up', qualityScore: 98 },
  { id: 'l13', companyId: 'techbrabo', name: 'Atlas Logística', channel: 'Outbound', salesRepId: 't-livia', createdAt: '2026-08-31', stage: 'proposal', qualityScore: 88 },
  { id: 'l14', companyId: 'techbrabo', name: 'Nexo Saúde', channel: 'Google Ads', salesRepId: 't-bruno', createdAt: '2026-08-25', stage: 'diagnosis', qualityScore: 79 },
  { id: 'l15', companyId: 'techbrabo', name: 'Finroute', channel: 'Indicação', salesRepId: 't-livia', createdAt: '2026-08-20', stage: 'development', qualityScore: 96 },
  { id: 'l16', companyId: 'techbrabo', name: 'Casa Verde', channel: 'Meta Ads', salesRepId: 't-bruno', createdAt: '2026-08-13', stage: 'qualification', qualityScore: 70 },
  { id: 'l17', companyId: 'techbrabo', name: 'AgoraPay', channel: 'Orgânico', salesRepId: 't-livia', createdAt: '2026-08-06', stage: 'contract', qualityScore: 91 },
  { id: 'l18', companyId: 'techbrabo', name: 'Bliss HR', channel: 'Outbound', salesRepId: 't-bruno', createdAt: '2026-07-18', stage: 'support', qualityScore: 83 },
]

export const deals: Deal[] = [
  { id: 'm01', companyId: 'montseguro', title: 'Plano PME 42 vidas', client: 'Giro Foods', salesRepId: 'm-camila', leadId: 'l01', channel: 'Google Ads', stage: 'proposal', type: 'health-plan', amount: 100800, probability: 0.6, actualRevenue: 0, createdAt: '2026-08-29', cycleDays: 19, lives: 42, operator: 'Amil' },
  { id: 'm02', companyId: 'montseguro', title: 'Plano MEI 18 vidas', client: 'Studio Sensa', salesRepId: 'm-rafael', leadId: 'l02', channel: 'Meta Ads', stage: 'quote', type: 'health-plan', amount: 38880, probability: 0.3, actualRevenue: 0, createdAt: '2026-08-28', cycleDays: 12, lives: 18, operator: 'SulAmérica' },
  { id: 'm03', companyId: 'montseguro', title: 'Plano PME 75 vidas', client: 'Logway Express', salesRepId: 'm-camila', leadId: 'l03', channel: 'Indicação', stage: 'implementation', type: 'health-plan', amount: 198000, probability: 0.92, actualRevenue: 14850, createdAt: '2026-08-23', closedAt: '2026-08-30', cycleDays: 33, lives: 75, operator: 'Bradesco', implementationStatus: 'pending' },
  { id: 'm04', companyId: 'montseguro', title: 'Plano PME 96 vidas', client: 'Cometa Móveis', salesRepId: 'm-rafael', leadId: 'l06', channel: 'Meta Ads', stage: 'active', type: 'health-plan', amount: 247680, probability: 1, actualRevenue: 27864, createdAt: '2026-07-25', closedAt: '2026-08-16', cycleDays: 28, lives: 96, operator: 'Amil', implementationStatus: 'completed' },
  { id: 'm05', companyId: 'montseguro', title: 'Plano PME 54 vidas', client: 'Alfa Contábil', salesRepId: 'm-camila', leadId: 'l04', channel: 'Orgânico', stage: 'qualification', type: 'health-plan', amount: 122400, probability: 0.18, actualRevenue: 0, createdAt: '2026-08-17', cycleDays: 8, lives: 54, operator: 'Hapvida' },
  { id: 'm06', companyId: 'montseguro', title: 'Plano MEI 30 vidas', client: 'Rota 21', salesRepId: 'm-rafael', leadId: 'l05', channel: 'Google Ads', stage: 'attendance', type: 'health-plan', amount: 64800, probability: 0.1, actualRevenue: 0, createdAt: '2026-08-10', cycleDays: 5, lives: 30, operator: 'SulAmérica' },
  { id: 'p01', companyId: 'prop5', title: 'Alocação patrimonial Alphaville', client: 'Ana Ribeiro', salesRepId: 'p-helena', leadId: 'l07', channel: 'Indicação', stage: 'strategy', type: 'real-estate', amount: 1450000, probability: 0.42, actualRevenue: 0, createdAt: '2026-08-30', cycleDays: 47, propertyValue: 1450000, country: 'Estados Unidos' },
  { id: 'p02', companyId: 'prop5', title: 'Residencial Jardins', client: 'Lucas Fernandes', salesRepId: 'p-igor', leadId: 'l08', channel: 'Google Ads', stage: 'financial-diagnosis', type: 'real-estate', amount: 980000, probability: 0.2, actualRevenue: 0, createdAt: '2026-08-26', cycleDays: 25, propertyValue: 980000, country: 'Portugal' },
  { id: 'p03', companyId: 'prop5', title: 'Portfólio Vila Nova', client: 'Marina Lopes', salesRepId: 'p-helena', leadId: 'l09', channel: 'Meta Ads', stage: 'negotiation', type: 'real-estate', amount: 2200000, probability: 0.68, actualRevenue: 66000, createdAt: '2026-08-19', closedAt: '2026-08-31', cycleDays: 71, propertyValue: 2200000, country: 'Canadá' },
  { id: 'p04', companyId: 'prop5', title: 'Estratégia FII Morumbi', client: 'Bruna Melo', salesRepId: 'p-igor', leadId: 'l11', channel: 'Orgânico', stage: 'opportunity', type: 'real-estate', amount: 760000, probability: 0.55, actualRevenue: 0, createdAt: '2026-08-03', cycleDays: 38, propertyValue: 760000, country: 'Reino Unido' },
  { id: 'p05', companyId: 'prop5', title: 'Compra estruturada Pinheiros', client: 'Renata Couto', salesRepId: 'p-igor', leadId: 'l12', channel: 'Indicação', stage: 'follow-up', type: 'real-estate', amount: 1840000, probability: 1, actualRevenue: 55200, createdAt: '2026-07-22', closedAt: '2026-08-08', cycleDays: 82, propertyValue: 1840000, country: 'Alemanha' },
  { id: 'p06', companyId: 'prop5', title: 'Carteira Brooklin', client: 'Victor Alves', salesRepId: 'p-helena', leadId: 'l10', channel: 'Outbound', stage: 'contact', type: 'real-estate', amount: 680000, probability: 0.07, actualRevenue: 0, createdAt: '2026-08-12', cycleDays: 14, propertyValue: 680000, country: 'França' },
  { id: 't01', companyId: 'techbrabo', title: 'Portal de fretes integrado', client: 'Atlas Logística', salesRepId: 't-livia', leadId: 'l13', channel: 'Outbound', stage: 'proposal', type: 'project', amount: 210000, probability: 0.45, actualRevenue: 0, createdAt: '2026-08-31', cycleDays: 30, projectRevenue: 210000, soldHours: 620, capacityHours: 760 },
  { id: 't02', companyId: 'techbrabo', title: 'API de elegibilidade', client: 'Nexo Saúde', salesRepId: 't-bruno', leadId: 'l14', channel: 'Google Ads', stage: 'diagnosis', type: 'project', amount: 145000, probability: 0.28, actualRevenue: 0, createdAt: '2026-08-25', cycleDays: 18, projectRevenue: 145000, soldHours: 360, capacityHours: 760 },
  { id: 't03', companyId: 'techbrabo', title: 'Modernização de core', client: 'Finroute', salesRepId: 't-livia', leadId: 'l15', channel: 'Indicação', stage: 'development', type: 'project', amount: 380000, probability: 0.88, actualRevenue: 76000, createdAt: '2026-08-20', closedAt: '2026-08-30', cycleDays: 59, projectRevenue: 380000, soldHours: 720, capacityHours: 760 },
  { id: 't04', companyId: 'techbrabo', title: 'Sustentação Core', client: 'AgoraPay', salesRepId: 't-bruno', leadId: 'l17', channel: 'Orgânico', stage: 'support', type: 'mrr', amount: 42000, probability: 1, actualRevenue: 42000, createdAt: '2026-08-06', closedAt: '2026-08-14', cycleDays: 35, mrr: 42000, soldHours: 590, capacityHours: 760 },
  { id: 't05', companyId: 'techbrabo', title: 'Automação de RH', client: 'Casa Verde', salesRepId: 't-bruno', leadId: 'l16', channel: 'Meta Ads', stage: 'qualification', type: 'project', amount: 95000, probability: 0.1, actualRevenue: 0, createdAt: '2026-08-13', cycleDays: 9, projectRevenue: 95000, soldHours: 180, capacityHours: 760 },
  { id: 't06', companyId: 'techbrabo', title: 'Suporte de dados', client: 'Bliss HR', salesRepId: 't-livia', leadId: 'l18', channel: 'Outbound', stage: 'support', type: 'support', amount: 24000, probability: 1, actualRevenue: 24000, createdAt: '2026-07-18', closedAt: '2026-08-05', cycleDays: 44, mrr: 24000, soldHours: 115, capacityHours: 760, churned: true },
]

const snapshot = (companyId: FunnelSnapshot['companyId'], date: string, values: Record<string, number>): FunnelSnapshot[] =>
  Object.entries(values).map(([stage, volume]) => ({ id: `${companyId}-${stage}-${date}`, companyId, stage, volume, date }))

export const funnelSnapshots: FunnelSnapshot[] = [
  ...snapshot('montseguro', '2026-08-30', { lead: 348, attendance: 274, qualification: 196, quote: 142, presentation: 111, proposal: 84, contracting: 51, implementation: 42, active: 38 }),
  ...snapshot('prop5', '2026-08-30', { lead: 182, contact: 141, qualification: 103, 'financial-diagnosis': 76, 'consultative-meeting': 59, strategy: 43, opportunity: 31, negotiation: 19, structuring: 12, closed: 9, 'follow-up': 8 }),
  ...snapshot('techbrabo', '2026-08-30', { lead: 227, qualification: 151, meeting: 106, diagnosis: 82, proposal: 59, negotiation: 41, contract: 28, development: 21, delivery: 17, support: 15 }),
]

export const marketingCampaigns: MarketingCampaign[] = [
  { id: 'c01', companyId: 'montseguro', name: 'PME com saúde', channel: 'Google Ads', date: '2026-08-29', spend: 12600, leads: 126, opportunities: 46, meetings: 31, sales: 11, revenue: 46200, qualityScore: 79 },
  { id: 'c02', companyId: 'montseguro', name: 'MEI Protegido', channel: 'Meta Ads', date: '2026-08-26', spend: 8400, leads: 148, opportunities: 32, meetings: 19, sales: 7, revenue: 28800, qualityScore: 61 },
  { id: 'c03', companyId: 'montseguro', name: 'Parceria contábil', channel: 'Indicação', date: '2026-08-20', spend: 2400, leads: 38, opportunities: 22, meetings: 17, sales: 8, revenue: 41800, qualityScore: 91 },
  { id: 'c04', companyId: 'prop5', name: 'M5 Global Investors', channel: 'Google Ads', date: '2026-08-28', spend: 16800, leads: 42, opportunities: 15, meetings: 12, sales: 2, revenue: 34200, qualityScore: 82 },
  { id: 'c05', companyId: 'prop5', name: 'Expat Wealth Brasil', channel: 'Meta Ads', date: '2026-08-24', spend: 11500, leads: 77, opportunities: 14, meetings: 8, sales: 1, revenue: 19800, qualityScore: 54 },
  { id: 'c06', companyId: 'prop5', name: 'M5 network', channel: 'Indicação', date: '2026-08-16', spend: 3800, leads: 21, opportunities: 14, meetings: 12, sales: 5, revenue: 68700, qualityScore: 96 },
  { id: 'c07', companyId: 'techbrabo', name: 'API First B2B', channel: 'Google Ads', date: '2026-08-30', spend: 14400, leads: 69, opportunities: 24, meetings: 18, sales: 4, revenue: 61200, qualityScore: 83 },
  { id: 'c08', companyId: 'techbrabo', name: 'Scale up software', channel: 'Outbound', date: '2026-08-22', spend: 6800, leads: 34, opportunities: 21, meetings: 16, sales: 5, revenue: 105000, qualityScore: 92 },
  { id: 'c09', companyId: 'techbrabo', name: 'Produto digital B2B', channel: 'Meta Ads', date: '2026-08-14', spend: 7200, leads: 89, opportunities: 13, meetings: 9, sales: 2, revenue: 28800, qualityScore: 57 },
  { id: 'c10', companyId: 'montseguro', name: 'Conteúdo PME', channel: 'Orgânico', date: '2026-08-08', spend: 1500, leads: 36, opportunities: 16, meetings: 12, sales: 5, revenue: 24600, qualityScore: 81 },
  { id: 'c11', companyId: 'prop5', name: 'Conteúdo patrimonial', channel: 'Orgânico', date: '2026-08-09', spend: 1800, leads: 24, opportunities: 9, meetings: 7, sales: 2, revenue: 26400, qualityScore: 87 },
  { id: 'c12', companyId: 'techbrabo', name: 'Comunidade CTO', channel: 'Indicação', date: '2026-08-11', spend: 3200, leads: 19, opportunities: 13, meetings: 11, sales: 4, revenue: 75600, qualityScore: 95 },
]

export const kpis: KpiSnapshot[] = [
  { id: 'k01', companyId: 'montseguro', date: '2026-08-31', operatingProfit: 35450, marketingInvestment: 24900, previousRevenue: 102000 },
  { id: 'k02', companyId: 'prop5', date: '2026-08-31', operatingProfit: 41800, marketingInvestment: 33900, previousRevenue: 98000 },
  { id: 'k03', companyId: 'techbrabo', date: '2026-08-31', operatingProfit: 52700, marketingInvestment: 31600, previousRevenue: 118500 },
]

export const alerts: Alert[] = [
  { id: 'a01', companyId: 'montseguro', severity: 'warning', title: 'Conversão de proposta em queda', detail: 'A conversão de Proposta para Contratação caiu 32% nas últimas duas semanas.', metric: '-32%', createdAt: '2026-08-31' },
  { id: 'a02', companyId: 'techbrabo', severity: 'critical', title: 'Capacidade próxima do limite', detail: 'A equipe de engenharia atingiu 94% de ocupação. Novos contratos podem elevar o risco de atraso.', metric: '94%', createdAt: '2026-08-31' },
  { id: 'a03', companyId: 'prop5', severity: 'warning', title: 'CAC pressionado em Meta Ads', detail: 'O CAC do canal Meta Ads aumentou 40% frente ao período anterior.', metric: '+40%', createdAt: '2026-08-30' },
  { id: 'a04', companyId: 'montseguro', severity: 'success', title: 'Indicações com alta qualidade', detail: 'O canal de indicação superou a meta de qualidade e ROAS do mês.', metric: '17,4x', createdAt: '2026-08-29' },
]

export const channels = ['Google Ads', 'Meta Ads', 'Outbound', 'Indicação', 'Orgânico'] as const
