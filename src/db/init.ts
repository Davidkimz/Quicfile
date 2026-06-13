import { openDB, DBSchema, IDBPDatabase } from 'idb'
import type {
  User,
  Business,
  Product,
  Customer,
  Transaction,
  Invoice,
  Expense,
  SyncEvent,
} from '../types'

interface QuicFileDB extends DBSchema {
  users: {
    key: string
    value: User
  }
  businesses: {
    key: string
    value: Business
    indexes: { 'by-userId': string }
  }
  products: {
    key: string
    value: Product
    indexes: { 'by-businessId': string; 'by-barcode': string }
  }
  customers: {
    key: string
    value: Customer
    indexes: { 'by-businessId': string }
  }
  transactions: {
    key: string
    value: Transaction
    indexes: { 'by-businessId': string; 'by-createdAt': Date }
  }
  invoices: {
    key: string
    value: Invoice
    indexes: { 'by-businessId': string }
  }
  expenses: {
    key: string
    value: Expense
    indexes: { 'by-businessId': string }
  }
  syncEvents: {
    key: string
    value: SyncEvent
    indexes: { 'by-businessId': string; 'by-status': string }
  }
}

let db: IDBPDatabase<QuicFileDB> | null = null

export async function initializeDatabase(): Promise<IDBPDatabase<QuicFileDB>> {
  if (db) return db

  db = await openDB<QuicFileDB>('quicfile', 1, {
    upgrade(db) {
      // Users store
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' })
      }

      // Businesses store
      if (!db.objectStoreNames.contains('businesses')) {
        const businessStore = db.createObjectStore('businesses', {
          keyPath: 'id',
        })
        businessStore.createIndex('by-userId', 'userId')
      }

      // Products store
      if (!db.objectStoreNames.contains('products')) {
        const productStore = db.createObjectStore('products', {
          keyPath: 'id',
        })
        productStore.createIndex('by-businessId', 'businessId')
        productStore.createIndex('by-barcode', 'barcode')
      }

      // Customers store
      if (!db.objectStoreNames.contains('customers')) {
        const customerStore = db.createObjectStore('customers', {
          keyPath: 'id',
        })
        customerStore.createIndex('by-businessId', 'businessId')
      }

      // Transactions store
      if (!db.objectStoreNames.contains('transactions')) {
        const transactionStore = db.createObjectStore('transactions', {
          keyPath: 'id',
        })
        transactionStore.createIndex('by-businessId', 'businessId')
        transactionStore.createIndex('by-createdAt', 'createdAt')
      }

      // Invoices store
      if (!db.objectStoreNames.contains('invoices')) {
        const invoiceStore = db.createObjectStore('invoices', {
          keyPath: 'id',
        })
        invoiceStore.createIndex('by-businessId', 'businessId')
      }

      // Expenses store
      if (!db.objectStoreNames.contains('expenses')) {
        const expenseStore = db.createObjectStore('expenses', {
          keyPath: 'id',
        })
        expenseStore.createIndex('by-businessId', 'businessId')
      }

      // Sync Events store
      if (!db.objectStoreNames.contains('syncEvents')) {
        const syncStore = db.createObjectStore('syncEvents', {
          keyPath: 'id',
        })
        syncStore.createIndex('by-businessId', 'businessId')
        syncStore.createIndex('by-status', 'status')
      }
    },
  })

  return db
}

export async function getDB(): Promise<IDBPDatabase<QuicFileDB>> {
  if (!db) {
    return initializeDatabase()
  }
  return db
}
