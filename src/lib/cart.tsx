import * as React from "react";
import type { Product, WeightOption } from "./products";
import { toast } from "sonner";

export interface CartLine {
  id: string; // product.id + weight
  product: Product;
  weight: WeightOption;
  qty: number;
  price: number;
}

interface CartCtx {
  lines: CartLine[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, weight: WeightOption) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const Ctx = React.createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [open, setOpen] = React.useState(false);

  const add: CartCtx["add"] = (product, weight) => {
    const price = product.prices[weight];
    if (price == null) return;
    const id = `${product.id}__${weight}`;
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { id, product, weight, qty: 1, price }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const remove: CartCtx["remove"] = (id) =>
    setLines((p) => p.filter((l) => l.id !== id));

  const setQty: CartCtx["setQty"] = (id, qty) =>
    setLines((p) => p.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));

  const clear = () => setLines([]);

  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <Ctx.Provider value={{ lines, open, setOpen, add, remove, setQty, clear, total, count }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCart outside provider");
  return ctx;
}
