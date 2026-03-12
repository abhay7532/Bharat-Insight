'use client'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useState, useRef, useMemo, useCallback } from 'react'
import { useDataset } from '@/hooks/useDataset'
import { useAppStore } from '@/store/appStore'
import { useAuth } from '@/hooks/useAuth'
import { formatNumber, formatPercent } from '@/lib/utils'
import type { IndiaDataRow } from '@/types'
import { UNIQUE_STATES, UNIQUE_YEARS, UNIQUE_DEPARTMENTS } from '@/data/dataset'
import { TableSkeleton } from '@/components/ui/TableSkeleton'

function SortIcon({ direction }: { direction: 'asc' | 'desc' | false }) {
  if (!direction) return <span className="text-white/20">↕</span>
  return <span className="text-indigo-300">{direction === 'asc' ? '↑' : '↓'}</span>
}

export function DataGrid() {
  const { filteredData, isLoading } = useDataset()
  const { tableFilters, setTableFilters } = useAppStore()
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const columns = useMemo<ColumnDef<IndiaDataRow>[]>(
    () => [
      {
        accessorKey: 'state',
        header: 'State',
        size: 160,
        cell: ({ getValue }) => (
          <span className="font-medium text-white/90">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'year',
        header: 'Year',
        size: 80,
        cell: ({ getValue }) => (
          <span className="font-mono text-indigo-300/80">{getValue() as number}</span>
        ),
      },
      {
        accessorKey: 'department',
        header: 'Department',
        size: 200,
        cell: ({ getValue }) => {
          const dept = getValue() as string
          const color = dept.includes('Health') ? '#10b981' : dept.includes('Agri') ? '#f59e0b' : '#6366f1'
          return (
            <span className="text-xs px-2 py-1 rounded-full" style={{ color, backgroundColor: `${color}15` }}>
              {dept.replace('Ministry of ', '')}
            </span>
          )
        },
      },
      {
        accessorKey: 'population',
        header: 'Population',
        size: 120,
        cell: ({ getValue }) => (
          <span className="font-mono text-white/60">{formatNumber(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'literacyRate',
        header: 'Literacy %',
        size: 110,
        cell: ({ getValue }) => {
          const val = getValue() as number
          const color = val >= 80 ? '#10b981' : val >= 65 ? '#f59e0b' : '#ef4444'
          return <span className="font-mono font-semibold" style={{ color }}>{formatPercent(val)}</span>
        },
      },
      {
        accessorKey: 'gdpContribution',
        header: 'GDP Contrib %',
        size: 120,
        cell: ({ getValue }) => (
          <span className="font-mono text-cyan-300/80">{(getValue() as number).toFixed(2)}%</span>
        ),
      },
      {
        accessorKey: 'agriculturalOutput',
        header: 'Agri Output %',
        size: 120,
        cell: ({ getValue }) => (
          <span className="font-mono text-amber-300/80">{formatPercent(getValue() as number)}</span>
        ),
      },
      {
        accessorKey: 'healthIndex',
        header: 'Health Index',
        size: 110,
        cell: ({ getValue }) => {
          const val = getValue() as number
          return (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 glass rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className="font-mono text-xs text-emerald-300 w-8">{val}</span>
            </div>
          )
        },
      },
      ...(isAdmin
        ? [
            {
              id: 'actions',
              header: 'Actions',
              size: 100,
              cell: () => (
                <div className="flex gap-1">
                  <button className="text-xs glass px-2 py-1 rounded text-indigo-300 hover:bg-indigo-500/20 transition-colors">
                    Edit
                  </button>
                  <button className="text-xs glass px-2 py-1 rounded text-red-400 hover:bg-red-500/20 transition-colors">
                    Del
                  </button>
                </div>
              ),
            } as ColumnDef<IndiaDataRow>,
          ]
        : []),
    ],
    [isAdmin]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    pageCount: -1,
  })

  const { rows } = table.getRowModel()

  // Virtualization for the visible rows
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 44,
    overscan: 20,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()
  const totalHeight = rowVirtualizer.getTotalSize()
  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0
  const paddingBottom =
    virtualItems.length > 0
      ? totalHeight - virtualItems[virtualItems.length - 1].end
      : 0

  if (isLoading) return <TableSkeleton />

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Filters Bar */}
      <div className="px-4 py-3 border-b border-white/5 bg-surface-100/50 flex flex-wrap gap-2 items-center">
        {/* Global search */}
        <div className="flex-1 min-w-48 max-w-xs relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">🔍</span>
          <input
            value={tableFilters.globalSearch}
            onChange={(e) => setTableFilters({ globalSearch: e.target.value })}
            placeholder="Search state, dept..."
            className="w-full glass rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-indigo-500/40 border border-transparent transition-colors"
          />
        </div>

        {/* State filter */}
        <select
          value={tableFilters.state}
          onChange={(e) => setTableFilters({ state: e.target.value })}
          className="glass rounded-lg px-3 py-2 text-xs text-white/60 outline-none border border-transparent focus:border-indigo-500/40 bg-transparent"
        >
          <option value="all">All States</option>
          {UNIQUE_STATES.map((s) => (
            <option key={s} value={s} className="bg-surface-300">
              {s}
            </option>
          ))}
        </select>

        {/* Year filter */}
        <select
          value={tableFilters.year}
          onChange={(e) => setTableFilters({ year: e.target.value })}
          className="glass rounded-lg px-3 py-2 text-xs text-white/60 outline-none border border-transparent focus:border-indigo-500/40 bg-transparent"
        >
          <option value="all">All Years</option>
          {UNIQUE_YEARS.map((y) => (
            <option key={y} value={y} className="bg-surface-300">
              {y}
            </option>
          ))}
        </select>

        {/* Dept filter */}
        <select
          value={tableFilters.department}
          onChange={(e) => setTableFilters({ department: e.target.value })}
          className="glass rounded-lg px-3 py-2 text-xs text-white/60 outline-none border border-transparent focus:border-indigo-500/40 bg-transparent"
        >
          <option value="all">All Depts</option>
          {UNIQUE_DEPARTMENTS.map((d) => (
            <option key={d} value={d} className="bg-surface-300">
              {d.replace('Ministry of ', '')}
            </option>
          ))}
        </select>

        <div className="ml-auto text-xs text-white/30">
          {filteredData.length.toLocaleString()} rows
        </div>
      </div>

      {/* Table container */}
      <div ref={tableContainerRef} className="flex-1 overflow-auto">
        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-surface-200">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider border-b border-white/5 cursor-pointer hover:text-white/70 transition-colors select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortIcon direction={header.column.getIsSorted()} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: paddingTop }} colSpan={columns.length} />
              </tr>
            )}

            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index]
              return (
                <tr
                  key={row.id}
                  className="table-row-hover border-b border-white/3"
                  style={{ height: 44 }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-sm truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}

            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: paddingBottom }} colSpan={columns.length} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-white/5 bg-surface-100/50 flex items-center gap-4 text-xs text-white/40">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="glass px-3 py-1.5 rounded-lg disabled:opacity-30 hover:text-white transition-colors"
        >
          ← Prev
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="glass px-3 py-1.5 rounded-lg disabled:opacity-30 hover:text-white transition-colors"
        >
          Next →
        </button>
        <span className="ml-auto">{filteredData.length.toLocaleString()} total rows</span>
      </div>
    </div>
  )
}
