import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/#products' }, // Anchor link for now
        { name: 'How it Works', path: '/#how-it-works' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-3xl">🐜</span>
                        <span className={`font-serif tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                            Ant Hands
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-amber-500 ${scrolled ? 'text-gray-700' : 'text-gray-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-red-500 hover:text-red-600"
                                >
                                    Logout
                                </button>
                                <Link
                                    to="/order"
                                    className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all flex items-center gap-2"
                                >
                                    <ShoppingBag size={18} />
                                    Order Now
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-gray-800'
                                        } hover:text-amber-500`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/order"
                                    className="bg-amber-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-500/30 flex items-center gap-2"
                                >
                                    Customize Now
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md ${scrolled ? 'text-gray-700' : 'text-gray-800'
                                }`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-500 hover:bg-gray-50 rounded-md"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100">
                                {user ? (
                                    <>
                                        <div className="px-3 py-2 text-sm font-medium text-gray-500">
                                            Signed in as {user.name}
                                        </div>
                                        <Link
                                            to="/order"
                                            className="block w-full text-center mt-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-medium"
                                        >
                                            Order Now
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md mt-2"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex gap-3 px-3">
                                        <Link
                                            to="/login"
                                            className="flex-1 text-center py-2 border border-gray-300 rounded-lg font-medium text-gray-700"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="flex-1 text-center py-2 bg-gray-900 text-white rounded-lg font-medium"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
