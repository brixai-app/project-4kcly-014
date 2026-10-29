import { useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Phone, ChevronRight, Home, BookOpen, Camera, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationLinks } from '@/data/mockData';
import { useShowcase } from '@/context/ShowcaseContext';

export interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openContactDrawer } = useShowcase?.() ?? { openContactDrawer: () => {} };

  const links = useMemo(
    () =>
      (navigationLinks ?? []).map((link) => ({
        ...link,
        icon:
          link?.label === 'Home' ? Home : link?.label === 'Catalog' ? BookOpen : link?.label === 'About' ? Camera : Mail,
      })),
    []
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-xs uppercase tracking-[0.28em] transition-colors duration-200 min-w-0 truncate',
      isActive ? 'text-[#F1FAEE]' : 'text-[#A8DADC] hover:text-[#F1FAEE]'
    );

  return (
    <header className={cn('sticky top-0 z-50 border-b border-[#457B9D]/40 bg-[#1D1D1D]/92 backdrop-blur-xl', className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-[#457B9D]/60 bg-[#25282B] text-[#E63946] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <span className="text-sm font-semibold tracking-[0.3em]">SS</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-[Outfit] text-lg font-light tracking-[0.28em] text-[#F1FAEE]">
              SurSangeet
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.32em] text-[#A8DADC]">
              Concert-stage showcase
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const Icon = link?.icon ?? Home;
            return (
              <NavLink key={link?.label ?? link?.href ?? crypto.randomUUID()} to={link?.href ?? '/'} className={navLinkClass}>
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{link?.label ?? 'Link'}</span>
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openContactDrawer?.()}
            className="hidden items-center gap-2 border border-[#E63946] bg-[#E63946] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:bg-[#C92F3C] md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            Contact
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#457B9D]/60 bg-[#25282B] text-[#F1FAEE] transition-colors hover:border-[#E63946] hover:text-[#E63946] lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  className="fixed right-0 top-0 z-50 h-full w-[min(92vw,380px)] border-l border-[#457B9D]/40 bg-[#1D1D1D] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                >
                  <div className="flex items-center justify-between border-b border-[#457B9D]/30 px-5 py-4">
                    <div className="min-w-0">
                      <Dialog.Title className="truncate font-[Outfit] text-lg font-light tracking-[0.24em] text-[#F1FAEE]">
                        SurSangeet
                      </Dialog.Title>
                      <Dialog.Description className="truncate text-[10px] uppercase tracking-[0.3em] text-[#A8DADC]">
                        Navigate the showcase
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center border border-[#457B9D]/50 text-[#F1FAEE] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
                        aria-label="Close navigation menu"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="flex h-[calc(100%-73px)] flex-col justify-between px-5 py-5">
                    <div className="flex flex-col gap-2.5">
                      {links.map((link) => {
                        const Icon = link?.icon ?? Home;
                        const active = location?.pathname === (link?.href ?? '/');
                        return (
                          <NavLink
                            key={link?.label ?? link?.href ?? crypto.randomUUID()}
                            to={link?.href ?? '/'}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'flex items-center justify-between border px-4 py-3 text-sm transition-colors',
                              active
                                ? 'border-[#E63946] bg-[#25282B] text-[#F1FAEE]'
                                : 'border-[#457B9D]/30 bg-transparent text-[#A8DADC] hover:border-[#E63946]/60 hover:text-[#F1FAEE]'
                            )}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="min-w-0 truncate">{link?.label ?? 'Link'}</span>
                            </span>
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          </NavLink>
                        );
                      })}
                    </div>

                    <div className="space-y-3 border-t border-[#457B9D]/30 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          openContactDrawer?.();
                        }}
                        className="flex w-full items-center justify-between border border-[#E63946] bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:bg-[#C92F3C]"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Contact
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="text-xs leading-6 text-[#A8DADC]">
                        Explore instruments, editorial stories, and immersive soundscapes.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </header>
  );
}

export default Header;