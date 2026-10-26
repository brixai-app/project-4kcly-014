import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import MasonryGrid from '@/components/MasonryGrid';
import { featuredContent } from '@/data/mockData';
import { cn } from '@/lib/utils';

type HomeEditorialSectionsProps = {
  className?: string;
};

export function HomeEditorialSections({ className = '' }: HomeEditorialSectionsProps) {
  const featured = featuredContent?.featuredInstruments ?? featuredContent?.instruments ?? [];
  const intro = featuredContent?.intro ?? featuredContent?.storeStory ?? {};
  const title = intro?.title ?? 'A curated field of instruments, tuned for modern listening.';
  const body =
    intro?.body ??
    'SurSangeet frames each instrument as an object of craft, resonance, and presence—selected for tone, silhouette, and the quiet drama of performance.';
  const ctaHref = intro?.ctaHref ?? '/catalog';
  const ctaLabel = intro?.ctaLabel ?? 'Explore Collection';

  return (
    <section className={cn('bg-white text-[#17191C]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[#D32F2F]" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                Editorial Introduction
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5E6670] sm:text-lg">{body}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="border border-[#D7DCE2] bg-[#F5F5F5] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 text-[#D32F2F]">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">Featured Selection</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#5E6670]">
              A restrained preview of the collection, arranged in an asymmetric field to foreground material, scale, and
              tonal character.
            </p>
            <Link
              to={ctaHref}
              className="mt-6 inline-flex items-center gap-2 border border-[#D32F2F] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#B71C1C]"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14">
          <MasonryGrid instruments={featured} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[#D7DCE2] pt-8 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Closing Collection Note</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5E6670]">
              Each instrument is presented with the same editorial restraint: generous space, precise typography, and a
              clear path into the catalog.
            </p>
          </div>
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#17191C] transition-colors hover:text-[#D32F2F]"
          >
            View the full collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeEditorialSections;