'use client'

import { useAppStore } from '@/store/appStore'
import { useAuth } from '@/hooks/useAuth'
import { DEPARTMENTS } from '@/data/departments'
import { getDepartmentById } from '@/data/departments'

export function Topbar() {
  const { activeDepartment, setCommandPaletteOpen, aiPanelOpen, setAIPanelOpen } = useAppStore()
  const { user } = useAuth()
  const dept = getDepartmentById(activeDepartment)

  return (
    <header className="h-14 border-b border-white/5 bg-surface-100/80 backdrop-blur-sm flex items-center gap-4 px-6 shrink-0">
      {/* Department indicator */}
      <div className="flex items-center gap-2">
        <span className="text-base">{dept.icon}</span>
        <div>
          <div className="text-xs font-semibold text-white leading-none">{dept.name}</div>
          <div className="text-xs text-white/30">Analytics Dashboard</div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Command palette hint */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="hidden md:flex items-center gap-2 glass px-4 py-2 rounded-lg text-xs text-white/30 hover:text-white/60 transition-colors"
      >
        <span>Search or run command...</span>
        <span className="glass px-1.5 py-0.5 rounded text-white/20">⌘K</span>
      </button>

      {/* AI Panel toggle */}
      <button
        onClick={() => setAIPanelOpen(!aiPanelOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
          aiPanelOpen
            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
            : 'glass text-white/40 hover:text-white/70'
        }`}
      >
        🤖 AI
      </button>

      {/* User avatar */}
      {user && (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold">
            {user.name[0]}
          </div>
          <div className="hidden md:block">
            <div className="text-xs text-white/70">{user.name}</div>
            <div
              className="text-xs capitalize"
              style={{ color: user.role === 'admin' ? '#818cf8' : '#34d399' }}
            >
              {user.role}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
