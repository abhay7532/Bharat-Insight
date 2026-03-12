import type { Department } from '@/types'

export const DEPARTMENTS: Department[] = [
  {
    id: 'health',
    name: 'Ministry of Health',
    color: '#10b981',
    accentColor: '#34d399',
    icon: '🏥',
    description: 'National Health Mission & Public Health Analytics',
  },
  {
    id: 'agriculture',
    name: 'Ministry of Agriculture',
    color: '#f59e0b',
    accentColor: '#fbbf24',
    icon: '🌾',
    description: 'Crop Production, Irrigation & Farm Analytics',
  },
  {
    id: 'education',
    name: 'Ministry of Education',
    color: '#6366f1',
    accentColor: '#818cf8',
    icon: '📚',
    description: 'Literacy, Enrollment & Education Analytics',
  },
]

export const getDepartmentById = (id: string) =>
  DEPARTMENTS.find((d) => d.id === id) ?? DEPARTMENTS[2]
