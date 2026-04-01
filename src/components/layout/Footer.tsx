import { MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SocialIconRow } from "@/components/social/SocialIconRow";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-gray-100 mt-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-2xl text-primary">
              Heesha<span className="text-secondary">Cakes</span>
            </h3>
            <p className="text-gray-600 font-medium">
              Luxury in every bite. Creating unforgettable moments with premium cakes and desserts.
            </p>
            <SocialIconRow />
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl text-gray-900">Sweet Links</h4>
            <ul className="space-y-2">
              <li><a href="#menu" className="text-gray-600 hover:text-primary">Menu</a></li>
              <li><a href="#reviews" className="text-gray-600 hover:text-primary">Testimonials</a></li>
              <li><a href="#faqs" className="text-gray-600 hover:text-primary">FAQs</a></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl text-gray-900">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-primary" /> 
                Surulere | Lagos Island | Ilorin
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>DM us on WhatsApp, Instagram, TikTok, or Facebook</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center flex flex-col items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Heesha Cakes n Treats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
