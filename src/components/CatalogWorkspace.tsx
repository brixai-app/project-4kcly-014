import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, RefreshCw, Search, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories, instruments } from '@/data/mockData';
import MasonryGrid from '@/components/MasonryGrid';
import type { AvailabilityStatus, Category, Instrument } from '@/types';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

type FilterDropdownProps = {
  label?: string;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
  className?: string;
};

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const availabilityOptions: (AvailabilityStatus | 'All')[] = ['All', 'available', 'limited', 'sold-out'];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const sanitizeSearch = (value: string) => value.replace(/[<>]/g, '').trim().slice(0, 60);

export function SearchBar({ value = '', onChange = () => {}, className = '' }: SearchBarProps) {
  return (
    <label className={cn('flex items-center gap-3 border border-[#D7DCE2] bg-white px-4 py-3', className)}>
      <Search className="h-4 w-4 text-[#5E6670]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search instruments"
        className="w-full bg-transparent text-sm text-[#17191C] outline-none placeholder:text-[#5E6670]"
      />
    </label>
  );
}

export function FilterDropdown({ label = 'Filter', value = '', options = [], onChange = () => {}, className = '' }: FilterDropdownProps) {
  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none border border-[#D7DCE2] bg-white px-4 py-3 pr-10 text-xs font-semibold uppercase tracking-widest text-[#17191C] outline-none"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E6670]" />
    </div>
  );
}

function CatalogWorkspace() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [availability, setAvailability] = useState<AvailabilityStatus | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setSearch(sanitizeSearch(searchInput)), 220);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const list = instruments.filter((item) => {
      const matchesSearch =
        !q ||
        [item.name, item.category, item.origin, item.description, ...(item.materials ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(q);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesAvailability = availability === 'All' || item.availability === availability;
      return matchesSearch && matchesCategory && matchesAvailability;
    });

    const sorted = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [availability, search, selectedCategories, sort]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]));
  };

  const clearAll = () => {
    setSearchInput('');
    setSearch('');
    setSelectedCategories([]);
    setAvailability('All');
    setSort('featured');
  };

  const cards = useMemo(
    () =>
      filtered.map((item: Instrument) => ({
        ...item,
        href: `/catalog/${item.slug}`,
      })),
    [filtered]
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-20 mb-6 border border-[#D7DCE2] bg-white/95 backdrop-blur">
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Sliders className="h-4 w-4 text-[#D32F2F]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#5E6670]">Catalog Workspace</p>
                <p className="text-sm text-[#17191C]">{filtered.length} instruments refined for the current view</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 self-start border border-[#D7DCE2] px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#17191C] transition-colors hover:border-[#D32F2F] hover:text-[#D32F2F]"
            >
              <RefreshCw className="h-4 w-4" />
              Clear All
            </button>
          </div>

          <div className="grid gap-3 border-t border-[#D7DCE2] p-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <SearchBar value={searchInput} onChange={setSearchInput} />
            <FilterDropdown
              label="Availability"
              value={availability}
              options={availabilityOptions}
              onChange={(value) => setAvailability(value as AvailabilityStatus | 'All')}
            />
            <FilterDropdown
              label="Sort"
              value={sort}
              options={sortOptions.map((option) => option.label)}
              onChange={(value) => {
                const match = sortOptions.find((option) => option.label === value);
                setSort(match?.value ?? 'featured');
              }}
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={cn(
                      'border px-3 py-3 text-xs font-semibold uppercase tracking-widest transition-colors',
                      active ? 'border-[#D32F2F] bg-[#D32F2F] text-white' : 'border-[#D7DCE2] bg-white text-[#17191C] hover:border-[#D32F2F] hover:text-[#D32F2F]'
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 border border-[#D7DCE2] px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#17191C] transition-colors hover:border-[#D32F2F] hover:text-[#D32F2F]"
              >
                <Filter className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-[3/4] animate-pulse bg-[#F5F5F5]" />
              ))}
            </div>
          ) : (
            <MasonryGrid instruments={cards} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default CatalogWorkspace;
export { CatalogWorkspace };
