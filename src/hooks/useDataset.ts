import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { generateDataset, getFilteredData } from '@/data/dataset'
import { useAppStore } from '@/store/appStore'
import type { IndiaDataRow } from '@/types'

export function useDataset() {
  const { data: rawData, isLoading } = useQuery({
    queryKey: ['india-dataset'],
    queryFn: () => generateDataset(100000),
    staleTime: Infinity,
  })

  const tableFilters = useAppStore((s) => s.tableFilters)
  const activeDepartment = useAppStore((s) => s.activeDepartment)

  const filteredData = useMemo<IndiaDataRow[]>(() => {
    if (!rawData) return []
    return getFilteredData(rawData, {
      globalSearch: tableFilters.globalSearch,
      state: tableFilters.state,
      year: tableFilters.year,
      department: tableFilters.department !== 'all' ? tableFilters.department : activeDepartment === 'health' ? 'Health' : activeDepartment === 'agriculture' ? 'Agriculture' : undefined,
    })
  }, [rawData, tableFilters, activeDepartment])

  return { rawData, filteredData, isLoading }
}
