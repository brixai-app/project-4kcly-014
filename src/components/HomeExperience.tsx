import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Globe2, Circle as Music2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Instrument } from '@/types';

type HomeExperienceProps = { className?: string };

const heroImage = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';
const accentImages = [
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
];

function InstrumentCard({ instrument }: { instrument: Instrument }) {
  const price = instrument?.price != null ? `₹${instrument.price.toLocaleString('en-IN')}` : 'Enquire';
  return (
    <Link
      to={`/instruments/${instrument?.slug ?? ''}`}
      className="group block overflow-hidden border border-[#D7DFDD] bg-white"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F9FAFB]">
        <img
          src={instrument?.image ?? heroImage}
          alt={instrument?.name ?? 'Instrument'}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white">Explore</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            View <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <div className="space-y-1 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5E6E73]">
          {instrument?.category ?? 'Instrument'}
        </p>
        <h3 className="min-w-0 truncate text-sm font-semibold uppercase tracking-[0.18em] text-[#142D35]">
          {instrument?.name ?? 'Untitled'}
        </h3>
        <p className="text-sm font-semibold text-[#142D35]">{price}</p>
      </div>
    </Link>
  );
}

export function HomeExperience({ className = '' }: HomeExperienceProps) {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/instruments');
        const json = (await res.json().catch(() => null)) as { success?: boolean; data?: Instrument[] } | null;
        if (!active) return;
        setInstruments(Array.isArray(json?.data) ? json?.data ?? [] : []);
      } catch {
        if (active) setInstruments([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => instruments.filter((item) => item?.featured).slice(0, 3), [instruments]);

  return (
    <section className={cn('bg-white text-[#142D35]', className)}>
      <div className="relative min-h-[100svh] overflow-hidden">
        <img
          src={heroImage}
          alt="Ukulele hero"
          crossOrigin="anonymous"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/10" />
        <div className="absolute left-0 top-0 h-1 w-1/3 bg-[#E63946]" />
        <div className="absolute left-1/3 top-0 h-1 w-1/3 bg-[#0F766E]" />
        <div className="absolute left-2/3 top-0 h-1 w-1/3 bg-[#1D4ED8]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl border border-white/20 bg-white/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8"
          >
            <div className="mb-4 flex items-center gap-2 text-[#E63946]">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em]">SurSangeet</span>
            </div>
            <h1 className="max-w-2xl text-5xl font-light uppercase tracking-tight text-[#142D35] sm:text-6xl lg:text-7xl">
              Instruments with a living editorial voice
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#5E6E73] sm:text-base">
              Discover handcrafted strings, resonant percussion, and expressive winds through a curated catalog shaped by
              material, origin, and sound.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/instruments"
                className="inline-flex items-center gap-2 border border-[#E63946] bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:bg-[#C92E3A]"
              >
                Explore Instruments <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#featured-preview"
                className="inline-flex items-center gap-2 border border-[#D7DFDD] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#142D35] transition-colors hover:bg-[#F9FAFB]"
              >
                Scroll Preview <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div id="featured-preview" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {accentImages.map((src, index) => (
              <div key={src} className={cn('overflow-hidden border border-[#D7DFDD]', index === 0 ? 'sm:col-span-2' : '')}>
                <img
                  src={src}
                  alt={`Editorial instrument detail ${index + 1}`}
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between border border-[#D7DFDD] bg-[#F9FAFB] p-6"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#E63946]">Mission</p>
              <h2 className="text-3xl font-light uppercase tracking-tight text-[#142D35]">
                Sound, craft, and context in one continuous frame
              </h2>
              <p className="max-w-md text-sm leading-7 text-[#5E6E73]">
                SurSangeet presents instruments as cultural objects and working tools, pairing live catalog data with
                immersive storytelling and a restrained, gallery-like interface.
              </p>
            </div>
            <div className="mt-8 grid gap-3 border-t border-[#D7DFDD] pt-5">
              <div className="flex items-center gap-3">
                <Globe2 className="h-4 w-4 text-[#0F766E]" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#142D35]">Global origins</span>
              </div>
              <div className="flex items-center gap-3">
                <Music2 className="h-4 w-4 text-[#1D4ED8]" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#142D35]">Audio-led discovery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#E63946]">Featured catalog</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-tight text-[#142D35]">Selected instruments</h2>
          </div>
          <Link
            to="/instruments"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#142D35] sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="aspect-[3/4] animate-pulse border border-[#D7DFDD] bg-[#F9FAFB]" />
              ))
            : featured.map((instrument) => <InstrumentCard key={instrument?.id ?? instrument?.slug} instrument={instrument} />)}
        </div>
      </div>
    </section>
  );
}

export default HomeExperience;