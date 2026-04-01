"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductModal } from "@/components/product/ProductModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { DUMMY_PRODUCTS, Product, ProductCategory } from "@/types/product";
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPriceRange, getCustomizedPrice, getProductPriceRange } from "@/lib/pricing";

const ALL_CATEGORIES: ("All" | ProductCategory)[] = [
  "All",
  "Buttercream Frosting",
  "Whipped Cream Frosting",
  "Plain Cakes",
  "Extras",
];

function ShopProductCard({
  product,
  onOpenModal,
}: {
  product: Product;
  onOpenModal: (p: Product) => void;
}) {
  const addItem = useCartStore((s) => s.addItem);

  function handleQuickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    const defaultFlavor = product.availableFlavors[0] || "";
    const defaultSize = product.availableSizes[0] || "";
    const customizedPrice = getCustomizedPrice(product, defaultSize, defaultFlavor);

    addItem({
      id: `${product.id}-quick`,
      productId: product.id,
      name: product.name,
      image: product.image,
      flavor: defaultFlavor,
      size: defaultSize,
      inscription: "",
      price: customizedPrice,
      quantity: 1,
    });
  }

  const { min, max } = getProductPriceRange(product);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpenModal(product)}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#FAF9F6] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Add overlay */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 bg-white border border-gray-200 rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white hover:border-primary"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-secondary text-base">
            {formatPriceRange(min, max)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenModal(product); }}
            className="text-xs font-semibold text-primary border border-primary rounded-lg px-3 py-1.5 hover:bg-primary hover:text-white transition-colors"
          >
            Customize
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? DUMMY_PRODUCTS
      : DUMMY_PRODUCTS.filter((p) => p.category === activeCategory);

  const categoryCounts = ALL_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All"
      ? DUMMY_PRODUCTS.length
      : DUMMY_PRODUCTS.filter((p) => p.category === cat).length;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-gray-900">Our Cakes & Treats</h1>
          <p className="text-gray-500 mt-1">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-8">

        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-[105px]">
            <h2 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Categories</h2>
            <ul className="space-y-1">
              {ALL_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs rounded-full px-2 py-0.5 font-bold ${
                      activeCategory === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {categoryCounts[cat]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          {/* Mobile filter bar */}
          <div className="lg:hidden flex items-center justify-between mb-5">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter: {activeCategory}
            </button>
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          >
            <AnimatePresence>
              {filtered.map((product) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium">No products in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 p-6 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-gray-900">Categories</h2>
                <button onClick={() => setIsSidebarOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <ul className="space-y-1">
                {ALL_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }}
                      className={`w-full text-left flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        activeCategory === cat ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-xs rounded-full px-2 py-0.5 font-bold ${
                        activeCategory === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {categoryCounts[cat]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </main>
  );
}
