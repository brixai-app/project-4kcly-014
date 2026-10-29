import React from 'react';
import { motion } from 'framer-motion';
import { Instrument } from '@/types';
import { cn } from '@/lib/utils';

export interface InstrumentGridProps {
  instruments?: Instrument[];
  className?: string;
}

function InstrumentCard({ instrument }: { instrument: Instrument }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group break-inside-avoid overflow-hidden rounded-[18px] border border-[#D8DEE5] bg-white shadow-[0_18px_40px_rgba(34,34,34,0.08)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F5F2]">
        <img
          src={instrument?.image ?? ''}
          alt={instrument?.name ?? 'Instrument'}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85">
            {instrument?.category ?? 'instrument'}
          </p>
          <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-tight text-white">
            {instrument?.name ?? 'Untitled Instrument'}
          </h3>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <p className="min-w-0 flex-1 text-sm leading-6 text-[#5E6670]">
          {instrument?.description ?? ''}
        </p>
        <p className="shrink-0 text-sm font-semibold text-[#222222]">
          ₹{Number(instrument?.price ?? 0).toLocaleString('en-IN')}
        </p>
      </div>
    </motion.article>
  );
}

export function InstrumentGrid({ instruments = [], className = '' }: InstrumentGridProps) {
  if (!instruments?.length) {
    return (
      <div className={cn('rounded-[18px] border border-dashed border-[#D8DEE5] bg-[#F7F5F2] p-8 text-center', className)}>
        <p className="text-sm font-medium text-[#222222]">No instruments found.</p>
        <p className="mt-2 text-sm text-[#5E6670]">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className={cn('columns-1 gap-5 sm:columns-2 lg:columns-3', className)}>
      {instruments.map((instrument) => (
        <div key={instrument?.id ?? instrument?.name}>
          <InstrumentCard instrument={instrument} />
        </div>
      ))}
    </div>
  );
}

export default InstrumentGrid;