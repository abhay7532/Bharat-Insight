"use client";
import { useEffect, Suspense } from "react";
import { useAppStore } from "@/store";
import { generateDataset, filterByDepartment } from "@/lib/dataset";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { DataGrid } from "@/components/dashboard/DataGrid";
import { AIPanel } from "@/components/dashboard/AIPanel";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher";

function DashboardInner() {
  const { setAllData, setFilteredData, currentDepartment, isSidebarOpen, isAIPanelOpen } = useAppStore();

  useEffect(() => {
    const data = generateDataset(10000); // use 10k for demo perf
    setAllData(data);
    setFilteredData(filterByDepartment(data, currentDepartment));
  }, []);

  useEffect(() => {
    const store = useAppStore.getState();
    const filtered = filterByDepartment(store.allData, currentDepartment);
    setFilteredData(filtered);
  }, [currentDepartment]);

  return (
    <div className="flex h-screen bg-[#050507] overflow-hidden">
      <CommandPalette />
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <OrgSwitcher />
            </div>
            <DataGrid />
          </main>
          {isAIPanelOpen && <AIPanel />}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#050507] flex items-center justify-center text-gray-400">Loading...</div>}>
      <DashboardInner />
    </Suspense>
  );
}
