import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Filter, Search, Sliders, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import mockData, { categories as allCategories } from '@/data/mockData';
import type { Availability, Category, Instrument } from '@/types';
import CatalogControls from '@/components/CatalogControls';
import InstrumentCard from '@/components/InstrumentCard';

export interface CatalogExperienceProps {
  className?: string;
}

const allAvailability: Availability[] = ['In Stock', 'Limited', 'Preorder', 'Out of Stock'];

const sortItems = (items: Instrument[], sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest') => {
  const list = [...items];
  if (sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
  if (sortBy === 'newest') return list.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
  return list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
};

export function CatalogExperience({ className = '' }: CatalogExperienceProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const filteredItems = useMemo(() => {
    const base = (mockData?.instruments ?? []).filter((item: Instrument) => {
      const matchesQuery =
        !debouncedQuery ||
        [item.name, item.family, item.category, item.shortDescription, ...(item.tags ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(debouncedQuery);
      const matchesCategory = categories.length === 0 || categories.includes(item.category);
      const matchesAvailability = availability.length === 0 || availability.includes(item.availability);
      return matchesQuery && matchesCategory && matchesAvailability;
    });
    return sortItems(base, sortBy);
  }, [availability, categories, debouncedQuery, sortBy]);

  const resultCount = filteredItems.length;
  const totalCount = mockData?.instruments?.length ?? 0;

  const resetFilters = () => {
    setQuery('');
    setCategories([]);
    setAvailability([]);
    setSortBy('featured');
  };

  return (
    <section className={cn('w-full bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#D7DDE3] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">Catalog</p>
            <h2 className="mt-2 font-[Outfit] text-3xl font-light tracking-tight text-[#18222C] sm:text-4xl">
              Curated instruments, filtered with precision
            </h2>
          </div>
          <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76] md:flex">
            <Sliders className="h-4 w-4" />
            <span>{resultCount} of {totalCount}</span>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 border border-[#D7DDE3] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#18222C]"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
            {resultCount} results
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <CatalogControls
                query={query}
                categories={categories}
                availability={availability}
                sortBy={sortBy}
                onQueryChange={setQuery}
                onCategoriesChange={setCategories}
                onAvailabilityChange={setAvailability}
                onSortChange={setSortBy}
                onReset={resetFilters}
                allCategories={allCategories}
                allAvailability={allAvailability}
              />
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border border-[#D7DDE3] bg-[#F5F5F5] px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
                <Search className="h-4 w-4" />
                <span>{resultCount} instruments found</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
                <span>Sort</span>
                <button
                  type="button"
                  onClick={() => setSortBy('featured')}
                  className={cn('border px-3 py-2 transition', sortBy === 'featured' ? 'border-[#D32F2F] bg-[#D32F2F] text-white' : 'border-[#D7DDE3] bg-white text-[#18222C]')}
                >
                  Featured
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('price-asc')}
                  className={cn('border px-3 py-2 transition', sortBy === 'price-asc' ? 'border-[#D32F2F] bg-[#D32F2F] text-white' : 'border-[#D7DDE3] bg-white text-[#18222C]')}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('price-desc')}
                  className={cn('border px-3 py-2 transition', sortBy === 'price-desc' ? 'border-[#D32F2F] bg-[#D32F2F] text-white' : 'border-[#D7DDE3] bg-white text-[#18222C]')}
                >
                  High
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {resultCount > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
                    >
                      <InstrumentCard instrument={item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="border border-[#D7DDE3] bg-[#F5F5F5] px-6 py-14 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-[#D7DDE3] bg-white">
                    <X className="h-5 w-5 text-[#D32F2F]" />
                  </div>
                  <h3 className="font-[Outfit] text-2xl font-light text-[#18222C]">No instruments match your filters</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5F6B76]">
                    Try a broader search, remove a category, or reset the availability filter to reveal more of the collection.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 inline-flex items-center gap-2 border border-[#D32F2F] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#B71C1C]"
                  >
                    Reset filters
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: -24 }}
              animate={{ x: 0 }}
              exit={{ x: -24 }}
              transition={{ duration: 0.25 }}
              className="h-full w-[88%] max-w-sm overflow-y-auto bg-white p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#D7DDE3] pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#D32F2F]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#18222C]">Filters</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DDE3] bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <CatalogControls
                query={query}
                categories={categories}
                availability={availability}
                sortBy={sortBy}
                onQueryChange={setQuery}
                onCategoriesChange={setCategories}
                onAvailabilityChange={setAvailability}
                onSortChange={setSortBy}
                onReset={resetFilters}
                allCategories={allCategories}
                allAvailability={allAvailability}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default CatalogExperience;