'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const LAYERS = [
  {
    label: 'Frontend Layer',
    tech: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    color: '#6366f1',
    icon: '🎨',
  },
  {
    label: 'State & Data Layer',
    tech: ['Zustand Store', 'TanStack Query', 'TanStack Table', 'React Virtual'],
    color: '#8b5cf6',
    icon: '⚙️',
  },
  {
    label: 'AI & Intelligence',
    tech: ['Google Gemini 1.5', 'Streaming SSE', 'Context Awareness', 'NLP Analysis'],
    color: '#06b6d4',
    icon: '🤖',
  },
  {
    label: 'Backend & Auth',
    tech: ['Supabase Auth', 'Row Level Security', 'Role-Based Access', 'Multi-tenant'],
    color: '#10b981',
    icon: '🔐',
  },
]

export function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="architecture" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 text-xs text-cyan-300">
            Platform Architecture
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Built for <span className="gradient-text">scale</span> and{' '}
            <span className="text-cyan-400">performance</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A modern stack designed to handle India-scale public datasets with sub-second response times.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-card p-6 text-center"
            >
              <div className="text-4xl mb-4">{layer.icon}</div>
              <h3 className="font-display font-bold text-sm text-white mb-4">{layer.label}</h3>
              <div className="space-y-2">
                {layer.tech.map((t) => (
                  <div
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-lg border text-center"
                    style={{
                      borderColor: `${layer.color}30`,
                      backgroundColor: `${layer.color}10`,
                      color: layer.color,
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow arrows between layers on lg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-white/20 text-xs"
        >
          Frontend ← State Management ← AI Processing ← Authentication & Data
        </motion.div>
      </div>
    </section>
  )
}
