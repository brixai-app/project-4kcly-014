import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Instrument } from '@/types';

export function InstrumentCard({
  instrument,
  className = '',
}: {
  instrument?: Instrument;
  className?: string;
}) {
  const item = instrument ?? null;
  const isAvailable = item?.availability !== 'sold-out';
  const statusLabel =
    item?.availability === 'available'
      ? 'In Stock'
      : item?.availability === 'limited'
        ? 'Limited'
        : 'Sold Out';

  const statusIcon =
    item?.availability === 'available' ? (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ) : item?.availability === 'limited' ? (
      <Clock className="h-3.5 w-3.5" />
    ) : (
      <XCircle className="h-3.5 w-3.5" />
    );

  const accentClass =
    item?.accent === 'green'
      ? 'bg-emerald-500'
      : item?.accent === 'blue'
        ? 'bg-sky-500'
        : 'bg-[#D32F2F]';

  const card = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('group relative overflow-hidden rounded-[10px] border border-[#D6DADE] bg-white', className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <img
          src={item?.image ?? 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'}
          alt={item?.name ?? 'Instrument'}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', accentClass)} aria-hidden="true" />
          <span className="bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#17191C]">
            {item?.category ?? 'Instrument'}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-1.5 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#17191C]">
          {statusIcon}
          <span>{statusLabel}</span>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="max-w-[70%] text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
              {item?.origin ?? 'India'}
            </p>
            <h3 className="mt-1 text-2xl font-medium leading-tight tracking-tight">
              {item?.name ?? 'Untitled Instrument'}
            </h3>
          </div>
          <div className="text-right text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">Price</p>
            <p className="mt-1 text-lg font-semibold">₹{item?.price?.toLocaleString('en-IN') ?? '0'}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className="line-clamp-2 text-sm leading-6 text-[#5E6670]">
          {item?.shortDescription ?? 'A refined instrument profile with editorial detail and tactile presence.'}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(item?.materials ?? []).slice(0, 2).map((material) => (
              <span
                key={material}
                className="border border-[#D6DADE] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5E6670]"
              >
                {material}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#17191C]">
            Explore
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {!isAvailable ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]"
          aria-hidden="true"
        >
          <div className="border border-[#D6DADE] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#17191C] shadow-sm">
            Unavailable
          </div>
        </div>
      ) : null}
    </motion.article>
  );

  if (!item) return <div className={cn('rounded-[10px] border border-[#D6DADE] bg-white', className)}>{card}</div>;

  return isAvailable ? (
    <Link to={`/instruments/${item.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F] focus-visible:ring-offset-2">
      {card}
    </Link>
  ) : (
    <div
      className="block cursor-not-allowed focus:outline-none"
      aria-disabled="true"
      title="This instrument is currently unavailable"
    >
      {card}
    </div>
  );
}

export default InstrumentCard;