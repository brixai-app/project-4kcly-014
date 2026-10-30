import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X, ChevronDown, ShoppingBag, Search, Home, Store, Users, Mail } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { categories, navigation } from "@/data/mockData";
import type { InstrumentCategory } from "@/types";

type HeaderProps = { className?: string };

const categoryIcons: Record<InstrumentCategory, typeof Store> = {
  Strings: Store,
  Percussion: Users,
  Wind: Search,
  Keyboard: Home,
};

export function Header({ className = "" }: HeaderProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => navigation ?? [
      { label: "Home", href: "/" },
      { label: "Catalog", href: "/catalog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const isActive = (href: string) => (href === "/" ? location.pathname === "/" : location.pathname.startsWith(href));

  return (
    <header className={cn("sticky top-0 z-50 border-b border-[#CAD5D7] bg-white/90 backdrop-blur-xl", className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="min-w-0 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E63946] text-sm font-semibold text-black shadow-[0_10px_30px_rgba(230,57,70,0.22)]">
              SS
            </div>
            <div className="min-w-0">
              <div className="truncate font-['Outfit'] text-lg font-semibold uppercase tracking-[0.22em] text-black">
                SurSangeet
              </div>
              <div className="truncate text-[11px] uppercase tracking-[0.28em] text-[#526166]">
                Musical instrument showcase
              </div>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors",
                isActive(item.href) ? "bg-[#F7F8F6] text-black" : "text-[#526166] hover:bg-[#F7F8F6] hover:text-black"
              )}
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="inline-flex items-center gap-1 rounded-md border border-[#CAD5D7] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#F7F8F6]">
                Categories <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={10}
                className="z-50 min-w-56 rounded-md border border-[#CAD5D7] bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              >
                {categories.map((category) => {
                  const Icon = categoryIcons[category];
                  return (
                    <DropdownMenu.Item key={category} asChild>
                      <Link
                        to="/catalog"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-black outline-none transition-colors hover:bg-[#F7F8F6] focus:bg-[#F7F8F6]"
                      >
                        <Icon className="h-4 w-4 text-[#E63946]" />
                        <span className="min-w-0 truncate">{category}</span>
                      </Link>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-md border border-[#CAD5D7] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#F7F8F6] sm:inline-flex"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CAD5D7] bg-white text-black transition-colors hover:bg-[#F7F8F6] lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-[min(92vw,22rem)] border-l border-[#CAD5D7] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] focus:outline-none">
            <div className="flex items-center justify-between border-b border-[#CAD5D7] px-4 py-4">
              <div className="min-w-0">
                <div className="truncate font-['Outfit'] text-base font-semibold uppercase tracking-[0.22em] text-black">
                  SurSangeet
                </div>
                <div className="truncate text-[11px] uppercase tracking-[0.28em] text-[#526166]">
                  Navigation
                </div>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CAD5D7] text-black transition-colors hover:bg-[#F7F8F6]"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex h-[calc(100%-73px)] flex-col gap-3 overflow-y-auto p-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md border px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition-colors",
                    isActive(item.href)
                      ? "border-[#E63946] bg-[#F7F8F6] text-black"
                      : "border-[#CAD5D7] text-[#526166] hover:bg-[#F7F8F6] hover:text-black"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#526166]">
                  Categories
                </div>
                <div className="flex flex-col gap-2.5">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to="/catalog"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-md border border-[#CAD5D7] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#F7F8F6]"
                    >
                      <span className="min-w-0 truncate">{category}</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] text-[#E63946]" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

export default Header;