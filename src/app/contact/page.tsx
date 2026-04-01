"use client";

import { FormEvent, useState } from "react";
import { Camera, MessageCircle, Music2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SOCIAL_LINKS, WHATSAPP_NUMBER } from "@/lib/business";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export default function ContactPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !message) return;

    const whatsappText = [
      "Hello Heesha Cakes!",
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : "",
      `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">Contact Us</h1>
            <p className="text-gray-600 mt-3">
              Send your cake request directly to our WhatsApp and we will respond quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="e.g. 080..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                    placeholder="Tell us what you need: flavor, size, layers, date, and location."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-bold transition-colors"
                >
                  Send Message on WhatsApp
                </button>
              </form>
            </div>

            <div className="md:col-span-2 bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Socials</h2>
              <p className="text-sm text-gray-600 mb-4">
                Tap any icon to open the account. You can share final links later.
              </p>
              <div className="flex items-center gap-4">
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#25D366] hover:text-[#25D366] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#E1306C] hover:text-[#E1306C] transition-colors">
                  <Camera className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-3 rounded-full bg-white border border-gray-200 hover:border-black hover:text-black transition-colors">
                  <Music2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
