'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useAppStore } from '@/store/appStore'
import { DEPARTMENTS } from '@/data/departments'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '📊', href: '/dashboard' },
  { label: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
  { label: 'Datasets', icon: '🗄️', href: '/dashboard/datasets' },
  { label: 'AI Reports', icon: '🤖', href: '/dashboard/reports' },
  { label: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
]

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, activeDepartment, setActiveDepartment } = useAppStore()
  const { user, logout } = useAuth()

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex flex-col bg-surface-100 border-r border-white/5 overflow-hidden shrink-0 z-20"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold shrink-0">
          BI
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-display font-bold text-sm whitespace-nowrap overflow-hidden"
            >
              Bharat<span className="gradient-text">Insight</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Org Switcher */}
      <div className="px-2 py-3 border-b border-white/5">
        {!sidebarCollapsed && (
          <div className="text-xs text-white/30 px-2 mb-2 uppercase tracking-wider">Department</div>
        )}
        <div className="space-y-1">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDepartment(dept.id)}
              title={sidebarCollapsed ? dept.name : undefined}
              className={cn(
                'w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-all text-sm',
                activeDepartment === dept.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              )}
            >
              <span className="text-base shrink-0">{dept.icon}</span>
              {!sidebarCollapsed && (
                <span className="text-xs truncate">{dept.name.replace('Ministry of ', '')}</span>
              )}
              {!sidebarCollapsed && activeDepartment === dept.id && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: dept.color }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {!sidebarCollapsed && (
          <div className="text-xs text-white/30 px-2 mb-2 uppercase tracking-wider">Navigation</div>
        )}
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={sidebarCollapsed ? item.label : undefined}
            className="flex items-center gap-3 px-2 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="text-base shrink-0">{item.icon}</span>
            {!sidebarCollapsed && (
              <span className="text-sm truncate">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User & Collapse */}
      <div className="border-t border-white/5 p-2 space-y-1">
        {/* User info */}
        {user && (
          <div className={cn('flex items-center gap-3 px-2 py-2', sidebarCollapsed && 'justify-center')}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold shrink-0">
              {user.name[0]}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white truncate">{user.name}</div>
                <div className="text-xs text-white/30 capitalize">{user.role}</div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={logout}
          title={sidebarCollapsed ? 'Sign Out' : undefined}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all text-sm"
        >
          <span className="text-base shrink-0">🚪</span>
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center py-2 text-white/20 hover:text-white/50 transition-colors"
        >
          <span className="text-xs">{sidebarCollapsed ? '→' : '←'}</span>
        </button>
      </div>
    </motion.aside>
  )
}
