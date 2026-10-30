import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import CatalogExplorer from '@/components/CatalogExplorer';
import { useShowcase } from '@/context/ShowcaseContext';

export function Home({ className = '' }: { className?: string }) {
  const { instruments = [], loading = false } = useShowcase?.() ?? {};
  const featured = instruments?.filter?.((item) => item?.featured) ?? [];
  const spotlight = featured?.slice?.(0, 6) ?? instruments?.slice?.(0, 6) ?? [];
  const categories = ['Strings', 'Percussion', 'Wind', 'Keyboard', 'Electronic', 'Accessories'] as const;

  return (
    <main className={className}>
      <HeroBanner />
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6368]">Featured spotlight</p>
            <h2 className="mt-3 max-w-xl font-['Outfit',sans-serif] text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-4xl">
              Instruments chosen for tone, texture, and stage presence.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F6368]">
              Explore a curated selection shaped by resonance, craftsmanship, and visual rhythm.
            </p>
          </div>
          <div className="rounded-[18px] border border-[#D8D4CC] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="min-w-0 border border-[#D8D4CC] bg-[#F4F1EB] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[#5F6368]">
              A rhythm-driven catalog with clean search, refined filtering, and instrument-aware inquiry flows.
            </p>
          </div>
        </motion.div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CatalogExplorer items={spotlight} loading={loading} />
      </section>
    </main>
  );
}

export default Home;