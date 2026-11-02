import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe2, Leaf, Flame } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import type { Product } from '@/types';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (!active) return;
        setProducts(Array.isArray(data) ? data : data?.products ?? []);
      } catch {
        if (active) setProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => products.filter((p) => p?.featured).slice(0, 5), [products]);
  const accentProducts = useMemo(() => products.slice(0, 8), [products]);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p?.category ?? ''))).filter(Boolean), [products]);

  return (
    <main className="bg-[#F4F1DE] text-[#1D3557]">
      <HeroBanner />
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-6 shadow-[0_18px_50px_rgba(29,53,87,0.08)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#596579]">
              <Sparkles className="h-4 w-4 text-[#E63946]" />
              Curated live collection
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-tight sm:text-4xl">Instruments with tactile presence, editorial rhythm, and a distinctly Indian pulse.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#596579]">Browse live records from the catalog, then open any piece for a closer look at its story, finish, and tonal character.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#C92535]">
                Explore catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#1D3557] transition hover:bg-white">
                Our story
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-3 rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-4 sm:grid-cols-2">
            {[
              { icon: Leaf, title: 'Organic geometry', text: 'Rounded forms and warm surfaces.' },
              { icon: Flame, title: 'Saturated accents', text: 'Red, green, and deep blue cadence.' },
              { icon: Globe2, title: 'Global sourcing', text: 'Verified photography and live data.' },
              { icon: Sparkles, title: 'Editorial motion', text: 'Framer Motion transitions throughout.' },
            ].map((item) => (
              <div key={item.title} className="rounded-[20px] border border-[#C9C3A8] bg-[#F4F1DE] p-4">
                <item.icon className="h-5 w-5 text-[#E63946]" />
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.2em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#596579]">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <LoadingSpinner fullSection title="Loading collection" subtitle="Fetching live instruments from the catalog." />
          ) : (
            featured.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} onQuickAction={setSelectedProduct} />
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[24px] border border-[#C9C3A8] bg-[#1D3557] p-6 text-[#F4F1DE]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#F4F1DE]/70">Manifesto</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight">A tactile showcase for instruments that deserve space, light, and attention.</h2>
            <p className="mt-3 text-sm leading-6 text-[#F4F1DE]/80">SurSangeet pairs live inventory with a gallery-like interface so discovery feels calm, precise, and memorable.</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {accentProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-4">
                <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-[#F4F1DE]">
                  <img src={product.image} alt={product.name} crossOrigin="anonymous" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold uppercase tracking-[0.18em]">{product.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#596579]">{product.category}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#596579]">Collection index</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span key={category} className="max-w-full rounded-md border border-[#C9C3A8] bg-[#F4F1DE] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D3557]">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductDetailModal open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)} product={selectedProduct} />
    </main>
  );
}

export default Home;