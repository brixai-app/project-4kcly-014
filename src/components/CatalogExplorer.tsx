import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, Search, X, RefreshCw } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/ShowcaseContext';
import type { Instrument, InstrumentCategory } from '@/types';

type Props = { className?: string; items?: Instrument[]; loading?: boolean };

const categories: (InstrumentCategory | 'All')[] = ['All', 'Strings', 'Percussion', 'Wind', 'Keyboard', 'Electronic', 'Accessories'];

export function SearchBar({ value = '', onChange = () => {}, onClear = () => {} }: { value?: string; onChange?: (v: string) => void; onClear?: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-[18px] border border-[#D8D4CC] bg-white px-4 py-3 shadow-sm">
      <Search className="h-4 w-4 shrink-0 text-[#5F6368]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search instruments"
        className="min-w-0 flex-1 bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#5F6368]"
      />
      {value ? (
        <button type="button" onClick={onClear} className="text-[#5F6368] transition hover:text-[#1A1A1A]">
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

export function FilterDropdown({
  category = 'All',
  onSelect = () => {},
  inStockOnly = false,
  onToggleStock = () => {},
}: {
  category?: InstrumentCategory | 'All';
  onSelect?: (c: InstrumentCategory | 'All') => void;
  inStockOnly?: boolean;
  onToggleStock?: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className="inline-flex items-center gap-2 rounded-[18px] border border-[#D8D4CC] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] shadow-sm">
          <Filter className="h-4 w-4" />
          <span className="max-w-[10rem] truncate">{category}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 min-w-56 rounded-[18px] border border-[#D8D4CC] bg-white p-2 shadow-xl">
          {categories.map((c) => (
            <DropdownMenu.Item
              key={c}
              onSelect={() => onSelect(c)}
              className={cn('cursor-pointer rounded-md px-3 py-2 text-sm outline-none transition hover:bg-[#F4F1EB]', category === c && 'bg-[#F4F1EB]')}
            >
              {c}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className="my-2 h-px bg-[#D8D4CC]" />
          <DropdownMenu.Item onSelect={onToggleStock} className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none transition hover:bg-[#F4F1EB]">
            {inStockOnly ? 'Show all instruments' : 'In-stock only'}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function MasonryGrid({ items = [], onSelect = () => {}, onQuickAdd = () => {} }: { items?: Instrument[]; onSelect?: (item: Instrument) => void; onQuickAdd?: (item: Instrument) => void }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
      <AnimatePresence>
        {items.map((item) => (
          <motion.article
            key={item.id}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.35 }}
            className="group mb-5 break-inside-avoid overflow-hidden rounded-[18px] border border-[#D8D4CC] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <button type="button" onClick={() => onSelect(item)} className="block w-full text-left">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1EB]">
                <img
                  src={item.image}
                  alt={item.name}
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">{item.category}</p>
                  <h3 className="mt-1 text-lg font-medium text-white">{item.name}</h3>
                </div>
              </div>
            </button>
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1A1A1A]">₹{item.price.toLocaleString('en-IN')}</p>
                <p className="mt-1 line-clamp-2 text-sm text-[#5F6368]">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => onQuickAdd(item)}
                className="shrink-0 rounded-md border border-[#1A1A1A] px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#1A1A1A] opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-[#1A1A1A] hover:text-white"
              >
                Quick Add
              </button>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function CatalogExplorer({ className = '', items = [], loading = false }: Props) {
  const showcase = useShowcase?.() ?? {};
  const filters = showcase?.filters ?? { search: '', category: 'All', inStockOnly: false };
  const setSearch = showcase?.setSearch ?? (() => {});
  const setCategory = showcase?.setCategory ?? (() => {});
  const setInStockOnly = showcase?.setInStockOnly ?? (() => {});
  const setActiveInstrumentId = showcase?.setActiveInstrumentId ?? (() => {});
  const addToInquiry = showcase?.addToInquiry ?? (() => {});
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLocalLoading(false), 650);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = filters.search?.trim().toLowerCase() ?? '';
    return items.filter((item) => {
      const matchesSearch = !q || [item.name, item.category, item.description, ...(item.tags ?? [])].join(' ').toLowerCase().includes(q);
      const matchesCategory = filters.category === 'All' || item.category === filters.category;
      const matchesStock = !filters.inStockOnly || item.inStock !== false;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [filters.category, filters.inStockOnly, filters.search, items]);

  const busy = loading || localLoading;

  return (
    <section className={cn('w-full', className)}>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="min-w-0 text-2xl font-light tracking-tight text-[#1A1A1A]">Catalog Explorer</h2>
          <p className="text-sm text-[#5F6368]">{filtered.length.toLocaleString('en-IN')} instruments curated for the current rhythm.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchBar value={filters.search ?? ''} onChange={setSearch} onClear={() => setSearch('')} />
          <FilterDropdown category={filters.category ?? 'All'} onSelect={setCategory} inStockOnly={!!filters.inStockOnly} onToggleStock={() => setInStockOnly(!filters.inStockOnly)} />
          <button type="button" onClick={() => { setSearch(''); setCategory('All'); setInStockOnly(false); }} className="inline-flex items-center gap-2 rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] transition hover:bg-white">
            <RefreshCw className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {busy ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[420px] animate-pulse rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB]" />
          ))}
        </div>
      ) : filtered.length ? (
        <MasonryGrid items={filtered} onSelect={(item) => setActiveInstrumentId(item.id)} onQuickAdd={(item) => addToInquiry(item.id)} />
      ) : (
        <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-8 text-center">
          <p className="text-lg font-medium text-[#1A1A1A]">No instruments match your filters.</p>
          <p className="mt-2 text-sm text-[#5F6368]">Try a broader search or clear the current category selection.</p>
        </div>
      )}
    </section>
  );
}

export default CatalogExplorer;