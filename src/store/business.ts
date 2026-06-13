import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Business, SyncStatus } from '../types'

interface BusinessState {
  businesses: Business[]
  currentBusiness: Business | null
  setCurrentBusiness: (business: Business | null) => void
  addBusiness: (business: Business) => void
  updateBusiness: (id: string, updates: Partial<Business>) => void
  updateSyncStatus: (businessId: string, status: SyncStatus) => void
}

export const useBusinessStore = create<BusinessState>()()
  persist(
    (set) => ({
      businesses: [],
      currentBusiness: null,

      setCurrentBusiness: (business) => set({ currentBusiness: business }),

      addBusiness: (business) =>
        set((state) => ({
          businesses: [...state.businesses, business],
        })),

      updateBusiness: (id, updates) =>
        set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
          currentBusiness:
            state.currentBusiness?.id === id
              ? { ...state.currentBusiness, ...updates }
              : state.currentBusiness,
        })),

      updateSyncStatus: (businessId, status) =>
        set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === businessId ? { ...b, syncStatus: status } : b
          ),
          currentBusiness:
            state.currentBusiness?.id === businessId
              ? { ...state.currentBusiness, syncStatus: status }
              : state.currentBusiness,
        })),
    }),
    {
      name: 'quicfile-business',
    }
  )
