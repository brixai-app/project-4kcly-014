import { motion } from 'framer-motion';
import { ArrowRight, Circle as ChevronLeft, ChevronRight, Globe2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useMemo, useRef } from 'react';
import { categories, mockData } from '@/data/mockData';
import type { Category, Instrument } from '@/types';
import InstrumentCard from '@/components/InstrumentCard';
import { cn } from '@/lib/utils';

export interface HomeCollectionsProps {
  className?: string;
}

function CategoryCard({
  category,
  image,
  description,
  accent,
  href,
}: {
  category: Category;
  image: string;
  description: string;
  accent: 'red' | 'green' | 'blue';
  href: string;
}) {
  const accentClass =
    accent === 'red'
      ? 'from-[#D32F2F]/90 via-[#D32F2F]/30 to-transparent'
      : accent === 'green'
        ? 'from-emerald-700/90 via-emerald-700/30 to-transparent'
        : 'from-sky-700/90 via-sky-700/30 to-transparent';

  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-[12px] border border-[#D7DDE3] bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5]">
        <img
          src={image}
          alt={category}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={cn('absolute inset-0 bg-gradient-to-t', accentClass)} />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">Category</p>
          <h3 className="mt-2 text-2xl font-light tracking-tight">{category}</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/85">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em]">
            Explore <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function HomeCollections({ className = '' }: HomeCollectionsProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const featuredInstruments = useMemo(
    () => mockData?.instruments?.filter((item: Instrument) => item?.featured ?? false).slice(0, 8) ?? [],
    []
  );

  const categoryCards = useMemo(
    () =>
      (categories ?? []).slice(0, 3).map((category, index) => ({
        category,
        image:
          index === 0
            ? 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
            : index === 1
              ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        description:
          index === 0
            ? 'Hand-built strings with resonant grain, warm attack, and stage-ready clarity.'
            : index === 1
              ? 'Percussive forms shaped for tactile rhythm, studio precision, and live energy.'
              : 'Keys, synths, and electronic textures with refined control and expressive depth.',
        accent: index === 0 ? 'red' : index === 1 ? 'green' : 'blue',
        href: `/catalog?category=${encodeURIComponent(category)}`,
      })),
    []
  );

  const scrollRail = (direction: 'left' | 'right') => {
    const node = railRef.current;
    if (!node) return;
    const amount = Math.max(320, Math.floor(node.clientWidth * 0.8));
    node.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className={cn('bg-white py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.35fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-6"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">
                <Sparkles className="h-4 w-4 text-[#D32F2F]" />
                Curated collections
              </div>
              <h2 className="mt-4 max-w-md text-3xl font-light tracking-tight text-[#18222C] sm:text-4xl">
                Instruments arranged like a tactile editorial archive.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#5F6B76]">
                Explore family-led categories, then move into a horizontal rail of featured pieces selected for tone, finish, and presence.
              </p>
              <Link
                to="/catalog"
                className="mt-6 inline-flex items-center gap-2 border border-[#18222C] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#18222C] transition-colors hover:bg-[#18222C] hover:text-white"
              >
                Browse catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            {categoryCards.map((card) => (
              <motion.div
                key={card.category}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55 }}
              >
                <CategoryCard {...card} />
              </motion.div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">Latest instruments</p>
                <h3 className="mt-2 text-2xl font-light tracking-tight text-[#18222C] sm:text-3xl">
                  A smooth rail of featured arrivals.
                </h3>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollRail('left')}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#D7DDE3] bg-white text-[#18222C] transition-colors hover:border-[#18222C]"
                  aria-label="Scroll latest instruments left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail('right')}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#D7DDE3] bg-white text-[#18222C] transition-colors hover:border-[#18222C]"
                  aria-label="Scroll latest instruments right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={railRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {featuredInstruments.map((instrument, index) => (
                <motion.div
                  key={instrument?.id ?? index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="min-w-[260px] max-w-[260px] flex-none sm:min-w-[290px] sm:max-w-[290px]"
                >
                  <InstrumentCard instrument={instrument} />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 border-t border-[#D7DDE3] pt-6 sm:grid-cols-3">
              <div className="rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-4">
                <Globe2 className="h-5 w-5 text-[#D32F2F]" />
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#18222C]">Global sourcing</p>
                <p className="mt-2 text-sm leading-6 text-[#5F6B76]">Verified photography and carefully composed product storytelling.</p>
              </div>
              <div className="rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-4">
                <Sparkles className="h-5 w-5 text-emerald-700" />
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#18222C]">Editorial curation</p>
                <p className="mt-2 text-sm leading-6 text-[#5F6B76]">Balanced red, green, and blue accents across a calm white canvas.</p>
              </div>
              <div className="rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-4">
                <ArrowRight className="h-5 w-5 text-sky-700" />
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#18222C]">Dynamic routes</p>
                <p className="mt-2 text-sm leading-6 text-[#5F6B76]">Move from collection browsing into detailed instrument pages seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCollections;