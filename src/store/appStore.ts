import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DepartmentId, AppUser, AIMessage, TableFilters } from '@/types'

// ─── App Store ────────────────────────────────────────────────────────────────

interface AppState {
  // Auth
  user: AppUser | null
  setUser: (user: AppUser | null) => void

  // Active Department
  activeDepartment: DepartmentId
  setActiveDepartment: (id: DepartmentId) => void

  // Command Palette
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void

  // AI Panel
  aiPanelOpen: boolean
  setAIPanelOpen: (open: boolean) => void
  aiMessages: AIMessage[]
  addAIMessage: (msg: AIMessage) => void
  updateLastAIMessage: (content: string) => void
  clearAIMessages: () => void
  isAIThinking: boolean
  setIsAIThinking: (thinking: boolean) => void
  aiThinkingStep: string
  setAIThinkingStep: (step: string) => void

  // Table Filters
  tableFilters: TableFilters
  setTableFilters: (filters: Partial<TableFilters>) => void
  resetTableFilters: () => void

  // Sidebar
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

const DEFAULT_FILTERS: TableFilters = {
  globalSearch: '',
  state: 'all',
  year: 'all',
  department: 'all',
  minLiteracy: '',
  maxLiteracy: '',
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      setUser: (user) => set({ user }),

      // Department
      activeDepartment: 'education',
      setActiveDepartment: (id) => set({ activeDepartment: id }),

      // Command Palette
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      // AI Panel
      aiPanelOpen: true,
      setAIPanelOpen: (open) => set({ aiPanelOpen: open }),
      aiMessages: [],
      addAIMessage: (msg) =>
        set((state) => ({ aiMessages: [...state.aiMessages, msg] })),
      updateLastAIMessage: (content) =>
        set((state) => {
          const msgs = [...state.aiMessages]
          if (msgs.length > 0) {
            msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content, isStreaming: true }
          }
          return { aiMessages: msgs }
        }),
      clearAIMessages: () => set({ aiMessages: [] }),
      isAIThinking: false,
      setIsAIThinking: (thinking) => set({ isAIThinking: thinking }),
      aiThinkingStep: '',
      setAIThinkingStep: (step) => set({ aiThinkingStep: step }),

      // Filters
      tableFilters: DEFAULT_FILTERS,
      setTableFilters: (filters) =>
        set((state) => ({ tableFilters: { ...state.tableFilters, ...filters } })),
      resetTableFilters: () => set({ tableFilters: DEFAULT_FILTERS }),

      // Sidebar
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'bharat-insight-store',
      partialize: (state) => ({
        activeDepartment: state.activeDepartment,
        sidebarCollapsed: state.sidebarCollapsed,
        aiPanelOpen: state.aiPanelOpen,
      }),
    }
  )
)
