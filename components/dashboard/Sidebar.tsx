"use client";
import { motion } from "framer-motion";
import { useAppStore } from "@/store";
import Link from "next/link";

const NAV = [
  { icon: "⊞", label: "Overview", href: "/dashboard", active: true },
  { icon: "◈", label: "Data Grid", href: "/dashboard", active: false },
  { icon: "⊕", label: "Analytics", href: "/dashboard", active: false },
  { icon: "✦", label: "AI Insights", href: "/dashboard", active: false },
  { icon: "⊗", label: "Reports", href: "/dashboard", active: false },
];

export function Sidebar() {
  const { user, currentDepartment } = useAppStore();

  return (
    <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
      className="w-60 flex-shrink-0 bg-[#0a0a0f] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">BI</span>
          </div>
          <span className="font-semibold text-white text-sm">Bharat Insight</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map((item) => (
          <Link key={item.label} href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
              item.active
                ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/4"
            }`}>
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Keyboard shortcut hint */}
      <div className="p-3">
        <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/5 text-xs text-gray-500 text-center">
          <kbd className="px-1.5 py-0.5 bg-white/8 rounded text-[10px] border border-white/10">Ctrl</kbd>
          {" + "}
          <kbd className="px-1.5 py-0.5 bg-white/8 rounded text-[10px] border border-white/10">K</kbd>
          {" Command Palette"}
        </div>
      </div>

      {/* User */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {user?.name?.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-white truncate">{user?.name}</div>
            <div className="text-[10px] text-gray-500 truncate capitalize">{user?.role}</div>
          </div>
          <span className={`ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${
            user?.role === "admin" ? "bg-violet-500/20 text-violet-300" : "bg-gray-500/20 text-gray-400"}`}>
            {user?.role}
          </span>
        </div>
      </div>
    </motion.aside>
  );
}
