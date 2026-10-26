import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Info, ShoppingBag } from 'lucide-react';
import type { Instrument } from '@/types';
import { cn } from '@/lib/utils';

type InstrumentCardProps = {
  instrument?: Instrument | null;
  className?: string;
};

function Tooltip({ content = '', children = null }: { content?: string; children?: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-md border border-[#D7DCE2] bg-white px-2 py-1 text-[11px] font-medium text-[#17191C] opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        {content}
      </span>
    </span>
  );
}

export function InstrumentCard({ instrument = null, className = '' }: InstrumentCardProps) {
  if (!instrument?.slug) return null;

  const isSoldOut = instrument?.availability === 'sold-out';
  const availabilityLabel =
    instrument?.availability === 'available'
      ? 'Available'
      : instrument?.availability === 'limited'
        ? 'Limited'
        : 'Sold out';

  const accentMap: Record<NonNullable<Instrument['accent']>, string> = {
    red: 'bg-[#D32F2F]',
    green: 'bg-emerald-600',
    blue: 'bg-blue-600',
  };

  const card = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-[#D7DCE2] bg-white',
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <img
          src={instrument?.image ?? ''}
          alt={instrument?.name ?? 'Instrument'}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className={cn('inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white', accentMap[instrument?.accent ?? 'red'])}>
            {instrument?.category ?? ''}
          </span>
          <span className="inline-flex items-center rounded-md border border-white/70 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#17191C]">
            {availabilityLabel}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="max-w-[70%] rounded-md bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5E6670]">Quick view</p>
            <p className="mt-1 line-clamp-2 text-sm font-medium text-[#17191C]">{instrument?.description ?? ''}</p>
          </div>
          <div className="flex items-center gap-2">
            {isSoldOut ? (
              <Tooltip content="This instrument is currently unavailable">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/70 bg-white/90 text-[#5E6670]">
                  <Info className="h-4 w-4" />
                </span>
              </Tooltip>
            ) : (
              <Link
                to={`/instruments/${instrument?.slug ?? ''}`}
                aria-label={`View ${instrument?.name ?? 'instrument'}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#D32F2F] text-white transition-colors hover:bg-[#B71C1C]"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#17191C]">{instrument?.name ?? ''}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5E6670]">{instrument?.origin ?? ''}</p>
          </div>
          <p className="text-base font-semibold text-[#17191C]">₹{instrument?.price?.toLocaleString?.('en-IN') ?? '0'}</p>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-[#5E6670]">{instrument?.description ?? ''}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {(instrument?.materials ?? []).slice(0, 3).map((material) => (
            <span
              key={material}
              className="inline-flex items-center rounded-md border border-[#D7DCE2] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5E6670]"
            >
              {material}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#17191C]">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            {availabilityLabel}
          </span>
          {!isSoldOut ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#D32F2F]">
              <ShoppingBag className="h-3.5 w-3.5" />
              Explore
            </span>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5E6670]">Notify me</span>
          )}
        </div>
      </div>
    </motion.article>
  );

  return isSoldOut ? (
    <Tooltip content="This instrument is currently unavailable">
      <div>{card}</div>
    </Tooltip>
  ) : (
    <Link to={`/instruments/${instrument?.slug ?? ''}`} aria-label={`Open ${instrument?.name ?? 'instrument'}`}>
      {card}
    </Link>
  );
}

export default InstrumentCard;