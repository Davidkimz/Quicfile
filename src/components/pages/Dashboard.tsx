import { useBusinessStore } from '../../store/business'
import { useTransactionStore } from '../../store/transaction'
import { TrendingUp, AlertTriangle } from 'lucide-react'
import { format } from 'date-fns'

export default function Dashboard() {
  const { currentBusiness } = useBusinessStore()
  const { getTodayRevenue, getBusinessTransactions } = useTransactionStore()

  if (!currentBusiness) return null

  const todayRevenue = getTodayRevenue(currentBusiness.id)
  const transactions = getBusinessTransactions(currentBusiness.id)

  // Calculate monthly revenue
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthlyRevenue = transactions
    .filter(
      (t) =>
        t.type === 'sale' &&
        t.status === 'completed' &&
        new Date(t.createdAt) >= monthStart
    )
    .reduce((sum, t) => sum + t.amount, 0)

  const recentTransactions = transactions.slice(-5)

  return (
    <div className="p-4 space-y-4">
      {/* Revenue Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">Today's Revenue</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentBusiness.currency} {todayRevenue.toFixed(2)}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Last 24 hours</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Monthly Revenue
          </p>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentBusiness.currency} {monthlyRevenue.toFixed(2)}
          </h3>
          <p className="text-xs text-gray-500 mt-2">{format(now, 'MMMM')}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
            New Sale
          </button>
          <button className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
            New Invoice
          </button>
          <button className="bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700">
            Record Expense
          </button>
          <button className="bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700">
            Add Product
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-3">Recent Transactions</h2>
        {recentTransactions.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(transaction.createdAt), 'MMM d, HH:mm')}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  +{currentBusiness.currency} {transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-2">
        <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <div>
          <p className="font-medium text-blue-900 text-sm">Offline Mode Active</p>
          <p className="text-xs text-blue-700 mt-1">
            All changes are saved locally and will sync automatically when connected.
          </p>
        </div>
      </div>
    </div>
  )
}
