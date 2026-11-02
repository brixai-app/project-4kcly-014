import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Filter, Search, Sliders } from 'lucide-react';
import { CatalogControls } from '@/components/CatalogControls';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import type { CatalogFilter, Product } from '@/types';
import { cn } from '@/lib/utils';

type ApiResponse = Product[] | { products?: Product[] };

const defaultFilters: CatalogFilter = { query: '', category: 'All', sortBy: 'featured' };

const normalizeProduct = (item: Partial<Product> & { id?: string | number } = {}): Product => ({
  id: String(item.id ?? crypto.randomUUID()),
  name: item.name ?? 'Untitled Instrument',
  category: item.category ?? 'Accessories',
  price: Number(item.price ?? 0),
  image: item.image ?? 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
  description: item.description ?? '',
  origin: item.origin ?? '',
  featured: Boolean(item.featured),
  slug: item.slug ?? String(item.name ?? 'instrument').toLowerCase().replace(/\s+/g, '-'),
  accent: item.accent ?? 'red',
});

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<CatalogFilter>(defaultFilters);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Unable to load catalog');
        const data: ApiResponse = await res.json();
        const list = Array.isArray(data) ? data : data?.products ?? [];
        if (active) setProducts(list.map(normalizeProduct));
      } catch {
        if (active) setError('We could not load the live catalog right now. Please try again in a moment.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery =
        !query ||
        [product.name, product.category, product.description, product.origin]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      return matchesQuery && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });

    return sorted;
  }, [filters, products]);

  return (
    <section className="bg-[#F4F1DE] px-4 py-8 text-[#1D3557] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 border-b border-[#C9C3A8] pb-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#596579]">
              <Sliders className="h-4 w-4" />
              Live catalog
            </p>
            <h1 className="max-w-3xl text-4xl font-light tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl">
              Discover instruments with tactile color, editorial rhythm, and live inventory.
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#596579]">
            <Search className="h-4 w-4" />
            <span>{visibleProducts.length} results</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="min-w-0 rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-4 shadow-[0_18px_50px_rgba(29,53,87,0.06)]">
            <div className="mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#E63946]" />
              <h2 className="min-w-0 truncate text-sm font-semibold uppercase tracking-[0.24em] text-[#1D3557]">
                Filters
              </h2>
            </div>
            <CatalogControls filters={filters} categories={categories} onChange={setFilters} />
            <div className="mt-4 rounded-[20px] border border-[#C9C3A8] bg-[#F4F1DE] p-4">
              <p className="text-sm leading-6 text-[#596579]">
                Browse by collection, refine by category, and open any instrument for a closer look.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            {loading ? (
              <LoadingSpinner fullSection title="Loading catalog" subtitle="Fetching live instruments from the archive." />
            ) : error ? (
              <div className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-[#E63946]" />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-[#1D3557]">Catalog unavailable</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#596579]">{error}</p>
                  </div>
                </div>
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#596579]">No matches</p>
                <p className="mt-3 max-w-xl text-base leading-7 text-[#596579]">
                  Try a different keyword or category to uncover more instruments in the collection.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:bg-[#C92535]"
                >
                  Reset filters
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="columns-1 gap-5 sm:columns-2 xl:columns-3"
              >
                {visibleProducts.map((product) => (
                  <div key={product.id} className="mb-5 break-inside-avoid">
                    <ProductCard product={product} onSelect={setSelected} onQuickAction={setSelected} />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <ProductDetailModal open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} product={selected} />
    </section>
  );
}
export { CatalogPage };
