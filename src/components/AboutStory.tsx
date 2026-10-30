import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Sparkles, Users } from 'lucide-react';
import { cn } from "@/lib/utils";
import { team, timeline } from "@/data/mockData";

export function AboutStory({ className = "" }: { className?: string }) {
  const milestones = timeline ?? [];
  const members = team ?? [];
  const anchors = [
    { href: "#story", label: "Story" },
    { href: "#timeline", label: "Timeline" },
    { href: "#team", label: "Team" },
  ];

  return (
    <section className={cn("w-full bg-white text-black", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">
          {anchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className="inline-flex items-center gap-2 border border-[#CAD5D7] bg-white px-3 py-2 transition hover:border-[#E63946] hover:text-black">
              <span className="min-w-0 truncate">{anchor.label}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>

        <div id="story" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }} className="relative overflow-hidden border border-[#CAD5D7] bg-[#F7F8F6]">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="SurSangeet studio portrait" crossOrigin="anonymous" className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/40 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-1 bg-[#E63946]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">
                <Sparkles className="h-4 w-4 text-[#E63946]" />
                Editorial Music Journal
              </p>
              <h2 className="max-w-xl text-4xl font-light uppercase tracking-tight text-black sm:text-5xl lg:text-6xl">A stage for instruments with character, resonance, and craft.</h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-[#526166] sm:text-base">
                SurSangeet curates a visual language of saturated accents, tactile surfaces, and precise typography to spotlight instruments as cultural objects rather than catalog entries.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: 0.05 }} className="border border-[#CAD5D7] bg-white p-6 sm:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">Our approach</p>
              <div className="space-y-4 text-sm leading-6 text-[#526166] sm:text-base">
                <p>
                  We build a responsive, keyboard-friendly experience around a centralized instrument library, pairing full-bleed imagery with asymmetric layouts and motion that feels editorial rather than transactional.
                </p>
                <p>
                  Every section is designed to breathe: bold uppercase headings, measured spacing, and subtle shadows keep the interface vivid without losing clarity.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: 0.1 }} className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Users, title: "Curated voices", text: "A small team with a shared eye for tone, texture, and performance." },
                { icon: MapPin, title: "Rooted in place", text: "Visual cues draw from Indian music journals, studio culture, and live performance." },
              ].map((item) => (
                <div key={item.title} className="border border-[#CAD5D7] bg-[#F7F8F6] p-5">
                  <item.icon className="mb-4 h-5 w-5 text-[#E63946]" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#526166]">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div id="timeline" className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7 }} className="border border-[#CAD5D7] bg-[#F7F8F6] p-6 sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">Timeline</p>
            <div className="space-y-5">
              {milestones.map((item, index) => (
                <div key={`${item.year}-${item.title}`} className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center border border-[#CAD5D7] bg-white text-xs font-semibold text-black">{index + 1}</div>
                    {index < milestones.length - 1 ? <div className="mt-2 h-full w-px bg-[#CAD5D7]" /> : null}
                  </div>
                  <div className="pb-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#526166]">
                      <Calendar className="h-3.5 w-3.5 text-[#E63946]" />
                      {item.year}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold uppercase tracking-[0.16em] text-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#526166]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div id="team" className="grid gap-4 sm:grid-cols-2">
            {members.map((member, index) => (
              <motion.article key={member.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: index * 0.06 }} className="overflow-hidden border border-[#CAD5D7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <img src={member.image} alt={member.name} crossOrigin="anonymous" className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526166]">{member.role}</p>
                  <h3 className="mt-2 text-xl font-semibold uppercase tracking-[0.14em] text-black">{member.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#526166]">{member.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;