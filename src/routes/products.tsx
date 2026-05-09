import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useReveal } from "@/hooks/use-reveal";

const search = z.object({
  category: z.enum([
    "veg-pickles", "non-veg-pickles", "snacks", "sweets",
    "powders", "masalas",
  ]).optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Shop All Products — Aryan Home Foods" },
      { name: "description", content: "Browse pickles, snacks, sweets, podis, and masalas. Get 5% OFF on orders above £25 with code ARYAN5." },
      { property: "og:title", content: "Shop Aryan Home Foods" },
      { property: "og:description", content: "Authentic homemade Indian foods." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  useReveal();
  const { category } = Route.useSearch();
  const [active, setActive] = useState<Category | "all">(category ?? "all");
  const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      <section className="gradient-forest text-cream">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Catalogue</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">All Products</h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            Pick your favourites — fresh, homemade, and ready for you.
          </p>
        </div>
      </section>

      <div className="sticky top-[68px] z-20 border-b border-border bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          <button
            onClick={() => setActive("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active==="all"?"bg-forest text-cream":"border border-border text-forest hover:border-forest"}`}
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

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {list.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">No products yet in this category.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${(i%3)+1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link to="/contact" className="text-sm text-forest hover:text-gold">
            Need a custom order? Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
