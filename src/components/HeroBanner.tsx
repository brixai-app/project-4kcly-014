import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroBanner({ className = '' }: { className?: string }) {
  return (
    <section className={cn('relative overflow-hidden bg-white', className)}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
          alt="Editorial view of a musical instrument in a cinematic setting"
          crossOrigin="anonymous"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#17191C]/55" />
        <div className="absolute left-0 top-0 h-full w-[2px] bg-[#D32F2F]" />
        <div className="absolute right-6 top-8 h-2 w-2 bg-[#2E7D32]" />
        <div className="absolute left-6 bottom-8 h-2 w-2 bg-[#1565C0]" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl pb-6 pt-24 text-white">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/80"
          >
            SurSangeet Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
            className="max-w-2xl font-['Playfair_Display'] text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Instruments shaped by craft, resonance, and quiet drama.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.16 }}
            className="mt-6 max-w-xl text-sm leading-7 text-white/82 sm:text-base"
          >
            Explore a curated showcase of strings, winds, percussion, and electronic forms—each selected for tonal character, material honesty, and visual presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-md bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors duration-200 hover:bg-[#B71C1C]"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-white/70">
              Handpicked instruments for modern performance
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;