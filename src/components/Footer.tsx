import { Link } from "@tanstack/react-router";
import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 gradient-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Aryan Home Foods" className="h-12 w-12 rounded-full ring-2 ring-gold/50 object-cover" />
            <div className="font-display text-xl">Aryan Home Foods</div>
          </div>
          <p className="mt-4 text-sm text-cream/75 leading-relaxed">
            Authentic homemade Indian pickles, snacks & sweets — made in small batches, delivered across the UK.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/AryanHomemadefoods" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 hover:bg-gold hover:text-forest-deep transition" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com/AryanHomemadefoods" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 hover:bg-gold hover:text-forest-deep transition" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/products" className="hover:text-gold">Products</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>Handcrafted Pickles</li>
            <li>Traditional Snacks</li>
            <li>Authentic Sweets</li>
            <li>Custom & Bulk Orders</li>
            <li>UK-wide Delivery</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-gold" /><a href="tel:+447474140956">+44 74741 40956</a></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-gold" /><a href="mailto:aryanhomemadefoods@gmail.com" className="break-all">aryanhomemadefoods@gmail.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /><span>Bournemouth, UK</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-5 text-center text-xs text-cream/70 md:px-6">
          <p>© {year} ARYAN HOME FOODS. All rights reserved.</p>
          <div className="flex items-center justify-center gap-1">
            Made with <Heart className="inline h-4 w-4 mx-1 fill-red-500 text-red-500" /> by
            <a
              href="https://staffarc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-orange-400 hover:underline"
            >
              <img
                src="https://www.staffarc.in/images/Staffarc-logo.png"
                alt="StaffArc logo"
                className="h-5 w-5 object-contain"
              />
              StaffArc
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
