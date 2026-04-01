import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DELIVERY_ZONES = [
  { id: "surulere", name: "Surulere", fee: 1500 },
  { id: "mainland", name: "Lagos Mainland (Other)", fee: 3000 },
  { id: "island", name: "Lagos Island / Lekki", fee: 5000 },
  { id: "ilorin", name: "Ilorin", fee: 2000 },
];

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [zone, setZone] = useState(DELIVERY_ZONES[0]);
  const [address, setAddress] = useState("");
  
  // Logic to prevent same-day: min date is tomorrow.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const total = subtotal + zone.fee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !address) return;

    let message = `*🌟 New Order from HeeshaCakes Website!*\n\n`;
    message += `*Customer:* ${name}\n`;
    message += `*Delivery Date:* ${date}\n`;
    message += `*Zone:* ${zone.name}\n`;
    message += `*Address:* ${address}\n\n`;
    message += `*🛍 Order Details:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Qty: ${item.quantity})\n`;
      message += `   - Size: ${item.size}\n`;
      message += `   - Flavor: ${item.flavor}\n`;
      if (item.inscription) {
        message += `   - Inscription: "${item.inscription}"\n`;
      }
      message += `   - Price: ${formatPrice(item.price * item.quantity)}\n`;
    });

    message += `\n*🧾 Summary:*\n`;
    message += `Subtotal: ${formatPrice(subtotal)}\n`;
    message += `Delivery: ${formatPrice(zone.fee)}\n`;
    message += `*Total: ${formatPrice(total)}*\n\n`;
    message += `Please process my order!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "2348000000000"; // Replace with actual business WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="fixed inset-0 m-auto z-50 max-w-lg h-fit max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Finalize Order</h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-[#00B4D8]/10 p-4 rounded-xl flex gap-3 text-[#0096B4] mb-6">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Orders require a minimum of 24 hours notice. For same-day emergencies, please contact us directly on WhatsApp first.</p>
              </div>

              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none transition-colors"
                    placeholder="E.g. Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Zone</label>
                  <select
                    value={zone.id}
                    onChange={(e) => setZone(DELIVERY_ZONES.find(z => z.id === e.target.value) || DELIVERY_ZONES[0])}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none transition-colors bg-white"
                  >
                    {DELIVERY_ZONES.map((z) => (
                      <option key={z.id} value={z.id}>{z.name} - {formatPrice(z.fee)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Delivery Address</label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none transition-colors resize-none"
                    placeholder="Enter your full street address..."
                  />
                </div>
              </form>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Delivery</span>
                <span>{formatPrice(zone.fee)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#25D366]/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Continue to WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
