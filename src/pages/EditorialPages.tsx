import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AboutStory, EditorialSections, FeaturedInstrumentsPreview, HeroCarousel } from '@/components/EditorialSections';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { heroSlides, instruments } from '@/data/mockData';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9F6F2] text-[#2E2B28]">
      <SiteHeader />
      <main>
        <HeroCarousel slides={heroSlides} />
        <EditorialSections />
        <section className="border-t border-[#C9BBA8] bg-[#EFE9E1]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 lg:px-12">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F675E]">Curated selection</p>
              <h2 className="max-w-xl font-['Bodoni_Moda'] text-4xl font-light tracking-tight md:text-6xl">
                Instruments chosen for provenance, voice, and presence.
              </h2>
              <p className="max-w-lg text-sm leading-7 text-[#6F675E] md:text-base">
                SurSangeet presents rare pieces with museum-grade restraint, pairing archival detail with a cinematic editorial rhythm.
              </p>
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 border border-[#8B0000] bg-[#8B0000] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#690000]"
              >
                Explore collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <FeaturedInstrumentsPreview items={instruments} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F2] text-[#2E2B28]">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid gap-10 border border-[#C9BBA8] bg-white md:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="border-b border-[#C9BBA8] p-6 md:border-b-0 md:border-r md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F675E]">About SurSangeet</p>
            <h1 className="mt-4 font-['Bodoni_Moda'] text-5xl font-light tracking-tight md:text-7xl">
              A private viewing room for exceptional instruments.
            </h1>
          </div>
          <div className="space-y-8 p-6 md:p-8">
            <AboutStory />
            <div className="grid gap-4 border-t border-[#C9BBA8] pt-6 text-sm text-[#6F675E] md:grid-cols-3">
              <div className="space-y-2">
                <MapPin className="h-4 w-4 text-[#8B0000]" />
                <p>New Delhi, by appointment</p>
              </div>
              <div className="space-y-2">
                <Phone className="h-4 w-4 text-[#8B0000]" />
                <p>Private consultations only</p>
              </div>
              <div className="space-y-2">
                <Mail className="h-4 w-4 text-[#8B0000]" />
                <p>inquiries@sursangeet.com</p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default HomePage;