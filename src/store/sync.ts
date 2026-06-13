import { create } from 'zustand'
import type { SyncEvent } from '../types'

interface SyncState {
  pendingEvents: SyncEvent[]
  addEvent: (event: SyncEvent) => void
  removeEvent: (eventId: string) => void
  markAsSynced: (eventId: string) => void
  getPendingCount: (businessId: string) => number
}

export const useSyncStore = create<SyncState>()((set, get) => ({
  pendingEvents: [],

  addEvent: (event) =>
    set((state) => ({
      pendingEvents: [...state.pendingEvents, event],
    })),

  removeEvent: (eventId) =>
    set((state) => ({
      pendingEvents: state.pendingEvents.filter((e) => e.id !== eventId),
    })),

  markAsSynced: (eventId) =>
    set((state) => ({
      pendingEvents: state.pendingEvents.map((e) =>
        e.id === eventId ? { ...e, status: 'synced', syncedAt: new Date() } : e
      ),
    })),

  getPendingCount: (businessId) => {
    const { pendingEvents } = get()
    return pendingEvents.filter(
      (e) => e.businessId === businessId && e.status === 'pending'
    ).length
  },
}))
