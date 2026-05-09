import { useState } from "react";
import type { Product, WeightOption } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductImage } from "./ProductImage";
import { Plus, Minus, Calendar } from "lucide-react";
import { WHATSAPP_DIRECT } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const weights = Object.keys(product.prices) as WeightOption[];
  const [weight, setWeight] = useState<WeightOption>(weights[0]);
  const { add, lines, setQty, remove } = useCart();
  const price = product.prices[weight] ?? 0;
  const lineId = `${product.id}__${weight}`;
  const cartLine = lines.find(l => l.id === lineId);
  const currentQty = cartLine?.qty ?? 0;

  const preBook = () => {
    const text = encodeURIComponent(`Hi! I'd like to pre-book: ${product.name} (${weight})`);
    window.open(`${WHATSAPP_DIRECT}?text=${text}`, "_blank");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow sm:rounded-3xl">
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
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <h3 className="font-display text-sm leading-tight text-forest sm:text-base">{product.name}</h3>

        <div className="flex flex-wrap gap-1">
          {weights.map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
                weight === w
                  ? "bg-forest text-cream"
                  : "border border-border text-forest/70 hover:border-forest"
              }`}
            >
              {w === "1000g" ? "1kg" : w}
            </button>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between gap-1 border-t border-forest/5 pt-2 sm:mt-2 sm:gap-2 sm:pt-3">
          <div>
            <div className="font-display text-lg font-bold text-forest sm:text-xl">£{price.toFixed(2)}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider sm:text-[10px]">{weight === "1000g" ? "1kg" : weight}</div>
          </div>
          {product.preBookOnly ? (
            <button
              onClick={preBook}
              className="flex items-center gap-1 rounded-full gradient-gold px-2.5 py-1.5 text-[10px] font-semibold text-forest-deep shadow-soft hover:shadow-glow transition sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-xs"
            >
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Pre-Book
            </button>
          ) : currentQty > 0 ? (
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-forest/50">Added</span>
              <div className="flex items-center gap-1 rounded-full bg-forest/10 p-0.5 sm:gap-2 sm:p-1">
                <button
                  onClick={() => currentQty === 1 ? remove(lineId) : setQty(lineId, currentQty - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-cream transition hover:bg-forest-deep shadow-sm sm:h-7 sm:w-7"
                >
                  <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </button>
                <span className="min-w-[14px] text-center text-xs font-bold text-forest sm:min-w-[18px] sm:text-sm">{currentQty}</span>
                <button
                  onClick={() => setQty(lineId, currentQty + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-cream transition hover:bg-forest-deep shadow-sm sm:h-7 sm:w-7"
                >
                  <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => add(product, weight)}
              className="flex items-center gap-1 rounded-full bg-forest px-3.5 py-2 text-[11px] font-semibold text-cream hover:bg-forest-deep transition shadow-soft hover:shadow-glow sm:gap-1.5 sm:px-5 sm:py-2 sm:text-xs"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

