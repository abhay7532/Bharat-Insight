import type { IndiaDataRow, DepartmentId } from '@/types'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir',
]

const DEPARTMENTS: DepartmentId[] = ['health', 'agriculture', 'education']

const DEPT_NAMES: Record<DepartmentId, string> = {
  health: 'Ministry of Health',
  agriculture: 'Ministry of Agriculture',
  education: 'Ministry of Education',
}

// Base stats per state (realistic approximations)
const STATE_BASE: Record<string, { pop: number; literacy: number; gdp: number; agri: number; health: number }> = {
  'Uttar Pradesh':    { pop: 23500, literacy: 67.7, gdp: 9.2,  agri: 18.4, health: 52 },
  'Maharashtra':      { pop: 12400, literacy: 82.9, gdp: 15.2, agri: 12.1, health: 71 },
  'Bihar':            { pop: 12000, literacy: 61.8, gdp: 2.8,  agri: 22.1, health: 44 },
  'West Bengal':      { pop: 9100,  literacy: 77.1, gdp: 5.9,  agri: 16.8, health: 63 },
  'Madhya Pradesh':   { pop: 8500,  literacy: 69.3, gdp: 4.1,  agri: 20.2, health: 55 },
  'Tamil Nadu':       { pop: 7800,  literacy: 80.1, gdp: 9.8,  agri: 10.5, health: 74 },
  'Rajasthan':        { pop: 8100,  literacy: 66.1, gdp: 5.5,  agri: 17.9, health: 56 },
  'Karnataka':        { pop: 6700,  literacy: 75.4, gdp: 8.4,  agri: 11.8, health: 69 },
  'Gujarat':          { pop: 6500,  literacy: 78.0, gdp: 8.1,  agri: 9.4,  health: 67 },
  'Andhra Pradesh':   { pop: 5300,  literacy: 67.0, gdp: 5.1,  agri: 14.2, health: 61 },
  'Odisha':           { pop: 4600,  literacy: 72.9, gdp: 3.2,  agri: 15.6, health: 58 },
  'Telangana':        { pop: 3800,  literacy: 66.5, gdp: 5.7,  agri: 12.3, health: 64 },
  'Kerala':           { pop: 3500,  literacy: 94.0, gdp: 4.1,  agri: 8.2,  health: 89 },
  'Jharkhand':        { pop: 3800,  literacy: 66.4, gdp: 2.4,  agri: 14.8, health: 51 },
  'Assam':            { pop: 3500,  literacy: 73.2, gdp: 1.9,  agri: 19.1, health: 55 },
  'Punjab':           { pop: 3000,  literacy: 75.8, gdp: 3.2,  agri: 16.4, health: 70 },
  'Haryana':          { pop: 2900,  literacy: 75.6, gdp: 3.8,  agri: 13.6, health: 68 },
  'Chhattisgarh':     { pop: 3000,  literacy: 70.3, gdp: 2.2,  agri: 17.2, health: 52 },
  'Delhi':            { pop: 2000,  literacy: 86.3, gdp: 4.4,  agri: 0.5,  health: 78 },
  'Jammu & Kashmir':  { pop: 1400,  literacy: 67.2, gdp: 0.8,  agri: 11.2, health: 62 },
  'Uttarakhand':      { pop: 1100,  literacy: 78.8, gdp: 1.1,  agri: 10.8, health: 67 },
  'Himachal Pradesh': { pop: 750,   literacy: 82.8, gdp: 0.9,  agri: 12.4, health: 72 },
  'Tripura':          { pop: 400,   literacy: 87.2, gdp: 0.3,  agri: 15.6, health: 65 },
  'Meghalaya':        { pop: 320,   literacy: 74.4, gdp: 0.25, agri: 18.2, health: 59 },
  'Manipur':          { pop: 290,   literacy: 76.9, gdp: 0.22, agri: 16.4, health: 61 },
  'Nagaland':         { pop: 220,   literacy: 79.6, gdp: 0.18, agri: 15.8, health: 60 },
  'Goa':              { pop: 155,   literacy: 88.7, gdp: 0.55, agri: 6.2,  health: 81 },
  'Arunachal Pradesh':{ pop: 150,   literacy: 65.4, gdp: 0.21, agri: 14.6, health: 55 },
  'Mizoram':          { pop: 115,   literacy: 91.3, gdp: 0.15, agri: 12.8, health: 68 },
  'Sikkim':           { pop: 65,    literacy: 81.4, gdp: 0.12, agri: 11.2, health: 72 },
}

let _cachedDataset: IndiaDataRow[] | null = null

export function generateDataset(count: number = 100000): IndiaDataRow[] {
  if (_cachedDataset && _cachedDataset.length === count) return _cachedDataset

  const rows: IndiaDataRow[] = []
  const stateNames = Object.keys(STATE_BASE)
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

  let idx = 0
  while (rows.length < count) {
    const state = stateNames[idx % stateNames.length]
    const base = STATE_BASE[state]
    const year = years[Math.floor(idx / stateNames.length) % years.length]
    const dept = DEPARTMENTS[idx % DEPARTMENTS.length]
    const yearOffset = (year - 2015) * 0.02 // 2% annual growth factor
    const noise = () => (Math.random() - 0.5) * 0.06 // ±3% noise

    rows.push({
      id: `row-${idx}`,
      state,
      year,
      department: DEPT_NAMES[dept],
      population: Math.round(base.pop * (1 + yearOffset + noise()) * 1000),
      literacyRate: Math.min(99, +(base.literacy * (1 + yearOffset * 0.5 + noise())).toFixed(1)),
      gdpContribution: +(base.gdp * (1 + yearOffset * 1.5 + noise())).toFixed(2),
      agriculturalOutput: +(base.agri * (1 + yearOffset + noise())).toFixed(1),
      healthIndex: Math.min(99, +(base.health * (1 + yearOffset * 0.3 + noise())).toFixed(1)),
    })
    idx++
  }

  _cachedDataset = rows
  return rows
}

export function getFilteredData(
  data: IndiaDataRow[],
  filters: {
    globalSearch?: string
    state?: string
    year?: string
    department?: string
  }
): IndiaDataRow[] {
  return data.filter((row) => {
    if (filters.state && filters.state !== 'all' && row.state !== filters.state) return false
    if (filters.year && filters.year !== 'all' && row.year !== parseInt(filters.year)) return false
    if (filters.department && filters.department !== 'all' && !row.department.toLowerCase().includes(filters.department.toLowerCase())) return false
    if (filters.globalSearch) {
      const q = filters.globalSearch.toLowerCase()
      return (
        row.state.toLowerCase().includes(q) ||
        row.department.toLowerCase().includes(q) ||
        row.year.toString().includes(q)
      )
    }
    return true
  })
}

export const UNIQUE_STATES = Object.keys(STATE_BASE).sort()
export const UNIQUE_YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
export const UNIQUE_DEPARTMENTS = ['Ministry of Health', 'Ministry of Agriculture', 'Ministry of Education']
