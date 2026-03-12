'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const STREAMING_LINES = [
  '> Loading Bihar education dataset... ✓',
  '> Analyzing literacy trends 2015–2024...',
  '> Kerala: 94.0% literacy (highest)',
  '> Bihar: 61.8% literacy (improvement needed)',
  '> Running GDP correlation analysis...',
  '> Agricultural output: UP leads at 18.4%',
  '> Health index: National avg 63.2 ↑',
  '> AI insight generated: Focus on eastern states',
  '> 100,000 rows processed in 12ms',
  '> Smart filter applied: Year=2024',
]

function StreamingText() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [visible, setVisible] = useState<string>('')

  useEffect(() => {
    const line = STREAMING_LINES[currentLine % STREAMING_LINES.length]
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setVisible(line.slice(0, currentChar + 1))
        setCurrentChar((c) => c + 1)
      }, 35)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev.slice(-6), line])
        setVisible('')
        setCurrentChar(0)
        setCurrentLine((l) => l + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [currentChar, currentLine])

  return (
    <div className="font-mono text-xs leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="text-emerald-400/70 mb-1">
          {line}
        </div>
      ))}
      {visible && (
        <div className="text-emerald-300">
          {visible}
          <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
        </div>
      )}
    </div>
  )
}

function MiniChart() {
  const bars = [40, 65, 52, 78, 61, 89, 73, 95, 82, 100]
  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: 'backOut' }}
          style={{ originY: 1 }}
          className="flex-1 rounded-t-sm"
          css-height={`${h}%`}
        >
          <div
            className="w-full rounded-t-sm"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, rgba(99,102,241,0.8), rgba(129,140,248,0.4))`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-purple-600/8 blur-[100px] pointer-events-none" />

      {/* Animated orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-32 right-20 w-64 h-64 rounded-full border border-indigo-500/10 flex items-center justify-center"
      >
        <div className="w-48 h-48 rounded-full border border-indigo-500/15 animate-pulse-slow flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-sm animate-float" />
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-xs text-indigo-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Data Intelligence Platform · India
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            AI Powered
            <br />
            <span className="gradient-text">Public Data</span>
            <br />
            Intelligence
            <br />
            <span className="text-white/40 text-4xl lg:text-5xl">for India</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-md"
          >
            Analyze 100K+ government records across all Indian states. AI-driven insights from Gemini,
            real-time filtering, and multi-department access.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/dashboard" className="btn-primary px-8 py-3.5 rounded-xl text-base font-semibold font-display flex items-center gap-2">
              Explore Dashboard
              <span className="text-indigo-200">→</span>
            </Link>
            <Link href="#analytics" className="btn-ghost px-8 py-3.5 rounded-xl text-base font-semibold font-display flex items-center gap-2">
              View Dataset
              <span className="text-white/40">↓</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/5"
          >
            {[
              { label: 'Data Rows', value: '100K+' },
              { label: 'Indian States', value: '30' },
              { label: 'Departments', value: '3' },
              { label: 'Years of Data', value: '10' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Dashboard preview card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="glass-strong rounded-2xl p-1 shadow-2xl glow-purple">
            {/* Fake browser chrome */}
            <div className="glass rounded-xl overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="flex-1 mx-4">
                  <div className="glass rounded-md px-3 py-1.5 text-xs text-white/30 font-mono">
                    bharatinsight.gov.in/dashboard
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Chart preview */}
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs font-semibold text-white/70">Literacy Rate by State</div>
                      <div className="text-xs text-white/30">2024 · All States</div>
                    </div>
                    <div className="text-xs text-emerald-400 font-mono">+2.3%</div>
                  </div>
                  <MiniChart />
                </div>

                {/* AI streaming terminal */}
                <div className="glass rounded-xl p-4 bg-black/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-xs text-indigo-300 font-semibold">Gemini AI Insight</span>
                  </div>
                  <StreamingText />
                </div>

                {/* Mini table */}
                <div className="glass rounded-xl overflow-hidden">
                  <div className="grid grid-cols-4 text-xs text-white/30 px-3 py-2 border-b border-white/5">
                    <span>State</span><span>Year</span><span>Literacy</span><span>Health</span>
                  </div>
                  {[
                    ['Kerala', '2024', '94.0%', '89'],
                    ['Mizoram', '2024', '91.3%', '68'],
                    ['Delhi', '2024', '86.3%', '78'],
                    ['Goa', '2024', '88.7%', '81'],
                  ].map(([state, year, lit, health], i) => (
                    <div key={i} className="grid grid-cols-4 text-xs px-3 py-2 border-b border-white/3 hover:bg-indigo-500/5 transition-colors">
                      <span className="text-white/70">{state}</span>
                      <span className="text-white/40">{year}</span>
                      <span className="text-indigo-300">{lit}</span>
                      <span className="text-emerald-300">{health}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
