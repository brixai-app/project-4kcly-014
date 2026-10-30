import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe2, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutPage({ className = '' }: { className?: string }) {
  const milestones = [
    { year: '1998', title: 'First resonant workshop', text: 'A small atelier shaped by repair, listening, and the discipline of tone.' },
    { year: '2009', title: 'Curated instrument archive', text: 'A wider collection of strings, percussion, winds, and electronic voices came into focus.' },
    { year: '2024', title: 'Editorial digital stage', text: 'SurSangeet translated craft into a cinematic browsing experience with rhythm and clarity.' },
  ];
  const values = ['Craft-first curation', 'Transparent guidance', 'Responsive inquiry', 'Respect for sound'];
  return (
    <main className={cn('bg-white text-[#1A1A1A]', className)}>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5F6368]">About SurSangeet</p>
            <h1 className="max-w-3xl font-['Outfit'] text-5xl font-light tracking-tight md:text-7xl">An editorial home for instruments with character, history, and presence.</h1>
            <p className="max-w-2xl text-base leading-7 text-[#5F6368] md:text-lg">SurSangeet is built like a listening room: calm, precise, and alive with texture. We present instruments through full-bleed imagery, measured typography, and a rhythm of discovery that keeps the focus on sound, craft, and the people who play.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {values.map((value) => <span key={value} className="border border-[#D8D4CC] bg-[#F4F1EB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#1A1A1A]">{value}</span>)}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] shadow-[0_18px_60px_rgba(26,26,26,0.08)]">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Instrument workshop and creative studio" crossOrigin="anonymous" className="h-full min-h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.35em]">Craft in motion</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/85">A visual language shaped by deep charcoal stages, red accents, and the quiet confidence of well-made instruments.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:grid-cols-[0.9fr_1.1fr] md:px-6 lg:px-8">
        <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-6">
          <div className="flex items-center gap-3 text-[#E63946]"><Sparkles className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1A1A1A]">Chronology</span></div>
          <div className="mt-6 space-y-5">
            {milestones.map((item) => <div key={item.year} className="border-l border-[#D8D4CC] pl-4"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E63946]">{item.year}</p><h2 className="mt-1 text-lg font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-[#5F6368]">{item.text}</p></div>)}
          </div>
        </div>
        <div className="grid gap-6">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6 }} className="rounded-[18px] border border-[#D8D4CC] bg-white p-6 shadow-[0_12px_40px_rgba(26,26,26,0.05)]">
            <div className="flex items-center gap-3"><Users className="h-5 w-5 text-[#E63946]" /><h2 className="text-xl font-semibold">Our craft values</h2></div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F6368]">We curate with restraint, write with clarity, and build journeys that feel responsive rather than transactional.</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ icon: Calendar, label: 'Founded', value: '1998' }, { icon: Clock, label: 'Response', value: 'Same day' }, { icon: Globe2, label: 'Reach', value: 'Pan-India' }].map((item) => {
              const Icon = item.icon;
              return <div key={item.label} className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-5"><Icon className="h-5 w-5 text-[#E63946]" /><p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#5F6368]">{item.label}</p><p className="mt-2 text-2xl font-semibold">{item.value}</p></div>;
            })}
          </div>
          <div className="overflow-hidden rounded-[18px] border border-[#D8D4CC] bg-[#0a0a0a]">
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;