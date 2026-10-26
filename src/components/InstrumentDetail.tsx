import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Globe2, MapPin, Package, Sparkles } from 'lucide-react';
import type { Instrument } from '@/types';
import { cn } from '@/lib/utils';

export interface InstrumentDetailProps {
  className?: string;
  instrument?: Instrument;
}

export function InstrumentDetail({ className = '', instrument }: InstrumentDetailProps) {
  const featureTone = ['red', 'green', 'blue'] as const;
  const bullets = instrument?.materials?.length
    ? instrument.materials
    : ['Hand-finished surfaces', 'Balanced tonal response', 'Stage-ready build quality'];

  return (
    <section className={cn('grid gap-8 lg:grid-cols-[1.1fr_0.9fr]', className)}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="overflow-hidden rounded-[12px] border border-[#D7DDE3] bg-white"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
          <motion.img
            src={instrument?.image ?? 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85'}
            alt={instrument?.name ?? 'Instrument detail'}
            crossOrigin="anonymous"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
        </div>
        <div className="grid gap-px bg-[#D7DDE3] md:grid-cols-3">
          {(instrument?.gallery?.length ? instrument.gallery.slice(0, 3) : [instrument?.image, instrument?.image, instrument?.image]).map((src, index) => (
            <div key={`${src ?? 'gallery'}-${index}`} className="aspect-[4/3] bg-[#F5F5F5]">
              <img
                src={src ?? instrument?.image ?? 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'}
                alt={`${instrument?.name ?? 'Instrument'} gallery ${index + 1}`}
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        className="flex flex-col justify-between rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-6 md:p-8"
      >
        <div className="space-y-6">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#18222C] transition-colors hover:text-[#D32F2F]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </Link>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">
              {instrument?.family ?? 'Instrument'}
            </p>
            <h1 className="max-w-xl text-4xl font-light uppercase tracking-[0.18em] text-[#18222C] md:text-5xl">
              {instrument?.name ?? 'Selected Instrument'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#5F6B76]">
              <span className="font-semibold text-[#18222C]">₹{instrument?.price?.toLocaleString?.() ?? '0'}</span>
              <span className="h-1 w-1 rounded-full bg-[#D7DDE3]" />
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#D32F2F]" />
                {instrument?.availability ?? 'In Stock'}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-7 text-[#5F6B76]">
            <p>{instrument?.description ?? 'A tactile, performance-ready instrument shaped for expressive playing and a refined visual presence.'}</p>
            <p>{instrument?.shortDescription ?? 'Designed with balanced proportions, durable materials, and a warm tonal character for modern players.'}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[12px] border border-[#D7DDE3] bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
                <Package className="h-4 w-4 text-[#D32F2F]" />
                Details
              </div>
              <div className="space-y-2 text-sm text-[#18222C]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#5F6B76]" />
                  <span>{instrument?.origin ?? 'Crafted for global stages'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-[#5F6B76]" />
                  <span>{instrument?.dimensions ?? 'Balanced dimensions for comfortable play'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#D7DDE3] bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
                <Sparkles className="h-4 w-4 text-[#D32F2F]" />
                Features
              </div>
              <ul className="space-y-2">
                {bullets.slice(0, 3).map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-2 text-sm text-[#18222C]">
                    <span
                      className={cn(
                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                        featureTone[index % featureTone.length] === 'red' && 'bg-[#D32F2F]',
                        featureTone[index % featureTone.length] === 'green' && 'bg-emerald-600',
                        featureTone[index % featureTone.length] === 'blue' && 'bg-blue-600',
                      )}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#D7DDE3] pt-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">
            <CheckCircle2 className="h-4 w-4 text-[#D32F2F]" />
            Availability
          </div>
          <p className="mt-2 text-sm leading-7 text-[#18222C]">
            {instrument?.availability === 'Out of Stock'
              ? 'Currently unavailable, but you can revisit this piece when it returns.'
              : 'Ready for immediate exploration with a polished, tactile finish and dependable build quality.'}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default InstrumentDetail;