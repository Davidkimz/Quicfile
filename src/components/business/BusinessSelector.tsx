import { useBusinessStore } from '../../store/business'
import { useAuthStore } from '../../store/auth'
import { Plus, LogOut } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function BusinessSelector() {
  const { businesses, setCurrentBusiness, addBusiness } = useBusinessStore()
  const { user, logout } = useAuthStore()
  const [showNewBusiness, setShowNewBusiness] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'service' as 'service' | 'shop',
  })

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault()
    const newBusiness = {
      id: uuidv4(),
      userId: user?.id || '',
      name: formData.name,
      type: formData.type,
      currency: 'USD',
      taxRate: 0.1,
      createdAt: new Date(),
      syncStatus: 'synced' as const,
    }
    addBusiness(newBusiness)
    setCurrentBusiness(newBusiness)
    setShowNewBusiness(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">QuicFile</h1>
            <p className="text-gray-600 text-sm">{user?.name}</p>
          </div>
          <button
            onClick={() => logout()}
            className="p-2 text-gray-600 hover:bg-white rounded-lg"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Business Cards */}
        <div className="space-y-3 mb-4">
          {businesses.map((business) => (
            <button
              key={business.id}
              onClick={() => setCurrentBusiness(business)}
              className="w-full bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {business.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{business.type}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* New Business Button */}
        <button
          onClick={() => setShowNewBusiness(!showNewBusiness)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          New Business
        </button>

        {/* New Business Form */}
        {showNewBusiness && (
          <form
            onSubmit={handleCreateBusiness}
            className="bg-white rounded-lg shadow-lg p-4 mt-4 space-y-3"
          >
            <input
              type="text"
              placeholder="Business Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              required
            />
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as 'service' | 'shop',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="service">Service Business</option>
              <option value="shop">Retail Shop</option>
            </select>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
            >
              Create Business
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
