'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { Topbar } from '@/components/dashboard/Topbar'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { useAppStore } from '@/store/appStore'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { setCommandPaletteOpen, activeDepartment } = useAppStore()

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setCommandPaletteOpen])

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden" data-dept={activeDepartment}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  )
}
