import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Product, WeightOption } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductImage } from "./ProductImage";
import { Plus, Calendar } from "lucide-react";
import { WHATSAPP_DIRECT } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const weights = Object.keys(product.prices) as WeightOption[];
  const [weight, setWeight] = useState<WeightOption>(weights[0]);
  const { add } = useCart();
  const navigate = useNavigate();
  const price = product.prices[weight] ?? 0;

  const preBook = () => {
    const text = encodeURIComponent(`Hi! I'd like to pre-book: ${product.name} (${weight})`);
    window.open(`${WHATSAPP_DIRECT}?text=${text}`, "_blank");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden">
        <ProductImage product={product} />
        <div className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest backdrop-blur">
          {product.category.replace("-", " ")}
        </div>
        {product.preBookOnly && (
          <div className="absolute right-3 top-3 rounded-full gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-deep">
            Pre-Book
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-lg leading-tight text-forest">{product.name}</h3>

        <div className="flex flex-wrap gap-1.5">
          {weights.map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                weight === w
                  ? "bg-forest text-cream"
                  : "border border-border text-forest/70 hover:border-forest"
              }`}
            >
              {w === "1000g" ? "1kg" : w}
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <div className="font-display text-2xl font-semibold text-forest">£{price.toFixed(2)}</div>
            <div className="text-[11px] text-muted-foreground">{weight === "1000g" ? "1kg" : weight}</div>
          </div>
          {product.preBookOnly ? (
            <button
              onClick={preBook}
              className="flex items-center gap-1.5 rounded-full gradient-gold px-3.5 py-2 text-xs font-semibold text-forest-deep shadow-soft hover:shadow-glow transition"
            >
              <Calendar className="h-3.5 w-3.5" /> Pre-Book
            </button>
          ) : (
            <button
              onClick={() => add(product, weight)}
              className="flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 text-xs font-semibold text-cream hover:bg-forest-deep transition"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
        </div>
      </div>
      {/* navigate hidden if needed */}
      <span className="hidden">{navigate ? "" : ""}</span>
    </article>
  );
}
