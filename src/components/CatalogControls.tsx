import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Availability, Category, FilterState } from '@/types';
import { categories as mockCategories } from '@/data/mockData';

type CatalogControlsProps = {
  value?: FilterState;
  onChange?: (next: FilterState) => void;
  className?: string;
};

const availabilityOptions: Array<Availability | 'All'> = ['All', 'available', 'limited', 'sold-out'];
const sortOptions: FilterState['sortBy'][] = ['featured', 'price-asc', 'price-desc', 'name'];

const categoryOptions = ['All', ...(mockCategories ?? [])] as Array<Category | 'All'>;

const defaultValue: FilterState = {
  query: '',
  category: 'All',
  availability: 'All',
  sortBy: 'featured',
};

function CatalogControls({ value = defaultValue, onChange = () => {}, className = '' }: CatalogControlsProps) {
  const [query, setQuery] = useState(value?.query ?? '');
  const [openMenu, setOpenMenu] = useState<'category' | 'availability' | 'sort' | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      onChange({
        query,
        category: value?.category ?? 'All',
        availability: value?.availability ?? 'All',
        sortBy: value?.sortBy ?? 'featured',
      });
    }, 250);
    return () => window.clearTimeout(t);
  }, [query, onChange, value?.availability, value?.category, value?.sortBy]);

  useEffect(() => {
    setQuery(value?.query ?? '');
  }, [value?.query]);

  const activeCount = useMemo(() => {
    return Number((value?.category ?? 'All') !== 'All') + Number((value?.availability ?? 'All') !== 'All') + Number((value?.sortBy ?? 'featured') !== 'featured') + Number((query ?? '').trim().length > 0);
  }, [query, value?.availability, value?.category, value?.sortBy]);

  const update = (patch: Partial<FilterState>) => {
    onChange({
      query,
      category: value?.category ?? 'All',
      availability: value?.availability ?? 'All',
      sortBy: value?.sortBy ?? 'featured',
      ...patch,
    });
  };

  const clearAll = () => {
    setQuery('');
    onChange(defaultValue);
    setOpenMenu(null);
  };

  return (
    <section className={cn('w-full border-b border-[#D6DADE] bg-white', className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E6670]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search instruments, materials, origins..."
              aria-label="Search instruments"
              className="h-12 w-full border border-[#D6DADE] bg-[#F5F5F5] pl-11 pr-12 text-sm text-[#17191C] outline-none transition focus:border-[#17191C]"
            />
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5E6670] transition hover:text-[#17191C]',
                query ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearAll}
              className={cn(
                'h-12 border border-[#D6DADE] px-4 text-xs font-semibold uppercase tracking-widest text-[#17191C] transition hover:border-[#17191C]',
                activeCount > 0 ? 'bg-[#17191C] text-white hover:bg-[#D32F2F] hover:border-[#D32F2F]' : 'bg-white'
              )}
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            label="Category"
            value={value?.category ?? 'All'}
            open={openMenu === 'category'}
            onOpenChange={(next) => setOpenMenu(next ? 'category' : null)}
            options={categoryOptions}
            onSelect={(next) => update({ category: next as FilterState['category'] })}
          />
          <Dropdown
            label="Availability"
            value={value?.availability ?? 'All'}
            open={openMenu === 'availability'}
            onOpenChange={(next) => setOpenMenu(next ? 'availability' : null)}
            options={availabilityOptions}
            onSelect={(next) => update({ availability: next as FilterState['availability'] })}
          />
          <Dropdown
            label="Sort"
            value={value?.sortBy ?? 'featured'}
            open={openMenu === 'sort'}
            onOpenChange={(next) => setOpenMenu(next ? 'sort' : null)}
            options={sortOptions}
            onSelect={(next) => update({ sortBy: next as FilterState['sortBy'] })}
          />
        </div>
      </div>
    </section>
  );
}

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
};

function Dropdown({ label, value, options, open, onOpenChange, onSelect }: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 items-center gap-2 border border-[#D6DADE] bg-white px-4 text-xs font-semibold uppercase tracking-widest text-[#17191C] transition hover:border-[#17191C]"
      >
        <span>{label}</span>
        <span className="text-[#5E6670]">·</span>
        <span className="max-w-[9rem] truncate text-[#5E6670]">{value}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-[calc(100%+0.5rem)] z-20 min-w-56 overflow-hidden border border-[#D6DADE] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
          >
            <div role="listbox" aria-label={label} className="max-h-72 overflow-auto p-2">
              {options.map((option) => {
                const selected = option === value;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onSelect(option);
                      onOpenChange(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between px-3 py-2 text-left text-sm transition',
                      selected ? 'bg-[#17191C] text-white' : 'text-[#17191C] hover:bg-[#F5F5F5]'
                    )}
                  >
                    <span>{option}</span>
                    {selected ? <span className="text-xs uppercase tracking-widest">Selected</span> : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function CatalogControlsNamed(props: CatalogControlsProps) {
  return <CatalogControls {...props} />;
}

export default CatalogControls;
export { CatalogControls };
