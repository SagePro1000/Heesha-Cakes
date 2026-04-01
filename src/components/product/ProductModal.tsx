"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { getCustomizedPrice, getProductPriceRange, formatPriceRange } from "@/lib/pricing";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

function ProductModalContent({
  product,
  onClose,
  onOpenCart,
}: {
  product: Product;
  onClose: () => void;
  onOpenCart: () => void;
}) {
  const { addItem } = useCartStore();

  const [flavor, setFlavor] = useState(product.availableFlavors[0] || "");
  const [size, setSize] = useState(product.availableSizes[0] || "");
  const [inscription, setInscription] = useState("");
  const customizedPrice = getCustomizedPrice(product, size, flavor);
  const { min, max } = getProductPriceRange(product);

  const handleAddToCart = () => {
    const cartItemId = `${product.id}-${flavor}-${size}`;

    addItem({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: customizedPrice,
      quantity: 1,
      flavor,
      size,
      inscription: product.allowInscription ? inscription : "",
    });

    onClose();
    onOpenCart();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 m-auto z-50 w-full max-w-4xl h-fit max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Image side */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-[#FAF9F6]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/50 backdrop-blur-md text-gray-900 rounded-full hover:bg-white md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content side */}
        <div className="w-full md:w-1/2 flex flex-col h-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 flex flex-col flex-1">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D6D] hidden md:block mb-2">
                {product.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-[#00B4D8] font-black text-2xl mt-4">{formatPriceRange(min, max)}</p>
              <p className="text-sm text-gray-500 mt-1">Selected option: {formatPrice(customizedPrice)}</p>
            </div>

            <div className="space-y-6 flex-1">
              {/* Flavour Select */}
              {product.availableFlavors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Flavor</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.availableFlavors.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFlavor(f)}
                        className={`px-4 py-2 rounded-xl border text-sm transition-all duration-200 ${
                          flavor === f
                            ? "border-[#FF4D6D] bg-[#FF4D6D]/10 text-[#FF4D6D] font-medium shadow-sm"
                            : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                        }`}
                      >
                        {flavor === f && <Check className="w-3 h-3 inline-block mr-1" />}
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Select */}
              {product.availableSizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Size</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.availableSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 rounded-xl border text-sm transition-all duration-200 ${
                          size === s
                            ? "border-[#00B4D8] bg-[#00B4D8]/10 text-[#0096B4] font-medium shadow-sm"
                            : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                        }`}
                      >
                        {size === s && <Check className="w-3 h-3 inline-block mr-1" />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Inscription */}
              {product.allowInscription && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Cake Inscription (Optional)</h3>
                  <input
                    type="text"
                    value={inscription}
                    onChange={(e) => setInscription(e.target.value)}
                    placeholder="E.g. Happy Birthday Joy!"
                    maxLength={40}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-2 flex justify-end">{inscription.length}/40</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-gray-900/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Add to Order • {formatPrice(customizedPrice)}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function ProductModal({ product, isOpen, onClose, onOpenCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ProductModalContent
          key={product.id}
          product={product}
          onClose={onClose}
          onOpenCart={onOpenCart}
        />
      )}
    </AnimatePresence>
  );
}
