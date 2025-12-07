import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ProductGallery from '../components/ProductGallery';
import Workshops from '../components/Workshops';
import About from '../components/About';
import { motion } from 'framer-motion';

export default function HomePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <section id="hero">
                <Hero />
            </section>

            <section id="how-it-works">
                <HowItWorks />
            </section>

            <section id="products">
                <ProductGallery />
            </section>

            <section id="workshops">
                <Workshops />
            </section>

            <section id="about">
                <About />
            </section>
        </motion.div>
    );
}
