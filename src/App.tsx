import { useEffect, useState } from 'react'
import { useAuthStore } from './store/auth'
import { useBusinessStore } from './store/business'
import { initializeDatabase } from './db/init'
import AuthFlow from './components/auth/AuthFlow'
import BusinessSelector from './components/business/BusinessSelector'
import MainApp from './components/MainApp'
import './App.css'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)
  const { user } = useAuthStore()
  const { currentBusiness } = useBusinessStore()

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeDatabase()
        setIsReady(true)
      } catch (error) {
        console.error('Initialization error:', error)
        setInitError('Failed to initialize application. Please refresh.')
      }
    }

    initialize()
  }, [])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
          </div>
          <p className="text-gray-600 font-medium">Initializing QuicFile...</p>
          {initError && <p className="text-red-600 mt-2">{initError}</p>}
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthFlow />
  }

  if (!currentBusiness) {
    return <BusinessSelector />
  }

  return <MainApp />
}
