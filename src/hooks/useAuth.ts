'use client'

import { useCallback } from 'react'
import { useAppStore } from '@/store/appStore'
import { DEMO_USERS } from '@/lib/supabase'
import type { AppUser } from '@/types'

export function useAuth() {
  const { user, setUser } = useAppStore()

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // Try demo users first
      const demoUser = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      )

      if (demoUser) {
        const appUser: AppUser = {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role,
          department: demoUser.department,
        }
        setUser(appUser)
        return { success: true }
      }

      return { success: false, error: 'Invalid credentials. Use demo credentials.' }
    },
    [setUser]
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  return { user, login, logout, isAuthenticated: !!user }
}
