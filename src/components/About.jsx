import { Mail, Phone, MessageCircle, Youtube, Instagram } from 'lucide-react'

export default function About() {
  // ===== REPLACEABLE CONSTANTS =====
  const PHONE = '+91 9626296198'
  const EMAIL = 'hello@anthands.com'
  const YOUTUBE = 'https://www.youtube.com/@anthandss'
  const INSTAGRAM = 'https://www.instagram.com/anthands360?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' // Replace with actual Instagram
  const WHATSAPP = 'https://wa.me/919626296198'
  // ================================

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - About Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Ant Hands</h2>

            <div className="space-y-4 text-gray-700 mb-8">
              <p className="text-lg leading-relaxed">
                We're a small team obsessed with turning memories into tangible keepsakes. Inspired by the work ethic of ants — tiny but mighty — we believe everyone deserves beautiful, personalized fridge magnets that spark joy every time you pass the kitchen.
              </p>

              <p className="text-lg leading-relaxed">
                Every magnet we create is handcrafted with care. From your uploaded photos to our quality materials, we ensure your memories stay vibrant and last forever on your fridge.
              </p>

              <p className="text-lg leading-relaxed">
                <span className="font-bold text-amber-700">Our Promise:</span> Premium quality, fair pricing, and world-class service — no middlemen, no nonsense.
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-2xl font-bold text-amber-700">1000+</p>
                <p className="text-sm text-gray-600">Happy Memories</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-2xl font-bold text-amber-700">5⭐</p>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right - Contact & Socials */}
          <div className="space-y-6">
            {/* Contact info card */}
            <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-8 border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

              <div className="space-y-5">
                {/* Phone */}
                <a
                  href={`tel:${PHONE.replace(/\s+/g, '')}`}
                  className="flex items-start gap-4 p-4 hover:bg-white rounded-lg transition group cursor-pointer"
                >
                  <Phone className="text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Call or SMS</p>
                    <p className="font-bold text-gray-900 group-hover:text-amber-700 transition">{PHONE}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 hover:bg-white rounded-lg transition group cursor-pointer"
                >
                  <MessageCircle className="text-green-600 flex-shrink-0 mt-1 group-hover:scale-110 transition" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="font-bold text-gray-900 group-hover:text-green-700 transition">Message us on WhatsApp</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-4 p-4 hover:bg-white rounded-lg transition group cursor-pointer"
                >
                  <Mail className="text-red-600 flex-shrink-0 mt-1 group-hover:scale-110 transition" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold text-gray-900 group-hover:text-red-700 transition">{EMAIL}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Our Journey</h3>
              <div className="grid grid-cols-3 gap-4">
                <a
                  href={YOUTUBE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-400 text-red-600 rounded-lg p-4 flex items-center justify-center transition group"
                >
                  <Youtube size={28} className="group-hover:scale-110 transition" />
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 hover:border-pink-400 text-pink-600 rounded-lg p-4 flex items-center justify-center transition group"
                >
                  <Instagram size={28} className="group-hover:scale-110 transition" />
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 text-green-600 rounded-lg p-4 flex items-center justify-center transition group"
                >
                  <MessageCircle size={28} className="group-hover:scale-110 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="mt-20 pt-20 border-t border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya M.',
                text: 'The magnets arrived beautifully packaged and the quality is amazing! My fridge looks like an art gallery now. 🎨',
                rating: 5
              },
              {
                name: 'Arjun K.',
                text: 'Ordered for my parents\' anniversary. They loved the personalized touch. Highly recommend!',
                rating: 5
              },
              {
                name: 'Sneha R.',
                text: 'The workshop was so much fun! I made magnets for all my friends. Best team-building activity ever!',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">
                  {Array(testimonial.rating).fill('⭐').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
