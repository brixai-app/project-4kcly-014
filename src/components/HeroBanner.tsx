import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, MapPin, Sparkles } from 'lucide-react';
import { featuredContent } from '@/data/mockData';
import { cn } from '@/lib/utils';

type HeroBannerProps = {
  className?: string;
};

export function HeroBanner({ className = '' }: HeroBannerProps) {
  const featured = featuredContent?.featuredInstrument ?? featuredContent?.featured ?? featuredContent?.instrument ?? {};
  const image = featured?.image ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';
  const name = featured?.name ?? 'Featured Instrument';
  const category = featured?.category ?? 'Collection';
  const origin = featured?.origin ?? 'Crafted for resonant performance';
  const description =
    featured?.description ??
    'An editorial introduction to the season’s most expressive instruments, selected for tone, texture, and presence.';
  const slug = featured?.slug ?? 'catalog';

  return (
    <section className={cn('relative isolate min-h-[100svh] overflow-hidden bg-white text-[#17191C]', className)}>
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          crossOrigin="anonymous"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/42 to-white/10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.18)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.45fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl pb-4"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-14 bg-[#D32F2F]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#5E6670]">
                SurSangeet
              </span>
            </div>

            <p className="mb-4 max-w-xl text-sm leading-6 text-[#5E6670] sm:text-base">
              {description}
            </p>

            <h1 className="max-w-2xl font-['Playfair_Display'] text-5xl font-light tracking-tight text-[#17191C] sm:text-6xl lg:text-7xl">
              Instruments with a quiet, cinematic presence.
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={`/catalog/${slug}`}
                className="inline-flex items-center gap-3 bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-colors duration-200 hover:bg-[#B71C1C]"
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                <Sparkles size={14} className="text-[#D32F2F]" />
                Curated drop
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="ml-auto w-full max-w-sm border border-[#D7DCE2] bg-white/55 p-5 backdrop-blur-md"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#5E6670]">
                Featured instrument
              </span>
              <Globe2 size={16} className="text-[#D32F2F]" />
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-[#D32F2F] pl-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5E6670]">
                  Name
                </p>
                <p className="mt-1 font-['Playfair_Display'] text-2xl font-medium text-[#17191C]">
                  {name}
                </p>
              </div>

              <div className="grid gap-3 text-sm text-[#5E6670]">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#D32F2F]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                      Origin
                    </p>
                    <p className="mt-1">{origin}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-[#D32F2F]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                      Category
                    </p>
                    <p className="mt-1">{category}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="h-px w-full bg-[#D7DCE2]" />
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#5E6670]">
                  Full-bleed editorial lookbook
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;