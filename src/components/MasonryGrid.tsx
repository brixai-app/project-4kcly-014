import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Instrument } from '@/types';
import InstrumentCard from '@/components/InstrumentCard';

export type MasonryGridProps = {
  instruments?: Instrument[];
  className?: string;
};

export function MasonryGrid({ instruments = [], className = '' }: MasonryGridProps) {
  const items = instruments ?? [];
  if (!items.length) {
    return (
      <section className={cn('w-full px-4 py-16 sm:px-6 lg:px-8', className)}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 border border-[#D7DCE2] bg-[#F5F5F5] px-5 py-6 text-[#5E6670]">
          <AlertCircle className="h-5 w-5 text-[#D32F2F]" />
          <p className="text-sm font-medium tracking-wide">No instruments are available right now.</p>
        </div>
      </section>
    );
  }

  const columns = [items.filter((_, i) => i % 3 === 0), items.filter((_, i) => i % 3 === 1), items.filter((_, i) => i % 3 === 2)];

  return (
    <section className={cn('w-full px-4 py-10 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={cn('flex flex-col gap-5', columnIndex === 1 ? 'md:pt-12' : columnIndex === 2 ? 'md:pt-24' : '')}>
            {column.map((instrument, index) => (
              <motion.div
                key={instrument?.id ?? `${columnIndex}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <InstrumentCard instrument={instrument} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MasonryGrid;