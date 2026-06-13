import { useState } from 'react';
import { useBusinessStore } from '../../store/business';
import { Plus, Building2 } from 'lucide-react';

export default function BusinessSelector() {
  const [showForm, setShowForm] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessDesc, setBusinessDesc] = useState('');
  const { businesses, addBusiness, setCurrentBusiness } = useBusinessStore();

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBusiness = {
      id: Math.random().toString(36).substr(2, 9),
      name: businessName,
      description: businessDesc,
    };
    
    addBusiness(newBusiness);
    setCurrentBusiness(newBusiness);
    setBusinessName('');
    setBusinessDesc('');
    setShowForm(false);
  };

  const handleSelectBusiness = (businessId: string) => {
    const business = businesses.find((b) => b.id === businessId);
    if (business) {
      setCurrentBusiness(business);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Businesses</h1>
          <p className="text-gray-600">Select or create a business to get started</p>
        </div>

        {/* Business List */}
        <div className="space-y-4 mb-8">
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <button
                key={business.id}
                onClick={() => handleSelectBusiness(business.id)}
                className="w-full bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{business.name}</h3>
                    {business.description && (
                      <p className="text-gray-600 text-sm">{business.description}</p>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No businesses yet. Create one to get started.</p>
            </div>
          )}
        </div>

        {/* Create Business Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Business</h2>
            <form onSubmit={handleCreateBusiness} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="My Business"
                />
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="desc"
                  value={businessDesc}
                  onChange={(e) => setBusinessDesc(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="What does your business do?"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Create Business
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Create Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Business
          </button>
        )}
      </div>
    </div>
  );
}