import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, RefreshCw, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Availability, Category } from '@/types';

export interface CatalogControlsProps {
  className?: string;
  query?: string;
  categories?: Category[];
  availability?: Availability[];
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  onQueryChange?: (value: string) => void;
  onCategoriesChange?: (value: Category[]) => void;
  onAvailabilityChange?: (value: Availability[]) => void;
  onSortChange?: (value: 'featured' | 'price-asc' | 'price-desc' | 'newest') => void;
  onReset?: () => void;
  allCategories?: Category[];
  allAvailability?: Availability[];
}

const defaultCategories: Category[] = ['String', 'Percussion', 'Wind', 'Keyboard', 'Electronic', 'Accessories'];
const defaultAvailability: Availability[] = ['In Stock', 'Limited', 'Preorder', 'Out of Stock'];

export function CatalogControls({
  className = '',
  query = '',
  categories = [],
  availability = [],
  sortBy = 'featured',
  onQueryChange = () => undefined,
  onCategoriesChange = () => undefined,
  onAvailabilityChange = () => undefined,
  onSortChange = () => undefined,
  onReset = () => undefined,
  allCategories = defaultCategories,
  allAvailability = defaultAvailability,
}: CatalogControlsProps) {
  const [localQuery, setLocalQuery] = useState(query);
  const [openCategories, setOpenCategories] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => onQueryChange(localQuery), 250);
    return () => window.clearTimeout(timer);
  }, [localQuery, onQueryChange]);

  const activeCount = useMemo(
    () => (localQuery.trim() ? 1 : 0) + categories.length + availability.length + (sortBy !== 'featured' ? 1 : 0),
    [localQuery, categories.length, availability.length, sortBy]
  );

  const toggleValue = <T,>(value: T, list: T[], setter: (next: T[]) => void) => {
    const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
    setter(next);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn('rounded-[12px] border border-[#D7DDE3] bg-white p-4 md:p-5', className)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6B76]" />
            <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search instruments, makers, materials..."
              aria-label="Search catalog"
              className="h-11 w-full rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] pl-10 pr-10 text-sm text-[#18222C] outline-none transition focus:border-[#D32F2F] focus:bg-white"
            />
            {localQuery.trim() ? (
              <button
                type="button"
                onClick={() => setLocalQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#5F6B76] transition hover:bg-white hover:text-[#18222C]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[#5F6B76]">
              <span>Sort</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as CatalogControlsProps['sortBy'])}
                className="bg-transparent text-xs font-semibold uppercase tracking-widest text-[#18222C] outline-none"
                aria-label="Sort catalog"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setOpenCategories((v) => !v)}
              className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[#D7DDE3] bg-white px-4 text-xs font-semibold uppercase tracking-widest text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              aria-expanded={openCategories}
              aria-controls="catalog-categories"
            >
              <Filter className="h-4 w-4" />
              Categories
              <ChevronDown className={cn('h-4 w-4 transition-transform', openCategories && 'rotate-180')} />
            </button>

            <button
              type="button"
              onClick={() => setOpenAvailability((v) => !v)}
              className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[#D7DDE3] bg-white px-4 text-xs font-semibold uppercase tracking-widest text-[#18222C] transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              aria-expanded={openAvailability}
              aria-controls="catalog-availability"
            >
              <ChevronDown className={cn('h-4 w-4 transition-transform', openAvailability && 'rotate-180')} />
              Availability
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-[#D32F2F] px-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#B71C1C]"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#5F6B76]">
          <span className="font-semibold uppercase tracking-widest text-[#18222C]">Active filters</span>
          <span>{activeCount > 0 ? `${activeCount} applied` : 'None'}</span>
        </div>

        {openCategories ? (
          <div id="catalog-categories" className="grid gap-2 rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-3 sm:grid-cols-2 lg:grid-cols-3">
            {allCategories.map((category) => {
              const checked = categories.includes(category);
              return (
                <label
                  key={category}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-[12px] border px-3 py-2 text-sm transition',
                    checked ? 'border-[#D32F2F] bg-white text-[#18222C]' : 'border-transparent bg-white/70 text-[#5F6B76] hover:border-[#D7DDE3]'
                  )}
                >
                  <span>{category}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleValue(category, categories, onCategoriesChange)}
                    className="h-4 w-4 accent-[#D32F2F]"
                    aria-label={category}
                  />
                </label>
              );
            })}
          </div>
        ) : null}

        {openAvailability ? (
          <div id="catalog-availability" className="grid gap-2 rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-3 sm:grid-cols-2 lg:grid-cols-4">
            {allAvailability.map((item) => {
              const checked = availability.includes(item);
              return (
                <label
                  key={item}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-[12px] border px-3 py-2 text-sm transition',
                    checked ? 'border-[#D32F2F] bg-white text-[#18222C]' : 'border-transparent bg-white/70 text-[#5F6B76] hover:border-[#D7DDE3]'
                  )}
                >
                  <span>{item}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleValue(item, availability, onAvailabilityChange)}
                    className="h-4 w-4 accent-[#D32F2F]"
                    aria-label={item}
                  />
                </label>
              );
            })}
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}

export default CatalogControls;