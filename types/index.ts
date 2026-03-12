export interface GovDataRow {
  id: string;
  state: string;
  year: number;
  department: string;
  population: number;
  literacyRate: number;
  gdpContribution: number;
  agriculturalOutput: number;
  healthIndex: number;
}

export type Department = "Ministry of Health" | "Ministry of Agriculture" | "Ministry of Education";

export interface DepartmentConfig {
  id: Department;
  label: string;
  color: string;
  accentVar: string;
  icon: string;
  gradient: string;
  bgClass: string;
}

export type Role = "admin" | "viewer";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon: string;
  category: "navigation" | "department" | "ai" | "data";
}
