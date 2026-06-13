import { useSyncStore } from '../store/sync'
import { useBusinessStore } from '../store/business'
import { getDB } from '../db/init'
import { v4 as uuidv4 } from 'uuid'
import type { SyncEvent } from '../types'

export class SyncService {
  static async queueEvent(businessId: string, type: string, data: unknown) {
    const db = await getDB()
    const event: SyncEvent = {
      id: uuidv4(),
      businessId,
      type,
      data,
      createdAt: new Date(),
      status: 'pending',
    }
    await db.add('syncEvents', event)
    useSyncStore.getState().addEvent(event)
    return event
  }

  static async getPendingEvents(businessId: string) {
    const db = await getDB()
    const events = await db.getAllFromIndex('syncEvents', 'by-businessId', businessId)
    return events.filter((e) => e.status === 'pending')
  }

  static async sync(businessId: string) {
    const events = await this.getPendingEvents(businessId)
    const { updateSyncStatus } = useBusinessStore.getState()
    
    updateSyncStatus(businessId, 'syncing')

    try {
      for (const event of events) {
        // TODO: Implement actual sync with server
        await this.markAsSynced(event.id)
      }
      updateSyncStatus(businessId, 'synced')
    } catch (error) {
      console.error('Sync error:', error)
      updateSyncStatus(businessId, 'error')
    }
  }

  static async markAsSynced(eventId: string) {
    const db = await getDB()
    const event = await db.get('syncEvents', eventId)
    if (event) {
      event.status = 'synced'
      event.syncedAt = new Date()
      await db.put('syncEvents', event)
      useSyncStore.getState().markAsSynced(eventId)
    }
  }

  static startAutoSync() {
    // Sync when coming online
    window.addEventListener('online', async () => {
      const { currentBusiness } = useBusinessStore.getState()
      if (currentBusiness) {
        await this.sync(currentBusiness.id)
      }
    })

    // Periodic sync every 30 seconds when online
    setInterval(async () => {
      if (navigator.onLine) {
        const { currentBusiness } = useBusinessStore.getState()
        if (currentBusiness) {
          await this.sync(currentBusiness.id)
        }
      }
    }, 30000)
  }
}
