import { useState } from 'react';
import { useBusinessStore, BusinessType } from '../../store/business';
import { Plus, Building2, Briefcase, ShoppingCart } from 'lucide-react';

export default function BusinessSelector() {
  const [showForm, setShowForm] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessDesc, setBusinessDesc] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('service');
  const { businesses, addBusiness, setCurrentBusiness } = useBusinessStore();

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBusiness = {
      id: Math.random().toString(36).substr(2, 9),
      name: businessName,
      description: businessDesc,
      type: businessType,
    };
    
    addBusiness(newBusiness);
    setCurrentBusiness(newBusiness);
    setBusinessName('');
    setBusinessDesc('');
    setBusinessType('service');
    setShowForm(false);
  };

  const handleSelectBusiness = (businessId: string) => {
    const business = businesses.find((b) => b.id === businessId);
    if (business) {
      setCurrentBusiness(business);
    }
  };

  const getBusinessTypeIcon = (type: BusinessType) => {
    return type === 'service' ? (
      <Briefcase className="w-6 h-6 text-green-600" />
    ) : (
      <ShoppingCart className="w-6 h-6 text-purple-600" />
    );
  };

  const getBusinessTypeLabel = (type: BusinessType) => {
    return type === 'service' ? 'Service Mode' : 'Shop Mode';
  };

  const getBusinessTypeBgColor = (type: BusinessType) => {
    return type === 'service' ? 'bg-green-100' : 'bg-purple-100';
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
                  <div className={`${getBusinessTypeBgColor(business.type)} p-3 rounded-lg`}>
                    {getBusinessTypeIcon(business.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{business.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        business.type === 'service' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {getBusinessTypeLabel(business.type)}
                      </span>
                    </div>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Business</h2>
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

              {/* Business Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Business Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Service Mode Option */}
                  <button
                    type="button"
                    onClick={() => setBusinessType('service')}
                    className={`p-4 rounded-lg border-2 transition ${
                      businessType === 'service'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <Briefcase className={`w-6 h-6 mx-auto mb-2 ${
                      businessType === 'service' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <p className={`font-medium text-sm ${
                      businessType === 'service' ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      Service Mode
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      For service-based businesses
                    </p>
                  </button>

                  {/* Shop Mode Option */}
                  <button
                    type="button"
                    onClick={() => setBusinessType('shop')}
                    className={`p-4 rounded-lg border-2 transition ${
                      businessType === 'shop'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <ShoppingCart className={`w-6 h-6 mx-auto mb-2 ${
                      businessType === 'shop' ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <p className={`font-medium text-sm ${
                      businessType === 'shop' ? 'text-purple-700' : 'text-gray-600'
                    }`}>
                      Shop Mode
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      For retail and e-commerce
                    </p>
                  </button>
                </div>
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