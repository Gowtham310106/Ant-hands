import { ChevronDown, Star, Sparkles, Zap } from 'lucide-react'

export default function Hero() {
  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToGallery = () => {
    document.getElementById('product-gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden pt-20 pb-32 px-4 md:px-8">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-orange-200 to-red-200 rounded-full blur-3xl opacity-15 animate-pulse delay-500" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-float">
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-rose-400 rounded-full animate-float delay-700">
          <Sparkles className="w-3 h-3 text-rose-400" />
        </div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-orange-400 rounded-full animate-float delay-1200">
          <Sparkles className="w-3 h-3 text-orange-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Brand Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-xl rounded-3xl px-8 py-4 shadow-2xl border border-amber-100 transform hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                AH
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-rose-600 bg-clip-text text-transparent">
                AntHands
              </h2>
              <p className="text-sm text-gray-600 italic font-medium">Work like an ant, deliver like a king</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content - Enhanced */}
          <div className="space-y-8">
            {/* Enhanced Launch Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
              <Star className="w-4 h-4 fill-current" />
              <span>🚀 Limited Launch Offer — Starting at ₹49</span>
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>

            {/* Enhanced Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight">
                Your Memories,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 animate-gradient">
                  Made Magnetic
                </span>
              </h1>
              
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">500+ Happy Customers</span>
              </div>
            </div>

            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              Transform your precious moments into <span className="text-amber-600 font-bold">custom fridge magnets</span>. 
              Upload, customize, and we'll deliver magic to your doorstep! ✨
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <button
                onClick={scrollToOrder}
                className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg shadow-lg"
              >
                <span className="relative z-10">🎯 Order Now - 50% Off</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                onClick={scrollToGallery}
                className="group border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
              >
                <span className="flex items-center gap-2">
                  📸 View Gallery
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                </span>
              </button>
            </div>

            {/* Enhanced Social Proof */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-white/80 rounded-2xl backdrop-blur-sm border border-amber-100">
                <div className="text-2xl font-black text-amber-600">500+</div>
                <div className="text-sm text-gray-600">Magnets Sold</div>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-2xl backdrop-blur-sm border border-amber-100">
                <div className="text-2xl font-black text-amber-600">24h</div>
                <div className="text-sm text-gray-600">Delivery</div>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-2xl backdrop-blur-sm border border-amber-100">
                <div className="text-2xl font-black text-amber-600">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right image - Enhanced */}
          <div className="relative h-[600px] lg:h-full">
            {/* Main image container */}
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-rose-200 rounded-4xl opacity-20 transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-tl from-orange-100 to-rose-100 rounded-4xl opacity-40 transform -rotate-2" />
              
              <img
                src="https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=500&h=600&fit=crop"
                alt="Custom fridge magnets"
                className="w-full h-full object-cover rounded-4xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-5 shadow-2xl border border-amber-200 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-semibold text-gray-700">Trending</p>
                </div>
                <p className="font-black text-amber-600 text-lg">Buy 5 Get 1 Free</p>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform">
                <p className="text-sm font-medium">Limited Time</p>
                <p className="font-black text-xl">₹49 Only!</p>
              </div>

              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-amber-200 rounded-4xl opacity-30 transform rotate-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-amber-200">
          <ChevronDown className="text-amber-600 w-6 h-6" />
        </div>
      </div>

      {/* Add custom animations to CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .rounded-4xl {
          border-radius: 2.5rem;
        }
      `}</style>
    </section>
  )
}