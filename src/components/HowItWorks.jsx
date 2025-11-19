import { Upload, Palette, Send } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Photos',
      description: 'Pick up to 10 of your favorite memories. PNG, JPG, or GIF — all welcome.',
      number: 1
    },
    {
      icon: Palette,
      title: 'Choose Style & Qty',
      description: 'Pick from Classic, Polaroid, or Collage designs. Select size and quantity.',
      number: 2
    },
    {
      icon: Send,
      title: 'Confirm & WhatsApp',
      description: 'Review your order, see total price with offers, and place it via WhatsApp.',
      number: 3
    }
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to get your personalized magnets delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Connecting line */}
                {step.number < 3 && (
                  <div className="hidden md:block absolute top-1/4 left-full w-8 h-1 bg-gradient-to-r from-amber-400 to-transparent" />
                )}

                <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-8 text-center h-full border border-amber-200">
                  {/* Step number circle */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <Icon className="text-amber-600 mx-auto mb-4" size={40} />

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Ready to create magical memories?</p>
          <button
            onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Start Creating →
          </button>
        </div>
      </div>
    </section>
  )
}
