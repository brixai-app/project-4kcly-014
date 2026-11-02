import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, RefreshCw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Instrument, SectionProps } from '@/types';

type CatalogSectionProps = SectionProps & {
  category?: string;
  onSelect?: (instrument: Instrument) => void;
  onQuickListen?: (instrument: Instrument) => void;
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
];

function InstrumentCard({
  instrument,
  onSelect,
  onQuickListen,
}: {
  instrument?: Instrument;
  onSelect?: (instrument: Instrument) => void;
  onQuickListen?: (instrument: Instrument) => void;
}) {
  const item = instrument ?? null;
  if (!item) return null;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group overflow-hidden rounded-md border border-[#D7DFDD] bg-white"
    >
      <button type="button" onClick={() => onSelect?.(item)} className="block w-full text-left">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F9FAFB]">
          <img
            src={item.image ?? fallbackImages[0]}
            alt={item.name ?? 'Instrument'}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
              Quick view
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickListen?.(item);
              }}
              className="inline-flex items-center gap-2 rounded-sm bg-[#E63946] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#C92E3A]"
            >
              Listen
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </button>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5E6E73]">
              {item.category ?? 'Instrument'}
            </p>
            <h3 className="truncate text-base font-semibold text-[#142D35]">{item.name ?? 'Untitled'}</h3>
          </div>
          <span className="shrink-0 text-sm font-semibold text-[#142D35]">
            {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : 'Enquire'}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[#5E6E73]">{item.description ?? ''}</p>
      </div>
    </motion.article>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-md border border-[#D7DFDD] bg-white">
      <div className="aspect-[3/4] animate-pulse bg-[#F9FAFB]" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-24 animate-pulse bg-[#D7DFDD]" />
        <div className="h-5 w-3/4 animate-pulse bg-[#D7DFDD]" />
        <div className="h-4 w-full animate-pulse bg-[#D7DFDD]" />
        <div className="h-4 w-5/6 animate-pulse bg-[#D7DFDD]" />
      </div>
    </div>
  );
}

export function CatalogSection({
  className = '',
  title = 'Catalog',
  subtitle = 'A living archive of instruments shaped by craft, resonance, and place.',
  category = '',
  onSelect,
  onQuickListen,
}: CatalogSectionProps) {
  const [items, setItems] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/instruments');
        const json = (await res.json().catch(() => null)) as { success?: boolean; data?: Instrument[]; message?: string; error?: string } | null;
        if (!res.ok || json?.success === false) throw new Error(json?.message ?? json?.error ?? 'Unable to load instruments.');
        const data = Array.isArray(json?.data) ? json?.data : [];
        if (active) setItems(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load instruments.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [retryKey]);

  const filtered = useMemo(() => {
    const q = category.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => (item.category ?? '').toString().toLowerCase() === q);
  }, [items, category]);

  const columns = useMemo(() => {
    const left: Instrument[] = [];
    const middle: Instrument[] = [];
    const right: Instrument[] = [];
    filtered.forEach((item, index) => {
      const bucket = index % 3;
      if (bucket === 0) left.push(item);
      else if (bucket === 1) middle.push(item);
      else right.push(item);
    });
    return [left, middle, right];
  }, [filtered]);

  return (
    <section className={cn('bg-white px-4 py-16 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 border-b border-[#D7DFDD] pb-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E63946]">Live catalog</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#142D35] sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5E6E73]">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setRetryKey((v) => v + 1)}
            className="inline-flex items-center gap-2 self-start rounded-sm border border-[#D7DFDD] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#142D35] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-start gap-4 rounded-md border border-[#D7DFDD] bg-[#F9FAFB] p-6">
            <div className="flex items-center gap-3 text-[#142D35]">
              <AlertCircle className="h-5 w-5 text-[#E63946]" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setRetryKey((v) => v + 1)}
              className="inline-flex items-center gap-2 rounded-sm bg-[#E63946] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#C92E3A]"
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-md border border-[#D7DFDD] bg-[#F9FAFB] p-6">
            <div className="flex items-center gap-3 text-[#142D35]">
              <Search className="h-5 w-5 text-[#5E6E73]" />
              <p className="text-sm font-medium">No instruments match this filter.</p>
            </div>
            <button
              type="button"
              onClick={() => setRetryKey((v) => v + 1)}
              className="inline-flex items-center gap-2 rounded-sm border border-[#D7DFDD] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#142D35] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
            >
              Reload
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                {column.map((instrument) => (
                  <InstrumentCard
                    key={instrument.id ?? instrument.slug}
                    instrument={instrument}
                    onSelect={onSelect}
                    onQuickListen={onQuickListen}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CatalogSection;