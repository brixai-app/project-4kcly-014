import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Home, BookOpen, Phone, Info, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavBarProps {
  className?: string;
}

const navItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Catalog', to: '/catalog', icon: BookOpen },
  { label: 'About', to: '/about', icon: Info },
  { label: 'Contact', to: '/contact', icon: Phone },
];

export function NavBar({ className = '' }: NavBarProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY ?? 0) > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const activePath = useMemo(() => location.pathname ?? '/', [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-[#D8DEE5] bg-white/90 backdrop-blur-md transition-shadow',
        scrolled ? 'shadow-[0_10px_30px_rgba(34,34,34,0.08)]' : 'shadow-none',
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[18px] bg-[#E63946] text-black shadow-[0_10px_24px_rgba(230,57,70,0.22)]">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-['Outfit'] text-lg font-semibold tracking-tight text-[#222222]">
              SurSangeet
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.28em] text-[#5E6670]">
              Musical Instruments
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePath === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
                  active
                    ? 'border-[#E63946] bg-[#E63946] text-black'
                    : 'border-transparent text-[#5E6670] hover:border-[#D8DEE5] hover:bg-[#F7F5F2] hover:text-[#222222]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D8DEE5] bg-white text-[#222222] transition-colors hover:bg-[#F7F5F2]"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D8DEE5] bg-white text-[#222222] transition-colors hover:bg-[#F7F5F2] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden border-t border-[#D8DEE5] bg-white md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex min-w-0 items-center gap-3 rounded-md border px-3 py-3 text-sm font-semibold transition-colors',
                      active
                        ? 'border-[#E63946] bg-[#E63946] text-black'
                        : 'border-[#D8DEE5] bg-[#F7F5F2] text-[#222222] hover:bg-white'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;