import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingCart, User, Phone, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ProductImage } from "./ProductImage";
import { WHATSAPP_DIRECT } from "@/lib/products";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{10,16}$/, "Enter a valid phone number"),
  address: z.string().trim().min(10, "Enter your delivery address").max(240, "Address is too long"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;
type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, total, clear, count } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const itemCount = useMemo(() => count, [count]);

  const validateField = (field: keyof CheckoutValues, value: string) => {
    const result = checkoutSchema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const checkout = () => {
    if (lines.length === 0) return;
    const parsed = checkoutSchema.safeParse({ name, phone, address });
    if (!parsed.success) {
      const next: CheckoutErrors = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as keyof CheckoutValues;
        if (!next[f]) next[f] = issue.message;
      }
      setErrors(next);
      toast.error("Please complete your delivery details.");
      return;
    }
    const v = parsed.data;
    const itemLines = lines.map(
      (l, i) => `${i + 1}. ${l.product.name} (${l.weight}) × ${l.qty} = £${(l.price * l.qty).toFixed(2)}`,
    );
    const msg =
      `*New Order — Aryan Home Foods*\n\n` +
      `*Customer Details*\n` +
      `👤 Name: ${v.name}\n` +
      `📞 Phone: ${v.phone}\n` +
      `📍 Address: ${v.address}\n\n` +
      `*Order*\n` +
      itemLines.join("\n") +
      `\n\n*Total: £${total.toFixed(2)}*\n\nPlease confirm availability and delivery.`;
    window.open(`${WHATSAPP_DIRECT}?text=${encodeURIComponent(msg)}`, "_blank");
    clear();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-forest-deep/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-cream shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-forest text-cream">
                  <ShoppingCart className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg text-forest leading-tight">Your Basket</h2>
                  <p className="text-xs text-muted-foreground">
                    {lines.length === 0 ? "Empty for now" : `${itemCount} item${itemCount > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-forest/10 transition"
              >
                <X className="h-5 w-5 text-forest" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-forest text-cream">
                    <ShoppingCart className="h-9 w-9" />
                  </div>
                  <p className="font-display text-xl text-forest">Your basket is empty</p>
                  <p className="text-sm text-muted-foreground">Add some homemade goodness to get started.</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-3 px-5 py-4">
                    {lines.map((l) => (
                      <div key={l.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <ProductImage product={l.product} />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-sm font-semibold text-forest leading-tight">{l.product.name}</div>
                              <div className="text-xs text-muted-foreground">{l.weight}</div>
                            </div>
                            <button
                              onClick={() => remove(l.id)}
                              aria-label="Remove"
                              className="text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-border bg-background">
                              <button
                                onClick={() => setQty(l.id, l.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center text-forest hover:bg-forest/5"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{l.qty}</span>
                              <button
                                onClick={() => setQty(l.id, l.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center text-forest hover:bg-forest/5"
                                aria-label="Increase"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-sm font-semibold text-forest">£{(l.price * l.qty).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border bg-cream/70 px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-base text-forest">Delivery details</h3>
                        <p className="text-xs text-muted-foreground">These details will be included in your WhatsApp order.</p>
                      </div>
                      <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-semibold text-forest">
                        {itemCount} item{itemCount > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <label className="block">
                        <span className="text-xs font-medium text-forest">Full name</span>
                        <div className="relative mt-1">
                          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) validateField("name", e.target.value);
                            }}
                            onBlur={(e) => validateField("name", e.target.value)}
                            placeholder="Your full name"
                            maxLength={80}
                            className="h-11 rounded-xl pl-9"
                            aria-invalid={Boolean(errors.name)}
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-[11px] text-destructive">{errors.name}</p>}
                      </label>

                      <label className="block">
                        <span className="text-xs font-medium text-forest">Phone number</span>
                        <div className="relative mt-1">
                          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            value={phone}
                            onChange={(e) => {
                              const next = e.target.value.replace(/[^0-9+()\-\s]/g, "");
                              setPhone(next);
                              if (errors.phone) validateField("phone", next);
                            }}
                            onBlur={(e) => validateField("phone", e.target.value)}
                            placeholder="Phone number"
                            maxLength={16}
                            className="h-11 rounded-xl pl-9"
                            aria-invalid={Boolean(errors.phone)}
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-[11px] text-destructive">{errors.phone}</p>}
                      </label>

                      <label className="block">
                        <span className="text-xs font-medium text-forest">Delivery address</span>
                        <div className="relative mt-1">
                          <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                              if (errors.address) validateField("address", e.target.value);
                            }}
                            onBlur={(e) => validateField("address", e.target.value)}
                            placeholder="House / street / area / postcode"
                            rows={3}
                            maxLength={240}
                            className="min-h-[88px] resize-none rounded-xl pl-9"
                            aria-invalid={Boolean(errors.address)}
                          />
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          {errors.address ? (
                            <p className="text-[11px] text-destructive">{errors.address}</p>
                          ) : (
                            <p className="text-[11px] text-muted-foreground">Add a complete address for faster confirmation.</p>
                          )}
                          <p className="text-[11px] text-muted-foreground">{address.length}/240</p>
                        </div>
                      </label>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="font-display text-2xl font-bold text-forest">£{total.toFixed(2)}</span>
                    </div>
                    {total < 79 && (
                      <div className="mt-2 rounded-lg bg-gold/15 px-3 py-2 text-xs text-forest">
                        Add £{(79 - total).toFixed(2)} more for <strong>FREE shipping</strong>
                      </div>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Your details & order are sent directly via WhatsApp for confirmation.
                    </p>
                    <button
                      onClick={checkout}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] active:scale-95"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Checkout via WhatsApp
                    </button>
                    <button
                      onClick={clear}
                      className="mt-1 w-full py-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Clear basket
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
