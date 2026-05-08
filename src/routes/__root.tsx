import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-forest">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-deep"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-forest">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function DiscountBanner() {
  const content = (
    <span className="flex items-center gap-20">
      <span>🎁 Get <span className="underline decoration-forest-deep/30 decoration-2 underline-offset-2">5% OFF</span> on orders above £25 · Use code <strong className="rounded bg-forest-deep px-2 py-0.5 text-cream shadow-glow">ARYAN5</strong></span>
      <span>🚚 <span className="font-bold">FREE SHIPPING</span> on all orders over £79!</span>
      <span>🍯 Try our new <span className="font-bold text-forest-deep">Pure Buffalo Ghee</span> — Handcrafted with love</span>
    </span>
  );

  return (
    <div className="gradient-gold py-2 overflow-hidden border-b border-forest-deep/10 shadow-sm relative z-[100]">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex shrink-0 items-center justify-around gap-20 px-10 text-xs font-bold text-forest-deep md:text-sm">
          {content}
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <div className="sticky top-0 z-[100] shadow-soft">
            <DiscountBanner />
            <Navbar />
          </div>
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <FloatingWhatsApp />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

