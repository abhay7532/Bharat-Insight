import { create } from "zustand";
import { Department, User, AIMessage, GovDataRow } from "@/types";

interface AppState {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Department
  currentDepartment: Department;
  setDepartment: (dept: Department) => void;

  // Data
  allData: GovDataRow[];
  filteredData: GovDataRow[];
  setAllData: (data: GovDataRow[]) => void;
  setFilteredData: (data: GovDataRow[]) => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // AI
  aiMessages: AIMessage[];
  isAIThinking: boolean;
  addMessage: (msg: AIMessage) => void;
  updateLastMessage: (content: string) => void;
  setIsAIThinking: (v: boolean) => void;
  clearMessages: () => void;

  // UI
  isSidebarOpen: boolean;
  isCommandOpen: boolean;
  isAIPanelOpen: boolean;
  toggleSidebar: () => void;
  setCommandOpen: (v: boolean) => void;
  setAIPanelOpen: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: "demo-user",
    email: "admin@bharatinsight.gov.in",
    role: "admin",
    name: "Arjun Sharma",
  },
  setUser: (user) => set({ user }),

  currentDepartment: "Ministry of Health",
  setDepartment: (dept) => set({ currentDepartment: dept }),

  allData: [],
  filteredData: [],
  setAllData: (data) => set({ allData: data }),
  setFilteredData: (data) => set({ filteredData: data }),
  globalSearch: "",
  setGlobalSearch: (q) => set({ globalSearch: q }),

  aiMessages: [],
  isAIThinking: false,
  addMessage: (msg) => set((s) => ({ aiMessages: [...s.aiMessages, msg] })),
  updateLastMessage: (content) =>
    set((s) => {
      const msgs = [...s.aiMessages];
      if (msgs.length > 0) msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content, isStreaming: false };
      return { aiMessages: msgs };
    }),
  setIsAIThinking: (v) => set({ isAIThinking: v }),
  clearMessages: () => set({ aiMessages: [] }),

  isSidebarOpen: true,
  isCommandOpen: false,
  isAIPanelOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setCommandOpen: (v) => set({ isCommandOpen: v }),
  setAIPanelOpen: (v) => set({ isAIPanelOpen: v }),
}));
