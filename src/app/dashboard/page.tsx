'use client'

import { DataGrid } from '@/components/dashboard/DataGrid'
import { AIInsightPanel } from '@/components/dashboard/AIInsightPanel'
import { useAppStore } from '@/store/appStore'

export default function DashboardPage() {
  const { aiPanelOpen } = useAppStore()

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main Data Grid area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DataGrid />
      </div>

      {/* AI Panel */}
      {aiPanelOpen && (
        <div className="w-80 xl:w-96 border-l border-white/5 shrink-0 overflow-hidden">
          <AIInsightPanel />
        </div>
      )}
    </div>
  )
}
