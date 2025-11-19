import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Ant Hands</h3>
              <p className="text-sm leading-relaxed mb-4">
                Turning your memories into magnetic moments. One photo, one magnet, one smile at a time.
              </p>
              <p className="text-xs text-gray-500">Work like an ant. ™</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => document.getElementById('product-gallery')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-amber-400 transition"
                  >
                    Shop Now
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-amber-400 transition"
                  >
                    Create Order
                  </button>
                </li>
                <li>
                  <a href="#workshops" className="hover:text-amber-400 transition">
                    Workshops
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-amber-400 transition">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:hello@anthands.com" className="hover:text-amber-400 transition">
                    Email Support
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919626296198" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                    WhatsApp Chat
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-amber-400 transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <Phone size={16} className="flex-shrink-0 mt-0.5" />
                  <span>+91 9626296198</span>
                </div>
                <div className="flex gap-2">
                  <Mail size={16} className="flex-shrink-0 mt-0.5" />
                  <span>hello@anthands.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-12">
            <h4 className="font-bold text-white mb-4">Quick FAQ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-300 mb-1">How long does delivery take?</p>
                <p className="text-gray-400">5-7 business days across India</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-1">Can I use my own photos?</p>
                <p className="text-gray-400">Yes! Upload up to 10 images per order</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-1">What sizes are available?</p>
                <p className="text-gray-400">Small (2"), Standard (3"), Large (4")</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-1">Do you offer bulk orders?</p>
                <p className="text-gray-400">Yes! Contact us for custom quotes</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                <p>&copy; {currentYear} Ant Hands. All rights reserved.</p>
                <div className="flex gap-4 mt-2">
                  <a href="#privacy" className="hover:text-amber-400 transition">
                    Privacy Policy
                  </a>
                  <a href="#terms" className="hover:text-amber-400 transition">
                    Terms of Service
                  </a>
                </div>
              </div>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
              >
                Back to Top <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919626296198"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition transform hover:scale-110 z-40"
        title="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.363 1.236-3.271 2.145-.908.909-1.641 2.034-2.145 3.271A9.877 9.877 0 002.04 12c0 5.471 4.456 9.927 9.927 9.927 1.237 0 2.443-.213 3.597-.623 1.322 1.947 3.579 3.762 6.045 3.762 1.079 0 2.126-.243 3.093-.722-.52-1.511-.646-3.016-.646-4.466l-.001-.133c0-5.471-4.456-9.927-9.927-9.927" />
        </svg>
      </a>
    </footer>
  )
}
