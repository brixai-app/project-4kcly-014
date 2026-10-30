import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Mail, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeroBannerProps = {
  className?: string;
};

export function HeroBanner({ className = '' }: HeroBannerProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 70]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);
  const y3 = useTransform(scrollY, [0, 500], [0, 24]);

  return (
    <section className={cn('relative isolate overflow-hidden bg-white', className)}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#faf9f6_55%,#ffffff_100%)]" />
      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-stretch lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 flex flex-col justify-end px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <motion.div style={{ y: y1 }} className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#5F6368]">
              <span className="h-px w-10 bg-[#E63946]" />
              SurSangeet
            </div>
            <h1 className="max-w-lg font-['Outfit',sans-serif] text-5xl font-light tracking-tight text-[#1A1A1A] sm:text-6xl lg:text-7xl">
              Instruments staged like a live score.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#5F6368] sm:text-base">
              Explore handcrafted strings, resonant percussion, and expressive electronic pieces through an editorial catalog shaped by rhythm, texture, and motion.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:bg-[#C92D39]"
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-[#D8D4CC] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#1A1A1A] transition-colors hover:border-[#1A1A1A]"
              >
                <Mail size={16} />
                Inquiry
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="mt-10 grid max-w-xl gap-3 border-t border-[#D8D4CC] pt-6 sm:grid-cols-3"
          >
            {[
              ['Curated', 'Editorial instrument stories'],
              ['Responsive', 'Parallax and motion-led flow'],
              ['Accessible', 'Inquiry-first navigation'],
            ].map(([title, copy]) => (
              <div key={title} className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1A1A1A]">{title}</div>
                <div className="mt-2 text-sm leading-6 text-[#5F6368]">{copy}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative min-h-[72vh] lg:min-h-[92vh]">
          <motion.div style={{ y: y2 }} className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
              alt="Editorial close-up of a musical instrument"
              crossOrigin="anonymous"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_28%,rgba(0,0,0,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.92)_100%)]" />
          <motion.div
            style={{ y: y1 }}
            className="absolute left-4 top-8 max-w-[18rem] rounded-none border border-white/30 bg-[#1A1A1A]/80 p-4 text-white shadow-2xl backdrop-blur-md sm:left-8 sm:top-10"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              <Sparkles size={14} className="text-[#E63946]" />
              Featured Drop
            </div>
            <div className="mt-3 text-2xl font-light tracking-tight">Resonance in motion</div>
            <p className="mt-2 text-sm leading-6 text-white/75">
              A tactile selection of instruments with sculptural silhouettes and studio-grade presence.
            </p>
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
          >
            <div className="h-24 w-24 rounded-full border border-[#D8D4CC] bg-white/80 p-3 shadow-lg backdrop-blur-md">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-[#E63946] text-[#E63946]">
                <Compass size={22} />
              </div>
            </div>
            <div className="h-1 w-24 bg-[#E63946]" />
            <div className="h-24 w-24 rounded-full border border-[#D8D4CC] bg-white/80 p-3 shadow-lg backdrop-blur-md">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-[#1A1A1A] text-[#1A1A1A]">
                <ArrowRight size={22} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;