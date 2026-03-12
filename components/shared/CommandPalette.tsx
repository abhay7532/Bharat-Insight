"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { DEPARTMENT_CONFIGS } from "@/lib/departments";
import { Department } from "@/types";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const { isCommandOpen, setCommandOpen, setDepartment, setAIPanelOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const ALL_COMMANDS = [
    { id: "dashboard", label: "Go to Dashboard", icon: "⊞", category: "Navigation", action: () => { router.push("/dashboard"); setCommandOpen(false); } },
    { id: "home", label: "Go to Home", icon: "⌂", category: "Navigation", action: () => { router.push("/"); setCommandOpen(false); } },
    { id: "ai", label: "Open AI Panel", icon: "✦", category: "AI", action: () => { setAIPanelOpen(true); setCommandOpen(false); } },
    ...DEPARTMENT_CONFIGS.map((d) => ({
      id: d.id,
      label: `Switch to ${d.label}`,
      icon: d.id === "Ministry of Health" ? "♥" : d.id === "Ministry of Agriculture" ? "✿" : "⚑",
      category: "Department",
      action: () => { setDepartment(d.id as Department); setCommandOpen(false); },
    })),
  ];

  const filtered = ALL_COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCommandOpen(true); }
      if (e.key === "Escape") setCommandOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (isCommandOpen) { setQuery(""); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [isCommandOpen]);

  useEffect(() => { setSelected(0); }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && filtered[selected]) { filtered[selected].action(); }
  }

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setCommandOpen(false)}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 cmd-backdrop" />
          <motion.div initial={{ opacity: 0, scale: 0.96, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }} transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4 glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8">
              <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none" />
              <kbd className="text-[10px] text-gray-600 px-1.5 py-0.5 border border-white/10 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-64 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">No commands found</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button key={cmd.id} onClick={cmd.action}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                      i === selected ? "bg-violet-500/15 text-white" : "text-gray-400 hover:text-white hover:bg-white/4"}`}>
                    <span className="text-base w-6 text-center flex-shrink-0">{cmd.icon}</span>
                    <span className="flex-1">{cmd.label}</span>
                    <span className="text-[10px] text-gray-600 px-2 py-0.5 bg-white/5 rounded">{cmd.category}</span>
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-gray-600">
              <span><kbd className="px-1 border border-white/10 rounded">↑↓</kbd> navigate</span>
              <span><kbd className="px-1 border border-white/10 rounded">↵</kbd> select</span>
              <span><kbd className="px-1 border border-white/10 rounded">ESC</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
