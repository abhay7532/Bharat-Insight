"use client";
import { motion } from "framer-motion";

const LAYERS = [
  { label: "AI Layer", desc: "Google Gemini 1.5 Flash — streaming insights", color: "from-violet-500 to-purple-600", icon: "✦" },
  { label: "Data Layer", desc: "TanStack Table + Virtual — 100k rows", color: "from-blue-500 to-cyan-600", icon: "⊞" },
  { label: "Auth Layer", desc: "Supabase — RBAC with Admin/Viewer roles", color: "from-emerald-500 to-teal-600", icon: "⊕" },
  { label: "State Layer", desc: "Zustand — global multi-tenant state", color: "from-amber-500 to-orange-600", icon: "◈" },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <span className="text-sm text-violet-400 font-medium tracking-widest uppercase">Platform Architecture</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">
            Built for <span className="gradient-text">enterprise scale</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: layer diagram */}
          <div className="space-y-3">
            {LAYERS.map((layer, i) => (
              <motion.div key={layer.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center gap-4 p-4 glass-card rounded-xl">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {layer.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{layer.label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{layer.desc}</div>
                </div>
                <div className="ml-auto">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${layer.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: tech stack grid */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Tech Stack</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Next.js 14", "App Router"],
                ["TypeScript", "Strict Mode"],
                ["Framer Motion", "Animations"],
                ["TanStack", "Table + Query"],
                ["Zustand", "State Mgmt"],
                ["Supabase", "Auth + DB"],
                ["Gemini API", "AI Insights"],
                ["Tailwind CSS", "Styling"],
              ].map(([name, detail]) => (
                <div key={name} className="p-3 rounded-lg bg-white/3 border border-white/5">
                  <div className="font-medium text-white text-sm">{name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{detail}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
