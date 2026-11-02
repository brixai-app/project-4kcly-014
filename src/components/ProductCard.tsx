import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { Product, ProductCardProps } from '@/types';
import { cn } from '@/lib/utils';

export function ProductCard({
  product = null,
  onSelect = () => undefined,
  onQuickAction = () => undefined,
  className = '',
}: ProductCardProps) {
  const safeProduct = product ?? null;
  if (!safeProduct) return null;

  const accentMap: Record<NonNullable<Product['accent']>, string> = {
    red: 'border-[#E63946] text-[#E63946]',
    green: 'border-[#2A9D8F] text-[#2A9D8F]',
    blue: 'border-[#1D3557] text-[#1D3557]',
  };

  const accentClass = accentMap[safeProduct?.accent ?? 'blue'] ?? accentMap.blue;
  const imageSrc = safeProduct?.image?.trim() || `https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80 ?? safeProduct?.id ?? 'instrument')}/1200/800`;

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={cn(
        'group relative overflow-hidden rounded-[24px] border bg-[#FFFDF2] shadow-[0_18px_50px_rgba(29,53,87,0.08)]',
        'focus-within:ring-2 focus-within:ring-[#E63946]/40',
        accentClass,
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(safeProduct)}
        className="block w-full text-left"
        aria-label={`View details for ${safeProduct?.name ?? 'instrument'}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1DE]">
          <motion.img
            src={imageSrc}
            alt={safeProduct?.name ?? 'Instrument image'}
            crossOrigin="anonymous"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D3557]/55 via-transparent to-transparent opacity-90" />
          <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-md border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-sm">
            <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
              {safeProduct?.category ?? 'Instrument'}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
                {safeProduct?.origin ?? 'Curated selection'}
              </p>
              <h3 className="mt-1 line-clamp-2 text-2xl font-light tracking-tight text-white">
                {safeProduct?.name ?? 'Untitled instrument'}
              </h3>
            </div>
            <div className="shrink-0 rounded-md border border-white/25 bg-white/15 px-3 py-2 text-right backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75">Price</p>
              <p className="text-lg font-semibold text-white">₹{Number(safeProduct?.price ?? 0).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between gap-3 border-t border-[#C9C3A8]/70 px-4 py-3">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#596579]">
          {safeProduct?.description ?? 'Explore the instrument details and tonal character.'}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickAction(safeProduct)}
            className="inline-flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-[#F4F1DE] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1D3557] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
            aria-label={`Quick view ${safeProduct?.name ?? 'instrument'}`}
          >
            <Eye className="h-4 w-4" />
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;