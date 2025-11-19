import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import polo from '../assets/poloroid.webp'
import classic from '../assets/classic.jpg'
import collage from '../assets/collage.webp'

export default function ProductGallery() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Timeless rectangle design. Perfect for your favorite moment.',
      price: 79,
      image: classic
    },
    {
      id: 'polaroid',
      name: 'Polaroid',
      description: 'Vintage Polaroid style. Nostalgic & Instagram-ready.',
      price: 89,
      image: polo
    },
    {
      id: 'collage',
      name: 'Collage',
      description: 'Grid of 4 photos. Tell a story in one magnet.',
      price: 99,
      image: collage
    }
  ]

  const handleCustomize = (product) => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
    // Pre-select the product in the order form if you add that feature
  }

  return (
    <section id="product-gallery" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Magnet Styles</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your favorite design and bring your memories to life.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              {/* Image container */}
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-amber-100 to-rose-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="text-3xl font-bold text-amber-600">₹{product.price}</span>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    per magnet
                  </div>
                </div>

                {/* Customize button */}
                <button
                  onClick={() => handleCustomize(product)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 group/btn"
                >
                  Customize <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Image lightbox modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-lg mb-6">{selectedProduct.description}</p>
                <div className="text-3xl font-bold text-amber-600 mb-6">₹{selectedProduct.price} onwards</div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedProduct(null)
                      handleCustomize(selectedProduct)
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    Customize Now
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-8 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:border-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}