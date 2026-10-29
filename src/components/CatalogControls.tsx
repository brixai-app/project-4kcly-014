import React, { useEffect, useMemo, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InstrumentCategory } from '@/types';

type CatalogControlsProps = {
  search: string;
  category: InstrumentCategory | 'all';
  resultCount?: number;
  categories?: InstrumentCategory[];
  onSearchChange?: (value: string) => void;
  onCategoryChange?: (value: InstrumentCategory | 'all') => void;
  onClear?: () => void;
  className?: string;
};

const defaultCategories: InstrumentCategory[] = ['string', 'percussion', 'wind', 'keyboard', 'electronic', 'folk'];

export function CatalogControls({
  search = '',
  category = 'all',
  resultCount = 0,
  categories = defaultCategories,
  onSearchChange = () => undefined,
  onCategoryChange = () => undefined,
  onClear = () => undefined,
  className = '',
}: CatalogControlsProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search ?? '');
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(localSearch ?? ''), 300);
    return () => window.clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    if ((debouncedSearch ?? '') !== (search ?? '')) onSearchChange(debouncedSearch);
  }, [debouncedSearch, search, onSearchChange]);

  const categoryOptions = useMemo(() => ['all', ...(categories ?? [])], [categories]);

  return (
    <section className={cn('rounded-[18px] border border-[#D8DEE5] bg-white p-4 shadow-[0_10px_30px_rgba(34,34,34,0.06)]', className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0 flex-1">
          <label htmlFor="catalog-search" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
            <Search className="h-4 w-4 text-[#E63946]" />
            Search instruments
          </label>
          <div className="flex items-center gap-2 rounded-md border border-[#D8DEE5] bg-[#F7F5F2] px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-[#5E6670]" />
            <input
              id="catalog-search"
              type="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by name, tag, or description"
              className="min-w-0 flex-1 bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#5E6670]"
            />
            {localSearch ? (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  onSearchChange('');
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D8DEE5] text-[#5E6670] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:min-w-[220px]">
          <label htmlFor="catalog-category" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
            <Filter className="h-4 w-4 text-[#E63946]" />
            Category
          </label>
          <select
            id="catalog-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as InstrumentCategory | 'all')}
            className="min-w-0 rounded-md border border-[#D8DEE5] bg-white px-3 py-2 text-sm text-[#222222] outline-none transition-colors focus:border-[#E63946]"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All categories' : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-[#D8DEE5] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#5E6670]">
          <span className="font-semibold text-[#222222]">{resultCount}</span> results
        </p>
        <button
          type="button"
          onClick={() => {
            setLocalSearch('');
            onClear();
          }}
          className="inline-flex items-center gap-2 self-start rounded-md border border-[#D8DEE5] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#222222] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      </div>
    </section>
  );
}

export default CatalogControls;