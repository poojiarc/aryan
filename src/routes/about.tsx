
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import about from "@/assets/about.jpg";
import {
  Heart,
  Sparkles,
  ArrowRight,
  CookingPot,
  Salad,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aryan Home Foods | UK Homemade Indian Food" },
      {
        name: "description",
        content:
          "The story behind Aryan Home Foods — small-batch homemade Indian pickles, snacks & sweets, made with love in Bournemouth, UK.",
      },
      { property: "og:title", content: "About Aryan Home Foods" },
      {
        property: "og:description",
        content: "Family recipes, small batches, zero preservatives.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useReveal();

  return (
    <>
      <section className="relative overflow-hidden bg-forest text-cream">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #d4a437 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-5xl px-4 py-24 text-center md:px-6 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Our Story
          </p>

          <h1 className="mt-6 font-display text-4xl leading-tight md:text-7xl">
            Recipes Passed Down,
            <br />
            Made With Love
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            Aryan Home Foods is a small family-run brand bringing authentic,
            homemade Indian flavours to you. Every jar is a
            labor of love, sun-cured and spiced according to old-world
            traditions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
        <div className="reveal space-y-8 text-lg leading-relaxed text-muted-foreground">
          <h2 className="font-display text-3xl text-forest md:text-5xl">
            Crafted in Small Batches
          </h2>

          <p>
            Every product begins in our home kitchen in Bournemouth — using the
            freshest ingredients, traditional techniques and recipes handed down
            through generations.
          </p>

          <p>
            We believe real food should be simple. That's why every jar of
            avakaya, every box of laddoos, and every packet of murukku you
            receive carries the same care a grandmother would put into her own
            table.
          </p>

          <div className="pt-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full bg-forest px-10 py-5 text-sm font-bold text-cream transition-all hover:scale-105 hover:bg-forest-deep shadow-glow"
            >
              Explore Our Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream/60 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
          {[
            {
              icon: (
                <CookingPot
                  className="h-10 w-10 md:h-12 md:w-12"
                  strokeWidth={1.6}
                />
              ),
              t: "100% Homemade",
              d: "Made by hand in small batches, never mass-produced.",
            },
            {
              icon: (
                <Sparkles
                  className="h-10 w-10 md:h-12 md:w-12"
                  strokeWidth={1.6}
                />
              ),
              t: "No Added Preservatives",
              d: "Pure ingredients, zero artificial colors or flavors.",
            },
            {
              icon: (
                <Salad
                  className="h-10 w-10 md:h-12 md:w-12"
                  strokeWidth={1.6}
                />
              ),
              t: "Authentic Recipes",
              d: "Traditional Andhra & Telugu family recipes.",
            },
            {
              icon: (
                <Heart
                  className="h-10 w-10 md:h-12 md:w-12"
                  strokeWidth={1.6}
                />
              ),
              t: "Made With Love",
              d: "Handcrafted care in every batch, every jar.",
            },
          ].map((v, i) => (
            <div
              key={v.t}
              className={`reveal reveal-delay-${(i % 3) + 1
                } group flex flex-col items-center rounded-[2.5rem] border border-border bg-card p-8 text-center shadow-soft transition-all duration-300 hover:shadow-glow`}
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-forest/5 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-forest">
                {v.icon}
              </div>

              <h3 className="font-display text-xl text-forest md:text-2xl">
                {v.t}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}