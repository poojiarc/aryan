import type { Product } from "@/lib/products";

const palette: Record<string, [string, string, string]> = {
  "veg-pickles": ["#1f5132", "#d4a437", "🥭"],
  "non-veg-pickles": ["#7a2418", "#d4a437", "🍗"],
  snacks: ["#a35a1c", "#f0c971", "🥨"],
  sweets: ["#c47028", "#fde7b1", "🍬"],
  powders: ["#8b1d1d", "#f3b35a", "🌶️"],
  masalas: ["#5a2a14", "#e3a857", "🧂"],
  ghee: ["#b48227", "#fce7a8", "🧈"],
};

export function ProductImage({ product }: { product: Product }) {
  const [bg, fg, emoji] = palette[product.category] ?? ["#1f5132", "#d4a437", "🍽️"];
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 25%, ${fg}33 0%, transparent 55%), linear-gradient(135deg, ${bg} 0%, ${bg}cc 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="relative text-center text-cream px-3">
        <div className="text-5xl drop-shadow-lg">{emoji}</div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: fg }}>
          Aryan Home
        </div>
      </div>
    </div>
  );
}
