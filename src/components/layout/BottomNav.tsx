import {
  BarChart3,
  ShoppingCart,
  Package,
  ReceiptText,
  Settings,
} from 'lucide-react'

type Page = 'dashboard' | 'transactions' | 'inventory' | 'reports' | 'settings'

interface BottomNavProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export default function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const navItems: Array<{ id: Page; icon: React.ReactNode; label: string }> = [
    { id: 'dashboard', icon: <BarChart3 />, label: 'Dashboard' },
    { id: 'transactions', icon: <ShoppingCart />, label: 'Sales' },
    { id: 'inventory', icon: <Package />, label: 'Inventory' },
    { id: 'reports', icon: <ReceiptText />, label: 'Reports' },
    { id: 'settings', icon: <Settings />, label: 'Settings' },
  ]

  return (
    <nav className="app-footer">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
