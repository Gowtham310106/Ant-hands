import { X, Copy, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function OrderSuccessModal({ order, onClose }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order.message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(order.whatsappLink, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 flex items-center justify-between sticky top-0">
          <div>
            <h2 className="text-2xl font-bold">Order Confirmed! 🎉</h2>
            <p className="text-sm text-green-100">Order ID: {order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Name:</span>
                <span className="font-semibold">{order.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Magnet Style:</span>
                <span className="font-semibold capitalize">{order.style}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold capitalize">{order.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{order.quantity}</span>
              </div>
              {order.price.freeCount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Bonus:</span>
                  <span>+{order.price.freeCount} FREE</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-2xl text-green-600">₹{order.price.total}</span>
              </div>
            </div>
          </div>

          {/* Message preview */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Message to Send (auto-filled)</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-mono text-gray-700 max-h-40 overflow-y-auto whitespace-pre-wrap">
              {order.message}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-lg transition"
            >
              <Copy size={18} />
              {copied ? 'Copied!' : 'Copy Message'}
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              <MessageCircle size={18} />
              Open WhatsApp
            </button>
          </div>

          {/* Next steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <h4 className="font-bold text-blue-900 mb-2">Next Steps</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>Click "Open WhatsApp" to send your order</li>
              <li>Share your photos via WhatsApp after</li>
              <li>We'll confirm receipt and start creating!</li>
              <li>Get your magnets within 5-7 days</li>
            </ol>
          </div>

          {/* Footer message */}
          <p className="text-center text-sm text-gray-600">
            Thank you for choosing <span className="font-bold text-amber-700">Ant Hands</span>! 🐜
          </p>
        </div>
      </div>
    </div>
  )
}
