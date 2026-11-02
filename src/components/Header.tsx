import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, ChevronDown, Home, BookOpen, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type HeaderProps = {
  className?: string;
  onContactClick?: () => void;
};

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function Header({ className = '', onContactClick = () => undefined }: HeaderProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Home', to: '/', icon: Home },
      { label: 'Catalog', to: '/catalog', icon: BookOpen },
      { label: 'About', to: '/about', icon: User },
      { label: 'Contact', to: '/contact', icon: Mail },
    ],
    []
  );

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={cn('sticky top-0 z-50 border-b border-[#C9C3A8] bg-[#F4F1DE]/95 backdrop-blur-xl', className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMobile} className="group flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] text-[#E63946] shadow-sm">
            <span className="text-lg font-semibold tracking-tight">S</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-['Outfit'] text-lg font-semibold tracking-tight text-[#1D3557]">
              SurSangeet
            </span>
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-[#596579]">
              Instrument showcase
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'relative flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
                  active ? 'text-[#1D3557]' : 'text-[#596579] hover:text-[#1D3557]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {active ? (
                  <motion.span
                    layoutId="header-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#E63946]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-md border border-[#C9C3A8] bg-[#FFFDF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1D3557] transition hover:border-[#E63946] hover:text-[#E63946] sm:flex"
            onClick={onContactClick}
          >
            <Mail className="h-4 w-4" />
            Contact
          </button>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-md border border-[#C9C3A8] bg-[#FFFDF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1D3557] transition hover:border-[#E63946] hover:text-[#E63946] md:flex"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-[#C9C3A8] bg-[#FFFDF2] text-[#1D3557] transition hover:border-[#E63946] hover:text-[#E63946] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden border-t border-[#C9C3A8] bg-[#FFFDF2] lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobile}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm font-semibold transition',
                      active
                        ? 'border-[#E63946] bg-[#F4F1DE] text-[#1D3557]'
                        : 'border-[#C9C3A8] bg-white text-[#1D3557] hover:border-[#E63946]'
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="min-w-0 truncate">{item.label}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  onContactClick();
                }}
                className="mt-1 flex items-center justify-between gap-3 rounded-md border border-[#E63946] bg-[#E63946] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#C92535]"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Header;