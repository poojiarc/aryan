import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import about from "@/assets/about.jpg";
import { Leaf, Heart, ChefHat, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aryan Home Foods | UK Homemade Indian Food" },
      { name: "description", content: "The story behind Aryan Home Foods — small-batch homemade Indian pickles, snacks & sweets, made with love in Bournemouth, UK." },
      { property: "og:title", content: "About Aryan Home Foods" },
      { property: "og:description", content: "Family recipes, small batches, zero preservatives." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useReveal();
  return (
    <>
      <section className="relative overflow-hidden gradient-forest text-cream">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">A Taste of Home, Wherever You Are</h1>
          <p className="mx-auto mt-5 max-w-2xl text-cream/80">
            Aryan Home Foods is a small family-run brand bringing authentic, homemade Indian flavours to families across the UK.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6">
        <div className="reveal">
          <img src={about} alt="Making homemade pickles" className="rounded-3xl shadow-glow object-cover h-[500px] w-full" />
        </div>
        <div className="reveal reveal-delay-1 space-y-5 text-muted-foreground leading-relaxed">
          <h2 className="font-display text-3xl text-forest md:text-4xl">Crafted in Small Batches</h2>
          <p>
            Every product begins in our home kitchen in Bournemouth — using the freshest ingredients,
            traditional techniques and recipes handed down through generations.
          </p>
          <p>
            We believe real food should be simple. That's why every jar of avakaya, every box of laddoos,
            and every packet of murukku you receive carries the same care a grandmother would put into her own table.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream hover:bg-forest-deep transition">
            Explore Our Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-cream/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
          {[
            { Icon: Leaf, t: "100% Homemade", d: "Made by hand, never mass-produced." },
            { Icon: Sparkles, t: "No Preservatives", d: "Pure ingredients, nothing else." },
            { Icon: ChefHat, t: "Authentic Recipes", d: "Traditional methods, real flavour." },
            { Icon: Heart, t: "Made With Love", d: "Every batch, every jar." },
          ].map((v, i) => (
            <div key={v.t} className={`reveal reveal-delay-${(i%3)+1} rounded-3xl border border-border bg-card p-7 text-center shadow-soft`}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-gold text-forest-deep">
                <v.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl text-forest">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
