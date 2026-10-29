import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInstruments } from '@/context/InstrumentContext';
import CatalogControls from '@/components/CatalogControls';
import InstrumentGrid from '@/components/InstrumentGrid';
import type { InstrumentCategory } from '@/types';

export interface CatalogPageProps {
  className?: string;
}

export function CatalogPage({ className = '' }: CatalogPageProps) {
  const { instruments = [] } = useInstruments() ?? {};
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<InstrumentCategory | 'all'>('all');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(instruments.map((instrument) => instrument?.category).filter(Boolean)))],
    [instruments]
  );

  const filteredInstruments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return instruments.filter((instrument) => {
      const matchesCategory = category === 'all' || instrument?.category === category;
      const matchesSearch =
        !query ||
        [instrument?.name, instrument?.description, instrument?.category, ...(instrument?.tags ?? [])]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [instruments, search, category]);

  const handleClear = () => {
    setSearch('');
    setCategory('all');
  };

  return (
    <motion.section
      className={`mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mb-6 flex flex-col gap-3 border-b border-[#D8DEE5] pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Catalog</p>
        <h1 className="max-w-3xl text-4xl font-light tracking-tight text-[#222222] sm:text-5xl">
          A living index of instruments shaped by tone, craft, and presence.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[#5E6670] sm:text-base">
          Refine by category or search by name, material, and description to explore the current collection.
        </p>
      </div>

      <div className="space-y-6">
        <CatalogControls
          search={search}
          category={category}
          resultCount={filteredInstruments.length}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onClear={handleClear}
        />
        <InstrumentGrid instruments={filteredInstruments} />
      </div>
    </motion.section>
  );
}

export default CatalogPage;