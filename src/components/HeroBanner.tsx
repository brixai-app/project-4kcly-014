import { motion } from "framer-motion";
import { ArrowRight, Calendar, Globe2, Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { instruments } from "@/data/mockData";

export function HeroBanner({ className = "" }: { className?: string }) {
  const featured = instruments?.[0];
  const secondary = instruments?.[5];
  const tertiary = instruments?.[7];
  const heroImage = featured?.image ?? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=85";

  return (
    <section className={cn("relative overflow-hidden bg-white", className)}>
      <div className="mx-auto grid min-h-[92vh] max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative flex min-h-[56vh] items-end bg-[#0a0a0a] lg:min-h-[92vh]">
          <img
            src={heroImage}
            alt={featured?.name ?? "Featured instrument"}
            crossOrigin="anonymous"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full p-6 sm:p-10 lg:p-14"
          >
            <div className="mb-6 flex items-center gap-3 text-white/90">
              <span className="h-12 w-1 bg-[#E63946]" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em]">SurSangeet Editorial Showcase</span>
            </div>
            <h1 className="max-w-2xl font-[Outfit] text-5xl font-light uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              Instruments that
              <span className="block text-[#E63946]">resonate in light</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              A vivid musical journal of strings, percussion, wind, and keyboard voices shaped by saturated color, tactile materials, and a gallery-first composition.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:bg-[#C92532]"
              >
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Contact Studio
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative flex flex-col justify-between bg-white px-6 py-8 sm:px-10 lg:px-12 lg:py-14">
          <div className="absolute left-0 top-0 h-full w-px bg-[#CAD5D7]" />
          <div className="space-y-8">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#526166]">Featured voices</p>
              <div className="mt-4 space-y-4">
                {[
                  { label: featured?.category ?? "Strings", title: featured?.name ?? "Kala Concert Mahogany Ukulele", copy: featured?.description ?? "Warm, responsive, and intimate." },
                  { label: secondary?.category ?? "Strings", title: secondary?.name ?? "Ravi Shankar Style Concert Sitar", copy: secondary?.description ?? "Deep sustain and shimmering harmonic field." },
                  { label: tertiary?.category ?? "Keyboard", title: tertiary?.name ?? "Paloma Scale-Changer Harmonium", copy: tertiary?.description ?? "Portable reeds with a rich sustaining voice." },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 6 }}
                    className="border-b border-[#CAD5D7] pb-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E63946]">{item.label}</p>
                    <h2 className="mt-2 font-[Outfit] text-xl uppercase tracking-tight text-black">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#526166]">{item.copy}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, title: "Editorial glow" },
                { icon: Globe2, title: "Responsive layout" },
                { icon: Calendar, title: "Curated drops" },
              ].map((item) => (
                <div key={item.title} className="flex min-w-0 items-center gap-3 border border-[#CAD5D7] bg-[#F7F8F6] p-4">
                  <item.icon className="h-4 w-4 shrink-0 text-[#E63946]" />
                  <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.25em] text-black">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-[#CAD5D7] pt-6 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden bg-[#F7F8F6] p-4">
              <img
                src={secondary?.image ?? "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"}
                alt={secondary?.name ?? "Featured instrument detail"}
                crossOrigin="anonymous"
                className="h-44 w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between border border-[#CAD5D7] p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#526166]">Craft statement</p>
                <p className="mt-3 text-sm leading-7 text-[#526166]">
                  SurSangeet frames each instrument as a living artifact: precise, luminous, and ready for performance, practice, or display.
                </p>
              </div>
              <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-black">
                Read the story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;