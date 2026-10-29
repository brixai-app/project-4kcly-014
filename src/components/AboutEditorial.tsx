import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AboutEditorialProps {
  className?: string;
}

const imageUrl = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';

export function AboutEditorial({ className = '' }: AboutEditorialProps) {
  return (
    <section className={cn('relative overflow-hidden bg-[#1D1D1D] text-[#F1FAEE]', className)}>
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Studio musicians in a dramatic rehearsal space"
          crossOrigin="anonymous"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1D]/95 via-[#1D1D1D]/70 to-[#1D1D1D]/90" />
        <motion.div
          aria-hidden="true"
          className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#E63946]/20 blur-3xl"
          animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#457B9D]/20 blur-3xl"
          animate={{ y: [0, -16, 0], x: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-10">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#A8DADC]">
              <Sparkles className="h-4 w-4 text-[#E63946]" />
              <span>About SurSangeet</span>
            </div>
            <h2 className="font-serif text-5xl font-light tracking-tight text-[#F1FAEE] md:text-6xl lg:text-7xl">
              A stage for instruments with presence, texture, and soul.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#A8DADC] md:text-base">
              SurSangeet curates a visual archive of instruments as living objects: sculptural, resonant, and deeply tied to craft. Each composition is designed like a concert poster—bold, atmospheric, and precise—so the collection feels editorial rather than transactional.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Award,
                title: 'Craft-led curation',
                text: 'Selected for tonal identity, material character, and visual distinction.',
              },
              {
                icon: Globe2,
                title: 'Global resonance',
                text: 'A cross-cultural lens that honors tradition while embracing modern form.',
              },
              {
                icon: Sparkles,
                title: 'Atmospheric storytelling',
                text: 'Layered imagery and motion that frame each instrument like a headline act.',
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                className="rounded-[18px] border border-[#457B9D]/50 bg-[#25282B]/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-sm"
              >
                <item.icon className="h-5 w-5 text-[#E63946]" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#F1FAEE]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#A8DADC]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative flex items-end">
          <div className="w-full rounded-[18px] border border-[#457B9D]/60 bg-[#25282B]/70 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-7">
            <div className="grid gap-5">
              <div className="overflow-hidden rounded-[18px] border border-[#457B9D]/40">
                <img
                  src={imageUrl}
                  alt="Close-up of musicians performing in a studio"
                  crossOrigin="anonymous"
                  className="h-[320px] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
                <blockquote className="rounded-[18px] border border-[#457B9D]/40 bg-[#1D1D1D]/70 p-5">
                  <p className="font-serif text-2xl font-light leading-tight text-[#F1FAEE]">
                    “We treat every instrument as a headline act—distinct, tactile, and impossible to ignore.”
                  </p>
                  <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#A8DADC]">
                    Editorial philosophy
                  </footer>
                </blockquote>

                <div className="flex flex-col justify-between gap-4 rounded-[18px] border border-[#457B9D]/40 bg-[#1D1D1D]/70 p-5">
                  <p className="text-sm leading-7 text-[#A8DADC]">
                    Our mission is to present instruments with the same care as a fashion house presents a collection: through rhythm, contrast, and a strong point of view.
                  </p>
                  <div className="space-y-3 border-t border-[#457B9D]/30 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#F1FAEE]">
                      Layered pull quote
                    </p>
                    <p className="text-sm leading-6 text-[#A8DADC]">
                      Sound, silhouette, and surface are composed together so the experience feels immersive from the first glance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute -bottom-6 left-6 h-24 w-24 rounded-full border border-[#E63946]/40 bg-[#E63946]/10 blur-[1px]"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutEditorial;