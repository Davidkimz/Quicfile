import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()()
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      login: async (email: string, password: string) => {
        // TODO: Implement actual authentication
        const user: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          createdAt: new Date(),
        }
        set({ user })
      },

      logout: () => set({ user: null }),

      signup: async (name: string, email: string, password: string) => {
        // TODO: Implement actual signup
        const user: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name,
          email,
          createdAt: new Date(),
        }
        set({ user })
      },
    }),
    {
      name: 'quicfile-auth',
    }
  )
