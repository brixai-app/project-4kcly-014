import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, Search, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';
import { instruments, instrumentCategories, instrumentConditions } from '@/data/mockData';
import type { FilterState, Instrument, InstrumentCategory, InstrumentCondition } from '@/types';

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc';

const originOptions = ['all', 'India', 'Italy', 'Japan', 'Germany', 'France', 'Spain'];

const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, '')) || 0;

export function CollectionToolbar({
  filters = { category: 'all', condition: 'all', origin: 'all', search: '' },
  sort = 'featured',
  onFiltersChange = () => {},
  onSortChange = () => {},
  resultCount = 0,
}: {
  filters?: FilterState;
  sort?: SortKey;
  onFiltersChange?: (next: FilterState) => void;
  onSortChange?: (next: SortKey) => void;
  resultCount?: number;
}) {
  const setFilter = (key: keyof FilterState, value: string) => onFiltersChange({ ...filters, [key]: value } as FilterState);
  return (
    <div className="sticky top-0 z-20 border-b border-[#C9BBA8] bg-[#F9F6F2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6F675E]">
            <Filter className="h-4 w-4" />
            Curated filters
          </div>
          <div className="text-sm text-[#6F675E]">{resultCount} instruments in view</div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="flex items-center gap-2 border border-[#C9BBA8] bg-white px-3 py-2 text-sm text-[#2E2B28]">
            <Search className="h-4 w-4 text-[#6F675E]" />
            <input
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search by name, maker, or material"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#6F675E]"
            />
          </label>
          <SelectField label="Category" value={filters.category} options={['all', ...instrumentCategories]} onChange={(v) => setFilter('category', v)} />
          <SelectField label="Condition" value={filters.condition} options={['all', ...instrumentConditions]} onChange={(v) => setFilter('condition', v)} />
          <SelectField label="Origin" value={filters.origin} options={originOptions} onChange={(v) => setFilter('origin', v)} />
          <SelectField
            label="Sort"
            value={sort}
            options={['featured', 'newest', 'price-asc', 'price-desc']}
            onChange={(v) => onSortChange(v as SortKey)}
          />
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label = '',
  value = '',
  options = [],
  onChange = () => {},
}: {
  label?: string;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 border border-[#C9BBA8] bg-white px-3 py-2 text-sm text-[#2E2B28]">
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6F675E]">{label}</span>
      <div className="relative flex-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent pr-6 text-right text-sm outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'All' : option.replace(/-/g, ' ')}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F675E]" />
      </div>
    </label>
  );
}

export function InstrumentCard({ instrument = instruments[0], index = 0 }: { instrument?: Instrument; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      className={cn(
        'group relative overflow-hidden border border-[#C9BBA8] bg-white',
        index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : index % 5 === 0 ? 'md:row-span-2' : 'md:col-span-1'
      )}
    >
      <Link to={`/collection/${instrument.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#EFE9E1]">
          <img
            src={instrument.image}
            alt={instrument.name}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/35 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            <span>{instrument.category}</span>
            <span>{instrument.condition}</span>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-['Bodoni_Moda'] text-2xl leading-none text-[#2E2B28]">{instrument.name}</h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6F675E]">
                {instrument.origin} · {instrument.year}
              </p>
            </div>
            <div className="text-sm font-semibold text-[#8B0000]">{instrument.price}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-[#6F675E]">{instrument.description}</p>
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6F675E]">
            {instrument.materials.slice(0, 3).map((material) => (
              <span key={material} className="border border-[#C9BBA8] px-2 py-1">
                {material}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          to={`/collection/${instrument.id}`}
          className="inline-flex items-center gap-2 bg-[#8B0000] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
        >
          View story
          <Sliders className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function InstrumentMasonryGrid({ items = [] }: { items?: Instrument[] }) {
  return (
    <motion.div layout className="grid auto-rows-[18rem] gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((instrument, index) => (
        <InstrumentCard key={instrument.id} instrument={instrument} index={index} />
      ))}
    </motion.div>
  );
}

export function CollectionShowcase({
  initialFilters = { category: 'all', condition: 'all', origin: 'all', search: '' },
}: {
  initialFilters?: FilterState;
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    const list = instruments.filter((item) => {
      const matchesCategory = filters.category === 'all' || item.category === filters.category;
      const matchesCondition = filters.condition === 'all' || item.condition === filters.condition;
      const matchesOrigin = filters.origin === 'all' || item.origin === filters.origin;
      const matchesSearch =
        !query ||
        [item.name, item.origin, item.year, item.description, item.story, ...item.materials].join(' ').toLowerCase().includes(query);
      return matchesCategory && matchesCondition && matchesOrigin && matchesSearch;
    });
    return [...list].sort((a, b) => {
      if (sort === 'newest') return Number(b.year) - Number(a.year);
      if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
      if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [filters, sort]);

  return (
    <section className="bg-[#F9F6F2] text-[#2E2B28]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6F675E]">Collection</p>
            <h2 className="mt-2 font-['Bodoni_Moda'] text-4xl font-light tracking-tight md:text-6xl">Rare instruments, carefully staged.</h2>
          </div>
          <div className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6F675E] md:flex">
            <span className="h-px w-10 bg-[#C9BBA8]" />
            <span>{filtered.length} results</span>
          </div>
        </div>
      </div>
      <CollectionToolbar filters={filters} sort={sort} onFiltersChange={setFilters} onSortChange={setSort} resultCount={filtered.length} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <InstrumentMasonryGrid items={filtered} />
      </div>
    </section>
  );
}

export default CollectionShowcase;