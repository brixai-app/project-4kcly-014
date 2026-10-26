import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Sparkles } from 'lucide-react';
import MasonryGrid from '@/components/MasonryGrid';
import { mockData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function HomeSections({ className = '' }: { className?: string }) {
  const featured = (mockData?.items ?? []).filter((item: any) => item?.featured).slice(0, 6);
  const categories = mockData?.categories ?? ['String', 'Percussion', 'Wind', 'Keyboard', 'Electronic', 'Accessories'];

  return (
    <section className={cn('bg-white text-[#17191C]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6670]">
              <span className="h-px w-10 bg-[#D32F2F]" />
              Curated instruments
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl lg:text-6xl">
              A measured introduction to instruments with presence, provenance, and tone.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            className="space-y-5 border-l border-[#D6DADE] pl-0 lg:pl-8"
          >
            <p className="max-w-xl text-sm leading-7 text-[#5E6670] sm:text-base">
              SurSangeet pairs editorial restraint with practical discovery: browse by category, compare availability, and move from inspiration to inquiry without friction.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 border border-[#17191C] bg-[#17191C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#B71C1C] hover:border-[#B71C1C]"
            >
              Explore catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14">
          <MasonryGrid items={featured} />
        </div>

        <div className="mt-14 grid gap-4 border-t border-[#D6DADE] pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const accent = index % 3 === 0 ? 'bg-[#D32F2F]' : index % 3 === 1 ? 'bg-[#17191C]' : 'bg-[#2F6B57]';
            return (
              <div key={category} className="flex items-center justify-between border border-[#D6DADE] bg-[#F5F5F5] px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className={cn('h-2.5 w-2.5', accent)} />
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#17191C]">{category}</span>
                </div>
                <Globe2 className="h-4 w-4 text-[#5E6670]" />
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#D6DADE] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-[#5E6670]">
            <Sparkles className="h-4 w-4 text-[#D32F2F]" />
            <span>Six featured pieces, selected for tone, craft, and visual rhythm.</span>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#17191C] transition-colors hover:text-[#D32F2F]"
          >
            View full collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeSections;