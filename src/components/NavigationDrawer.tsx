import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Store, BookOpen, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/ShowcaseContext';

export function NavigationDrawer({ className = '' }: { className?: string }) {
  const location = useLocation();
  const { navigation, setNavigation } = useShowcase?.() ?? {};
  const open = navigation?.isDrawerOpen ?? false;
  const closeDrawer = React.useCallback(() => setNavigation?.((prev: any) => ({ ...(prev ?? {}), isDrawerOpen: false })), [setNavigation]);
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/catalog', label: 'Catalog', icon: Store },
    { to: '/about', label: 'About', icon: BookOpen },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];
  const itemClass = (to: string) =>
    cn(
      'group flex items-center justify-between gap-3 rounded-md border border-border bg-white px-4 py-3 text-left transition-colors',
      location.pathname === to ? 'border-[#E63946] bg-[#F4F1EB]' : 'hover:border-[#E63946]/60 hover:bg-[#F4F1EB]'
    );

  return (
    <Dialog.Root open={open} onOpenChange={(next) => setNavigation?.((prev: any) => ({ ...(prev ?? {}), isDrawerOpen: next }))}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                className={cn('fixed right-0 top-0 z-50 h-full w-[min(92vw,420px)] border-l border-border bg-white shadow-2xl', className)}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <div className="min-w-0">
                      <p className="font-[Outfit] text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Navigation</p>
                      <p className="mt-1 truncate font-[Outfit] text-lg font-medium text-foreground">SurSangeet</p>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        onClick={closeDrawer}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-[#E63946] hover:text-[#E63946]"
                        aria-label="Close navigation drawer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <nav className="flex flex-1 flex-col gap-2.5 px-5 py-5">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Dialog.Close asChild key={item.to}>
                          <Link to={item.to} onClick={closeDrawer} className={itemClass(item.to)}>
                            <span className="flex min-w-0 items-center gap-3">
                              <Icon className={cn('h-4 w-4 shrink-0', location.pathname === item.to ? 'text-[#E63946]' : 'text-muted-foreground')} />
                              <span className="min-w-0 truncate font-[Roboto] text-sm font-medium text-foreground">{item.label}</span>
                            </span>
                            <ArrowRight className={cn('h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5', location.pathname === item.to ? 'text-[#E63946]' : 'text-muted-foreground')} />
                          </Link>
                        </Dialog.Close>
                      );
                    })}
                  </nav>
                  <div className="border-t border-border px-5 py-5">
                    <p className="font-[Roboto] text-sm leading-6 text-muted-foreground">
                      Explore instruments, request details, and move through the collection with a focused editorial flow.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default NavigationDrawer;