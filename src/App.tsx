import { useState, type ReactElement } from 'react'
import { Layout, type PageId } from './components/Layout'
import { CompanyDrilldown } from './pages/CompanyDrilldown'
import { CEOOverview } from './pages/CEOOverview'
import { InsightsForecast } from './pages/InsightsForecast'
import { MarketingDashboard } from './pages/MarketingDashboard'
import { SalesDashboard } from './pages/SalesDashboard'

const pages: Record<PageId, () => ReactElement> = {
  overview: CEOOverview,
  sales: SalesDashboard,
  marketing: MarketingDashboard,
  companies: CompanyDrilldown,
  insights: InsightsForecast,
}

export default function App() {
  const [page, setPage] = useState<PageId>('overview')
  const CurrentPage = pages[page]
  return <Layout page={page} onPageChange={setPage}><CurrentPage /></Layout>
}
