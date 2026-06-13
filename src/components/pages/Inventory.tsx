import { useState } from 'react'
import { Plus, AlertTriangle } from 'lucide-react'

export default function Inventory() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [products, setProducts] = useState<any[]>([])

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setShowAddProduct(!showAddProduct)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        Add Product
      </button>

      {showAddProduct && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Barcode"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Cost Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Selling Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="number"
            placeholder="Starting Stock"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
            Save Product
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 font-medium">No products yet</p>
          <p className="text-gray-400 text-sm">Add your first product to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">SKU: {product.barcode}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">
                    Stock: {product.stock}
                  </p>
                  <p className="text-xs text-gray-500">Price: {product.sellingPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
