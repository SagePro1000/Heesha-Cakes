"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, Heart, Menu, X, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Testimonials", href: "/#reviews" },
  { label: "Menu",       href: "/#menu" },
  { label: "FAQs",       href: "/#faqs" },
  { label: "Shop",       href: "/shop" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        {/* Main Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-2xl tracking-tight text-primary">
              Heesha<span className="text-secondary">Cakes</span>
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Action Icons — desktop */}
          <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
            <button className="flex flex-col items-center gap-1 hover:text-primary transition-colors relative">
              <Heart className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-wider">Wishlist</span>
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">0</span>
            </button>

            <button
              onClick={onOpenCart}
              className="flex flex-col items-center gap-1 hover:text-secondary transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-wider">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-secondary rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Nav Bar — desktop */}
        <div className="hidden md:block bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-12 gap-8">
              <Link href="/shop" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 h-full font-semibold transition-colors text-sm">
                <LayoutGrid className="w-4 h-4" />
                Browse All
              </Link>
              <nav className="flex items-center gap-8">
                {NAV_LINKS.filter(l => l.label !== "Home").map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors hover:text-secondary ${
                      (link.href === "/shop" && pathname === "/shop") ? "text-secondary" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Cart + Wishlist */}
              <div className="flex justify-around py-3 border-b border-gray-100">
                <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary">
                  <Heart className="w-6 h-6" />
                  <span className="text-[10px]">Wishlist</span>
                </button>
                <button
                  onClick={() => { onOpenCart(); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center gap-1 text-gray-600 hover:text-secondary relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="text-[10px]">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 right-2 w-4 h-4 text-[10px] text-white bg-secondary rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      link.label === "Shop"
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
