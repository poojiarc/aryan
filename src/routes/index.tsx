import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShoppingBag, Users, Truck, Sparkles, Leaf, Heart, ChefHat,
  Phone, Mail, MapPin, Package, Globe, ArrowRight,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import about from "@/assets/about.jpg";
import { CATEGORIES, PRODUCTS, WHATSAPP_GROUP, WHATSAPP_DIRECT } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aryan Home Foods — Homemade Indian Pickles, Snacks & Sweets | UK" },
      { name: "description", content: "Authentic homemade Indian pickles, snacks, sweets, podis & ghee — handcrafted in the UK. Free shipping over £79." },
    ],
  }),
  component: HomePage,
});

const slides = [
  { img: hero1, title: "Authentic Homemade Indian Flavours", sub: "Hand-crafted pickles & snacks, delivered across the UK" },
  { img: hero3, title: "Sun-Cured Pickles, Old-World Recipes", sub: "Small batches. No preservatives. Pure tradition." },
  { img: hero2, title: "Festive Sweets, Made With Love", sub: "Pre-book artisan mithai for every occasion" },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.img} alt="" className="h-full w-full object-cover scale-105" />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
      ))}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-20 md:px-6 md:pb-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest-deep/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
            <Sparkles className="h-3 w-3" /> Authentic · Homemade · UK-Made
          </span>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] text-cream md:text-6xl lg:text-7xl">
            {slides[i].title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-cream/85 md:text-lg">{slides[i].sub}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-forest shadow-glow hover:bg-gold transition"
            >
              <ShoppingBag className="h-4 w-4" /> Shop Now
            </Link>
            <a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/70 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur hover:bg-cream hover:text-forest transition"
            >
              <Users className="h-4 w-4" /> Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-gold" : "w-2 bg-cream/50"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function DiscountBanner() {
  return (
    <div className="gradient-gold py-2.5 text-center text-xs font-semibold text-forest-deep md:text-sm">
      🎁 Get <strong>5% OFF</strong> on orders above £25 · Use code <strong className="rounded bg-forest-deep px-1.5 py-0.5 text-cream">ARYAN5</strong>
    </div>
  );
}

function ShippingBanner() {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-sm md:px-6">
        <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Free shipping on orders above <strong>£79</strong></span>
        <span className="hidden md:flex items-center gap-2"><Globe className="h-4 w-4 text-gold" /> UK-wide & International</span>
        <span className="flex items-center gap-2"><Package className="h-4 w-4 text-gold" /> Fresh, small-batch packing</span>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="reveal text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Explore</p>
        <h2 className="mt-2 font-display text-3xl text-forest md:text-5xl">Shop by Category</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          From spicy avakaya to crisp janthikalu — find your favourite homemade flavours.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-7">
        {CATEGORIES.map((c, idx) => (
          <Link
            key={c.id}
            to="/products"
            search={{ category: c.id }}
            className={`reveal reveal-delay-${(idx % 3) + 1} group flex flex-col items-center gap-3 text-center`}
          >
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full gradient-forest text-4xl shadow-soft transition group-hover:shadow-glow group-hover:-translate-y-1 md:h-28 md:w-28">
              <span className="absolute inset-0 rounded-full ring-2 ring-gold/40 ring-offset-2 ring-offset-cream opacity-0 group-hover:opacity-100 transition" />
              {c.emoji}
            </div>
            <div>
              <div className="text-sm font-semibold text-forest">{c.label}</div>
              <div className="text-[11px] text-muted-foreground">{c.blurb}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-cream/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <div className="reveal relative">
          <div className="absolute -inset-4 rounded-3xl gradient-gold opacity-30 blur-2xl" />
          <img src={about} alt="Hand-making pickles" loading="lazy" className="relative h-[480px] w-full rounded-3xl object-cover shadow-glow" />
        </div>
        <div className="reveal reveal-delay-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Story</p>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-5xl">Recipes Passed Down, Made With Love</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Aryan Home Foods began in a Bournemouth kitchen with one promise — bring the soul of South Indian
            cooking to homes across the UK. Every jar of pickle, every laddu, every podi is made in tiny batches,
            using family recipes refined over generations.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-forest">
            <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-gold" /> 100% homemade in small batches — never mass-produced</li>
            <li className="flex items-start gap-3"><Sparkles className="mt-0.5 h-4 w-4 text-gold" /> Zero preservatives, zero artificial colours</li>
            <li className="flex items-start gap-3"><ChefHat className="mt-0.5 h-4 w-4 text-gold" /> Traditional Andhra, Telugu & North Indian recipes</li>
          </ul>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-gold">
            Read our story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const services = [
  { Icon: ChefHat, title: "Handcrafted Pickles", desc: "Sun-cured, spice-rich, jarred fresh." },
  { Icon: Sparkles, title: "Traditional Snacks", desc: "Crisp, crunchy & deeply nostalgic." },
  { Icon: Heart, title: "Authentic Sweets", desc: "Festive mithai, made by hand." },
  { Icon: Package, title: "Custom & Bulk Orders", desc: "Weddings, parties & festivals." },
  { Icon: WhatsAppIcon, title: "WhatsApp Ordering", desc: "Chat with us — we deliver fast." },
  { Icon: Globe, title: "UK & International Delivery", desc: "From Bournemouth, worldwide." },
];

function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <div className="reveal text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">What We Offer</p>
        <h2 className="mt-2 font-display text-3xl text-forest md:text-5xl">Everything Made With Care</h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title} className={`reveal reveal-delay-${(i % 3) + 1} group rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-glow`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-forest text-cream shadow-soft transition group-hover:gradient-gold group-hover:text-forest-deep">
              <s.Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl text-forest">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const featured = PRODUCTS.filter((p) => ["mango", "chicken", "kara-boondi", "dryfruit-laddoos", "garam", "buffalo-ghee", "gongura", "murukulu"].includes(p.id));
  return (
    <section className="bg-cream/60">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Bestsellers</p>
            <h2 className="mt-2 font-display text-3xl text-forest md:text-5xl">Featured Favourites</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-5 py-2.5 text-sm font-semibold text-forest hover:bg-forest hover:text-cream transition">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <div key={p.id} className={`reveal reveal-delay-${(i % 3) + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="reveal relative overflow-hidden rounded-3xl gradient-forest p-8 md:p-14 shadow-glow">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-chili/15 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Community</p>
            <h2 className="mt-2 font-display text-3xl text-cream md:text-5xl">Join Our WhatsApp Family</h2>
            <p className="mt-3 max-w-xl text-cream/80">
              Get fresh-batch alerts, festive specials and exclusive member pricing — delivered straight to your phone.
            </p>
          </div>
          <a
            href={WHATSAPP_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-base font-semibold text-white shadow-glow hover:scale-105 transition"
          >
            <WhatsAppIcon className="h-5 w-5" /> Join the Group
          </a>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { icon: "🌿", t: "100% Homemade" },
    { icon: "🚫", t: "No Added Preservatives" },
    { icon: "🏡", t: "Authentic Recipes" },
    { icon: "❤️", t: "Made With Love" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <div className="reveal relative overflow-hidden rounded-2xl gradient-forest px-4 py-6 md:px-10 md:py-8 shadow-soft border border-gold/40">
        <div className="grid grid-cols-2 divide-x divide-gold/30 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.t} className="flex flex-col items-center justify-center gap-2 px-3 py-3 text-center">
              <div className="text-3xl md:text-4xl">{it.icon}</div>
              <div className="text-[11px] md:text-sm font-semibold uppercase tracking-wider text-gold">{it.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      <div className="reveal grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <Phone className="h-6 w-6 text-gold" />
          <h3 className="mt-3 font-display text-xl text-forest">Call Us</h3>
          <a href="tel:+447474140956" className="mt-1 block text-sm text-muted-foreground hover:text-forest">+44 74741 40956</a>
          <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-[#25D366] font-semibold">WhatsApp anytime</a>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <Mail className="h-6 w-6 text-gold" />
          <h3 className="mt-3 font-display text-xl text-forest">Email</h3>
          <a href="mailto:aryanhomemadefoods@gmail.com" className="mt-1 block break-all text-sm text-muted-foreground hover:text-forest">aryanhomemadefoods@gmail.com</a>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <MapPin className="h-6 w-6 text-gold" />
          <h3 className="mt-3 font-display text-xl text-forest">Collection Points</h3>
          <p className="mt-1 text-sm text-muted-foreground">London · Cambridge · Bournemouth · Coventry</p>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  useReveal();
  return (
    <>
      <DiscountBanner />
      <Hero />
      <ShippingBanner />
      <Categories />
      <About />
      <Services />
      <Featured />
      <WhatsAppCTA />
      <Highlights />
      <ContactStrip />
    </>
  );
}
