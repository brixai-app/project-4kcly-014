import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HeaderProps } from '@/types';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Instruments', to: '/instruments' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const categories = ['String', 'Percussion', 'Wind', 'Keyboard', 'Electronic', 'Folk'];

export function Header({ className = '', onOpenContact, onOpenAudio }: HeaderProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search ?? '');
    return params.get('category') ?? '';
  }, [location.search]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setCategoryOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCategoryOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCategoryOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn('sticky top-0 z-50 border-b border-[#D7DFDD] bg-white/95 backdrop-blur-sm', className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DFDD] text-[#142D35] transition-colors hover:bg-[#F9FAFB] lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="min-w-0">
            <span className="block truncate font-sans text-lg font-semibold uppercase tracking-[0.28em] text-[#142D35]">
              SurSangeet
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
                  active ? 'text-[#E63946]' : 'text-[#5E6E73] hover:text-[#142D35]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setCategoryOpen((v) => !v)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setCategoryOpen(true);
                }
              }}
              className="inline-flex h-10 items-center gap-2 border border-[#D7DFDD] px-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#142D35] transition-colors hover:bg-[#F9FAFB]"
              aria-haspopup="menu"
              aria-expanded={categoryOpen}
              aria-label="Browse categories"
            >
              <span className="hidden sm:inline">Categories</span>
              <span className="sm:hidden">Cat</span>
              <ChevronDown className={cn('h-4 w-4 transition-transform', categoryOpen && 'rotate-180')} />
            </button>

            {categoryOpen && (
              <div
                role="menu"
                aria-label="Instrument categories"
                className="absolute right-0 mt-2 w-56 border border-[#D7DFDD] bg-white p-2 shadow-[0_18px_40px_rgba(20,45,53,0.12)]"
              >
                <div className="flex flex-col gap-1.5">
                  {categories.map((category) => {
                    const selected = activeCategory === category;
                    return (
                      <Link
                        key={category}
                        role="menuitem"
                        to={`/instruments?category=${encodeURIComponent(category)}`}
                        onClick={() => setCategoryOpen(false)}
                        className={cn(
                          'min-w-0 truncate border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.2em] transition-colors',
                          selected
                            ? 'border-[#E63946] bg-[#E63946] text-black'
                            : 'border-[#D7DFDD] text-[#142D35] hover:border-[#E63946] hover:text-[#E63946]'
                        )}
                      >
                        {category}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenAudio?.()}
            className="hidden h-10 border border-[#D7DFDD] px-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#142D35] transition-colors hover:bg-[#F9FAFB] sm:inline-flex"
          >
            Listen
          </button>

          <button
            type="button"
            onClick={() => onOpenContact?.()}
            className="hidden h-10 border border-[#E63946] bg-[#E63946] px-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#C92E3A] sm:inline-flex"
          >
            Contact
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DFDD] text-[#142D35] transition-colors hover:bg-[#F9FAFB]"
            aria-label="Open listening drawer"
            onClick={() => onOpenAudio?.()}
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#D7DFDD] bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'min-w-0 truncate border px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
                    active
                      ? 'border-[#E63946] bg-[#E63946] text-black'
                      : 'border-[#D7DFDD] text-[#142D35] hover:border-[#E63946] hover:text-[#E63946]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => onOpenAudio?.()}
              className="border border-[#D7DFDD] px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#142D35]"
            >
              Listen
            </button>
            <button
              type="button"
              onClick={() => onOpenContact?.()}
              className="border border-[#E63946] bg-[#E63946] px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.22em] text-black"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;