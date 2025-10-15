import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001f3f] dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Artgie</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              Custom signs in corroplast and metal. Single or double-sided options available in multiple sizes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm">
                  Signs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-300 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 dark:text-gray-400 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-300 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 dark:text-gray-400 text-sm">info@artgie.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-300 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 dark:text-gray-400 text-sm">123 Main Street, City, ST 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 dark:border-gray-800 mt-12 pt-8 text-center text-gray-300 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} Artgie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}