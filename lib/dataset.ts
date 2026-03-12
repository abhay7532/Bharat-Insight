import { GovDataRow, Department } from "@/types";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh",
];

const DEPARTMENTS: Department[] = [
  "Ministry of Health",
  "Ministry of Agriculture",
  "Ministry of Education",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateDataset(count: number = 100000): GovDataRow[] {
  const rows: GovDataRow[] = [];
  for (let i = 0; i < count; i++) {
    const seed = i + 1;
    const stateIdx = Math.floor(seededRandom(seed * 7) * STATES.length);
    const year = 2010 + Math.floor(seededRandom(seed * 13) * 14);
    const deptIdx = Math.floor(seededRandom(seed * 3) * DEPARTMENTS.length);
    rows.push({
      id: `row-${i}`,
      state: STATES[stateIdx],
      year,
      department: DEPARTMENTS[deptIdx],
      population: Math.floor(seededRandom(seed * 11) * 200000000 + 500000),
      literacyRate: parseFloat((seededRandom(seed * 17) * 40 + 55).toFixed(1)),
      gdpContribution: parseFloat((seededRandom(seed * 19) * 15 + 0.5).toFixed(2)),
      agriculturalOutput: parseFloat((seededRandom(seed * 23) * 500 + 50).toFixed(1)),
      healthIndex: parseFloat((seededRandom(seed * 29) * 40 + 50).toFixed(1)),
    });
  }
  return rows;
}

export function filterByDepartment(data: GovDataRow[], dept: Department): GovDataRow[] {
  return data.filter((r) => r.department === dept);
}
