import React from 'react';
import EditorialSection from '@/components/EditorialSection';

export interface AboutPageProps {
  className?: string;
}

export function AboutPage({ className = '' }: AboutPageProps) {
  return (
    <main className={className}>
      <section aria-labelledby="about-page-title" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5E6670]">About SurSangeet</p>
          <h1 id="about-page-title" className="mt-3 text-4xl font-light tracking-tight text-[#222222] sm:text-5xl">
            An editorial showcase for instruments with presence, texture, and rhythm.
          </h1>
        </header>
        <EditorialSection />
      </section>
    </main>
  );
}

export default AboutPage;