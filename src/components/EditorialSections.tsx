import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, Globe2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { heroSlides, instruments, editorialCopy } from '@/data/mockData';
import type { Instrument } from '@/types';

export function HeroCarousel({ slides = heroSlides }: { slides?: typeof heroSlides }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = slides?.length ?? 0;

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % count), 6500);
    return () => window.clearInterval(id);
  }, [count, reduceMotion]);

  const current = slides?.[active] ?? slides?.[0];
  const next = slides?.[(active + 1) % (count || 1)] ?? current;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a] text-white">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current?.id ?? 'hero'}
            src={current?.image ?? ''}
            alt={current?.title ?? ''}
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.15)_0%,rgba(10,10,10,0.55)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 py-6 sm:px-8 lg:px-10">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[18rem] border-l border-white/25 pl-4 pt-2">
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/70">{current?.eyebrow ?? 'SurSangeet'}</p>
            <p className="mt-3 font-serif text-3xl leading-none tracking-tight sm:text-4xl">{current?.title ?? ''}</p>
          </div>
          <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-white/70 md:flex">
            <Globe2 className="h-4 w-4" />
            <span>{String(active + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(count).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-4xl">
            <motion.h1
              className="max-w-4xl font-serif text-5xl font-light leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl"
              initial={reduceMotion ? false : { y: 24, opacity: 0 }}
              animate={reduceMotion ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              {editorialCopy?.heroHeadline ?? 'Rare instruments, staged like a private recital.'}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-sm leading-7 text-white/78 sm:text-base"
              initial={reduceMotion ? false : { y: 18, opacity: 0 }}
              animate={reduceMotion ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.12, ease: 'easeOut' }}
            >
              {editorialCopy?.heroBody ?? 'A museum-grade collection of string, wind, percussion, and keyboard rarities presented with provenance, sound, and atmosphere.'}
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 border border-white/35 bg-[#8B0000] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white transition-colors hover:bg-[#690000]"
              >
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => setActive((v) => (v + 1) % (count || 1))}
                className="inline-flex items-center gap-3 border border-white/25 bg-white/5 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Next Frame <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative ml-auto w-full max-w-md border border-white/20 bg-black/20 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 text-[10px] uppercase tracking-[0.35em] text-white/65">
              <span>Current folio</span>
              <span>{current?.subtitle ?? ''}</span>
            </div>
            <div className="mt-4 aspect-[4/5] overflow-hidden">
              <img
                src={current?.image ?? ''}
                alt={current?.title ?? ''}
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/65">
              <span>{current?.eyebrow ?? ''}</span>
              <span>{String(active + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 pb-2">
          <div className="hidden max-w-xl border-l border-white/20 pl-4 text-xs leading-6 text-white/70 md:block">
            {editorialCopy?.heroNote ?? 'Scroll through the archive of instruments, each frame composed as a collectible object rather than a commodity.'}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActive((v) => (v - 1 + (count || 1)) % (count || 1))}
              className="grid h-11 w-11 place-items-center border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="h-24 w-px bg-white/20" />
            <button
              type="button"
              onClick={() => setActive((v) => (v + 1) % (count || 1))}
              className="grid h-11 w-11 place-items-center border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[18vw] border-l border-white/15 md:block">
        <div className="absolute inset-y-0 left-0 w-[1px] bg-[#8B0000]" style={{ height: `${((active + 1) / (count || 1)) * 100}%` }} />
        <div className="absolute bottom-8 left-6 text-[10px] uppercase tracking-[0.45em] text-white/55">
          Next frame
          <div className="mt-3 h-40 w-28 overflow-hidden border border-white/15">
            <img src={next?.image ?? ''} alt={next?.title ?? ''} crossOrigin="anonymous" className="h-full w-full object-cover opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedInstrumentsPreview({ items = instruments }: { items?: Instrument[] }) {
  const featured = useMemo(() => items?.filter((item) => item?.featured) ?? [], [items]);
  const list = (featured.length ? featured : items)?.slice(0, 4) ?? [];

  return (
    <section className="bg-[#F9F6F2] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6 border-b border-[#C9BBA8] pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#6F675E]">Featured instruments</p>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-[#2E2B28] sm:text-4xl">
              {editorialCopy?.featuredHeading ?? 'Objects with a voice, a lineage, and a room of their own.'}
            </h2>
          </div>
          <Link to="/collection" className="hidden text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8B0000] sm:inline-flex">
            View archive
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div className="group relative overflow-hidden border border-[#C9BBA8] bg-white" whileHover={{ y: -4 }}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={list?.[0]?.image ?? ''}
                alt={list?.[0]?.name ?? ''}
                crossOrigin="anonymous"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/70">{list?.[0]?.origin ?? ''}</p>
              <h3 className="mt-2 font-serif text-2xl font-light">{list?.[0]?.name ?? ''}</h3>
              <p className="mt-1 text-sm text-white/80">{list?.[0]?.description ?? ''}</p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {list?.slice(1, 4)?.map((item, index) => (
              <motion.article
                key={item?.id ?? index}
                className="group grid grid-cols-[0.9fr_1.1fr] border border-[#C9BBA8] bg-white"
                whileHover={{ x: 4 }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item?.image ?? ''}
                    alt={item?.name ?? ''}
                    crossOrigin="anonymous"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between p-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.45em] text-[#6F675E]">{item?.category ?? ''}</p>
                    <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-[#2E2B28]">{item?.name ?? ''}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6F675E]">{item?.story ?? item?.description ?? ''}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#C9BBA8] pt-3 text-[10px] uppercase tracking-[0.35em] text-[#6F675E]">
                    <span>{item?.year ?? ''}</span>
                    <span>{item?.condition ?? ''}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutStory() {
  return (
    <section className="bg-[#2E2B28] px-5 py-16 text-[#F9F6F2] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-white/15 p-6">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/55">About SurSangeet</p>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-tight sm:text-4xl">
            {editorialCopy?.aboutHeading ?? 'A private archive for instruments that deserve to be encountered, not merely listed.'}
          </h2>
        </div>
        <div className="grid gap-6 text-sm leading-7 text-white/78 sm:grid-cols-2">
          <p>{editorialCopy?.aboutBodyOne ?? 'SurSangeet curates rare and premium instruments through a lens of provenance, craftsmanship, and sonic character.'}</p>
          <p>{editorialCopy?.aboutBodyTwo ?? 'Every page is composed as an editorial spread: measured spacing, tactile surfaces, and imagery that honors the object as cultural artifact.'}</p>
          <div className="flex items-center gap-3 border-t border-white/15 pt-4 text-[10px] uppercase tracking-[0.35em] text-white/60 sm:col-span-2">
            <Sparkles className="h-4 w-4" />
            <span>Private viewings by inquiry</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialSections() {
  return (
    <div className="bg-[#F9F6F2]">
      <HeroCarousel />
      <FeaturedInstrumentsPreview />
      <AboutStory />
    </div>
  );
}

export default EditorialSections;