import { create } from 'zustand'
import type { Transaction } from '../types'

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  getBusinessTransactions: (businessId: string) => Transaction[]
  getTodayRevenue: (businessId: string) => number
}

export const useTransactionStore = create<TransactionState>()((set, get) => ({
  transactions: [],

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),

  getBusinessTransactions: (businessId) => {
    const { transactions } = get()
    return transactions.filter((t) => t.businessId === businessId)
  },

  getTodayRevenue: (businessId) => {
    const { transactions } = get()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return transactions
      .filter(
        (t) =>
          t.businessId === businessId &&
          t.type === 'sale' &&
          t.status === 'completed' &&
          new Date(t.createdAt) >= today
      )
      .reduce((sum, t) => sum + t.amount, 0)
  },
}))
