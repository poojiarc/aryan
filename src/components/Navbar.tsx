import { Link } from "@tanstack/react-router";
import { Home, Info, ShoppingBag, Phone, Menu, X, ShoppingCart, Users } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import { useCart } from "@/lib/cart";
import { WHATSAPP_GROUP } from "@/lib/products";

const links = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/about", label: "About", Icon: Info },
  { to: "/products", label: "Products", Icon: ShoppingBag },
  { to: "/contact", label: "Contact", Icon: Phone },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-cream/60 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <img src={logo} alt="Aryan Home Foods" className="h-11 w-11 rounded-full ring-2 ring-gold/40 object-cover shadow-soft" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg text-forest font-semibold">Aryan</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-forest/70">Home Foods</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-forest/80 transition hover:bg-forest/5 hover:text-forest"
              activeProps={{ className: "bg-forest text-cream hover:bg-forest hover:text-cream" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full gradient-gold px-4 py-2 text-sm font-semibold text-forest-deep shadow-soft transition hover:shadow-glow hover:-translate-y-0.5"
          >
            <Users className="h-4 w-4" />
            Join Group
          </a>
          <button
            onClick={() => openCart(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream transition hover:bg-forest/90"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-forest-deep">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          {links.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-forest/80 hover:bg-forest/5"
              activeProps={{ className: "bg-forest text-cream" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <a
            href={WHATSAPP_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl gradient-gold px-4 py-3 text-sm font-semibold text-forest-deep shadow-soft"
          >
            <Users className="h-4 w-4" />
            Join WhatsApp Group
          </a>
        </div>
      </div>
    </header>
  );
}
