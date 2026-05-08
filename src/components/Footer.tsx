import { Link } from "@tanstack/react-router";
import { Heart, Instagram, Facebook, Mail, Phone, MapPin, Home, Info, ShoppingBag, ChefHat, Sparkles, Package, Globe } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import logo from "@/assets/logo.jpg";

const quickLinks = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/about", label: "About", Icon: Info },
  { to: "/products", label: "Products", Icon: ShoppingBag },
  { to: "/contact", label: "Contact", Icon: Phone },
] as const;

const servicesList = [
  { label: "Handcrafted Pickles", Icon: ChefHat },
  { label: "Traditional Snacks", Icon: Sparkles },
  { label: "Authentic Sweets", Icon: Heart },
  { label: "Custom & Bulk Orders", Icon: Package },
  { label: "UK-wide Delivery", Icon: Globe },
];

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-forest-deep/80 text-gold ring-1 ring-gold/30 shadow-soft">
      {children}
    </span>
  );
}

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
            <a href="https://instagram.com/AryanHomemadefoods" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-deep/80 ring-1 ring-gold/30 hover:bg-gold hover:text-forest-deep transition" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com/AryanHomemadefoods" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-deep/80 ring-1 ring-gold/30 hover:bg-gold hover:text-forest-deep transition" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Quick Links</h4>
          <ul className="mt-4 space-y-1 text-sm text-cream/85">
            {quickLinks.map(({ to, label, Icon }) => (
              <li key={to}>
                <Link to={to} className="group flex items-center gap-3 hover:text-gold transition">
                  <IconTile><Icon className="h-3.5 w-3.5" /></IconTile>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Services</h4>
          <ul className="mt-4 space-y-1 text-sm text-cream/85">
            {servicesList.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-3">
                <IconTile><Icon className="h-3.5 w-3.5" /></IconTile>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Get in Touch</h4>
          <ul className="mt-4 space-y-1 text-sm text-cream/85">
            <li className="flex items-center gap-3">
              <IconTile><Phone className="h-3.5 w-3.5" /></IconTile>
              <a href="tel:+447474140956">+44 74741 40956</a>
            </li>
            <li className="flex items-center gap-3">
              <IconTile><WhatsAppIcon className="h-3.5 w-3.5" /></IconTile>
              <a href="https://wa.me/447474140956" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
            </li>
            <li className="flex items-start gap-3">
              <IconTile><Mail className="h-3.5 w-3.5" /></IconTile>
              <a href="mailto:aryanhomemadefoods@gmail.com" className="break-all">aryanhomemadefoods@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <IconTile><MapPin className="h-3.5 w-3.5" /></IconTile>
              <span>Bournemouth, UK</span>
            </li>
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
