"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductModal } from "@/components/product/ProductModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { DUMMY_PRODUCTS, Product, ProductCategory } from "@/types/product";
import { PlayCircle, Star, ArrowRight } from "lucide-react";

const CATEGORIES: ("All" | ProductCategory)[] = ["All", "Buttercream Frosting", "Whipped Cream Frosting", "Plain Cakes", "Extras"];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>("All");

  const filteredProducts = activeCategory === "All" 
    ? DUMMY_PRODUCTS 
    : DUMMY_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section Banner Style */}
      <section className="pt-6 pb-12 sm:pt-8 md:pb-24 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[#FFF0F3] rounded-[2.5rem] overflow-hidden flex flex-col items-center text-center px-4 py-20 md:py-32 shadow-sm border border-pink-100">
            
            {/* Flanking Abstract/Image Elements like the reference */}
            <div className="absolute -left-16 bottom-0 w-64 h-64 md:w-96 md:h-96 opacity-90 hidden sm:block">
              <Image 
                src="/images/bento_cake.png" 
                alt="Bento Cake Background" 
                fill 
                className="object-contain object-bottom mix-blend-multiply" 
              />
            </div>
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 md:w-[28rem] md:h-[28rem] opacity-90 hidden sm:block">
              <Image 
                src="/images/8k_cake.png" 
                alt="8k Signature Cake Background" 
                fill 
                className="object-contain mix-blend-multiply" 
              />
            </div>

            <div className="relative z-10 max-w-2xl px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6"
              >
                Luxury in <br className="hidden md:block"/> Every Bite
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-gray-600 mb-10"
              >
                From stunning wedding tiers to irresistible bento cakes. Celebrate your beautiful moments in delicious style!
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <a 
                  href="#menu" 
                  className="inline-flex items-center justify-center px-10 py-4 text-white bg-[#00B4D8] rounded-xl hover:bg-[#0096B4] transition-colors shadow-lg shadow-[#00B4D8]/30 font-bold text-lg"
                >
                  Order Now
                </a>
              </motion.div>
            </div>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-transparent"></div>
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-transparent"></div>
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-transparent"></div>
              <div className="w-3 h-3 rounded-full bg-[#00B4D8]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Treats / Video Mock Section */}
      <section id="behind-the-treats" className="py-12 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-gray-900 shadow-2xl flex items-center justify-center cursor-pointer group">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-tr from-[#00B4D8] to-[#FF4D6D]" />
            <img src="/images/bento_cake.png" alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="z-10 w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <PlayCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-8 left-8 z-10">
              <h2 className="text-white text-3xl font-bold">Behind the Treats</h2>
              <p className="text-white/80 mt-2">See how our signature cakes are crafted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu / Product Grid */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#00B4D8] mb-2">Our Menu</h2>
            <h3 className="text-4xl font-black text-gray-900">Explore our creations</h3>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#FF4D6D] text-white shadow-md shadow-[#FF4D6D]/20 transform scale-105"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:gap-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full">
                  <ProductCard 
                    product={product} 
                    onOpenModal={setSelectedProduct} 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-[#00B4D8]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">What Our Cake Lovers Say</h2>
            <div className="flex justify-center gap-1 text-[#FFB703]">
              {[1,2,3,4,5].map(i => <Star key={i} className="fill-current w-6 h-6" />)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#00B4D8]/10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00B4D8]/10 rounded-bl-full" />
              <p className="text-gray-600 italic mb-6">"The best bento cake I have ever had! The sponge was so soft and the design was precisely what I asked for."</p>
              <h4 className="font-bold text-gray-900">- Sarah T.</h4>
              <p className="text-sm text-[#FF4D6D]">Lagos Island</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#00B4D8]/10 text-center transform md:-translate-y-4">
              <p className="text-gray-600 italic mb-6">"Ordered the 8k signature for my sister's birthday and it was the highlight of the event. Absolute perfection."</p>
              <h4 className="font-bold text-gray-900">- Daniel O.</h4>
              <p className="text-sm text-[#FF4D6D]">Surulere</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#00B4D8]/10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-[#FF4D6D]/10 rounded-br-full" />
              <p className="text-gray-600 italic mb-6">"Heesha's foil cakes are my weekly addiction. The chocolate is so rich and premium. Highly recommend!"</p>
              <h4 className="font-bold text-gray-900">- Amina M.</h4>
              <p className="text-sm text-[#FF4D6D]">Ilorin</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals & Drawers */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </main>
  );
}
