import { useState } from 'react'
import { useBusinessStore } from '../../store/business'
import { useTransactionStore } from '../../store/transaction'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'

export default function Transactions() {
  const { currentBusiness } = useBusinessStore()
  const { getBusinessTransactions } = useTransactionStore()
  const [filter, setFilter] = useState<'all' | 'sale' | 'expense'>('all')

  if (!currentBusiness) return null

  const allTransactions = getBusinessTransactions(currentBusiness.id)
  const filtered =
    filter === 'all'
      ? allTransactions
      : allTransactions.filter((t) => t.type === filter)

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('sale')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'sale'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Sales
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'expense'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Expenses
        </button>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
        <Plus className="w-5 h-5" />
        New Transaction
      </button>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        ) : (
          filtered.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.description ||
                    transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(transaction.createdAt), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
                <p className="font-bold text-lg text-gray-900">
                  {currentBusiness.currency} {transaction.amount.toFixed(2)}
                </p>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {transaction.status}
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {transaction.paymentMethod}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
