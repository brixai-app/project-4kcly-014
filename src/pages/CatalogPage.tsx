import React from 'react';
import { motion } from 'framer-motion';
import CatalogExplorer from '@/components/CatalogExplorer';
import { useShowcase } from '@/context/ShowcaseContext';
import type { Instrument } from '@/types';

export function CatalogPage({ className = '' }: { className?: string }) {
  const { instruments, loading } = useShowcase() as {
    instruments?: Instrument[];
    loading?: boolean;
  };

  return (
    <main className={className}>
      <section className="border-b border-[#D8D4CC] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#5F6368]">
              Catalog
            </p>
            <h1 className="mt-4 font-['Outfit',sans-serif] text-4xl font-light tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              Explore instruments shaped by tone, texture, and rhythm.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5F6368] sm:text-base">
              Browse a curated collection of strings, percussion, wind, keyboard, electronic, and accessory pieces with
              a refined editorial flow and responsive filtering.
            </p>
          </motion.div>
        </div>
      </section>

      <CatalogExplorer items={instruments ?? []} loading={loading ?? false} />
    </main>
  );
}

export default CatalogPage;