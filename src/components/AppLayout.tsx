import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

type NavItem = {
  label: string;
  to: string;
};

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
];

export function AppLayout({ children = null, className = '' }: AppLayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={cn('min-h-screen bg-white text-[#17191C]', className)}>
      <header className="sticky top-0 z-50 border-b border-[#D7DCE2] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[#17191C] text-xs font-semibold uppercase tracking-[0.3em]">
              SS
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-['Playfair_Display'] text-xl tracking-tight">SurSangeet</span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#5E6670]">Curated instruments</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'text-xs font-semibold uppercase tracking-[0.28em] transition-colors hover:text-[#D32F2F]',
                    isActive ? 'text-[#D32F2F]' : 'text-[#5E6670]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 border border-[#D32F2F] bg-[#D32F2F] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#B71C1C] sm:inline-flex"
            >
              Enquire
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#D7DCE2] text-[#17191C] transition-colors hover:border-[#17191C] lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </Dialog.Trigger>

              <AnimatePresence>
                {mobileOpen ? (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/40"
                      />
                    </Dialog.Overlay>
                    <Dialog.Content asChild>
                      <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-2xl outline-none"
                      >
                        <div className="flex items-center justify-between border-b border-[#D7DCE2] px-5 py-4">
                          <div>
                            <p className="font-['Playfair_Display'] text-2xl">SurSangeet</p>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-[#5E6670]">Menu</p>
                          </div>
                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DCE2] text-[#17191C]"
                              aria-label="Close navigation"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </Dialog.Close>
                        </div>

                        <div className="flex-1 px-5 py-8">
                          <nav className="space-y-4">
                            {navItems.map((item) => (
                              <Dialog.Close asChild key={item.to}>
                                <NavLink
                                  to={item.to}
                                  className={({ isActive }) =>
                                    cn(
                                      'flex items-center justify-between border-b border-[#D7DCE2] py-4 text-sm font-semibold uppercase tracking-[0.28em] transition-colors',
                                      isActive ? 'text-[#D32F2F]' : 'text-[#17191C]'
                                    )
                                  }
                                >
                                  {item.label}
                                  <ArrowRight className="h-4 w-4" />
                                </NavLink>
                              </Dialog.Close>
                            ))}
                          </nav>

                          <div className="mt-10 space-y-4 border-t border-[#D7DCE2] pt-6">
                            <a href="mailto:hello@sursangeet.com" className="flex items-center gap-3 text-sm text-[#5E6670]">
                              <Mail className="h-4 w-4 text-[#D32F2F]" />
                              hello@sursangeet.com
                            </a>
                            <a href="tel:+910000000000" className="flex items-center gap-3 text-sm text-[#5E6670]">
                              <Phone className="h-4 w-4 text-[#D32F2F]" />
                              +91 00000 00000
                            </a>
                            <div className="flex items-start gap-3 text-sm text-[#5E6670]">
                              <MapPin className="mt-0.5 h-4 w-4 text-[#D32F2F]" />
                              <span>New Delhi, India</span>
                            </div>
                          </div>
                        </div>
                      </motion.aside>
                    </Dialog.Content>
                  </Dialog.Portal>
                ) : null}
              </AnimatePresence>
            </Dialog.Root>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-[#D7DCE2] bg-[#F5F5F5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <p className="font-['Playfair_Display'] text-3xl tracking-tight">SurSangeet</p>
            <p className="max-w-md text-sm leading-7 text-[#5E6670]">
              A refined showcase of instruments shaped by craft, resonance, and editorial restraint.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#17191C]">Navigate</p>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm text-[#5E6670] transition-colors hover:text-[#D32F2F]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#17191C]">Connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center border border-[#D7DCE2] text-[#17191C] transition-colors hover:border-[#D32F2F] hover:text-[#D32F2F]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <div className="pt-2 text-sm text-[#5E6670]">
              <a href="mailto:hello@sursangeet.com" className="block transition-colors hover:text-[#D32F2F]">
                hello@sursangeet.com
              </a>
              <a href="tel:+910000000000" className="block transition-colors hover:text-[#D32F2F]">
                +91 00000 00000
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D7DCE2]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs uppercase tracking-[0.28em] text-[#5E6670] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <span>© {year} SurSangeet</span>
            <span className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#D32F2F]" />
              Crafted for editorial browsing
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;