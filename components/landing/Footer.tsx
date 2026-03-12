"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">BI</span>
              </div>
              <span className="font-semibold text-white text-sm">Bharat Insight</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">AI Powered Public Data Intelligence for India.</p>
          </div>
          {[
            { title: "Platform", links: ["Dashboard", "Analytics", "Dataset", "API Docs"] },
            { title: "Departments", links: ["Ministry of Health", "Ministry of Agriculture", "Ministry of Education"] },
            { title: "Company", links: ["About", "Privacy Policy", "Terms", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-medium text-gray-300 text-sm mb-4">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2024 Bharat Insight. Built for India's public sector.</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
