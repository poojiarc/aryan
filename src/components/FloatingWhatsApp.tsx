import { WHATSAPP_DIRECT } from "@/lib/products";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_DIRECT}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
      aria-label="Order on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Order Now</span>
    </a>
  );
}
