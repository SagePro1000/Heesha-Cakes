import { Heart, MapPin, MessageCircle, Phone } from "lucide-react";

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
            <div className="flex justify-center md:justify-start gap-4 text-gray-400">
              <a href="#" className="hover:text-secondary transition-colors"><Heart className="w-5 h-5"/></a>
              <a href="#" className="hover:text-primary transition-colors"><MessageCircle className="w-5 h-5"/></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl text-gray-900">Sweet Links</h4>
            <ul className="space-y-2">
              <li><a href="#menu" className="text-gray-600 hover:text-primary">Menu</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-primary">Our Story</a></li>
              <li><a href="#faqs" className="text-gray-600 hover:text-primary">FAQs</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-primary">Contact</a></li>
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
                <Phone className="w-4 h-4 text-secondary" /> 
                <a href="https://wa.me/2340000000000">+234 000 000 0000 (WhatsApp Only)</a>
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
