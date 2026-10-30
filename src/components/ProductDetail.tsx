import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Heart, MapPin, MessageCircle, Shield, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/ShowcaseContext';
import type { Instrument } from '@/types';

export function ProductDetail({ className = '' }: { className?: string }) {
  const { id } = useParams<{ id?: string }>();
  const { instruments = [], openInquiryDrawer = () => {}, setNavigationState = () => {} } = useShowcase() ?? {};
  const [index, setIndex] = useState(0);

  const instrument = useMemo(() => instruments?.find((item) => item?.id === id) ?? null, [instruments, id]);
  const images = useMemo(() => {
    const base = instrument?.image ? [instrument.image] : [];
    const fallback = [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    ];
    return [...base, ...fallback].slice(0, 4);
  }, [instrument?.image]);

  const specs = instrument?.specs ?? {};
  const specRows = [
    ['Origin', specs?.origin],
    ['Material', specs?.material],
    ['Dimensions', specs?.dimensions],
    ['Weight', specs?.weight],
    ['Finish', specs?.finish],
    ['Tuning', specs?.tuning],
    ['Power', specs?.power],
    ['Accessories', specs?.includedAccessories?.join(', ')],
  ].filter(([, value]) => Boolean(value));

  const openInquiry = () => {
    setNavigationState?.((prev: any) => ({ ...(prev ?? {}), activeInstrumentId: instrument?.id ?? null, isDrawerOpen: true }));
    openInquiryDrawer?.(instrument as Instrument);
  };

  if (!instrument) {
    return (
      <section className={cn('mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8', className)}>
        <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6368]">Instrument not found</p>
          <h1 className="mt-3 font-['Outfit'] text-4xl font-light tracking-tight text-[#1A1A1A]">This piece is no longer available.</h1>
          <p className="mt-3 max-w-2xl font-['Roboto'] text-sm leading-6 text-[#5F6368]">
            The requested instrument could not be resolved. Explore the catalog or return to the collection to continue browsing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8', className)}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
            <div className="relative aspect-[4/5] w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images?.[index] ?? instrument?.image}
                  src={images?.[index] ?? instrument?.image}
                  alt={instrument?.name ?? 'Instrument'}
                  crossOrigin="anonymous"
                  initial={{ opacity: 0, scale: 1.03, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-none bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1A1A1A] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#E63946]" />
                {instrument?.category}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="inline-flex items-center gap-2 rounded-none border border-[#D8D4CC] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] shadow-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                  className="inline-flex items-center gap-2 rounded-none border border-[#D8D4CC] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] shadow-sm"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'relative h-24 w-24 shrink-0 overflow-hidden rounded-[14px] border bg-[#F4F1EB] transition',
                  index === i ? 'border-[#E63946] ring-1 ring-[#E63946]' : 'border-[#D8D4CC]'
                )}
              >
                <img src={src} alt={`${instrument?.name ?? 'Instrument'} ${i + 1}`} crossOrigin="anonymous" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[18px] border border-[#D8D4CC] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6368]">{instrument?.category}</p>
                <h1 className="mt-2 font-['Outfit'] text-4xl font-light tracking-tight text-[#1A1A1A] sm:text-5xl">{instrument?.name}</h1>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6368]">Price</p>
                <p className="mt-2 font-['Outfit'] text-3xl font-semibold tracking-tight text-[#1A1A1A]">₹{instrument?.price?.toLocaleString?.() ?? instrument?.price}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#5F6368]">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-[#E63946] text-[#E63946]" />
                {instrument?.rating?.toFixed?.(1) ?? '4.8'} rating
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E63946]" />
                {instrument?.inStock === false ? 'Out of stock' : 'Available for inquiry'}
              </span>
            </div>

            <p className="mt-5 max-w-2xl font-['Roboto'] text-sm leading-7 text-[#5F6368]">{instrument?.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openInquiry}
                className="inline-flex items-center gap-2 rounded-none bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-[#C92D39]"
              >
                <MessageCircle className="h-4 w-4" />
                Request Info
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-none border border-[#D8D4CC] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#1A1A1A] transition hover:border-[#1A1A1A]"
              >
                <Heart className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">
                <Shield className="h-4 w-4 text-[#E63946]" />
                Trusted handling
              </div>
              <p className="mt-3 text-sm leading-6 text-[#1A1A1A]">Inspected, packed, and prepared with careful instrument-grade handling.</p>
            </div>
            <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">
                <Clock className="h-4 w-4 text-[#E63946]" />
                Response window
              </div>
              <p className="mt-3 text-sm leading-6 text-[#1A1A1A]">Our team typically responds within one business day with availability and guidance.</p>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6368]">Specifications</p>
            <div className="mt-4 divide-y divide-[#D8D4CC]">
              {specRows.length ? (
                specRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[140px_1fr] gap-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F6368]">{label}</span>
                    <span className="text-sm leading-6 text-[#1A1A1A]">{value}</span>
                  </div>
                ))
              ) : (
                <p className="py-3 text-sm text-[#5F6368]">Detailed specifications are available on request.</p>
              )}
            </div>
          </div>

          <div className="rounded-[18px] border border-[#D8D4CC] bg-white p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-[#E63946]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">Inquiry journey</p>
                <p className="mt-2 text-sm leading-6 text-[#1A1A1A]">
                  Open the inquiry drawer to ask about availability, shipping, or a tailored recommendation for this instrument.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;