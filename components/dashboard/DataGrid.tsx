"use client";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel,
  getPaginationRowModel, flexRender, ColumnDef, SortingState,
  ColumnFiltersState, FilterFn,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAppStore } from "@/store";
import { GovDataRow } from "@/types";
import { matchSorter } from "match-sorter";

const fuzzyFilter: FilterFn<GovDataRow> = (row, columnId, value) => {
  const search = String(value).toLowerCase();
  const cellVal = String(row.getValue(columnId)).toLowerCase();
  return cellVal.includes(search);
};

function Skeleton() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-10 shimmer rounded-lg" style={{ animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );
}

export function DataGrid() {
  const { filteredData, globalSearch, user } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [loaded, setLoaded] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filteredData.length > 0) setLoaded(true);
  }, [filteredData]);

  const columns = useMemo<ColumnDef<GovDataRow>[]>(() => [
    { accessorKey: "state", header: "State", size: 160, filterFn: fuzzyFilter },
    { accessorKey: "year", header: "Year", size: 80, filterFn: fuzzyFilter },
    { accessorKey: "department", header: "Department", size: 200, filterFn: fuzzyFilter },
    {
      accessorKey: "population", header: "Population", size: 140,
      cell: (info) => (info.getValue<number>() / 1_000_000).toFixed(1) + "M",
    },
    {
      accessorKey: "literacyRate", header: "Literacy %", size: 110,
      cell: (info) => {
        const v = info.getValue<number>();
        const color = v >= 80 ? "text-emerald-400" : v >= 70 ? "text-amber-400" : "text-rose-400";
        return <span className={color}>{v.toFixed(1)}%</span>;
      },
    },
    {
      accessorKey: "gdpContribution", header: "GDP %", size: 100,
      cell: (info) => <span className="text-blue-400">{info.getValue<number>().toFixed(2)}%</span>,
    },
    {
      accessorKey: "agriculturalOutput", header: "Agri Output (T)", size: 140,
      cell: (info) => info.getValue<number>().toFixed(1),
    },
    {
      accessorKey: "healthIndex", header: "Health Index", size: 120,
      cell: (info) => {
        const v = info.getValue<number>();
        const color = v >= 75 ? "text-emerald-400" : v >= 65 ? "text-amber-400" : "text-rose-400";
        return <span className={color}>{v.toFixed(1)}</span>;
      },
    },
    ...(user?.role === "admin" ? [{
      id: "actions",
      header: "Actions",
      size: 100,
      cell: () => (
        <div className="flex gap-2">
          <button className="text-xs text-gray-500 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-blue-500/10">Edit</button>
          <button className="text-xs text-gray-500 hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-rose-500/10">Del</button>
        </div>
      ),
    } as ColumnDef<GovDataRow>] : []),
  ], [user?.role]);

  const data = useMemo(() => {
    if (!globalSearch) return filteredData;
    return matchSorter(filteredData, globalSearch, {
      keys: ["state", "year", "department"],
      threshold: matchSorter.rankings.CONTAINS,
    });
  }, [filteredData, globalSearch]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 50 } },
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40,
    overscan: 20,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0;

  if (!loaded) return <Skeleton />;

  return (
    <div className="flex flex-col gap-4">
      {/* Stats bar */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>
          <span className="text-white font-semibold">{data.length.toLocaleString()}</span> rows
          {globalSearch && <span className="text-violet-400 ml-1">(filtered)</span>}
        </span>
        <span className="text-gray-700">•</span>
        <span>{table.getPageCount()} pages</span>
        <span className="text-gray-700">•</span>
        <span>Page {table.getState().pagination.pageIndex + 1}</span>
      </div>

      {/* Column filters row */}
      <div className="flex gap-2 flex-wrap">
        {["state", "year"].map((col) => (
          <input key={col}
            placeholder={`Filter ${col}...`}
            value={(table.getColumn(col)?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn(col)?.setFilterValue(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 w-36 transition-all" />
        ))}
      </div>

      {/* Table container */}
      <div className="rounded-xl border border-white/8 overflow-hidden bg-[#0a0a0f]">
        <div ref={tableContainerRef} className="overflow-auto" style={{ maxHeight: "60vh" }}>
          <table className="data-table" style={{ minWidth: "100%" }}>
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                      className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}>
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" && <span className="text-violet-400">↑</span>}
                        {header.column.getIsSorted() === "desc" && <span className="text-violet-400">↓</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && <tr><td style={{ height: paddingTop }} /></tr>}
              {virtualRows.map((vRow) => {
                const row = rows[vRow.index];
                return (
                  <tr key={row.id} data-index={vRow.index} ref={rowVirtualizer.measureElement}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {paddingBottom > 0 && <tr><td style={{ height: paddingBottom }} /></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[25, 50, 100].map((size) => (
            <button key={size}
              onClick={() => table.setPageSize(size)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                table.getState().pagination.pageSize === size
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}>
              {size}/page
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            ← Prev
          </button>
          <span className="px-3 py-1 text-xs text-gray-400">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
