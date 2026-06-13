import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useBusinessStore } from '../store/business';
import { LogOut, Menu, X, FileText } from 'lucide-react';

export default function MainApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const { currentBusiness } = useBusinessStore();

  const handleLogout = () => {
    logout();
    useBusinessStore.setState({ currentBusiness: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 shadow-lg`}
      >
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <nav className="mt-8">
          {sidebarOpen && (
            <div className="px-4 space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Navigation
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span>Files</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentBusiness?.name || 'QuicFile'}
              </h1>
              {currentBusiness?.description && (
                <p className="text-gray-600 text-sm mt-1">
                  {currentBusiness.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to QuicFile
              </h2>
              <p className="text-gray-600 mb-6">
                Your offline-first business operating system is ready to use.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-blue-900 mb-2">Getting Started</h3>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li>✓ Authentication system ready</li>
                  <li>✓ Business management functional</li>
                  <li>✓ IndexedDB offline storage configured</li>
                  <li>✓ Responsive UI with Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}