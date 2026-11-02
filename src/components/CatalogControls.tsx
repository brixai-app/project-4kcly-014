import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Filter, RefreshCw, Search, X } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import type { CatalogControlsProps, CatalogFilter } from '@/types';

export function CatalogControls({
  filters = { query: '', category: 'All', sortBy: 'featured' },
  categories = [],
  onChange = () => undefined,
  className = '',
}: CatalogControlsProps) {
  const [query, setQuery] = useState(filters?.query ?? '');
  const [category, setCategory] = useState(filters?.category ?? 'All');
  const [sortBy, setSortBy] = useState<CatalogFilter['sortBy']>(filters?.sortBy ?? 'featured');

  useEffect(() => {
    setQuery(filters?.query ?? '');
    setCategory(filters?.category ?? 'All');
    setSortBy(filters?.sortBy ?? 'featured');
  }, [filters?.query, filters?.category, filters?.sortBy]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      onChange?.({
        query: query.trim(),
        category,
        sortBy,
      });
    }, 300);
    return () => window.clearTimeout(id);
  }, [query, category, sortBy, onChange]);

  const categoryItems = useMemo(() => ['All', ...categories.filter(Boolean)], [categories]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSortBy('featured');
    onChange?.({ query: '', category: 'All', sortBy: 'featured' });
  };

  const sortLabel =
    sortBy === 'price-asc'
      ? 'Price: Low to High'
      : sortBy === 'price-desc'
        ? 'Price: High to Low'
        : sortBy === 'name-asc'
          ? 'Name: A to Z'
          : 'Featured';

  return (
    <section className={cn('rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-4 sm:p-5', className)}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#596579]">
              <Search className="h-4 w-4" />
              Search instruments
            </label>
            <div className="flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-white px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-[#596579]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, origin, or material"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#1D3557] outline-none placeholder:text-[#596579]/70"
                aria-label="Search catalog"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#596579] transition-colors hover:bg-black/5 hover:text-[#1D3557]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1D3557] transition-colors hover:bg-[#F4F1DE]"
                >
                  <Filter className="h-4 w-4" />
                  <span className="max-w-[10rem] truncate">{sortLabel}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 min-w-56 rounded-[20px] border border-[#C9C3A8] bg-[#FFFDF2] p-2 shadow-[0_20px_60px_rgba(29,53,87,0.12)]"
                >
                  {[
                    ['featured', 'Featured'],
                    ['price-asc', 'Price: Low to High'],
                    ['price-desc', 'Price: High to Low'],
                    ['name-asc', 'Name: A to Z'],
                  ].map(([value, label]) => (
                    <DropdownMenu.Item
                      key={value}
                      onSelect={() => setSortBy(value as CatalogFilter['sortBy'])}
                      className={cn(
                        'cursor-pointer rounded-md px-3 py-2 text-sm text-[#1D3557] outline-none transition-colors',
                        'focus:bg-[#F4F1DE] data-[highlighted]:bg-[#F4F1DE]'
                      )}
                    >
                      {label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1D3557] transition-colors hover:bg-[#F4F1DE]"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.24em] text-[#596579]">
              Categories
            </p>
            <p className="text-xs text-[#596579]">
              {category === 'All' ? 'All instruments' : category}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryItems.map((item) => {
              const active = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    'min-w-0 max-w-full rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
                    active
                      ? 'border-[#E63946] bg-[#E63946] text-black'
                      : 'border-[#C9C3A8] bg-white text-[#1D3557] hover:bg-[#F4F1DE]'
                  )}
                >
                  <span className="block max-w-[12rem] truncate">{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogControls;