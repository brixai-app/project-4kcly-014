import React from 'react';
import CatalogExplorer from '@/components/CatalogExplorer';

export interface CatalogPageProps {
  className?: string;
}

export function CatalogPage({ className = '' }: CatalogPageProps) {
  return (
    <main className={className}>
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#457B9D]/40 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A8DADC]">
            Catalog
          </p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <h1 className="font-[Outfit,sans-serif] text-4xl font-light tracking-tight text-[#F1FAEE] sm:text-5xl">
                Explore the instrument archive
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#A8DADC] sm:text-base">
                Browse a curated field of strings, percussion, wind, keyboard, electronic, and fusion instruments with
                editorial detail and responsive filtering.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#A8DADC]">
              <span className="h-px w-10 bg-[#457B9D]/70" />
              <span>Curated selection</span>
            </div>
          </div>
        </div>
        <CatalogExplorer />
      </section>
    </main>
  );
}

export default CatalogPage;