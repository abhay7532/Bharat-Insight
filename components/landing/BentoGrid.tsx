"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BENTO_CARDS = [
  {
    title: "AI Insights",
    description: "Gemini-powered analysis streams insights in real-time, providing key findings, trends, and policy recommendations from your filtered dataset.",
    icon: "✦",
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    border: "border-violet-500/20",
    glow: "hover:shadow-violet-500/20",
    size: "col-span-2 row-span-2",
    badge: "NEW",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    title: "Real-Time Data Analysis",
    description: "Filter, sort, and analyze 100k+ rows instantly with virtualized rendering.",
    icon: "⚡",
    gradient: "from-blue-600/20 to-transparent",
    border: "border-blue-500/20",
    glow: "hover:shadow-blue-500/20",
    size: "",
    badge: null,
    badgeColor: "",
  },
  {
    title: "Multi Department Access",
    description: "Switch between Health, Agriculture & Education ministries with role-based access control.",
    icon: "⊕",
    gradient: "from-emerald-600/20 to-transparent",
    border: "border-emerald-500/20",
    glow: "hover:shadow-emerald-500/20",
    size: "",
    badge: null,
    badgeColor: "",
  },
  {
    title: "100k+ Data Handling",
    description: "TanStack Virtual + Table renders massive datasets without performance degradation.",
    icon: "◈",
    gradient: "from-amber-600/20 to-transparent",
    border: "border-amber-500/20",
    glow: "hover:shadow-amber-500/20",
    size: "",
    badge: "FAST",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    title: "Smart Filtering",
    description: "Multi-column filters, fuzzy search, and keyboard navigation for power users.",
    icon: "⊗",
    gradient: "from-cyan-600/20 to-transparent",
    border: "border-cyan-500/20",
    glow: "hover:shadow-cyan-500/20",
    size: "",
    badge: null,
    badgeColor: "",
  },
  {
    title: "Public Data Intelligence",
    description: "All 30 Indian states × 14 years × 3 ministries — comprehensive government data in one place.",
    icon: "⊞",
    gradient: "from-rose-600/20 to-transparent",
    border: "border-rose-500/20",
    glow: "hover:shadow-rose-500/20",
    size: "",
    badge: null,
    badgeColor: "",
  },
];

function BentoCard({ card, index }: { card: typeof BENTO_CARDS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative overflow-hidden rounded-2xl border ${card.border} bg-[#0d0d12] p-6 
        transition-all duration-300 hover:shadow-lg ${card.glow} ${card.size}`}>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`} />
      
      {/* Badge */}
      {card.badge && (
        <span className={`absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
          {card.badge}
        </span>
      )}

      {/* Icon */}
      <div className="text-3xl mb-4 opacity-80">{card.icon}</div>

      {/* Content */}
      <h3 className="font-semibold text-white text-lg mb-2">{card.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${card.gradient} opacity-60`} />
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <span className="text-sm text-violet-400 font-medium tracking-widest uppercase">Platform Features</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">Everything you need to <span className="gradient-text">govern with data</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">A complete intelligence platform built for India's public sector, combining AI, big data, and real-time analytics.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4">
          {BENTO_CARDS.map((card, i) => (
            <BentoCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
