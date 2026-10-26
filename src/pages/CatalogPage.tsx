import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { mockData } from '@/data/mockData';
import type { Availability, Category, FilterState, Instrument } from '@/types';
import CatalogControls from '@/components/CatalogControls';
import MasonryGrid from '@/components/MasonryGrid';

export function CatalogPage() {
  const instruments = (mockData as { items?: Instrument[] })?.items ?? [];
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: 'All',
    availability: 'All',
    sortBy: 'featured',
  });

  const filteredItems = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const matches = instruments.filter((item) => {
      const categoryMatch = filters.category === 'All' || item?.category === filters.category;
      const availabilityMatch = filters.availability === 'All' || item?.availability === filters.availability;
      const textMatch =
        !query ||
        [item?.name, item?.shortDescription, item?.description, item?.origin, ...(item?.materials ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query);
      return categoryMatch && availabilityMatch && textMatch;
    });

    const sorted = [...matches].sort((a, b) => {
      if (filters.sortBy === 'price-asc') return (a?.price ?? 0) - (b?.price ?? 0);
      if (filters.sortBy === 'price-desc') return (b?.price ?? 0) - (a?.price ?? 0);
      if (filters.sortBy === 'name') return (a?.name ?? '').localeCompare(b?.name ?? '');
      const featuredDelta = Number(Boolean(b?.featured)) - Number(Boolean(a?.featured));
      return featuredDelta !== 0 ? featuredDelta : (a?.name ?? '').localeCompare(b?.name ?? '');
    });

    return sorted;
  }, [filters, instruments]);

  const handleFiltersChange = (next: Partial<FilterState>) => {
    setFilters((current) => ({ ...current, ...next }));
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white"
    >
      <section className="border-b border-[#D6DADE] bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5E6670]">Collection</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-['Playfair_Display'] text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl lg:text-6xl">
                Explore the instrument archive
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5E6670] sm:text-base">
                Search by name, filter by category or availability, and move through a curated selection of instruments with editorial clarity.
              </p>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
              {filteredItems.length} results
            </div>
          </div>
        </div>
      </section>

      <CatalogControls
        className="sticky top-0 z-20 border-b border-[#D6DADE] bg-white/95 backdrop-blur"
        filters={filters}
        onChange={handleFiltersChange}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MasonryGrid items={filteredItems} className="min-h-[40vh]" />
      </section>
    </motion.main>
  );
}

export default CatalogPage;