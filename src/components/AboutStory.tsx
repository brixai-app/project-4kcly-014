import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, Leaf, Sparkles, Truck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { editorialContent } from '@/data/mockData';

type AboutStoryProps = {
  className?: string;
};

const accentMap = {
  red: 'bg-[#D32F2F]',
  green: 'bg-emerald-600',
  blue: 'bg-sky-600',
} as const;

export function AboutStory({ className = '' }: AboutStoryProps) {
  const story = editorialContent?.aboutStory ?? {};
  const highlights = story?.highlights ?? [
    'Curated instruments selected for tone, balance, and tactile presence.',
    'A catalog shaped around craft, not clutter, with clear provenance and materials.',
    'Editorial presentation that keeps the focus on form, finish, and sound.',
  ];
  const details = story?.details ?? [
    { label: 'Craft focus', value: 'Hand-finished surfaces and resonant construction' },
    { label: 'Selection', value: 'String, percussion, wind, keyboard, and electronic' },
    { label: 'Service', value: 'Guidance for beginners, collectors, and performers' },
  ];
  const image = story?.image ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';

  return (
    <section className={cn('w-full bg-white text-[#18222C]', className)}>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5]"
        >
          <div className="absolute inset-0">
            <img
              src={image}
              alt="SurSangeet craftsmanship story"
              crossOrigin="anonymous"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-[#0a0a0a]/10 to-transparent" />
          </div>

          <div className="relative flex min-h-[34rem] flex-col justify-between p-6 sm:p-8">
            <div className="flex items-center gap-2 text-white/90">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">About SurSangeet</span>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                {story?.eyebrow ?? 'Editorial craft and musical clarity'}
              </p>
              <h2 className="max-w-lg text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                {story?.headline ?? 'Instruments chosen for presence, precision, and the quiet drama of making music.'}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/82 sm:text-base">
                {story?.body ??
                  'SurSangeet brings together tactile surfaces, balanced tonal families, and a restrained visual language that lets each instrument speak for itself. The result is a catalog that feels as considered as the instruments it presents.'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
            className="grid gap-4 rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {details.map((item, index) => (
                <div key={`${item.label}-${index}`} className="rounded-[12px] border border-[#D7DDE3] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#18222C]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 border-t border-[#D7DDE3] pt-5">
              {highlights.map((point, index) => (
                <div key={`${point}-${index}`} className="flex items-start gap-3">
                  <span className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', accentMap[(index % 3 === 0 ? 'red' : index % 3 === 1 ? 'green' : 'blue') as keyof typeof accentMap])} />
                  <p className="text-sm leading-7 text-[#5F6B76]">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.14, ease: 'easeOut' }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="rounded-[12px] border border-[#D7DDE3] bg-white p-5">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em]">Materials</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F6B76]">
                {story?.materials ??
                  'Natural woods, refined alloys, responsive membranes, and finishes selected to age gracefully with use.'}
              </p>
            </div>

            <div className="rounded-[12px] border border-[#D7DDE3] bg-white p-5">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em]">Delivery</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F6B76]">
                {story?.delivery ??
                  'Careful packaging, transparent availability, and a calm purchasing flow designed for confident selection.'}
              </p>
            </div>

            <div className="rounded-[12px] border border-[#D7DDE3] bg-white p-5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#D32F2F]" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em]">Guidance</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F6B76]">
                {story?.guidance ??
                  'A thoughtful catalog for players, collectors, and first-time buyers seeking clarity over noise.'}
              </p>
            </div>

            <div className="rounded-[12px] border border-[#D7DDE3] bg-white p-5">
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-[#18222C]" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em]">Origin</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F6B76]">
                {story?.origin ??
                  'A global perspective with local sensitivity, balancing heritage, innovation, and everyday playability.'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#D32F2F]" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">Craftsmanship notes</p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                'Balanced tonal families for expressive range and visual coherence.',
                'Minimal editorial framing that keeps the instrument at the center of attention.',
                'Warm tactile surfaces paired with crisp white and light-gray canvases.',
              ].map((note, index) => (
                <div key={`${note}-${index}`} className="rounded-[12px] border border-[#D7DDE3] bg-white p-4">
                  <div className="mb-3 h-1 w-12 bg-[#D32F2F]" />
                  <p className="text-sm leading-7 text-[#5F6B76]">{note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;