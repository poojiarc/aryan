import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  Truck,
  Sparkles,
  Heart,
  Phone,
  Mail,
  MapPin,
  Package,
  Globe,
  ArrowRight,
  CookingPot,
  Salad,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero1Mob from "@/assets/hero-1-mobile.jpg";
import hero2Mob from "@/assets/hero-2-mobile.jpg";
import hero3Mob from "@/assets/hero-3-mobile.jpg";
import hero4Mob from "@/assets/hero-4-mobile.jpg";
import hero5Mob from "@/assets/hero-5-mobile.jpg";
import about from "@/assets/about.jpg";
import { CATEGORIES, PRODUCTS, WHATSAPP_GROUP, WHATSAPP_DIRECT } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aryan Home Foods — Homemade Indian Pickles, Snacks & Sweets | UK" },
      { name: "description", content: "Authentic homemade Indian pickles, snacks, sweets, and podis — handcrafted in the UK. Get 5% OFF on orders above £25 with code ARYAN5." },
    ],
  }),
  component: HomePage,
});

const slides = [
  { img: hero1, mobileImg: hero1Mob, title: "Authentic Homemade Indian Flavours", sub: "Hand-crafted pickles & snacks, made fresh for you" },
  { img: hero2, mobileImg: hero2Mob, title: "Festive Sweets, Made With Love", sub: "Pre-book artisan mithai for every occasion" },
  { img: hero3, mobileImg: hero3Mob, title: "Traditional Homemade Pickles", sub: "Sun-cured & spice-rich pickles, made with love" },
  { img: hero4, mobileImg: hero4Mob, title: "Crunchy & Moreish Snacks", sub: "Traditional murukulu and snacks for every craving" },
  { img: hero5, mobileImg: hero5Mob, title: "Traditional Podis & Masalas", sub: "Stone-ground and packed with authentic flavour" },
];

function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">

      {/* IMAGE */}
      <div className="relative w-full h-[70vh] md:h-[90vh]">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"
              }`}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={s.mobileImg} />
              <img
                src={s.img}
                alt="hero"
                className="w-full h-full object-cover object-center"
              />
            </picture>

            {/* DARK OVERLAY - Only on desktop since mobile images are already styled */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/50 hidden md:block" />
          </div>
        ))}
      </div>

      {/* CONTENT - Hidden on mobile because mobile images have text baked in */}
      <div className="absolute inset-0 z-10 hidden md:flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">

          <div className="max-w-xl text-white">

            {/* TAG */}
            <span className="inline-block mb-3 rounded-full bg-black/40 px-3 py-1 text-[10px] md:text-xs tracking-widest text-gold">
              AUTHENTIC · HOMEMADE · PICKLES & SNACKS
            </span>

            {/* TITLE */}
            <h1 className="font-display text-2xl leading-tight md:text-5xl lg:text-6xl">
              {slides[i].title}
            </h1>

            {/* SUBTEXT */}
            <p className="mt-3 text-sm md:text-lg text-white/90">
              {slides[i].sub}
            </p>

            {/* BUTTONS */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest"
              >
                Shop Now
              </Link>

              <a
                href={WHATSAPP_GROUP}
                target="_blank"
                className="rounded-full border border-white px-5 py-2.5 text-sm"
              >
                Join WhatsApp Group
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full ${i === idx ? "w-8 bg-gold" : "w-2 bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

function ShippingBanner() {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-sm md:px-6">
        <span className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider"><Sparkles className="h-4 w-4" /> Get 5% OFF on orders above £25 · Use code ARYAN5</span>
        <span className="flex items-center gap-2"><Package className="h-4 w-4 text-gold" /> Free delivery on orders above 5 kg</span>
      </div>
    </section>
  );
}

function Categories({ onSelect }: { onSelect: (id: Category) => void }) {
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
          <button
            key={c.id}
            onClick={() => {
              onSelect(c.id);
              document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`reveal reveal-delay-${(idx % 3) + 1} group flex flex-col items-center gap-2 text-center`}
          >
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-forest-deep text-4xl shadow-soft transition-all duration-300 group-hover:bg-forest group-hover:shadow-glow group-hover:-translate-y-1 md:h-28 md:w-28">
              <span className="absolute inset-0 z-10 rounded-full ring-4 ring-gold/20 ring-offset-4 ring-offset-cream opacity-0 group-hover:opacity-100 transition-all duration-300" />
              {c.image ? (
                <img src={c.image} alt={c.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              ) : (
                c.emoji
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm font-bold text-forest leading-tight">{c.label}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{c.blurb}</div>
            </div>
          </button>
        ))}
      </div>

    </section>
  );
}

function About() {
  const highlights = [
    {
      icon: (
        <CookingPot
          className="h-10 w-10 md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      title: "100% Homemade",
      desc: "Made in tiny batches in our Indian kitchen."
    },
    {
      icon: (
        <Sparkles
          className="h-10 w-10 md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      title: "No Added Preservatives",
      desc: "Zero preservatives, zero artificial colours or flavours."
    },
    {
      icon: (
        <Salad
          className="h-10 w-10 md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      title: "Authentic Recipes",
      desc: "Traditional Andhra & Telugu recipes refined over generations."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-forest py-20 md:py-32">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d4a437 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Our Story</p>
          <h2 className="mt-4 font-display text-4xl text-cream md:text-6xl">Recipes Passed Down, Made With Love</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-cream/80">
            Aryan Home Foods began with one promise — bring the soul of South Indian cooking to your home.
            Every jar is a labor of love, sun-cured and spiced according to old-world traditions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div key={h.title} className={`reveal reveal-delay-${i + 1} flex flex-col items-center p-6 text-center group`}>
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-cream/5 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-forest">
                {h.icon}
              </div>
              <h3 className="font-display text-xl text-cream md:text-2xl">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{h.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16">
          <Link to="/about" className="inline-flex items-center gap-3 rounded-full border-2 border-gold/40 px-8 py-4 text-sm font-bold text-gold transition-all hover:bg-gold hover:text-forest">
            Read Our Full Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}



function ProductCatalog({ active, setActive }: { active: Category | "all", setActive: (val: Category | "all") => void }) {
  const filteredCategories = active === "all" ? CATEGORIES : CATEGORIES.filter(c => c.id === active);

  return (
    <section id="product-catalog" className="bg-cream/60">
      <div className="sticky top-[68px] z-20 border-b border-border bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          <button
            onClick={() => setActive("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active === "all" ? "bg-forest text-cream" : "border border-border text-forest hover:border-forest"}`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${active === c.id ? "bg-forest text-cream" : "border border-border text-forest hover:border-forest"}`}
            >
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-forest-deep/10">
                {c.image ? (
                  <img src={c.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs">{c.emoji}</span>
                )}
              </div>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="reveal text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our Shop</p>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-5xl">Explore Our Collection</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From spicy sun-cured pickles to handcrafted festive sweets — discover the authentic taste of homemade goodness.
          </p>
        </div>

        <div className="space-y-20">
          {filteredCategories.map((cat) => {
            const items = PRODUCTS.filter((p) => p.category === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id} className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gold/30" />
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-forest text-xl shadow-soft">
                      {cat.image ? (
                        <img src={cat.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span>{cat.emoji}</span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl text-forest md:text-3xl">{cat.label}</h3>
                  </div>
                  <div className="h-px flex-1 bg-gold/30" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((p, i) => (
                    <div key={p.id} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
    {
      icon: (
        <CookingPot
          className="h-10 w-10 text-gold md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      t: "100% Homemade"
    },
    {
      icon: (
        <Sparkles
          className="h-10 w-10 text-gold md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      t: "No Added Preservatives"
    },
    {
      icon: (
        <Salad
          className="h-10 w-10 text-gold md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      t: "Authentic Recipes"
    },
    {
      icon: (
        <Heart
          className="h-10 w-10 text-gold md:h-12 md:w-12"
          strokeWidth={1.6}
        />
      ),
      t: "Made With Love"
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <div className="reveal relative overflow-hidden rounded-[2.5rem] gradient-forest px-4 py-10 md:px-10 md:py-12 shadow-glow border border-gold/40">
        <div className="grid grid-cols-2 divide-gold/20 md:grid-cols-4 md:divide-x">
          {items.map((it) => (
            <div key={it.t} className="flex flex-col items-center justify-center gap-4 px-3 py-4 text-center">
              <div className="text-gold">{it.icon}</div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-gold leading-tight">{it.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
      <div className="reveal grid gap-6 md:grid-cols-3">
        <div className="group rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-gold transition-colors group-hover:bg-gold group-hover:text-forest">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="mt-6 font-display text-2xl text-forest">Call Us</h3>
          <p className="mt-2 text-sm text-muted-foreground">Order via phone or chat</p>
          <div className="mt-6 space-y-2">
            <a href="tel:+447474140956" className="block text-lg font-semibold text-forest hover:text-gold transition">+44 74741 40956</a>
            <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-3 py-1 text-sm font-bold text-[#25D366] hover:bg-[#25D366] hover:text-white transition">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp anytime
            </a>
          </div>
        </div>

        <div className="group rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-gold transition-colors group-hover:bg-gold group-hover:text-forest">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="mt-6 font-display text-2xl text-forest">Email</h3>
          <p className="mt-2 text-sm text-muted-foreground">For inquiries & support</p>
          <div className="mt-6">
            <a href="mailto:aryanhomemadefoods@gmail.com" className="block break-all text-base font-semibold text-forest hover:text-gold transition">aryanhomemadefoods@gmail.com</a>
          </div>
        </div>

        <div className="group rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-gold transition-colors group-hover:bg-gold group-hover:text-forest">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="mt-6 font-display text-2xl text-forest">Collection Points</h3>
          <p className="mt-2 text-sm text-muted-foreground">Collect your fresh order from</p>
          <div className="mt-6">
            <p className="text-base font-semibold text-forest leading-relaxed">
              London · Cambridge · <br />Bournemouth · Coventry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function HomePage() {
  useReveal();
  const [active, setActive] = useState<Category | "all">("all");

  return (
    <>
      <Hero />

      <ShippingBanner />
      <Categories onSelect={setActive} />
      <About />

      <ProductCatalog active={active} setActive={setActive} />
      <WhatsAppCTA />
      <Highlights />
      <ContactStrip />
    </>
  );
}
