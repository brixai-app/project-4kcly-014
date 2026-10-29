import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { instruments } from '@/data/mockData';

export interface HeroBannerProps {
  className?: string;
  onExplore?: () => void;
}

export function HeroBanner({ className = '', onExplore = () => {} }: HeroBannerProps) {
  const featured = instruments?.slice(0, 4) ?? [];
  const images = featured.map((item) => item?.image).filter(Boolean) as string[];
  const primaryImage = images?.[0] ?? 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = images?.[1] ?? 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80';
  const tertiaryImage = images?.[2] ?? 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80';

  return (
    <section className={cn('relative overflow-hidden bg-[#1D1D1D] text-[#F1FAEE]', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,57,70,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(69,123,157,0.18),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(168,218,220,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-70">
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,220 C180,120 280,360 460,250 C620,150 720,40 900,160 C1080,280 1180,120 1440,40 L1440,0 L0,0 Z" fill="rgba(230,57,70,0.18)" />
          <path d="M0,620 C160,520 300,760 520,650 C720,550 820,430 1020,520 C1180,590 1280,720 1440,620 L1440,900 L0,900 Z" fill="rgba(69,123,157,0.16)" />
          <path d="M180,120 C360,40 520,180 660,120 C820,50 980,120 1120,80 C1240,45 1320,120 1440,100" fill="none" stroke="rgba(168,218,220,0.35)" strokeWidth="2" />
          <path d="M0,430 C220,360 340,520 520,470 C700,420 820,300 980,360 C1140,420 1260,360 1440,300" fill="none" stroke="rgba(230,57,70,0.28)" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-8 px-5 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-8 lg:px-10">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-5 inline-flex items-center gap-2 border border-[#457B9D]/60 bg-[#25282B]/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A8DADC]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#E63946]" />
            SurSangeet / Live Instrument Showcase
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: 'easeOut' }}
            className="max-w-xl text-5xl font-light tracking-tight text-[#F1FAEE] sm:text-6xl lg:text-7xl"
          >
            Instruments staged like a concert.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
            className="mt-6 max-w-lg text-sm leading-7 text-[#A8DADC] sm:text-base"
          >
            A dark editorial canvas for strings, percussion, wind, keyboard, electronic, and fusion forms—framed with saturated accents, fluid layers, and tactile shadows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center gap-2 bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors duration-300 hover:bg-[#C92F3C]"
            >
              Explore Instruments
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="inline-flex items-center gap-2 border border-[#457B9D]/70 bg-[#25282B]/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#F1FAEE]">
              <Play className="h-4 w-4 text-[#A8DADC]" />
              Editorial motion
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-0 top-8 h-[72%] w-[58%] overflow-hidden border border-[#457B9D]/60 bg-[#25282B] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <img
                src={primaryImage}
                alt={featured?.[0]?.name ?? 'Featured instrument'}
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
              className="absolute right-0 top-0 h-[60%] w-[48%] overflow-hidden border border-[#457B9D]/60 bg-[#25282B] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <img
                src={secondaryImage}
                alt={featured?.[1]?.name ?? 'Featured instrument'}
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.16, ease: 'easeOut' }}
              className="absolute bottom-0 left-[18%] h-[42%] w-[44%] overflow-hidden border border-[#457B9D]/60 bg-[#25282B] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <img
                src={tertiaryImage}
                alt={featured?.[2]?.name ?? 'Featured instrument'}
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="absolute -left-2 top-1/2 hidden -translate-y-1/2 border border-[#457B9D]/60 bg-[#25282B]/85 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A8DADC] md:block"
            >
              Curated drop
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;