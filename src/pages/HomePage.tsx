import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInstruments } from '@/context/InstrumentContext';
import HeroBanner from '@/components/HeroBanner';
import InstrumentGrid from '@/components/InstrumentGrid';
import EditorialSection from '@/components/EditorialSection';

export interface HomePageProps {
  className?: string;
}

export function HomePage({ className = '' }: HomePageProps) {
  const { instruments } = useInstruments?.() ?? { instruments: [] };
  const featuredInstruments = (instruments ?? []).filter((instrument) => instrument?.featured ?? false).slice(0, 6);

  return (
    <main className={cn('bg-white text-[#222222]', className)}>
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <HeroBanner featuredInstrument={featuredInstruments?.[0] ?? null} className="overflow-hidden rounded-[18px] shadow-[0_18px_60px_rgba(34,34,34,0.08)]" />
      </section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] px-5 py-6 shadow-[0_14px_40px_rgba(34,34,34,0.05)] sm:px-8">
          <EditorialSection />
        </div>
      </motion.section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Featured instruments</p>
            <h2 className="mt-2 font-[Outfit,sans-serif] text-2xl font-light tracking-tight text-[#222222] sm:text-3xl">
              A curated field of resonant forms
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[#D8DEE5] md:block" />
        </div>
        <InstrumentGrid instruments={featuredInstruments} className="relative" />
      </section>
    </main>
  );
}

export default HomePage;