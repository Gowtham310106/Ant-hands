import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, Minus, MessageCircle, Loader, X, ShoppingBag } from 'lucide-react';
import api from '../api/axios';
import OrderSuccessModal from '../components/OrderSuccessModal';

export default function OrderPage() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Constants
    const UNIT_PRICE = 79;
    const DELIVERY_FEE = 30;
    const FREE_DELIVERY_THRESHOLD = 3;
    const BUY_FOR_FREE_THRESHOLD = 5;
    const WHATSAPP_NUMBER = '919626296198';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        style: 'classic',
        size: 'standard',
        quantity: 1,
        uploads: []
    });

    const [loading, setLoading] = useState(false);
    const [successOrder, setSuccessOrder] = useState(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/order' } } });
        } else if (user) {
            // Pre-fill user details
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                phone: user.phone || '',
                // If user model had address, we'd fill it here
            }));
        }
    }, [isAuthenticated, user, navigate]);

    const styles = [
        { id: 'classic', name: 'Classic', priceAddon: 0 },
        { id: 'polaroid', name: 'Polaroid', priceAddon: 10 },
        { id: 'collage', name: 'Collage', priceAddon: 20 }
    ];

    const sizes = [
        { id: 'small', name: 'Small (2")', priceAddon: 0 },
        { id: 'standard', name: 'Standard (3")', priceAddon: 0 },
        { id: 'large', name: 'Large (4")', priceAddon: 10 }
    ];

    // Pricing Logic
    const calculatePrice = () => {
        const stylePrice = styles.find(s => s.id === formData.style)?.priceAddon || 0;
        const sizePrice = sizes.find(s => s.id === formData.size)?.priceAddon || 0;
        const unitPrice = UNIT_PRICE + stylePrice + sizePrice;

        let subtotal = unitPrice * formData.quantity;

        // Buy 5 get 1 free logic
        let freeCount = 0;
        if (formData.quantity >= BUY_FOR_FREE_THRESHOLD) {
            freeCount = Math.floor(formData.quantity / BUY_FOR_FREE_THRESHOLD);
            subtotal = subtotal - (freeCount * unitPrice);
        }

        const deliveryFee = formData.quantity < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
        const total = subtotal + deliveryFee;

        return { unitPrice, subtotal, deliveryFee, total, freeCount };
    };

    const pricing = calculatePrice();

    // Handlers
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (formData.uploads.length + files.length > 10) return alert('Max 10 images allowed');

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setFormData(prev => ({
                    ...prev,
                    uploads: [...prev.uploads, { file, preview: ev.target.result }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeUpload = (idx) => {
        setFormData(prev => ({
            ...prev,
            uploads: prev.uploads.filter((_, i) => i !== idx)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order in Backend
            // We need to construct the payload matching backend expectation
            // Since backend "Order" mostly expects items array
            // We will simplify address to a single string for now or split if backend requires fields

            const shippingAddress = {
                street: formData.address,
                city: formData.city || 'Chennai', // Default/Fallback
                state: formData.state || 'Tamil Nadu',
                pincode: formData.pincode || '600001',
                country: 'India'
            };

            const orderPayload = {
                items: [{
                    style: formData.style,
                    size: formData.size,
                    quantity: formData.quantity,
                    price: pricing.unitPrice
                }],
                shippingAddress,
                pricing: {
                    total: pricing.total,
                    deliveryFee: pricing.deliveryFee,
                    discount: 0 // logic for discount if needed
                },
                guestName: user?.name || formData.name,
                guestEmail: user?.email || '',
                guestPhone: user?.phone || formData.phone,
            };

            const { data } = await api.post('/orders', orderPayload);

            // 2. Prepare Success Modal Data (WhatsApp integration)
            const fileList = formData.uploads.map(u => u.file.name).join(', ');
            const message = `*Ant Hands Order #${data.order.orderId}*
            
*Customer:* ${formData.name}
*Phone:* ${formData.phone}

*Item:* ${styles.find(s => s.id === formData.style).name} / ${sizes.find(s => s.id === formData.size).name}
*Qty:* ${formData.quantity} ${pricing.freeCount > 0 ? `(+${pricing.freeCount} FREE)` : ''}
*Total:* ₹${pricing.total}

*Files:* ${fileList || 'To be shared'}

_Order created via Website_`;

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            setSuccessOrder({
                id: data.order.orderId,
                name: formData.name,
                style: formData.style,
                size: formData.size,
                quantity: formData.quantity,
                price: pricing,
                message,
                whatsappLink: whatsappUrl
            });

            // clear form (optional, maybe keep for UX)
            // setFormData(...)

        } catch (error) {
            console.error('Order creation failed:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null; // Or loading spinner

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 md:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your order details below</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Shipping Details */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Full Address</label>
                                    <textarea
                                        required
                                        rows="2"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Street Address, Area"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Pincode</label>
                                    <input
                                        type="text"
                                        value={formData.pincode}
                                        onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        placeholder="600000"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 2. Customization */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Customize Magnet
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                                    <div className="space-y-2">
                                        {styles.map(s => (
                                            <label key={s.id} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${formData.style === s.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" name="style" value={s.id} checked={formData.style === s.id} onChange={e => setFormData({ ...formData, style: e.target.value })} />
                                                    <span className="font-medium text-gray-800">{s.name}</span>
                                                </div>
                                                {s.priceAddon > 0 && <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">+₹{s.priceAddon}</span>}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                                    <div className="space-y-2">
                                        {sizes.map(s => (
                                            <label key={s.id} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${formData.size === s.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" name="size" value={s.id} checked={formData.size === s.id} onChange={e => setFormData({ ...formData, size: e.target.value })} />
                                                    <span className="font-medium text-gray-800">{s.name}</span>
                                                </div>
                                                {s.priceAddon > 0 && <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">+₹{s.priceAddon}</span>}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Uploads */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Upload Photos
                            </h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                                <label className="cursor-pointer">
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} />
                                    <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                                    <p className="font-medium text-gray-700">Click to upload images</p>
                                    <p className="text-sm text-gray-500 mt-1">or drag and drop here (Max 10)</p>
                                </label>
                            </div>
                            {formData.uploads.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                                    {formData.uploads.map((u, idx) => (
                                        <div key={idx} className="relative aspect-square group">
                                            <img src={u.preview} alt="preview" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                            <button type="button" onClick={() => removeUpload(idx)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow-sm">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h3>

                            {/* Quantity Control */}
                            <div className="flex items-center justify-between mb-6 bg-gray-50 p-3 rounded-xl">
                                <span className="text-sm font-medium text-gray-700">Quantity</span>
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={() => setFormData(p => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))} className="p-1 hover:bg-white rounded-md shadow-sm transition"><Minus size={16} /></button>
                                    <span className="font-bold text-lg w-6 text-center">{formData.quantity}</span>
                                    <button type="button" onClick={() => setFormData(p => ({ ...p, quantity: p.quantity + 1 }))} className="p-1 hover:bg-white rounded-md shadow-sm transition"><Plus size={16} /></button>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm border-b border-dashed border-gray-200 pb-5 mb-5">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Unit Price</span>
                                    <span>₹{pricing.unitPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>₹{pricing.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className={pricing.deliveryFee === 0 ? 'text-green-600 font-bold' : ''}>
                                        {pricing.deliveryFee === 0 ? 'FREE' : `₹${pricing.deliveryFee}`}
                                    </span>
                                </div>
                                {pricing.freeCount > 0 && (
                                    <div className="flex justify-between text-green-600 font-bold">
                                        <span>Bonus Items</span>
                                        <span>+{pricing.freeCount} FREE</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-3xl font-bold text-amber-600">₹{pricing.total}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || formData.uploads.length === 0}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader className="animate-spin" /> : <ShoppingBag size={20} />}
                                Place Order
                            </button>

                            {formData.uploads.length === 0 && (
                                <p className="text-xs text-red-500 text-center mt-3">Please upload at least one photo</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            {successOrder && (
                <OrderSuccessModal
                    order={successOrder}
                    onClose={() => {
                        setSuccessOrder(null);
                        navigate('/order'); // Refresh/Reset
                        setFormData(prev => ({ ...prev, uploads: [], quantity: 1 }));
                        window.scrollTo(0, 0);
                    }}
                />
            )}
        </motion.div>
    );
}
