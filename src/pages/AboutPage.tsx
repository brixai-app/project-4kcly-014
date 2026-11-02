import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Globe2, Heart, Sparkles, Users } from 'lucide-react';

export default function AboutPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.7, ease: 'easeOut' },
  };

  return (
    <main className="bg-[#F4F1DE] text-[#1D3557]">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-6 sm:p-8 lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,57,70,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(29,53,87,0.08),transparent_30%)]" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="max-w-2xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]">
                  About SurSangeet
                </p>
                <h1 className="max-w-xl text-5xl font-light tracking-tight text-[#1D3557] sm:text-6xl lg:text-7xl">
                  Instruments with a pulse, stories with a grain.
                </h1>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#C9C3A8] bg-white/70 p-4">
                  <Sparkles className="mb-3 h-5 w-5 text-[#E63946]" />
                  <p className="text-sm leading-6 text-[#596579]">
                    We curate tactile instruments through editorial imagery, material honesty, and a calm discovery flow.
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#C9C3A8] bg-white/70 p-4">
                  <BookOpen className="mb-3 h-5 w-5 text-[#1D3557]" />
                  <p className="text-sm leading-6 text-[#596579]">
                    Every collection is arranged to feel lived-in, allowing tone, craft, and provenance to lead the experience.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid gap-4">
            <div className="overflow-hidden rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
                alt="Editorial instrument still life"
                crossOrigin="anonymous"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-5">
                <Users className="mb-3 h-5 w-5 text-[#E63946]" />
                <p className="text-sm leading-6 text-[#596579]">
                  Built for listeners, collectors, and curious players who want a quieter, more tactile way to browse.
                </p>
              </div>
              <div className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-5">
                <Globe2 className="mb-3 h-5 w-5 text-[#1D3557]" />
                <p className="text-sm leading-6 text-[#596579]">
                  Live records are fetched from the backend, while inquiries are persisted for thoughtful follow-up.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="grid gap-6 rounded-[24px] border border-[#C9C3A8] bg-[#1D3557] p-6 text-[#F4F1DE] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#F4F1DE]/70">
                Curation philosophy
              </p>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
                We treat each instrument like a portrait, not a SKU.
              </h2>
            </div>
            <Link
              to="/catalog"
              className="inline-flex w-fit items-center gap-2 border border-[#F4F1DE]/30 bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#C92535]"
            >
              Explore the catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              'Warm off-white canvases that let color breathe.',
              'Saturated red, green, and blue accents for rhythm.',
              'Asymmetric compositions that feel editorial, not generic.',
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-[#F4F1DE]/20 bg-white/5 p-5">
                <Heart className="mb-3 h-5 w-5 text-[#E63946]" />
                <p className="text-sm leading-6 text-[#F4F1DE]/85">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]">
              <span className="h-px w-8 bg-[#E63946]" />
              Listening culture
            </div>
            <h2 className="max-w-xl text-4xl font-light tracking-tight sm:text-5xl">
              A slower browse for people who hear texture before they hear volume.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#596579]">
              SurSangeet is designed as a tactile showcase: editorial imagery, measured motion, and a calm path from discovery to inquiry.
              We foreground provenance, materiality, and mood so each instrument can be encountered with attention.
            </p>
            <blockquote className="mt-8 border-l-2 border-[#E63946] pl-5 text-lg leading-8 text-[#1D3557]">
              “The best instrument discovery feels less like shopping and more like finding a voice you already knew.”
            </blockquote>
          </motion.div>

          <motion.div {...fadeUp} className="order-1 overflow-hidden rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2]">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85"
              alt="Musician in a contemplative studio setting"
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
export { AboutPage };
