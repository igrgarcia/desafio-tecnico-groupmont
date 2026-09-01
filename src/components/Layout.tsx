import { BarChart3, BellRing, Building2, ChevronLeft, LayoutDashboard, Megaphone, Menu, ShieldCheck, TrendingUp } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { FilterBar } from './FilterBar'
import { BrazilMapBackground } from './BrazilMapBackground'

export type PageId = 'overview' | 'sales' | 'marketing' | 'companies' | 'insights'

const navigation: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'CEO Overview', icon: LayoutDashboard },
  { id: 'sales', label: 'Comercial', icon: TrendingUp },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'companies', label: 'Empresas', icon: Building2 },
  { id: 'insights', label: 'Insights & Forecast', icon: BellRing },
]

const pageMeta: Record<PageId, { eyebrow: string; title: string }> = {
  overview: { eyebrow: 'Visão consolidada', title: 'Cockpit executivo do Grupo Mont' },
  sales: { eyebrow: 'Performance comercial', title: 'Pipeline, conversão e produtividade' },
  marketing: { eyebrow: 'Eficiência de aquisição', title: 'Marketing que gera receita' },
  companies: { eyebrow: 'Drill-down operacional', title: 'Indicadores por unidade de negócio' },
  insights: { eyebrow: 'Decisão antecipada', title: 'Forecast e alertas prioritários' },
}

export function Layout({ page, onPageChange, children }: { page: PageId; onPageChange: (page: PageId) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const meta = pageMeta[page]
  const navigationContent = (
    <>
      <div className={`flex h-[76px] items-center border-b border-white/10 ${collapsed ? 'justify-center px-2' : 'justify-between px-5'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="brand-mark grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"><ShieldCheck size={20} /></span>
          {!collapsed && <div><p className="font-bold tracking-tight text-white">Grupo Mont</p><p className="text-[11px] font-medium tracking-wider text-sky-200">EXECUTIVE OS</p></div>}
        </div>
        {!collapsed && <button aria-label="Recolher menu" onClick={() => setCollapsed(true)} className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:block"><ChevronLeft size={18} /></button>}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navigation.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { onPageChange(id); setMobileOpen(false) }} className={`nav-link group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${page === id ? 'nav-link--active' : ''} ${collapsed ? 'justify-center' : ''}`} title={collapsed ? label : undefined}>
          <Icon size={19} className="shrink-0" /> {!collapsed && <span>{label}</span>}
        </button>)}
      </nav>
      <div className="m-3 rounded-xl border border-white/10 bg-white/[.045] p-3 text-xs leading-5 text-slate-300">
        {!collapsed && <><span className="font-semibold text-white">Base simulada</span><br />Atualizada em 31 ago. 2026</>}
        {collapsed && <BarChart3 className="mx-auto" size={18} />}
      </div>
    </>
  )
  return (
    <div className="dark-workspace app-canvas min-h-screen text-slate-900">
      <aside className={`glass-sidebar fixed inset-y-0 left-0 z-30 hidden flex-col transition-all duration-200 lg:flex ${collapsed ? 'w-[76px]' : 'w-64'}`}>{navigationContent}</aside>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`glass-sidebar fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-200 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>{navigationContent}</aside>
      <main className={`relative z-0 min-h-screen transition-all duration-200 ${collapsed ? 'lg:pl-[76px]' : 'lg:pl-64'}`}>
        <BrazilMapBackground />
        <header className="glass-header sticky top-0 z-20">
          <div className="flex min-h-[76px] items-center px-4 lg:px-7">
            <button aria-label="Abrir menu" onClick={() => setMobileOpen(true)} className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><Menu size={21} /></button>
            {collapsed && <button aria-label="Expandir menu" onClick={() => setCollapsed(false)} className="mr-3 hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:block"><Menu size={20} /></button>}
            <div><p className="page-eyebrow text-xs font-semibold uppercase">{meta.eyebrow}</p><h1 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{meta.title}</h1></div>
            <div className="live-indicator ml-auto hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> Dados sincronizados</div>
          </div>
          <FilterBar />
        </header>
        <div className="relative z-10 mx-auto max-w-[1680px] p-4 sm:p-6 lg:p-7">{children}</div>
      </main>
    </div>
  )
}
