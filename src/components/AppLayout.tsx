import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronDown, Home, Search, Settings, User, Mail, Phone, MapPin, Globe2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { categories } from '@/data/mockData';

type AppLayoutProps = {
  className?: string;
};

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/catalog', label: 'Catalog', icon: Search },
  { to: '/about', label: 'About', icon: Globe2 },
  { to: '/contact', label: 'Contact', icon: Mail },
];

export function AppLayout({ className = '' }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setCategoryOpen(false);
  }, [location.pathname]);

  const categoryLinks = useMemo(
    () =>
      (categories ?? []).map((category) => ({
        label: category,
        to: `/catalog?category=${encodeURIComponent(category)}`,
      })),
    []
  );

  return (
    <div className={cn('min-h-screen bg-white text-[#18222C]', className)}>
      <header className="sticky top-0 z-50 border-b border-[#D7DDE3]/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DDE3] text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F] lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
                <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[88vw] max-w-sm border-r border-[#D7DDE3] bg-white p-5 shadow-2xl outline-none">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="text-lg font-semibold tracking-[0.2em] text-[#18222C]">
                      SURSANGEET
                    </Link>
                    <Dialog.Close asChild>
                      <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DDE3]">
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <nav className="mt-8 space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center justify-between border-b border-[#D7DDE3] py-3 text-sm font-semibold uppercase tracking-[0.2em] transition',
                              isActive ? 'text-[#D32F2F]' : 'text-[#18222C]'
                            )
                          }
                        >
                          <span>{item.label}</span>
                          <Icon className="h-4 w-4" />
                        </NavLink>
                      );
                    })}
                  </nav>
                  <div className="mt-8 border-t border-[#D7DDE3] pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5F6B76]">Categories</p>
                    <div className="mt-3 grid gap-2">
                      {categoryLinks.map((item) => (
                        <Link key={item.label} to={item.to} className="text-sm text-[#18222C] transition hover:text-[#D32F2F]">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <Link to="/" className="text-lg font-semibold tracking-[0.28em] text-[#18222C]">
              SURSANGEET
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition',
                    isActive ? 'text-[#D32F2F]' : 'text-[#18222C] hover:text-[#D32F2F]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryOpen((v) => !v)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#18222C] transition hover:text-[#D32F2F]"
                aria-expanded={categoryOpen}
                aria-haspopup="menu"
              >
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {categoryOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-56 border border-[#D7DDE3] bg-white p-2 shadow-lg"
                  >
                    {categoryLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block px-3 py-2 text-sm text-[#18222C] transition hover:bg-[#F5F5F5] hover:text-[#D32F2F]"
                        onClick={() => setCategoryOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden items-center gap-2 border border-[#D7DDE3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F] sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              Contact
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DDE3] text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              aria-label="Open settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DDE3] text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              aria-label="Open account"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DDE3] text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              aria-label="Open saved items"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-[#D7DDE3] bg-[#F5F5F5]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#18222C]">SurSangeet</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5F6B76]">
              A tactile catalog of instruments shaped by craft, resonance, and balanced editorial calm.
            </p>
          </div>
          <div className="grid gap-2 text-sm text-[#18222C]">
            <Link to="/catalog" className="transition hover:text-[#D32F2F]">
              Browse catalog
            </Link>
            <Link to="/about" className="transition hover:text-[#D32F2F]">
              Our story
            </Link>
            <Link to="/contact" className="transition hover:text-[#D32F2F]">
              Contact
            </Link>
          </div>
          <div className="grid gap-2 text-sm text-[#5F6B76]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Studio showroom, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>hello@sursangeet.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;