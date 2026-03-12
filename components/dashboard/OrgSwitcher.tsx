"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAppStore } from "@/store";
import { DEPARTMENT_CONFIGS } from "@/lib/departments";
import { Department } from "@/types";

export function OrgSwitcher() {
  const { currentDepartment, setDepartment, user } = useAppStore();
  const [open, setOpen] = useState(false);
  const current = DEPARTMENT_CONFIGS.find((d) => d.id === currentDepartment)!;

  const iconMap: Record<string, string> = {
    "Ministry of Health": "♥",
    "Ministry of Agriculture": "✿",
    "Ministry of Education": "⚑",
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 px-4 py-2.5 glass-card rounded-xl hover:border-white/15 transition-all">
        <div className={`w-7 h-7 rounded-lg ${current.bgClass} flex items-center justify-center text-white text-sm`}>
          {iconMap[current.id]}
        </div>
        <div className="text-left">
          <div className="text-xs text-gray-500">Current Department</div>
          <div className="text-sm font-semibold text-white">{current.label}</div>
        </div>
        <svg className={`w-4 h-4 text-gray-400 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }} transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 w-64 glass-card rounded-xl border border-white/10 overflow-hidden z-50">
            {DEPARTMENT_CONFIGS.map((dept) => (
              <button key={dept.id} onClick={() => { setDepartment(dept.id as Department); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${
                  dept.id === currentDepartment ? "bg-white/4" : ""}`}>
                <div className={`w-8 h-8 rounded-lg ${dept.bgClass} flex items-center justify-center text-white text-sm flex-shrink-0`}>
                  {iconMap[dept.id]}
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{dept.label}</div>
                  {dept.id === currentDepartment && (
                    <div className="text-[10px] text-gray-500">Currently active</div>
                  )}
                </div>
                {dept.id === currentDepartment && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: dept.color }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
