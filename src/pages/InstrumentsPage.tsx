import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CatalogSection from '@/components/CatalogSection';

export function InstrumentsPage({ className = '' }: { className?: string }) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') ?? '';

  return (
    <main className={`bg-white ${className}`.trim()}>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-['Roboto'] text-xs font-semibold uppercase tracking-[0.35em] text-[#E63946]">
            Instruments
          </p>
          <h1 className="mt-3 font-['Outfit'] text-4xl font-light tracking-tight text-[#142D35] sm:text-5xl">
            Explore the living catalog
          </h1>
          <p className="mt-4 max-w-2xl font-['Roboto'] text-sm leading-7 text-[#5E6E73] sm:text-base">
            Browse a curated archive of strings, percussion, wind, keyboard, electronic, and folk instruments shaped by craft, resonance, and place.
          </p>
        </div>
        <CatalogSection category={category} />
      </section>
    </main>
  );
}

export default InstrumentsPage;