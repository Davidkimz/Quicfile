import { useBusinessStore } from '../../store/business'
import { useSyncStore } from '../../store/sync'
import { Wifi, WifiOff, Loader } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { currentBusiness, setCurrentBusiness } = useBusinessStore()
  const { getPendingCount } = useSyncStore()
  const [showBusinessMenu, setShowBusinessMenu] = useState(false)
  const { businesses } = useBusinessStore()

  if (!currentBusiness) return null

  const pendingCount = getPendingCount(currentBusiness.id)
  const isOnline = navigator.onLine

  const getSyncIcon = () => {
    if (currentBusiness.syncStatus === 'syncing') {
      return <Loader className="w-4 h-4 animate-spin" />
    }
    if (currentBusiness.syncStatus === 'offline') {
      return <WifiOff className="w-4 h-4" />
    }
    return <Wifi className="w-4 h-4" />
  }

  return (
    <header className="app-header">
      <div className="px-4 py-3 flex items-center justify-between">
        <div
          onClick={() => setShowBusinessMenu(!showBusinessMenu)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg flex-1"
        >
          {currentBusiness.logo ? (
            <img
              src={currentBusiness.logo}
              alt={currentBusiness.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {currentBusiness.name.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="font-bold text-lg">{currentBusiness.name}</h1>
            <p className="text-xs text-gray-500">{currentBusiness.type}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
              {pendingCount}
            </span>
          )}
          <div className="flex items-center gap-1 text-xs">
            {getSyncIcon()}
            <span className="text-gray-600">{currentBusiness.syncStatus}</span>
          </div>
        </div>
      </div>

      {showBusinessMenu && (
        <div className="border-t bg-gray-50 p-2">
          {businesses.map((business) => (
            <button
              key={business.id}
              onClick={() => {
                setCurrentBusiness(business)
                setShowBusinessMenu(false)
              }}
              className={`w-full text-left p-3 rounded-lg mb-1 flex items-center gap-2 ${
                business.id === currentBusiness.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold text-sm">{business.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
