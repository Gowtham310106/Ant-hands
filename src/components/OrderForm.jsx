import { useState } from 'react'
import { X, Upload, Plus, Minus, MessageCircle, Loader } from 'lucide-react'

export default function OrderForm({ onOrderSuccess }) {
  // ===== REPLACEABLE CONSTANTS =====
  const UNIT_PRICE = 79 // Launch price
  const DELIVERY_FEE = 30
  const FREE_DELIVERY_THRESHOLD = 3
  const BUY_FOR_FREE_THRESHOLD = 5
  const WHATSAPP_NUMBER = '919626296198' // Format: country code + number without +
  // ================================

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    style: 'classic',
    size: 'standard',
    quantity: 1,
    uploads: [] // Array of { file, preview }
  })

  const [loading, setLoading] = useState(false)

  const styles = [
    { id: 'classic', name: 'Classic', priceAddon: 0 },
    { id: 'polaroid', name: 'Polaroid', priceAddon: 10 },
    { id: 'collage', name: 'Collage', priceAddon: 20 }
  ]

  const sizes = [
    { id: 'small', name: 'Small (2")', priceAddon: 0 },
    { id: 'standard', name: 'Standard (3")', priceAddon: 0 },
    { id: 'large', name: 'Large (4")', priceAddon: 10 }
  ]

  // Calculate price
  const getStylePrice = () => {
    const style = styles.find(s => s.id === formData.style)
    return style?.priceAddon || 0
  }

  const getSizePrice = () => {
    const size = sizes.find(s => s.id === formData.size)
    return size?.priceAddon || 0
  }

  const getUnitPrice = () => UNIT_PRICE + getStylePrice() + getSizePrice()

  const calculatePrice = () => {
    const qty = formData.quantity
    const unitPrice = getUnitPrice()

    let subtotal = unitPrice * qty

    // Buy 5 get 1 free
    let freeCount = 0
    if (qty >= BUY_FOR_FREE_THRESHOLD) {
      freeCount = Math.floor(qty / BUY_FOR_FREE_THRESHOLD)
      subtotal = subtotal - (freeCount * unitPrice)
    }

    const deliveryFee = qty < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0
    const total = subtotal + deliveryFee

    return {
      unitPrice,
      subtotal,
      deliveryFee,
      total,
      freeCount
    }
  }

  const pricing = calculatePrice()

  // File upload handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxFiles = 10

    if (formData.uploads.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed`)
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          uploads: [
            ...prev.uploads,
            {
              file: file,
              preview: event.target.result
            }
          ]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeUpload = (index) => {
    setFormData(prev => ({
      ...prev,
      uploads: prev.uploads.filter((_, i) => i !== index)
    }))
  }

  // WhatsApp integration
  const buildWhatsAppMessage = () => {
    const fileList = formData.uploads.length > 0
      ? formData.uploads.map(u => u.file.name).join(', ')
      : '[Photo uploads will be shared after order]'

    const template = `*Ant Hands Order*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

*Order Details:*
Style: ${styles.find(s => s.id === formData.style)?.name || formData.style}
Size: ${sizes.find(s => s.id === formData.size)?.name || formData.size}
Quantity: ${formData.quantity}
${pricing.freeCount > 0 ? `Bonus Magnets: +${pricing.freeCount} FREE\n` : ''}

*Pricing:*
Subtotal: ₹${pricing.subtotal}
Delivery: ${pricing.deliveryFee > 0 ? `₹${pricing.deliveryFee}` : 'FREE'}
*Total: ₹${pricing.total}*

*Uploaded Files:*
${fileList}

Looking forward to creating your memories! 🎨`

    return template
  }

  // Submit order
  const handleSubmitOrder = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all details')
      return
    }

    if (formData.uploads.length === 0) {
      alert('Please upload at least one photo')
      return
    }

    setLoading(true)

    // Simulate server call
    setTimeout(() => {
      const message = buildWhatsAppMessage()
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

      const orderData = {
        id: `ORD-${Date.now()}`,
        ...formData,
        price: pricing,
        timestamp: new Date().toLocaleString(),
        whatsappLink: whatsappUrl,
        message: message
      }

      // Call success callback
      onOrderSuccess(orderData)

      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        style: 'classic',
        size: 'standard',
        quantity: 1,
        uploads: []
      })

      setLoading(false)
    }, 800)
  }

  return (
    <section id="order-form" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Create Your Order</h2>
          <p className="text-xl text-gray-600">Upload photos, customize, and place your order in minutes.</p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form - left side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    rows="3"
                    placeholder="Street, City, Pincode"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Photos *</h3>
              <p className="text-sm text-gray-600 mb-4">Maximum 10 images (PNG, JPG, GIF)</p>

              {/* Upload area */}
              <div className="border-2 border-dashed border-rose-400 rounded-xl p-8 text-center mb-4 hover:bg-rose-100 transition cursor-pointer">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-rose-500" size={40} />
                    <p className="font-semibold text-gray-900">Click to upload photos</p>
                    <p className="text-sm text-gray-600">or drag and drop</p>
                    <p className="text-xs text-gray-500">{formData.uploads.length}/10 uploaded</p>
                  </div>
                </label>
              </div>

              {/* Preview thumbnails */}
              {formData.uploads.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {formData.uploads.map((upload, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={upload.preview}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-20 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition"
                      />
                      <button
                        type="button"
                        onClick={() => removeUpload(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                      <p className="text-xs text-center mt-1 truncate text-gray-600">{upload.file.name.slice(0, 10)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Style & Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Style selector */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Magnet Style</h3>
                <div className="space-y-3">
                  {styles.map(style => (
                    <label key={style.id} className="flex items-center gap-3 p-3 border border-transparent rounded-lg hover:border-amber-400 cursor-pointer">
                      <input
                        type="radio"
                        name="style"
                        value={style.id}
                        checked={formData.style === style.id}
                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{style.name}</p>
                        {style.priceAddon > 0 && <p className="text-xs text-gray-600">+₹{style.priceAddon}</p>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Size</h3>
                <div className="space-y-3">
                  {sizes.map(size => (
                    <label key={size.id} className="flex items-center gap-3 p-3 border border-transparent rounded-lg hover:border-amber-400 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={size.id}
                        checked={formData.size === size.id}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{size.name}</p>
                        {size.priceAddon > 0 && <p className="text-xs text-gray-600">+₹{size.priceAddon}</p>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    quantity: Math.max(1, formData.quantity - 1)
                  })}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <Minus size={20} />
                </button>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-20 text-center text-2xl font-bold border-2 border-amber-400 rounded-lg py-2"
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    quantity: formData.quantity + 1
                  })}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <Plus size={20} />
                </button>

                {/* Offer badge */}
                {pricing.freeCount > 0 && (
                  <div className="ml-auto bg-green-100 border-2 border-green-500 text-green-700 font-bold px-4 py-2 rounded-lg">
                    +{pricing.freeCount} FREE
                  </div>
                )}
              </div>
              {pricing.deliveryFee === 0 && formData.quantity >= FREE_DELIVERY_THRESHOLD && (
                <p className="text-sm text-green-600 font-semibold mt-3">✓ Free delivery included!</p>
              )}
            </div>
          </div>

          {/* Order Summary - right side (sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-6 border-2 border-amber-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Item details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-amber-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unit price</span>
                  <span className="font-medium">₹{pricing.unitPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium">{formData.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{pricing.subtotal}</span>
                </div>

                {/* Bonus items */}
                {pricing.freeCount > 0 && (
                  <div className="flex justify-between text-sm bg-green-50 p-2 rounded border border-green-200">
                    <span className="text-green-700 font-semibold">Bonus magnets</span>
                    <span className="font-bold text-green-700">+{pricing.freeCount} FREE</span>
                  </div>
                )}
              </div>

              {/* Delivery fee */}
              <div className="mb-6 pb-6 border-b border-amber-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">
                    {pricing.deliveryFee > 0 ? `₹${pricing.deliveryFee}` : <span className="text-green-600 font-bold">FREE</span>}
                  </span>
                </div>
                {formData.quantity < FREE_DELIVERY_THRESHOLD && pricing.deliveryFee > 0 && (
                  <p className="text-xs text-gray-500 mt-2">Free delivery on {FREE_DELIVERY_THRESHOLD}+ items</p>
                )}
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-amber-600">₹{pricing.total}</span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || formData.uploads.length === 0}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <MessageCircle size={20} />
                    Place Order via WhatsApp
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-600 mt-4">
                We'll send your order details to WhatsApp. Photos can be shared separately.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
