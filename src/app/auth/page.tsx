'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  const fillDemo = (role: 'admin' | 'viewer') => {
    if (role === 'admin') {
      setEmail('admin@bharatinsight.gov.in')
      setPassword('admin123')
    } else {
      setEmail('viewer@bharatinsight.gov.in')
      setPassword('viewer123')
    }
  }

  return (
    <main className="min-h-screen bg-surface-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl p-8 w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold font-display mx-auto mb-4">
            BI
          </div>
          <h1 className="font-display text-2xl font-bold">BharatInsight</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your workspace</p>
        </div>

        {/* Demo credentials */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="text-xs text-white/40 mb-3 font-semibold">Demo Credentials</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => fillDemo('admin')}
              className="text-xs glass rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors"
            >
              <div className="text-indigo-300 font-semibold">Admin</div>
              <div className="text-white/30">Full access</div>
            </button>
            <button
              onClick={() => fillDemo('viewer')}
              className="text-xs glass rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors"
            >
              <div className="text-emerald-300 font-semibold">Viewer</div>
              <div className="text-white/30">Read only</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@bharatinsight.gov.in"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/50 border border-transparent transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/50 border border-transparent transition-colors"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm glass rounded-lg px-4 py-3 border border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-xl font-semibold font-display disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
