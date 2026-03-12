'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/appStore'
import { DEPARTMENTS } from '@/data/departments'
import type { CommandItem } from '@/types'

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setActiveDepartment, setAIPanelOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const allCommands: CommandItem[] = [
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      description: 'Open analytics dashboard',
      icon: '📊',
      group: 'Navigation',
      action: () => router.push('/dashboard'),
    },
    {
      id: 'nav-home',
      label: 'Go to Home',
      description: 'Landing page',
      icon: '🏠',
      group: 'Navigation',
      action: () => router.push('/'),
    },
    ...DEPARTMENTS.map((d) => ({
      id: `dept-${d.id}`,
      label: `Switch to ${d.name}`,
      description: d.description,
      icon: d.icon,
      group: 'Department',
      action: () => {
        setActiveDepartment(d.id)
        setCommandPaletteOpen(false)
      },
    })),
    {
      id: 'ai-open',
      label: 'Open AI Insight Panel',
      icon: '🤖',
      group: 'AI',
      action: () => setAIPanelOpen(true),
    },
    {
      id: 'ai-literacy',
      label: 'Run AI: Literacy Analysis',
      icon: '📚',
      group: 'AI',
      action: () => {
        setAIPanelOpen(true)
        setCommandPaletteOpen(false)
      },
    },
    {
      id: 'ds-all',
      label: 'Open Full Dataset',
      description: '100K+ rows',
      icon: '🗄️',
      group: 'Datasets',
      action: () => router.push('/dashboard'),
    },
  ]

  const filtered = query
    ? allCommands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase())
      )
    : allCommands

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (!commandPaletteOpen) setQuery('')
  }, [commandPaletteOpen])

  const flatFiltered = filtered
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      flatFiltered[selectedIndex]?.action()
      setCommandPaletteOpen(false)
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false)
    }
  }

  let globalIndex = 0

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
                <span className="text-white/30">🔍</span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-sm"
                />
                <kbd className="text-xs glass px-2 py-1 rounded text-white/20">ESC</kbd>
              </div>

              {/* Commands */}
              <div className="max-h-80 overflow-y-auto py-2">
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group}>
                    <div className="px-4 py-2 text-xs text-white/20 uppercase tracking-wider font-semibold">
                      {group}
                    </div>
                    {items.map((item) => {
                      const idx = globalIndex++
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action()
                            setCommandPaletteOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            idx === selectedIndex ? 'bg-indigo-600/20' : 'hover:bg-white/5'
                          }`}
                        >
                          <span className="text-base shrink-0">{item.icon}</span>
                          <div>
                            <div className="text-sm text-white">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-white/30">{item.description}</div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="px-4 py-8 text-center text-white/30 text-sm">
                    No commands found
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-xs text-white/20">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
