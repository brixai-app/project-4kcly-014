import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Circle as Loader2, Search } from 'lucide-react';
import InstrumentCard from '@/components/InstrumentCard';
import type { Instrument } from '@/types';
import { cn } from '@/lib/utils';

export function MasonryGrid({
  items = [],
  loading = false,
  emptyTitle = 'No instruments found',
  emptyDescription = 'Try adjusting your search or filters to reveal more of the collection.',
  className = '',
}: {
  items?: Instrument[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}) {
  const columns = [[], [], []] as Instrument[][];
  (items ?? []).forEach((item, index) => columns[index % 3]?.push(item));
  return (
    <section className={cn('w-full', className)}>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-[10px] border border-[#D6DADE] bg-[#F5F5F5]">
              <div className="aspect-[3/4] animate-pulse bg-[#E9ECEF]" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-20 animate-pulse bg-[#E9ECEF]" />
                <div className="h-4 w-3/4 animate-pulse bg-[#E9ECEF]" />
                <div className="h-4 w-1/2 animate-pulse bg-[#E9ECEF]" />
              </div>
            </div>
          ))}
        </div>
      ) : items?.length ? (
        <motion.div layout className="grid gap-4 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {columns.map((column, columnIndex) => (
              <motion.div key={columnIndex} layout className="space-y-4">
                {column.map((instrument) => (
                  <motion.div
                    key={instrument.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <InstrumentCard instrument={instrument} />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center border border-dashed border-[#D6DADE] bg-white px-6 py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#D6DADE] bg-[#F5F5F5] text-[#D32F2F]">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="font-['Playfair_Display'] text-2xl font-medium tracking-tight text-[#17191C]">
            {emptyTitle}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#5E6670]">{emptyDescription}</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670]">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            <span>Refine filters</span>
            <AlertCircle className="h-4 w-4 text-[#1565C0]" />
          </div>
        </div>
      )}
    </section>
  );
}

export default MasonryGrid;