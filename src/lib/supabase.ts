import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getCurrentSession() {
  return supabase.auth.getSession()
}

// ─── Demo Auth (when Supabase not configured) ─────────────────────────────────

export const DEMO_USERS = [
  {
    id: 'demo-admin',
    email: 'admin@bharatinsight.gov.in',
    name: 'Arjun Sharma',
    role: 'admin' as const,
    department: 'education' as const,
    password: 'admin123',
  },
  {
    id: 'demo-viewer',
    email: 'viewer@bharatinsight.gov.in',
    name: 'Priya Mehta',
    role: 'viewer' as const,
    department: 'health' as const,
    password: 'viewer123',
  },
]
