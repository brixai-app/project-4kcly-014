import React, { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, ChevronRight, Home, BookOpen, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/data/mockData';

export function AppLayout({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = useMemo(
    () => [
      { to: '/', label: 'Home', icon: Home },
      { to: '/catalog', label: 'Catalog', icon: BookOpen },
      { to: '/about', label: 'About', icon: User },
      { to: '/contact', label: 'Contact', icon: Mail },
    ],
    []
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className={cn('min-h-screen bg-white text-[#17191C]', className)}>
      <header className="sticky top-0 z-40 border-b border-[#D6DADE]/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[#D6DADE] bg-[#F5F5F5] text-xs font-semibold uppercase tracking-[0.3em] text-[#D32F2F]">
              SS
            </span>
            <div className="leading-none">
              <div className="font-['Playfair_Display'] text-xl tracking-tight">SurSangeet</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#5E6670]">Instrument Showcase</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors',
                      isActive ? 'text-[#D32F2F]' : 'text-[#5E6670] hover:text-[#17191C]'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/catalog"
              className="hidden items-center gap-2 border border-[#D6DADE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#17191C] transition-colors hover:border-[#D32F2F] hover:text-[#D32F2F] sm:inline-flex"
            >
              <Search className="h-4 w-4" />
              Explore
            </Link>
            <Link
              to="/contact"
              className="hidden items-center gap-2 bg-[#D32F2F] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#B71C1C] sm:inline-flex"
            >
              Inquiry
              <ChevronRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-[#D6DADE] text-[#17191C] transition-colors hover:border-[#D32F2F] hover:text-[#D32F2F] lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-[#D6DADE] bg-[#F5F5F5]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="font-['Playfair_Display'] text-2xl tracking-tight">SurSangeet</div>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#5E6670]">
              A refined editorial showcase for instruments, stories, and guided inquiries across strings, percussion, wind, keyboard, and electronic forms.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#17191C]">Categories</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories?.slice?.(0, 6)?.map((category) => (
                <span key={category} className="border border-[#D6DADE] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#17191C]">Contact</div>
            <div className="mt-4 space-y-2 text-sm text-[#5E6670]">
              <p>Curated instrument guidance</p>
              <p>Responsive inquiries and availability updates</p>
              <p>Editorial storytelling for every collection</p>
            </div>
          </div>
        </div>
      </footer>

      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#17191C]/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-[88vw] max-w-sm border-l border-[#D6DADE] bg-white p-6 shadow-2xl outline-none">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-['Playfair_Display'] text-2xl tracking-tight">Menu</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#5E6670]">Navigate SurSangeet</div>
              </div>
              <Dialog.Close asChild>
                <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-[#D6DADE] text-[#17191C]">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <nav className="mt-10 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center justify-between border-b border-[#D6DADE] py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#17191C]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-[#D32F2F]" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#5E6670]" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-10 border-t border-[#D6DADE] pt-6">
              <Link
                to="/catalog"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#D32F2F] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white"
              >
                <Search className="h-4 w-4" />
                Explore Collection
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default AppLayout;