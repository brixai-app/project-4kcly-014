import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { editorialContent } from '@/data/mockData';

export interface HomeHeroProps {
  className?: string;
}

export function HomeHero({ className = '' }: HomeHeroProps) {
  const hero = editorialContent?.hero ?? {};
  const image = hero?.image ?? 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80';
  const eyebrow = hero?.eyebrow ?? 'SurSangeet';
  const title = hero?.title ?? 'Instruments with presence, resonance, and craft.';
  const description =
    hero?.description ??
    'A tactile showcase of strings, percussion, winds, keyboards, and electronic instruments shaped for players who value tone, detail, and design.';
  const ctaLabel = hero?.ctaLabel ?? 'Explore Collection';

  return (
    <section className={cn('relative overflow-hidden bg-white', className)}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_34%,rgba(255,255,255,0.08)_58%,rgba(255,255,255,0)_100%)]" />
      <div className="grid min-h-[92vh] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 flex items-end border-b border-[#D7DDE3] bg-white/90 px-5 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center gap-2 border border-[#D7DDE3] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5F6B76]"
            >
              <Sparkles className="h-4 w-4 text-[#D32F2F]" />
              <span>{eyebrow}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: 'easeOut' }}
              className="max-w-xl font-[Outfit,sans-serif] text-5xl font-light tracking-tight text-[#18222C] sm:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
              className="mt-6 max-w-lg text-base leading-7 text-[#5F6B76] sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 border border-[#D32F2F] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:bg-[#B71C1C]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
                <Globe2 className="h-4 w-4 text-[#D32F2F]" />
                <span>Curated for players and collectors</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative min-h-[52vh] lg:min-h-full">
          <img
            src={image}
            alt="Editorial musical instrument showcase"
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid gap-px bg-white/20 sm:grid-cols-3">
            <div className="border-t border-white/30 bg-white/10 px-5 py-4 text-white backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">String</div>
              <div className="mt-1 text-sm font-medium">Warm resonance, hand-finished detail</div>
            </div>
            <div className="border-t border-white/30 bg-white/10 px-5 py-4 text-white backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">Percussion</div>
              <div className="mt-1 text-sm font-medium">Rhythmic surfaces with tactile depth</div>
            </div>
            <div className="border-t border-white/30 bg-white/10 px-5 py-4 text-white backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">Electronic</div>
              <div className="mt-1 text-sm font-medium">Modern control with studio precision</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;