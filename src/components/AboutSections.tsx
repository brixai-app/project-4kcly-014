import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, Leaf, Sparkles, Truck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockData } from '@/data/mockData';

type AboutSectionsProps = {
  className?: string;
};

const principles = [
  {
    icon: Sparkles,
    title: 'Curated with restraint',
    text: 'Every instrument is selected for tonal character, finish, and presence—never for volume alone.',
    accent: 'red',
  },
  {
    icon: Leaf,
    title: 'Materials with memory',
    text: 'We foreground woods, metals, and handwork that age beautifully and reward close listening.',
    accent: 'green',
  },
  {
    icon: Globe2,
    title: 'Rooted in place',
    text: 'Our collection traces regional craft traditions and contemporary makers across the world.',
    accent: 'blue',
  },
  {
    icon: Users,
    title: 'Guided by musicians',
    text: 'The edit is shaped by players, teachers, and collectors who value nuance over noise.',
    accent: 'red',
  },
];

const timeline = [
  { year: '2018', title: 'A listening room becomes a studio', text: 'SurSangeet began as a private archive of instruments, recordings, and maker notes.' },
  { year: '2020', title: 'The collection expands', text: 'We added percussion, winds, and electronic voices to reflect a broader musical language.' },
  { year: '2022', title: 'Editorial curation', text: 'The site evolved into a story-led showcase with detailed provenance and material context.' },
  { year: '2025', title: 'A refined digital atelier', text: 'Today the experience balances discovery, inquiry, and scholarship in one calm interface.' },
];

export function AboutSections({ className = '' }: AboutSectionsProps) {
  const featured = mockData?.items?.slice?.(0, 3) ?? [];
  return (
    <section className={cn('w-full bg-white text-[#17191C]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6670]">About SurSangeet</p>
            <h2 className="max-w-3xl font-['Playfair_Display'] text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              An editorial home for instruments with character, craft, and cultural depth.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[#5E6670] sm:text-base">
              SurSangeet presents a considered selection of instruments through a calm, tactile lens—pairing photography, provenance, and practical inquiry in a single refined journey.
            </p>
          </div>
          <div className="border-l border-[#D6DADE] pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6670]">Collection note</p>
            <p className="mt-3 text-sm leading-7 text-[#17191C]">
              We favor instruments that feel alive in the hand: resonant woods, precise hardware, and finishes that reveal the maker’s intent.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 overflow-hidden rounded-[10px] border border-[#D6DADE] bg-[#F5F5F5]"
          >
            <img
              src={featured?.[0]?.image ?? 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'}
              alt={featured?.[0]?.name ?? 'Curated instrument showcase'}
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="grid gap-6 lg:col-span-5">
            {featured?.slice?.(1, 3)?.map((item, index) => (
              <motion.div
                key={item?.id ?? index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="overflow-hidden rounded-[10px] border border-[#D6DADE] bg-[#F5F5F5]"
              >
                <img
                  src={item?.image ?? `https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80 ?? index}/1200/800`}
                  alt={item?.name ?? 'Instrument detail'}
                  crossOrigin="anonymous"
                  className="aspect-[4/3] w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[10px] border border-[#D6DADE] bg-[#F5F5F5] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6670]">Mission</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#17191C]">
              Our mission is to make instrument discovery feel editorial, informed, and human—connecting players to objects that carry sound, history, and intention.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#D6DADE] bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6670]">What we value</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {principles.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="space-y-3">
                    <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-[10px] border', item.accent === 'red' && 'border-[#D32F2F] text-[#D32F2F]', item.accent === 'green' && 'border-[#2E7D32] text-[#2E7D32]', item.accent === 'blue' && 'border-[#1565C0] text-[#1565C0]')}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17191C]">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#5E6670]">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6670]">Chronology</p>
            <h3 className="mt-3 font-['Playfair_Display'] text-3xl font-light tracking-tight sm:text-4xl">A brief history of the studio.</h3>
          </div>
          <div className="space-y-0">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.year}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="grid gap-4 border-t border-[#D6DADE] py-5 sm:grid-cols-[110px_1fr]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D32F2F]">{entry.year}</div>
                <div>
                  <h4 className="text-base font-semibold text-[#17191C]">{entry.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-[#5E6670]">{entry.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-[#D6DADE] pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-[#D32F2F]" />
            <p className="text-sm uppercase tracking-[0.2em] text-[#17191C]">Editorial curation</p>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-[#2E7D32]" />
            <p className="text-sm uppercase tracking-[0.2em] text-[#17191C]">Careful handling</p>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-[#1565C0]" />
            <p className="text-sm uppercase tracking-[0.2em] text-[#17191C]">Musician-led guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSections;