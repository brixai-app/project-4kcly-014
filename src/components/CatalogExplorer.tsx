import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, Search } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { instruments, categories } from '@/data/mockData';
import type { Instrument, InstrumentCategory } from '@/types';

export interface CatalogExplorerProps {
  className?: string;
}

function InstrumentCard({ instrument }: { instrument: Instrument }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[18px] border border-[#457B9D]/40 bg-[#25282B] shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={instrument.image}
          alt={instrument.name}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F1FAEE]">
          <span className={cn('h-2 w-2 rounded-full', instrument.accent === 'red' && 'bg-[#E63946]', instrument.accent === 'green' && 'bg-[#2A9D8F]', instrument.accent === 'blue' && 'bg-[#457B9D]')} />
          <span>{instrument.category}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="space-y-1">
            <h3 className="min-w-0 truncate text-lg font-semibold text-[#F1FAEE]">{instrument.name}</h3>
            <p className="line-clamp-2 text-sm leading-6 text-[#A8DADC]">{instrument.description}</p>
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A8DADC]">Collection</p>
              <p className="truncate text-sm font-semibold text-[#F1FAEE]">{instrument.tags?.[0] ?? instrument.category}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A8DADC]">From</p>
              <p className="text-lg font-semibold text-[#F1FAEE]">{instrument.price ?? 'Enquire'}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute bottom-4 left-4 right-4 translate-y-3 rounded-md border border-[#E63946] bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick View
        </button>
      </div>
    </motion.article>
  );
}

export function CatalogExplorer({ className = '' }: CatalogExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<InstrumentCategory | 'All'>('All');
  const filtered = useMemo(
    () => instruments.filter((item) => activeCategory === 'All' || item.category === activeCategory),
    [activeCategory]
  );

  const featured = filtered.filter((item) => item.featured);
  const rest = filtered.filter((item) => !item.featured);

  return (
    <section className={cn('px-4 py-10 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A8DADC]">Catalog Explorer</p>
            <h2 className="mt-2 text-3xl font-light tracking-tight text-[#F1FAEE] sm:text-4xl">Asymmetric instrument field</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#A8DADC]">
              Browse a curated selection of instruments arranged in a rhythmic masonry composition with category filtering and editorial pacing.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-between gap-3 rounded-md border border-[#457B9D]/60 bg-[#25282B] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#F1FAEE]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={10}
                  className="z-50 min-w-56 rounded-[18px] border border-[#457B9D]/50 bg-[#1D1D1D] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                >
                  <DropdownMenu.Item
                    onSelect={() => setActiveCategory('All')}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#F1FAEE] outline-none transition-colors hover:bg-white/5"
                  >
                    All Categories
                  </DropdownMenu.Item>
                  {categories.map((category) => (
                    <DropdownMenu.Item
                      key={category}
                      onSelect={() => setActiveCategory(category)}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#F1FAEE] outline-none transition-colors hover:bg-white/5"
                    >
                      {category}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <div className="flex items-center gap-2 rounded-md border border-[#457B9D]/50 bg-[#25282B] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A8DADC]">
              <Search className="h-4 w-4" />
              <span>{filtered.length} instruments</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'min-w-0 rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors',
                  active
                    ? 'border-[#E63946] bg-[#E63946] text-black'
                    : 'border-[#457B9D]/50 bg-[#25282B] text-[#F1FAEE] hover:border-[#E63946] hover:text-[#E63946]'
                )}
              >
                <span className="block truncate">{category}</span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[18px] border border-[#457B9D]/40 bg-[#25282B] p-8 text-center">
            <p className="text-lg font-semibold text-[#F1FAEE]">No instruments match this selection.</p>
            <p className="mt-2 text-sm text-[#A8DADC]">Try another category to continue exploring the collection.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
            <div className="space-y-5 xl:col-span-7">
              {featured.slice(0, 2).map((instrument) => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
            <div className="space-y-5 xl:col-span-5">
              {rest.slice(0, 3).map((instrument) => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CatalogExplorer;