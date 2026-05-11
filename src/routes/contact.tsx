import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { WHATSAPP_DIRECT } from "@/lib/products";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aryan Home Foods" },
      { name: "description", content: "Reach Aryan Home Foods in Bournemouth — call, email or WhatsApp us for orders, custom requests and bulk enquiries." },
      { property: "og:title", content: "Contact Aryan Home Foods" },
      { property: "og:description", content: "Get in touch for orders & enquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    const text = encodeURIComponent(`Hello Aryan Home Foods!\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`${WHATSAPP_DIRECT}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your message…");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="gradient-forest text-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Talk To Us</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">Get In Touch</h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">We'd love to hear from you — whether it's a custom order or just to say hi.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="reveal space-y-5">
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold text-forest-deep"><Phone className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-semibold text-forest">Phone(Ganesh)</div>
              <a href="tel:+447474140956" className="text-sm text-muted-foreground hover:text-forest">+44 74741 40956</a>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold text-forest-deep"><Mail className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-semibold text-forest">Email</div>
              <a href="mailto:aryanhomemadefoods@gmail.com" className="text-sm text-muted-foreground hover:text-forest break-all">aryanhomemadefoods@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold text-forest-deep"><MapPin className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-semibold text-forest">Address</div>
              <p className="text-sm text-muted-foreground">Bournemouth, United Kingdom</p>
              <p className="mt-2 text-xs text-forest font-semibold">Collection points:</p>
              <p className="text-xs text-muted-foreground">London · Cambridge · Bournemouth · Coventry</p>
            </div>
          </div>
          <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition">
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>

        <form onSubmit={submit} className="reveal reveal-delay-1 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-5">
          <h2 className="font-display text-2xl text-forest">Send a Message</h2>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-forest/80">Your Name</label>
            <input
              type="text" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-forest/80">Phone Number</label>
            <input
              type="tel" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
              placeholder="+44 7…"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-forest/80">Message</label>
            <textarea
              rows={5} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
              placeholder="Tell us what you're looking for…"
            />
          </div>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3.5 text-sm font-semibold text-cream hover:bg-forest-deep transition">
            <Send className="h-4 w-4" /> Send Message
          </button>
        </form>
      </section>
    </>
  );
}
