import { Filter, RotateCcw } from 'lucide-react'
import { channels, companies, salesReps } from '../data/mockData'
import { useFilters } from '../context/FilterContext'
import { periodLabels } from '../utils/calculations'
import type { CompanyFilter, Period } from '../types'

const selectClass = 'filter-select h-10 rounded-lg border px-3 text-sm text-slate-700 outline-none transition'

export function FilterBar() {
  const { filters, setFilters, resetFilters } = useFilters()
  const reps = salesReps.filter((rep) => filters.companyId === 'all' || rep.companyId === filters.companyId)
  return (
    <div className="filter-rail flex flex-wrap items-center gap-2 px-4 py-3 lg:px-7">
      <div className="mr-1 hidden items-center gap-2 text-sm font-semibold text-slate-500 md:flex"><Filter size={15} /> Filtros</div>
      <select aria-label="Período" className={selectClass} value={filters.period} onChange={(event) => setFilters({ period: event.target.value as Period })}>
        {Object.entries(periodLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <select aria-label="Empresa" className={selectClass} value={filters.companyId} onChange={(event) => setFilters({ companyId: event.target.value as CompanyFilter, salesRepId: 'all' })}>
        <option value="all">Todas as empresas</option>
        {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
      </select>
      <select aria-label="Canal" className={selectClass} value={filters.channel} onChange={(event) => setFilters({ channel: event.target.value as typeof filters.channel })}>
        <option value="all">Todos os canais</option>
        {channels.map((channel) => <option key={channel} value={channel}>{channel}</option>)}
      </select>
      <select aria-label="Responsável" className={selectClass} value={filters.salesRepId} onChange={(event) => setFilters({ salesRepId: event.target.value })}>
        <option value="all">Todos os responsáveis</option>
        {reps.map((rep) => <option key={rep.id} value={rep.id}>{rep.name}</option>)}
      </select>
      <button onClick={resetFilters} className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900" title="Limpar filtros">
        <RotateCcw size={15} /> <span className="hidden sm:inline">Limpar</span>
      </button>
    </div>
  )
}
