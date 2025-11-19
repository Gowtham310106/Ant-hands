import { MessageCircle, Calendar } from 'lucide-react'

export default function Workshops() {
  const WHATSAPP_NUMBER = '+919626296198'

  const schedule = [
    {
      date: 'Nov 25, 2024',
      time: '2:00 PM - 4:00 PM',
      spots: 12,
      price: 'Free for first 50'
    },
    {
      date: 'Dec 2, 2024',
      time: '10:00 AM - 12:00 PM',
      spots: 12,
      price: 'Free for first 50'
    },
    {
      date: 'Dec 9, 2024',
      time: '3:00 PM - 5:00 PM',
      spots: 12,
      price: 'Free for first 50'
    }
  ]

  const handleRegister = (slot) => {
    const message = `Hi! I'd like to register for the fridge magnet workshop on ${slot.date} at ${slot.time}. Looking forward to it!`
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hands-On Workshops</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn the art of creating personalized fridge magnets. Fun, creative, and perfect for groups or individuals.
          </p>
        </div>

        {/* Workshop info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>All materials & magnets provided</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Professional guidance & tips</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Take home 5 custom magnets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Snacks & refreshments</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Certificate of participation</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect For?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">👥</span>
                <span>Friends & family bonding</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">🎓</span>
                <span>School & college groups</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">🏢</span>
                <span>Corporate team building</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">🎁</span>
                <span>Unique gift-making sessions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600 font-bold">🎨</span>
                <span>Creative art enthusiasts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Sessions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedule.map((slot, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-amber-400 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                    <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
                      <Calendar size={20} className="text-amber-600" />
                      <span>{slot.date}</span>
                    </div>
                    <p className="text-amber-600 font-semibold">{slot.time}</p>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Spots</p>
                  <p className="font-bold text-amber-700">{slot.spots} spots available</p>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-green-600">{slot.price}</p>
                </div>

                <button
                  onClick={() => handleRegister(slot)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Register via WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-8 border-2 border-amber-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Don't see your slot?</h3>
          <p className="text-gray-600 mb-6">Contact us to request a custom workshop for your group or organization.</p>
          <button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=Hi! I'd like to inquire about custom workshop dates.`, '_blank')}
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Request Custom Session
          </button>
        </div>
      </div>
    </section>
  )
}
