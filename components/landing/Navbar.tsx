"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">BI</span>
          </div>
          <span className="font-semibold text-white tracking-tight">Bharat Insight</span>
          <span className="hidden sm:block px-2 py-0.5 text-[10px] font-medium bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">
            BETA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Architecture", "Analytics", "Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/dashboard"
            className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/20">
            Dashboard →
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 p-2">
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
