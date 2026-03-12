// ─── Dataset Types ────────────────────────────────────────────────────────────

export interface IndiaDataRow {
  id: string
  state: string
  year: number
  department: string
  population: number
  literacyRate: number
  gdpContribution: number
  agriculturalOutput: number
  healthIndex: number
}

// ─── Department / Tenant ──────────────────────────────────────────────────────

export type DepartmentId = 'health' | 'agriculture' | 'education'

export interface Department {
  id: DepartmentId
  name: string
  color: string
  accentColor: string
  icon: string
  description: string
}

// ─── Auth / User ──────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'viewer'

export interface AppUser {
  id: string
  email: string
  name: string
  role: UserRole
  department: DepartmentId
  avatarUrl?: string
}

// ─── AI Insight ───────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface AIInsightState {
  messages: AIMessage[]
  isThinking: boolean
  currentStep: string
}

// ─── Table Filter ─────────────────────────────────────────────────────────────

export interface TableFilters {
  globalSearch: string
  state: string
  year: string
  department: string
  minLiteracy: string
  maxLiteracy: string
}

// ─── Command Palette ─────────────────────────────────────────────────────────

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  action: () => void
  group: string
}

// ─── Chart ────────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  name: string
  value: number
  secondary?: number
}
