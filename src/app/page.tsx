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
import { Star, ChevronDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CATEGORIES: ("All" | ProductCategory)[] = ["All", "Buttercream Frosting", "Whipped Cream Frosting", "Plain Cakes", "Extras"];
const TESTIMONIALS = [
  { quote: "The best bento cake I have ever had! The sponge was so soft and the design was precisely what I asked for.", name: "Sarah T.", location: "Lagos Island" },
  { quote: "Ordered the 8k signature for my sister's birthday and it was the highlight of the event. Absolute perfection.", name: "Daniel O.", location: "Surulere" },
  { quote: "Heesha's foil cakes are my weekly addiction. The chocolate is so rich and premium. Highly recommend!", name: "Amina M.", location: "Ilorin" },
  { quote: "Delivery was on time and the cake looked exactly like my inspo picture. Flavor was top-tier.", name: "Rita E.", location: "Lekki" },
  { quote: "I ordered cupcakes for my office event and everyone asked where I got them from.", name: "Tobi A.", location: "Yaba" },
  { quote: "Very responsive service and premium taste. Worth every naira.", name: "Kemi L.", location: "Ikeja" },
];
const FAQS = [
  {
    question: "How far ahead should I place my order?",
    answer: "Please place custom cake orders at least 24-48 hours in advance. For large events like weddings, 5-7 days notice is best.",
  },
  {
    question: "Do you deliver within Lagos and outside Lagos?",
    answer: "Yes. We deliver across Lagos (Surulere, Mainland, Island/Lekki) and Ilorin. Delivery fees are calculated at checkout based on your zone.",
  },
  {
    question: "Can I request specific flavors, sizes, and layers?",
    answer: "Yes. You can customize flavor, size, and layers on product pages. The final price updates based on your selected options.",
  },
  {
    question: "Do you take urgent same-day orders?",
    answer: "We recommend 24 hours notice. For urgent requests, send us a WhatsApp message first and we will confirm availability.",
  },
  {
    question: "How do I confirm payment for my order?",
    answer: "After checkout, you will be redirected to WhatsApp with your order summary. We will reply with payment and confirmation details.",
  },
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

      {/* Menu / Product Grid */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Our Menu</h2>
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
                    ? "bg-secondary text-white shadow-md shadow-secondary/20 transform scale-105"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {TESTIMONIALS.map((item, index) => (
              <SwiperSlide key={`${item.name}-${index}`}>
                <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-[#00B4D8]/10 text-center">
                  <p className="text-gray-600 italic mb-6">
                    {`\u201C${item.quote.replaceAll("'", "\u2019")}\u201D`}
                  </p>
                  <h4 className="font-bold text-gray-900">- {item.name}</h4>
                  <p className="text-sm text-[#FF4D6D]">{item.location}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers for common cake ordering questions in Nigeria.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left p-5 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
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
