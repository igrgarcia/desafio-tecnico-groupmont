import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { FilterState } from '../types'

interface FilterContextValue {
  filters: FilterState
  setFilters: (patch: Partial<FilterState>) => void
  resetFilters: () => void
}

const initialFilters: FilterState = {
  period: 'quarter',
  companyId: 'all',
  channel: 'all',
  salesRepId: 'all',
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilterState] = useState<FilterState>(initialFilters)
  const value = useMemo(
    () => ({
      filters,
      setFilters: (patch: Partial<FilterState>) => setFilterState((current) => ({ ...current, ...patch })),
      resetFilters: () => setFilterState(initialFilters),
    }),
    [filters],
  )
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) throw new Error('useFilters precisa ser usado dentro de FilterProvider')
  return context
}
