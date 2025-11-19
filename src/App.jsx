import { useState, useRef } from 'react'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import ProductGallery from './components/ProductGallery'
import OrderForm from './components/OrderForm'
import Workshops from './components/Workshops'
import About from './components/About'
import Footer from './components/Footer'
import OrderSuccessModal from './components/OrderSuccessModal'

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)

  const handleOrderSuccess = (orderData) => {
    setLastOrder(orderData)
    setShowSuccessModal(true)
  }

  return (
    <div className="bg-white">
      <Hero />
      <HowItWorks />
      <ProductGallery />
      <OrderForm onOrderSuccess={handleOrderSuccess} />
      <Workshops />
      <About />
      <Footer />
      {showSuccessModal && (
        <OrderSuccessModal
          order={lastOrder}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  )
}

export default App
