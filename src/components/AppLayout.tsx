import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X, ArrowRight, Mail, Phone, MapPin, Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/ShowcaseContext';
import NavigationDrawer from '@/components/NavigationDrawer';
import RequestInfoDrawer from '@/components/RequestInfoDrawer';

export function AppLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const { navigationState, setNavigationState, setSearch, search } = useShowcase() ?? {};
  const isDrawerOpen = navigationState?.isDrawerOpen ?? false;
  const activeInstrumentId = navigationState?.activeInstrumentId ?? null;

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeDrawer = () => setNavigationState?.({ ...(navigationState ?? {}), isDrawerOpen: false, activeInstrumentId: null });
  const openDrawer = () => setNavigationState?.({ ...(navigationState ?? {}), isDrawerOpen: true });

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <header className="sticky top-0 z-40 border-b border-[#D8D4CC]/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={openDrawer}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#D8D4CC] bg-[#F4F1EB] text-[#1A1A1A] transition hover:border-[#E63946] hover:text-[#E63946] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="min-w-0 flex-1 lg:flex-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1A1A1A] text-white">
                <span className="text-sm font-semibold tracking-[0.25em]">SS</span>
              </div>
              <div className="min-w-0">
                <div className="truncate font-[Outfit,sans-serif] text-lg font-semibold tracking-tight">SurSangeet</div>
                <div className="truncate text-[11px] uppercase tracking-[0.28em] text-[#5F6368]">Musical instrument showcase</div>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition',
                  location.pathname === item.to ? 'bg-[#1A1A1A] text-white' : 'text-[#5F6368] hover:bg-[#F4F1EB] hover:text-[#1A1A1A]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            <div className="hidden max-w-[18rem] flex-1 items-center gap-2 rounded-md border border-[#D8D4CC] bg-[#F4F1EB] px-3 py-2 md:flex">
              <Search className="h-4 w-4 shrink-0 text-[#5F6368]" />
              <input
                value={search ?? ''}
                onChange={(e) => setSearch?.(e.target.value)}
                placeholder="Search instruments"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#5F6368]"
              />
            </div>

            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-[#D8D4CC] bg-white px-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] transition hover:border-[#E63946] hover:text-[#E63946]"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Explore</span>
            </button>

            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[#E63946] px-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#C92D39]"
              aria-label="Open inquiry drawer"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Inquire</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-[#D8D4CC] bg-[#F4F1EB]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div className="font-[Outfit,sans-serif] text-2xl font-light tracking-tight">SurSangeet</div>
            <p className="max-w-md text-sm leading-6 text-[#5F6368]">
              An editorial instrument house shaped by rhythm, materiality, and precise craft.
            </p>
            <div className="flex flex-wrap gap-3 text-[#5F6368]">
              <a href="mailto:hello@sursangeet.com" className="inline-flex items-center gap-2 text-sm transition hover:text-[#E63946]">
                <Mail className="h-4 w-4" /> hello@sursangeet.com
              </a>
              <a href="tel:+911234567890" className="inline-flex items-center gap-2 text-sm transition hover:text-[#E63946]">
                <Phone className="h-4 w-4" /> +91 12345 67890
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">Visit</div>
            <div className="space-y-2 text-sm text-[#1A1A1A]">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <span className="max-w-xs">Studio 12, Rhythm House, New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2 text-[#5F6368]">
                <ArrowRight className="h-4 w-4 text-[#E63946]" />
                <span>Appointments and instrument consultations by request.</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">Follow</div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="/"
                  className="inline-flex items-center gap-2 rounded-md border border-[#D8D4CC] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] transition hover:border-[#E63946] hover:text-[#E63946]"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <NavigationDrawer open={isDrawerOpen} onOpenChange={(open) => setNavigationState?.({ ...(navigationState ?? {}), isDrawerOpen: open })} />
      <RequestInfoDrawer open={Boolean(activeInstrumentId)} onOpenChange={(open) => !open && closeDrawer()} instrumentId={activeInstrumentId ?? undefined} />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default AppLayout;