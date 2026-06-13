import { useAuthStore } from '../../store/auth'
import { useBusinessStore } from '../../store/business'
import { LogOut, Bell, Lock, HelpCircle } from 'lucide-react'

export default function Settings() {
  const { logout } = useAuthStore()
  const { currentBusiness } = useBusinessStore()

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Business Settings */}
      {currentBusiness && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-3">
          <h2 className="font-semibold text-gray-900">Business Settings</h2>
          <div>
            <p className="text-sm text-gray-600">Business Name</p>
            <p className="font-medium text-gray-900">{currentBusiness.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Business Type</p>
            <p className="font-medium text-gray-900 capitalize">{currentBusiness.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Currency</p>
            <p className="font-medium text-gray-900">{currentBusiness.currency}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tax Rate</p>
            <p className="font-medium text-gray-900">{currentBusiness.taxRate * 100}%</p>
          </div>
        </div>
      )}

      {/* App Settings */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">App Settings</h2>
        
        <button className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900 text-sm">Notifications</p>
            <p className="text-xs text-gray-500">Manage alerts</p>
          </div>
        </button>

        <button className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <Lock className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900 text-sm">Security</p>
            <p className="text-xs text-gray-500">Privacy settings</p>
          </div>
        </button>

        <button className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900 text-sm">Help & Support</p>
            <p className="text-xs text-gray-500">Get help</p>
          </div>
        </button>
      </div>

      {/* Account */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Version Info */}
      <div className="text-center text-gray-500 text-sm py-4">
        <p>QuicFile v4.0.0</p>
        <p className="text-xs mt-1">Offline-First Business OS</p>
      </div>
    </div>
  )
}
