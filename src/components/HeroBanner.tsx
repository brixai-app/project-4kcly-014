import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe2, Circle as Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeroBannerProps = {
  className?: string;
};

export function HeroBanner({ className = '' }: HeroBannerProps) {
  const navigate = useNavigate();
  const heroImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className={cn('relative overflow-hidden bg-[#F4F1DE] text-[#1D3557]', className)}>
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#E63946]/90 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#1D3557]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#2A9D8F]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-stretch gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex flex-col justify-between rounded-[28px] border border-[#C9C3A8] bg-[#FFFDF2]/85 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]">
            <Sparkles className="h-4 w-4 text-[#E63946]" />
            <span>SurSangeet Collection</span>
          </div>

          <div className="max-w-2xl pt-10 sm:pt-14 lg:pt-0">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]"
            >
              <Music2 className="h-4 w-4 text-[#E63946]" />
              Crafted for discovery
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
              className="max-w-xl text-5xl font-light tracking-tight text-[#1D3557] sm:text-6xl lg:text-7xl"
            >
              Instruments that feel alive in the hand and on the wall.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
              className="mt-6 max-w-xl text-base leading-7 text-[#596579] sm:text-lg"
            >
              Explore a tactile showcase of strings, percussion, wind, and electronic forms shaped by warm light, saturated accents, and editorial composition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => navigate('/catalog')}
                className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#C92535]"
              >
                Explore Our Collection
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="inline-flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-[#FFFDF2] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#596579]">
                <Globe2 className="h-4 w-4 text-[#1D3557]" />
                Live instrument records
              </div>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'String forms', value: 'Hand-finished' },
              { label: 'Percussion', value: 'Rhythmic textures' },
              { label: 'Wind & keys', value: 'Curated arrivals' },
            ].map((item) => (
              <div key={item.label} className="rounded-[22px] border border-[#C9C3A8] bg-white/60 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#596579]">{item.label}</div>
                <div className="mt-2 text-sm font-medium text-[#1D3557]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[32px] border border-[#C9C3A8] bg-[#FFFDF2]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1D3557]/10 via-transparent to-[#E63946]/10" />
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={heroImage}
              alt="Editorial musical instrument showcase"
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/35 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex flex-col gap-2 rounded-[22px] border border-white/30 bg-[#FFFDF2]/85 p-4 backdrop-blur-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#596579]">Collection index</div>
            <div className="space-y-1 text-sm font-medium text-[#1D3557]">
              <div>01 Strings</div>
              <div>02 Percussion</div>
              <div>03 Wind</div>
              <div>04 Electronic</div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="max-w-xs rounded-[24px] border border-white/30 bg-[#FFFDF2]/90 p-4 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#596579]">Featured mood</div>
              <div className="mt-2 text-lg font-medium text-[#1D3557]">Warm, tactile, and rhythm-forward.</div>
            </div>
            <div className="hidden rounded-[999px] bg-[#1D3557] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFFDF2] shadow-lg md:inline-flex">
              Curated for collectors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;