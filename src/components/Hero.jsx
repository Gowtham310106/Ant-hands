import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToGallery = () => {
    document.getElementById('product-gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-b from-amber-50 via-rose-50 to-white pt-20 pb-32 px-4 md:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            {/* Launch badge */}
            <div className="inline-block">
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-white text-sm font-semibold px-4 py-2 rounded-full">
                🚀 Launch Offer — ₹79
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Memories,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-500"> Magnetic</span>
            </h1>

            <p className="text-xl text-gray-600">
              Personalized fridge magnets that tell your story. Upload photos, customize style, get delivered to your door.
            </p>

            {/* Tanglish CTA */}
            <p className="text-lg text-amber-700 font-medium italic">
              "Order panna easy — WhatsApp la send pannunga 😊"
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToOrder}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 text-lg"
              >
                Order Now
              </button>
              <button
                onClick={scrollToGallery}
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-bold py-4 px-8 rounded-lg transition text-lg"
              >
                View Gallery
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-4">
              <div>
                <p className="text-sm text-gray-600">Launching Soon</p>
                <p className="font-bold text-gray-900">Free Delivery on 3+</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-rose-200 rounded-3xl opacity-20" />
            <img
              src="https://placehold.co/400x500?text=Fridge+Magnet+Samples"
              alt="Fridge magnet samples"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
            {/* Floating element */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
              <p className="text-sm text-gray-600">Limited Launch</p>
              <p className="font-bold text-amber-600 text-lg">Buy 5, Get 1 Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-amber-600" size={32} />
      </div>
    </section>
  )
}
