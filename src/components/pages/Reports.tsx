import { BarChart3, PieChart, TrendingUp } from 'lucide-react'

export default function Reports() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Business Reports</h1>

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-300 transition">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="font-medium text-sm text-gray-900">P&L Report</p>
          <p className="text-xs text-gray-500 mt-1">Profit & Loss</p>
        </button>

        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-300 transition">
          <PieChart className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="font-medium text-sm text-gray-900">Sales Summary</p>
          <p className="text-xs text-gray-500 mt-1">Revenue breakdown</p>
        </button>

        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-300 transition">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="font-medium text-sm text-gray-900">Inventory</p>
          <p className="text-xs text-gray-500 mt-1">Stock report</p>
        </button>

        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-300 transition">
          <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="font-medium text-sm text-gray-900">Expenses</p>
          <p className="text-xs text-gray-500 mt-1">Cost analysis</p>
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-3">Export Options</h2>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
            Export as PDF
          </button>
          <button className="w-full px-4 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50">
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  )
}
