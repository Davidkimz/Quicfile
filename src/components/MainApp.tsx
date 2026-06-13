import { useState, useEffect } from 'react'
import Header from './layout/Header'
import BottomNav from './layout/BottomNav'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Inventory from './pages/Inventory'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import { SyncService } from '../services/sync'

type Page = 'dashboard' | 'transactions' | 'inventory' | 'reports' | 'settings'

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  useEffect(() => {
    SyncService.startAutoSync()
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'transactions':
        return <Transactions />
      case 'inventory':
        return <Inventory />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main className="app-content">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
