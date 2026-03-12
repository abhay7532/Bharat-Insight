'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const CHART_DATA = [
  { state: 'Kerala', value: 94.0 },
  { state: 'Goa', value: 88.7 },
  { state: 'Delhi', value: 86.3 },
  { state: 'Mizoram', value: 91.3 },
  { state: 'Tripura', value: 87.2 },
  { state: 'Tamil Nadu', value: 80.1 },
  { state: 'H.P.', value: 82.8 },
  { state: 'Uttarakhand', value: 78.8 },
]

export function AnalyticsPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const max = Math.max(...CHART_DATA.map((d) => d.value))

  return (
    <section id="analytics" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Chart Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-white">Literacy Rate by State</h3>
                  <p className="text-white/40 text-sm">Top performing states · 2024</p>
                </div>
                <div className="text-xs glass px-3 py-1.5 rounded-full text-indigo-300">Live Data</div>
              </div>

              <div className="space-y-3">
                {CHART_DATA.map((item, i) => (
                  <motion.div
                    key={item.state}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xs text-white/40 w-20 text-right shrink-0">{item.state}</span>
                    <div className="flex-1 h-7 glass rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(item.value / max) * 100}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                        className="h-full rounded-lg flex items-center px-2"
                        style={{
                          background: `linear-gradient(90deg, rgba(99,102,241,0.6), rgba(139,92,246,0.4))`,
                        }}
                      >
                        <span className="text-xs text-white font-mono whitespace-nowrap">{item.value}%</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                <span>Source: Census of India 2024</span>
                <span className="text-emerald-400">↑ 2.3% from 2023</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs text-purple-300">
              AI-Powered Analytics Preview
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
              Turn raw data into{' '}
              <span className="gradient-text">policy decisions</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              From 100,000 rows of government data to clear, actionable insights in seconds.
              Our Gemini AI reads your filtered view and surfaces what matters most.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: '🔍', text: 'Analyze literacy trends across all 28 states' },
                { icon: '📈', text: 'Compare agricultural output year-over-year' },
                { icon: '💡', text: 'Get AI recommendations for resource allocation' },
                { icon: '⚡', text: 'Sub-100ms filter response on 100K rows' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold font-display"
            >
              Launch Dashboard
              <span className="text-indigo-200">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
