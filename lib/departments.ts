import { DepartmentConfig } from "@/types";

export const DEPARTMENT_CONFIGS: DepartmentConfig[] = [
  {
    id: "Ministry of Health",
    label: "Ministry of Health",
    color: "#10b981",
    accentVar: "--accent",
    icon: "Heart",
    gradient: "from-emerald-500/20 to-teal-500/10",
    bgClass: "bg-emerald-500",
  },
  {
    id: "Ministry of Agriculture",
    label: "Ministry of Agriculture",
    color: "#f59e0b",
    accentVar: "--accent",
    icon: "Sprout",
    gradient: "from-amber-500/20 to-yellow-500/10",
    bgClass: "bg-amber-500",
  },
  {
    id: "Ministry of Education",
    label: "Ministry of Education",
    color: "#7c3aed",
    accentVar: "--accent",
    icon: "GraduationCap",
    gradient: "from-violet-500/20 to-purple-500/10",
    bgClass: "bg-violet-500",
  },
];

export function getDeptConfig(id: string): DepartmentConfig {
  return DEPARTMENT_CONFIGS.find((d) => d.id === id) ?? DEPARTMENT_CONFIGS[0];
}
