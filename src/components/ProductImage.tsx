import type { Product } from "@/lib/products";

const palette: Record<string, [string, string, string]> = {
  "veg-pickles": ["#1f5132", "#d4a437", "🥭"],
  "non-veg-pickles": ["#7a2418", "#d4a437", "🍗"],
  snacks: ["#a35a1c", "#f0c971", "🥨"],
  sweets: ["#c47028", "#fde7b1", "🍬"],
  powders: ["#8b1d1d", "#f3b35a", "🌶️"],
  masalas: ["#5a2a14", "#e3a857", "🧂"],
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
      
      {product.image ? (
        <img 
          src={`/products/${product.image}`} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).style.display = 'none';
            const fallback = (e.target as HTMLImageElement).nextElementSibling;
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
      ) : null}

      <div className={`relative text-center text-cream px-3 ${product.image ? 'hidden' : ''}`}>
        <div className="text-5xl drop-shadow-lg">{emoji}</div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: fg }}>
          Aryan Home
        </div>
      </div>
    </div>
  );
}

