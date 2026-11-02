import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Globe2, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutEditorial({ className = '' }: { className?: string }) {
  const principles = [
    { icon: Sparkles, title: 'Hand-finished detail', text: 'Every instrument is framed as a crafted object, with grain, tension, and resonance treated as design language.' },
    { icon: Compass, title: 'Regional lineage', text: 'We trace origin, material, and playing tradition so each piece carries its cultural and sonic context.' },
    { icon: Users, title: 'Player-first curation', text: 'Selections are shaped for performers, collectors, and curious listeners who want depth, not noise.' },
    { icon: Globe2, title: 'Open listening', text: 'The archive is built to invite exploration across folk, classical, and contemporary instrument forms.' },
  ];

  return (
    <section className={cn('bg-white text-[#142D35]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-md bg-[#0a0a0a]"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
              alt="Workshop instruments arranged in an editorial composition"
              crossOrigin="anonymous"
              className="h-[34rem] w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute left-0 top-0 h-1 w-1/3 bg-[#E63946]" />
            <div className="absolute left-1/3 top-0 h-1 w-1/4 bg-[#0f766e]" />
            <div className="absolute left-7/12 top-0 h-1 w-1/5 bg-[#1d4ed8]" />
            <div className="absolute bottom-0 left-0 max-w-xl bg-white px-6 py-6 sm:px-8 sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5E6E73]">About SurSangeet</p>
              <h2 className="mt-3 font-sans text-4xl font-light uppercase tracking-tight text-[#142D35] sm:text-5xl">
                Instruments presented as living culture.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#5E6E73] sm:text-base">
                SurSangeet is a visual archive and listening space for instruments shaped by craft, geography, and performance.
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
              className="border border-[#D7DFDD] bg-[#F9FAFB] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E63946]">Editorial statement</p>
              <p className="mt-4 text-base leading-8 text-[#142D35]">
                We build each page like a gallery wall: asymmetrical, tactile, and precise. The result is a calm but charged environment where image, story, and sound can breathe together.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                    className="border border-[#D7DFDD] bg-white p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-[#D7DFDD] bg-[#F9FAFB] text-[#E63946]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#142D35]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#5E6E73]">{item.text}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
              className="flex items-center gap-4 border-l-2 border-[#E63946] bg-[#F9FAFB] p-5"
            >
              <Award className="h-5 w-5 shrink-0 text-[#E63946]" />
              <p className="text-sm leading-7 text-[#142D35]">
                Crafted for discovery, the archive balances heritage and modern presentation without losing the intimacy of the instrument itself.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutEditorial;