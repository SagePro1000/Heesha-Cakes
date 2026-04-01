"use client";

import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🎂</span>
                  </div>
                  <p>Your cart is empty.</p>
                  <button
                    onClick={onClose}
                    className="text-[#00B4D8] font-medium hover:underline"
                  >
                    Start Browsing Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-[#FF4D6D] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.flavor} | {item.size}
                          {item.inscription && ` | Msg: "${item.inscription}"`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-[#FF4D6D]">
                          {formatPrice(item.price)}
                        </span>

                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 px-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 px-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
                <p className="text-xs text-gray-500">
                  Delivery and taxes calculated at checkout via WhatsApp.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#00B4D8]/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Checkout to WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
