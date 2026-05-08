import { useCart } from "@/lib/cart";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { WHATSAPP_DIRECT } from "@/lib/products";
import { useEffect } from "react";

export function CartDrawer() {
  const { open, setOpen, lines, remove, setQty, total, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const checkout = () => {
    const text = encodeURIComponent(
      "Hi Aryan Home Foods! I'd like to order:\n\n" +
        lines.map((l) => `• ${l.product.name} (${l.weight}) × ${l.qty} — £${(l.price * l.qty).toFixed(2)}`).join("\n") +
        `\n\nTotal: £${total.toFixed(2)}`,
    );
    window.open(`${WHATSAPP_DIRECT}?text=${text}`, "_blank");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-forest-deep/50 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-glow transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 font-display text-lg text-forest">
            <ShoppingBag className="h-5 w-5" /> Your Basket
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-forest/10" aria-label="Close">
            <X className="h-5 w-5 text-forest" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="text-5xl">🥢</div>
            <p className="font-display text-xl text-forest">Your basket is empty</p>
            <p className="text-sm text-muted-foreground">Add some homemade goodness to get started.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {lines.map((l) => (
              <div key={l.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <ProductImage product={l.product} />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-forest leading-tight">{l.product.name}</div>
                      <div className="text-xs text-muted-foreground">{l.weight} · £{l.price.toFixed(2)}</div>
                    </div>
                    <button onClick={() => remove(l.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-border">
                      <button onClick={() => setQty(l.id, l.qty - 1)} className="flex h-7 w-7 items-center justify-center text-forest hover:bg-forest/5"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-medium">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)} className="flex h-7 w-7 items-center justify-center text-forest hover:bg-forest/5"><Plus className="h-3 w-3" /></button>
                    </div>
                    <div className="text-sm font-semibold text-forest">£{(l.price * l.qty).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {lines.length > 0 && (
          <div className="border-t border-border bg-cream/80 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            {total < 79 && (
              <div className="rounded-lg bg-gold/15 px-3 py-2 text-xs text-forest">
                Add £{(79 - total).toFixed(2)} more for <strong>FREE shipping</strong>
              </div>
            )}
            {total >= 25 && total < 79 && (
              <div className="rounded-lg bg-forest/10 px-3 py-2 text-xs text-forest">
                🎉 You qualify for <strong>5% off</strong> orders over £25
              </div>
            )}
            <button
              onClick={checkout}
              className="w-full rounded-full bg-forest py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep"
            >
              Checkout via WhatsApp
            </button>
            <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-destructive">Clear basket</button>
          </div>
        )}
      </aside>
    </>
  );
}
