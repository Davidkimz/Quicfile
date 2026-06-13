import { create } from 'zustand';
import { SyncStatus } from '../types';

interface SyncStore {
  status: SyncStatus;
  lastSyncTime: number | null;
  pendingSyncCount: number;
  setStatus: (status: SyncStatus) => void;
  setLastSyncTime: (time: number) => void;
  setPendingSyncCount: (count: number) => void;
  incrementPendingSync: () => void;
  decrementPendingSync: () => void;
}

export const useSyncStore = create<SyncStore>((set) => ({
  status: 'offline',
  lastSyncTime: null,
  pendingSyncCount: 0,
  setStatus: (status) => set({ status }),
  setLastSyncTime: (time) => set({ lastSyncTime: time }),
  setPendingSyncCount: (count) => set({ pendingSyncCount: count }),
  incrementPendingSync: () => set((state) => ({ pendingSyncCount: state.pendingSyncCount + 1 })),
  decrementPendingSync: () =>
    set((state) => ({ pendingSyncCount: Math.max(0, state.pendingSyncCount - 1) })),
}));
