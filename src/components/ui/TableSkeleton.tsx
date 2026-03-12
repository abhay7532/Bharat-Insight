export function TableSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden animate-pulse">
      {/* Filters bar skeleton */}
      <div className="px-4 py-3 border-b border-white/5 flex gap-2">
        <div className="h-8 w-48 shimmer rounded-lg" />
        <div className="h-8 w-32 shimmer rounded-lg" />
        <div className="h-8 w-28 shimmer rounded-lg" />
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex gap-4">
        {[160, 80, 200, 120, 110, 120, 120, 110].map((w, i) => (
          <div key={i} className="h-4 shimmer rounded" style={{ width: w }} />
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="px-4 py-3 border-b border-white/3 flex gap-4"
            style={{ opacity: 1 - i * 0.04 }}
          >
            {[140, 60, 180, 100, 90, 100, 100, 90].map((w, j) => (
              <div key={j} className="h-4 shimmer rounded" style={{ width: w }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
