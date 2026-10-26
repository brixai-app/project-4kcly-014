import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Instrument } from '@/types';
import { cn } from '@/lib/utils';

export interface InstrumentCardProps {
  className?: string;
  instrument?: Instrument;
}

const availabilityStyles: Record<Instrument['availability'], string> = {
  'In Stock': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Limited: 'bg-amber-50 text-amber-700 ring-amber-200',
  Preorder: 'bg-blue-50 text-blue-700 ring-blue-200',
  'Out of Stock': 'bg-neutral-100 text-neutral-500 ring-neutral-200',
};

export function InstrumentCard({ className = '', instrument }: InstrumentCardProps) {
  const item = instrument ?? ({} as Instrument);
  const priceLabel = typeof item?.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : 'Price on request';
  const href = item?.slug ? `/instruments/${item.slug}` : '/catalog';
  const accentRing =
    item?.accent === 'red'
      ? 'group-hover:ring-[#D32F2F]/20'
      : item?.accent === 'green'
        ? 'group-hover:ring-emerald-500/20'
        : 'group-hover:ring-blue-500/20';

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={cn('group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[#D7DDE3] bg-white shadow-sm', accentRing, className)}
    >
      <Link to={href} className="block focus:outline-none">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
          <img
            src={item?.image ?? 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80'}
            alt={item?.name ?? 'Instrument'}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            {item?.featured ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#18222C]">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            ) : null}
            {item?.newArrival ? (
              <span className="inline-flex rounded-md bg-[#D32F2F] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                New
              </span>
            ) : null}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
            <span className={cn('inline-flex rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ring-1', availabilityStyles[item?.availability ?? 'In Stock'])}>
              {item?.availability ?? 'In Stock'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#18222C] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">{item?.family ?? item?.category ?? 'Instrument'}</p>
            <Link to={href} className="block focus:outline-none">
              <h3 className="mt-1 truncate text-base font-semibold text-[#18222C] transition-colors group-hover:text-[#D32F2F]">
                {item?.name ?? 'Untitled Instrument'}
              </h3>
            </Link>
          </div>
          <p className="shrink-0 text-sm font-semibold text-[#18222C]">{priceLabel}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[#5F6B76]">{item?.shortDescription ?? item?.description ?? ''}</p>
      </div>
    </motion.article>
  );
}

export default InstrumentCard;