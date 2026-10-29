import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Circle as ChevronLeft, ChevronRight, CheckCircle2, MapPin, Shield, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Instrument } from '@/types';

type InstrumentDetailProps = {
  instrument?: Instrument | null;
  className?: string;
  onBack?: () => void;
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
];

export function InstrumentDetail({ instrument = null, className = '', onBack = () => undefined }: InstrumentDetailProps) {
  const images = useMemo(() => {
    const primary = instrument?.image ?? fallbackImages[0];
    return [primary, ...fallbackImages.filter((img) => img !== primary)].slice(0, 4);
  }, [instrument?.image]);

  const [index, setIndex] = useState(0);
  const specEntries = useMemo(
    () =>
      Object.entries(instrument?.specifications ?? {}).filter(([, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        return Boolean(value);
      }),
    [instrument?.specifications],
  );

  const next = () => setIndex((current) => (current + 1) % images.length);
  const prev = () => setIndex((current) => (current - 1 + images.length) % images.length);

  return (
    <section className={cn('w-full bg-white text-[#222222]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onBack()}
            className="inline-flex items-center gap-2 rounded-md border border-[#D8DEE5] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[#222222] shadow-sm transition hover:border-[#E63946] hover:text-[#E63946]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </button>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-md border border-[#D8DEE5] bg-[#F7F5F2] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[#222222] transition hover:bg-white"
          >
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] shadow-[0_18px_50px_rgba(34,34,34,0.08)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={instrument?.name ?? 'Instrument image'}
                  crossOrigin="anonymous"
                  initial={{ opacity: 0, scale: 1.03, x: 18 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -18 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/70 bg-white/90 text-[#222222] shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/70 bg-white/90 text-[#222222] shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-[#D8DEE5] bg-white px-4 py-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-2.5 flex-1 rounded-none transition-all',
                    i === index ? 'bg-[#E63946]' : 'bg-[#D8DEE5] hover:bg-[#5E6670]',
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5E6670]">
                <span className="inline-flex items-center gap-1 rounded-md border border-[#D8DEE5] bg-[#F7F5F2] px-2.5 py-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {instrument?.category ?? 'featured'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#D8DEE5] bg-[#F7F5F2] px-2.5 py-1">
                  <Star className="h-3.5 w-3.5" />
                  {instrument?.featured ? 'curated selection' : 'editorial detail'}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-light tracking-tight text-[#222222] sm:text-5xl">{instrument?.name ?? 'Instrument Detail'}</h1>
                <p className="max-w-xl text-sm leading-7 text-[#5E6670] sm:text-base">
                  {instrument?.description ??
                    'A refined instrument profile with tactile materials, expressive tone, and a composition designed to feel as considered as the sound itself.'}
                </p>
              </div>

              <div className="flex items-end justify-between gap-4 rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#5E6670]">Price</p>
                  <p className="mt-1 text-3xl font-semibold text-[#222222]">₹{instrument?.price?.toLocaleString?.() ?? '0'}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#222222]">
                  <CheckCircle2 className="h-4 w-4 text-[#E63946]" />
                  {instrument?.inStock ?? true ? 'In stock' : 'Out of stock'}
                </div>
              </div>
            </div>

            <div className="grid gap-3 rounded-[18px] border border-[#D8DEE5] bg-white p-4 shadow-sm sm:grid-cols-2">
              {specEntries.length > 0 ? (
                specEntries.map(([key, value]) => (
                  <div key={key} className="min-w-0 rounded-md bg-[#F7F5F2] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5E6670]">{key}</p>
                    <p className="mt-1 break-words text-sm text-[#222222]">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                ))
              ) : (
                <div className="sm:col-span-2 rounded-md bg-[#F7F5F2] p-3 text-sm text-[#5E6670]">
                  Detailed specifications will appear here as the collection expands.
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {(instrument?.tags ?? ['handcrafted', 'editorial', 'limited']).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-[#D8DEE5] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[#222222]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid gap-3 rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] p-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 text-[#E63946]" />
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Curated quality</p>
                  <p className="text-sm text-[#5E6670]">Selected for tone, finish, and presence.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[#E63946]" />
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Origin story</p>
                  <p className="text-sm text-[#5E6670]">{instrument?.specifications?.origin ?? 'Crafted with a global sensibility.'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#E63946]" />
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Ready to explore</p>
                  <p className="text-sm text-[#5E6670]">Swipe through imagery and compare the details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstrumentDetail;