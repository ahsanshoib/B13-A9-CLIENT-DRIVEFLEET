import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8e97e]">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Desktop: 3 column grid | Mobile+Tablet: custom layout */}
        
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs text-[#8b1a1a] tracking-widest mb-4">
              CONTACT INFO
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-red-600 flex-shrink-0" />
                Chankharpul, Dhaka
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-red-600 flex-shrink-0" />
                +880 1876 543210
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-red-600 flex-shrink-0" />
                support@vintagerides.com
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="text-center">
            <h3 className="font-bold text-xs text-[#8b1a1a] tracking-widest mb-4">
              USEFUL LINKS
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <Link href="/" className="block hover:text-[#8b1a1a] transition-colors">Home</Link>
              <Link href="/explore" className="block hover:text-[#8b1a1a] transition-colors">Explore Cars</Link>
            </div>
          </div>

          {/* About */}
          <div className="text-right">
            <h3 className="font-bold text-xs text-[#8b1a1a] tracking-widest mb-4">ABOUT US</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Welcome to Vintage Rides, your gateway to the golden era of
              motoring. We are dedicated to preserving and sharing the rich
              heritage of classic automobiles. Join us on a journey through
              automotive history, where every drive is a ride back in time.
            </p>
          </div>
        </div>

        {/* Mobile + Tablet Layout */}
        <div className="md:hidden space-y-8">

          {/* Row 1: Contact + Useful Links side by side */}
          <div className="flex justify-between gap-4">
            {/* Contact */}
            <div>
              <h3 className="font-bold text-xs text-[#8b1a1a] tracking-widest mb-4">
                CONTACT INFO
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-600 flex-shrink-0" />
                  Chankharpul, Dhaka
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-red-600 flex-shrink-0" />
                  +880 1876 543210
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-red-600 flex-shrink-0" />
                  support@vintagerides.com
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="text-right">
              <h3 className="font-bold text-xs text-[#8b1a1a] tracking-widest mb-4">
                USEFUL LINKS
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <Link href="/" className="block hover:text-[#8b1a1a] transition-colors">Home</Link>
                <Link href="/explore" className="block hover:text-[#8b1a1a] transition-colors">Explore Cars</Link>
              </div>
            </div>
          </div>

          {/* Row 2: About Us — centered */}
          <div className="text-center max-w-sm mx-auto">
            <h3 className="font-bold text-xs text-[#8b1a1a] tracking-widest mb-4">ABOUT US</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Welcome to Vintage Rides, your gateway to the golden era of
              motoring. We are dedicated to preserving and sharing the rich
              heritage of classic automobiles. Join us on a journey through
              automotive history, where every drive is a ride back in time.
            </p>
          </div>

        </div>
      </div>

      {/* Divider */}
      <hr className="border-yellow-300 mx-4" />

      {/* Bottom: Copyright + Socials */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-sm text-gray-600">
        <span>© 2026 Vintage Rides® All Rights Reserved</span>
        <div className="flex gap-4 items-center">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#8b1a1a] transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#8b1a1a] transition-colors">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-[#8b1a1a] transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}