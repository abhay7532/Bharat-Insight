"use client";
import { useAppStore } from "@/store";

export function Topbar() {
  const { toggleSidebar, setCommandOpen, isAIPanelOpen, setAIPanelOpen, globalSearch, setGlobalSearch } = useAppStore();

  return (
    <header className="h-14 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur flex items-center gap-4 px-4 flex-shrink-0">
      <button onClick={toggleSidebar} className="text-gray-400 hover:text-white p-1.5 rounded-md hover:bg-white/5 transition-colors" title="Toggle Sidebar">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder="Search data... (Ctrl+K)"
          onClick={() => setCommandOpen(true)}
          className="w-full bg-white/4 border border-white/8 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/6 transition-all" />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <kbd className="text-[9px] text-gray-600 px-1 border border-white/10 rounded">⌘K</kbd>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={() => setAIPanelOpen(!isAIPanelOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isAIPanelOpen ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
          <span>✦</span> AI Panel
        </button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer">A</div>
      </div>
    </header>
  );
}
