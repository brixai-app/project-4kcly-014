import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe2, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInstruments } from '@/context/InstrumentContext';

export interface EditorialSectionProps {
  className?: string;
}

export function EditorialSection({ className = '' }: EditorialSectionProps) {
  const { instruments } = useInstruments?.() ?? { instruments: [] };
  const featured = instruments?.find?.((item) => item?.featured) ?? instruments?.[0] ?? null;
  const secondary = instruments?.find?.((item) => item?.id !== featured?.id) ?? instruments?.[1] ?? featured;

  const imageA = featured?.image ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';
  const imageB = secondary?.image ?? 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85';

  return (
    <section className={cn('relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative min-w-0"
          >
            <div className="absolute -left-3 top-8 h-24 w-1 bg-[#0f3d5e] sm:-left-5" />
            <div className="absolute right-8 top-0 h-20 w-20 rounded-full bg-[#E63946]/15 blur-2xl" />
            <div className="rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] p-6 shadow-[0_18px_50px_rgba(34,34,34,0.08)] sm:p-8">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                <Sparkles className="h-4 w-4 text-[#E63946]" />
                About SurSangeet
              </p>
              <h2 className="max-w-xl text-4xl font-light tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
                A living archive of craft, resonance, and contemporary Indian sound.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#5E6670] sm:text-base">
                SurSangeet curates instruments as cultural objects: hand-finished surfaces, tuned tension, and the tactile
                intelligence of makers who shape tone with patience. The experience is designed like an editorial spread,
                where each instrument is presented with room to breathe and details are allowed to speak.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Globe2, label: 'Rooted in tradition' },
                  { icon: Shield, label: 'Carefully verified details' },
                  { icon: Award, label: 'Craft-led presentation' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex min-w-0 items-center gap-3 rounded-md border border-[#D8DEE5] bg-white px-3 py-3"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-[#E63946]" />
                    <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#D8DEE5]" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Craft notes</span>
                <div className="h-px flex-1 bg-[#D8DEE5]" />
              </div>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#5E6670]">
                From resonant strings to percussive skins and breath-driven forms, the collection balances heritage with
                a crisp modern lens. Every image, label, and specification is arranged to feel tactile, precise, and
                quietly dramatic.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.05 }}
              className="relative overflow-hidden rounded-[18px] border border-[#D8DEE5] bg-white shadow-[0_18px_50px_rgba(34,34,34,0.08)]"
            >
              <img
                src={imageA}
                alt={featured?.name ?? 'Featured instrument'}
                crossOrigin="anonymous"
                className="h-[320px] w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Featured instrument</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-light tracking-tight">{featured?.name ?? 'Selected form'}</h3>
                    <p className="mt-1 text-sm text-white/80">{featured?.description ?? 'A study in tone and balance.'}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] p-5 shadow-[0_14px_36px_rgba(34,34,34,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">History</p>
                <p className="mt-3 text-sm leading-7 text-[#222222]">
                  A collection shaped by the dialogue between regional lineage and contemporary presentation.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[18px] border border-[#D8DEE5] bg-white shadow-[0_14px_36px_rgba(34,34,34,0.06)]">
                <img
                  src={imageB}
                  alt={secondary?.name ?? 'Secondary instrument'}
                  crossOrigin="anonymous"
                  className="h-full min-h-[220px] w-full object-cover object-center"
                />
                <div className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#222222] shadow-sm">
                  Material study
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorialSection;