import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, Leaf, Sparkles, Users } from 'lucide-react';
import { storeStory, timeline } from '@/data/mockData';
import { cn } from '@/lib/utils';

type AboutEditorialProps = {
  className?: string;
};

export function AboutEditorial({ className = '' }: AboutEditorialProps) {
  const story = storeStory?.[0] ?? {
    title: 'Crafted for listening, built for keeping.',
    body: 'SurSangeet curates instruments with a collector’s eye and a musician’s respect for tone, provenance, and tactile detail.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
  };

  const principles = [
    { icon: Sparkles, title: 'Editorial curation', text: 'Every instrument is selected for character, balance, and visual presence.' },
    { icon: Leaf, title: 'Material honesty', text: 'We foreground woods, metals, skins, and finishes with clarity and restraint.' },
    { icon: Globe2, title: 'Global provenance', text: 'From workshop traditions to contemporary makers, each piece carries a place.' },
    { icon: Users, title: 'Human guidance', text: 'Our team helps players and collectors find instruments that feel immediate and lasting.' },
  ];

  return (
    <section className={cn('w-full bg-white text-[#17191C]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">About SurSangeet</p>
            <h2 className="max-w-3xl font-serif text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl lg:text-6xl">
              {story?.title ?? 'Crafted for listening, built for keeping.'}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[#5E6670] sm:text-lg">
              {story?.body ??
                'SurSangeet curates instruments with a collector’s eye and a musician’s respect for tone, provenance, and tactile detail.'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-5">
                  <Icon className="h-5 w-5 text-[#D32F2F]" />
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#17191C]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5E6670]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="overflow-hidden rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5]"
          >
            <img
              src={story?.image ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85'}
              alt="SurSangeet store interior"
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="space-y-4">
            <div className="rounded-[10px] border border-[#D7DCE2] bg-white p-6">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-[#D32F2F]" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#17191C]">Craft principles</p>
              </div>
              <div className="mt-5 space-y-4">
                {principles.map((item) => (
                  <div key={item.title} className="border-t border-[#D7DCE2] pt-4 first:border-t-0 first:pt-0">
                    <p className="text-sm font-semibold text-[#17191C]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5E6670]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#D32F2F]" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#17191C]">Team ethos</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#5E6670]">
                We work like a small atelier: attentive, precise, and deeply collaborative. The result is a collection that feels
                curated rather than crowded.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#D7DCE2] pt-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">History timeline</p>
              <h3 className="mt-3 font-serif text-3xl font-light tracking-tight text-[#17191C] sm:text-4xl">
                A quiet chronology of growth
              </h3>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="absolute left-3 top-0 h-full w-px bg-[#D7DCE2]" />
            <div className="space-y-8">
              {(timeline ?? []).map((entry, index) => (
                <motion.div
                  key={`${entry.year ?? index}-${entry.title ?? 'timeline'}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-2 h-6 w-6 rounded-full border border-[#D7DCE2] bg-white" />
                  <div className="grid gap-3 md:grid-cols-[120px_1fr] md:gap-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D32F2F]">{entry.year ?? ''}</p>
                    <div>
                      <h4 className="text-lg font-semibold text-[#17191C]">{entry.title ?? ''}</h4>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5E6670]">{entry.description ?? ''}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutEditorial;