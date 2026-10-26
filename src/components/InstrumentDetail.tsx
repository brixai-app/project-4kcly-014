import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, Globe2, MapPin, Sparkles } from 'lucide-react';
import { ContactDrawer } from '@/components/ContactForm';
import type { Instrument } from '@/types';
import { cn } from '@/lib/utils';

export function InstrumentDetail({
  instrument,
  className = '',
}: {
  instrument?: Instrument;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const safeInstrument = instrument ?? null;

  const badgeTone = useMemo(() => {
    const accent = safeInstrument?.accent ?? 'red';
    return accent === 'green'
      ? 'border-emerald-600/20 bg-emerald-50 text-emerald-700'
      : accent === 'blue'
        ? 'border-sky-600/20 bg-sky-50 text-sky-700'
        : 'border-red-600/20 bg-red-50 text-red-700';
  }, [safeInstrument?.accent]);

  const availabilityLabel = safeInstrument?.availability === 'available'
    ? 'Available'
    : safeInstrument?.availability === 'limited'
      ? 'Limited'
      : 'Sold out';

  const featureList = safeInstrument?.materials?.length
    ? safeInstrument.materials
    : ['Curated craftsmanship', 'Verified provenance', 'Editorial presentation'];

  return (
    <section className={cn('mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8', className)}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670] transition-colors hover:text-[#17191C]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 border border-[#17191C] bg-[#17191C] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#B71C1C]"
        >
          Inquire
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-4"
        >
          <div className="relative overflow-hidden border border-[#D6DADE] bg-[#F5F5F5]">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
              <span className={cn('border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]', badgeTone)}>
                {safeInstrument?.category ?? 'Instrument'}
              </span>
              <span className="border border-[#D6DADE] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                {availabilityLabel}
              </span>
            </div>
            <img
              src={safeInstrument?.image ?? 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85'}
              alt={safeInstrument?.name ?? 'Instrument detail'}
              crossOrigin="anonymous"
              className="h-[520px] w-full object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(safeInstrument?.gallery?.length ? safeInstrument.gallery : [safeInstrument?.image ?? 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85']).slice(0, 4).map((src, index) => (
              <div key={`${src}-${index}`} className="overflow-hidden border border-[#D6DADE] bg-white">
                <img
                  src={src}
                  alt={`${safeInstrument?.name ?? 'Instrument'} gallery ${index + 1}`}
                  crossOrigin="anonymous"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
          className="flex flex-col justify-between border border-[#D6DADE] bg-white p-6 sm:p-8"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670]">
                <Sparkles className="h-4 w-4 text-[#D32F2F]" />
                Collection story
              </p>
              <h1 className="font-['Playfair_Display'] text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl">
                {safeInstrument?.name ?? 'Instrument'}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[#5E6670]">
                {safeInstrument?.shortDescription ?? safeInstrument?.description ?? 'A refined instrument presented with editorial clarity and tactile detail.'}
              </p>
            </div>

            <div className="grid gap-3 border-y border-[#D6DADE] py-5 text-sm text-[#17191C]">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <Globe2 className="h-4 w-4 text-[#2E7D32]" />
                  Origin
                </span>
                <span className="text-right font-medium">{safeInstrument?.origin ?? 'Curated selection'}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <MapPin className="h-4 w-4 text-[#1565C0]" />
                  Price
                </span>
                <span className="text-right font-semibold">₹{safeInstrument?.price?.toLocaleString?.() ?? '0'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">Highlights</p>
              <ul className="space-y-3">
                {featureList.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-3 text-sm text-[#17191C]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D32F2F]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#D6DADE] pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-2 border border-[#D32F2F] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#B71C1C]"
            >
              Send inquiry
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-[#D6DADE] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#17191C] transition-colors hover:border-[#17191C]"
            >
              Contact studio
            </Link>
          </div>
        </motion.div>
      </div>

      <ContactDrawer open={open} onOpenChange={setOpen} instrumentId={safeInstrument?.id ?? ''} />
    </section>
  );
}

export default InstrumentDetail;