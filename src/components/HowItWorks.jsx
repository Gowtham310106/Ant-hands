import { Upload, Palette, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HowItWorks() {
  const navigate = useNavigate()
  
  const steps = [
    {
      icon: Upload,
      title: 'Upload Photos',
      description: 'Pick up to 10 photos. We support all image formats.',
      number: 1,
      emoji: '📸'
    },
    {
      icon: Palette,
      title: 'Customize',
      description: 'Choose design, size, and quantity. See live preview.',
      number: 2,
      emoji: '🎨'
    },
    {
      icon: CreditCard,
      title: 'Pay & Order',
      description: 'Pay securely via UPI, cards, or net banking.',
      number: 3,
      emoji: '💳'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload, customize, pay. Get your magnets in 5-7 days.
          </p>
        </div>

        {/* Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-8 text-center h-full border border-amber-200 hover:shadow-lg transition-shadow">
                  {/* Step number */}
                  <div className="text-5xl mb-4">{step.emoji}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.number}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment Options - Simple */}
        <div className="bg-amber-50 rounded-2xl p-8 mb-12 border border-amber-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay Your Way</h3>
            <p className="text-gray-600">Choose any payment method you prefer</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-bold text-gray-900 mb-1">UPI</h4>
              <p className="text-sm text-gray-600">Google Pay, PhonePe</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-3xl mb-2">💳</div>
              <h4 className="font-bold text-gray-900 mb-1">Cards</h4>
              <p className="text-sm text-gray-600">Credit/Debit</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-3xl mb-2">🏦</div>
              <h4 className="font-bold text-gray-900 mb-1">Net Banking</h4>
              <p className="text-sm text-gray-600">All banks</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-gray-900 mb-1">Secure</h4>
              <p className="text-sm text-gray-600">SSL encrypted</p>
            </div>
          </div>
        </div>

        {/* What Happens After */}
        <div className="bg-white rounded-2xl p-8 mb-12 border-2 border-amber-200">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What Happens After You Order?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">We Get Your Order</h4>
              <p className="text-sm text-gray-600">Instant email confirmation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">We Print & Craft</h4>
              <p className="text-sm text-gray-600">High-quality printing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">We Pack & Ship</h4>
              <p className="text-sm text-gray-600">Careful packaging</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                4
              </div>
              <h4 className="font-bold text-gray-900 mb-2">You Get Them!</h4>
              <p className="text-sm text-gray-600">5-7 days delivery</p>
            </div>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            It's simple: Upload your photos, choose your design, pay securely.
          </p>
          
          <button
            onClick={() => navigate('/order')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-xl transition transform hover:scale-105 shadow-lg text-lg"
          >
            🎯 Start Creating Now
          </button>
          
          <p className="text-gray-500 text-sm mt-6">
            No hidden fees • Secure payment • 5-7 day delivery
          </p>
        </div>
      </div>
    </section>
  )
}