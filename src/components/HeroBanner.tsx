import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Circle as Music2 } from 'lucide-react';
import type { Instrument } from '@/types';
import { cn } from '@/lib/utils';

type HeroBannerProps = {
  featuredInstrument?: Instrument | null;
  className?: string;
};

export function HeroBanner({ featuredInstrument = null, className = '' }: HeroBannerProps) {
  const image = featuredInstrument?.image ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';
  const name = featuredInstrument?.name ?? 'SurSangeet';
  const category = featuredInstrument?.category ?? 'featured instrument';
  const description =
    featuredInstrument?.description ??
    'A tactile editorial stage for discovering instruments through rhythm, material, and form.';
  const accent = featuredInstrument?.accentColor ?? '#E63946';

  return (
    <section className={cn('relative overflow-hidden bg-white', className)}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,245,242,0.92)_0%,rgba(255,255,255,0.2)_42%,rgba(255,255,255,0)_100%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-stretch lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-end px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#5E6670]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DEE5] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <Music2 className="h-4 w-4 text-[#E63946]" />
              </span>
              <span>Editorial instrument showcase</span>
            </div>
            <h1 className="max-w-[12ch] text-5xl font-light tracking-tight text-[#222222] sm:text-6xl lg:text-7xl">
              Discover sound as object, ritual, and craft.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#5E6670] sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black shadow-[0_14px_40px_rgba(230,57,70,0.22)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#C92836]"
              >
                Explore Instruments
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                <Sparkles className="h-4 w-4 text-[#E63946]" />
                <span>{name}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative min-h-[34rem] lg:min-h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt={name}
              crossOrigin="anonymous"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_100%)]" />
          <div
            className="absolute left-4 top-4 h-24 w-24 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm sm:left-8 sm:top-8 sm:h-32 sm:w-32"
            style={{ boxShadow: `0 0 0 1px ${accent}22, 0 18px 50px rgba(0,0,0,0.12)` }}
          />
          <div className="absolute bottom-4 right-4 max-w-[16rem] rounded-[18px] border border-white/30 bg-white/88 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-md sm:bottom-8 sm:right-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#5E6670]">
              Featured
            </p>
            <p className="mt-2 text-lg font-medium text-[#222222]">{name}</p>
            <p className="mt-1 text-sm leading-6 text-[#5E6670]">{category}</p>
          </div>
          <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="h-56 w-2 bg-[#0A3D62]" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E63946]" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;