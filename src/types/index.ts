export interface User {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: Date
}

export interface Business {
  id: string
  userId: string
  name: string
  type: 'service' | 'shop'
  logo?: string
  currency: string
  taxRate: number
  createdAt: Date
  syncStatus: SyncStatus
}

export type SyncStatus = 'synced' | 'syncing' | 'pending' | 'offline' | 'error'

export interface Product {
  id: string
  businessId: string
  name: string
  barcode: string
  costPrice: number
  sellingPrice: number
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  businessId: string
  name: string
  email?: string
  phone?: string
  address?: string
  balance: number
  createdAt: Date
}

export interface Transaction {
  id: string
  businessId: string
  type: 'sale' | 'purchase' | 'expense' | 'payment'
  amount: number
  customerId?: string
  items?: TransactionItem[]
  description?: string
  paymentMethod: string
  status: 'draft' | 'completed' | 'cancelled'
  createdAt: Date
  syncedAt?: Date
}

export interface TransactionItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  discount?: number
}

export interface SyncEvent {
  id: string
  businessId: string
  type: string
  data: unknown
  createdAt: Date
  syncedAt?: Date
  status: 'pending' | 'synced' | 'failed'
}

export interface Invoice {
  id: string
  businessId: string
  customerId: string
  invoiceNumber: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'draft' | 'sent' | 'paid' | 'cancelled'
  dueDate: Date
  createdAt: Date
  paidAt?: Date
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export interface Expense {
  id: string
  businessId: string
  category: string
  amount: number
  description: string
  receiptUrl?: string
  createdAt: Date
}
