'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface BentoCardProps {
  title: string
  description: string
  icon: string
  className?: string
  accent?: string
  children?: React.ReactNode
  delay?: number
}

function BentoCard({ title, description, icon, className = '', children, delay = 0 }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`bento-card p-6 ${className}`}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-display text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  )
}

// Mini sparkline chart
function SparkLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(' ')
  return (
    <svg viewBox="0 0 100 50" className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true })

  return (
    <section id="features" className="py-24 relative" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 text-xs text-indigo-300">
            Platform Features
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">analyze India&apos;s data</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Powerful tools built for government data analysts, researchers, and policymakers.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[160px]">
          {/* Large card: AI Insights */}
          <BentoCard
            title="AI Insights via Gemini"
            description="Stream real-time analysis of any filtered dataset. Ask natural language questions and get data-backed insights instantly."
            icon="🤖"
            className="lg:col-span-2 lg:row-span-2"
            delay={0}
          >
            <div className="glass rounded-lg p-3 text-xs font-mono mt-2">
              <div className="text-indigo-300 mb-1">▶ &quot;Which state shows highest literacy growth?&quot;</div>
              <div className="text-white/40 space-y-1">
                <div className="text-emerald-400">🔍 Kerala leads with 94% literacy, up 3.2% from 2020</div>
                <div className="text-blue-300">📈 Consistent 2% annual growth across southern states</div>
                <div className="text-amber-300">💡 Expand KGBV scheme to Bihar &amp; UP immediately</div>
              </div>
            </div>
          </BentoCard>

          {/* Real-time Analysis */}
          <BentoCard
            title="Real-Time Analysis"
            description="Process and visualize 100K+ rows instantly with virtualized rendering."
            icon="⚡"
            delay={0.1}
          >
            <SparkLine data={[20, 45, 35, 60, 55, 80, 75, 95, 88, 100]} color="#6366f1" />
          </BentoCard>

          {/* Multi Department */}
          <BentoCard
            title="Multi-Department Access"
            description="Switch between Health, Agriculture, and Education ministries with contextual themes."
            icon="🏛️"
            delay={0.15}
          >
            <div className="flex gap-2 mt-1">
              {[
                { label: 'Health', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20' },
                { label: 'Agri', color: 'bg-amber-500/20 text-amber-300 border-amber-500/20' },
                { label: 'Edu', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/20' },
              ].map((d) => (
                <span key={d.label} className={`text-xs px-3 py-1 rounded-full border ${d.color}`}>
                  {d.label}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* 100k Data Handling */}
          <BentoCard
            title="100K+ Row Handling"
            description="Virtualized TanStack Table renders only visible rows, keeping performance buttery smooth."
            icon="📊"
            delay={0.2}
          >
            <div className="flex items-end gap-1 h-8 mt-1">
              {[30, 55, 45, 70, 60, 85, 78, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-indigo-600/60 to-indigo-400/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </BentoCard>

          {/* Smart Filtering */}
          <BentoCard
            title="Smart Filtering"
            description="Multi-column filters, fuzzy search, keyboard shortcuts, and instant results."
            icon="🔍"
            delay={0.25}
          >
            <div className="glass rounded-md px-3 py-2 text-xs text-white/40 font-mono mt-1">
              state=&quot;Kerala&quot; year=2024 lit&gt;85%
            </div>
          </BentoCard>

          {/* Public Data Intelligence */}
          <BentoCard
            title="Public Data Intelligence"
            description="Standardized schemas for Census, NHM, Agricultural surveys and Economic indicators."
            icon="🇮🇳"
            className="lg:col-span-1"
            delay={0.3}
          >
            <div className="flex gap-2 flex-wrap mt-1">
              {['Census', 'NHM', 'NSSO', 'DPIIT'].map((tag) => (
                <span key={tag} className="text-xs glass px-2 py-0.5 rounded text-white/40">
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
