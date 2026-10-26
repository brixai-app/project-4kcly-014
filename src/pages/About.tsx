import { motion } from 'framer-motion';
import AboutSections from '@/components/AboutSections';

export function About() {
  return (
    <motion.main
      className="bg-white text-[#17191C]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <section className="border-b border-[#D6DADE] bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">
              About SurSangeet
            </p>
            <h1 className="font-['Playfair_Display'] text-5xl font-light tracking-tight text-[#17191C] sm:text-6xl lg:text-7xl">
              A curated instrument house shaped by sound, craft, and restraint.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#5E6670] sm:text-lg">
              SurSangeet presents a focused collection of instruments with editorial clarity, careful material storytelling, and a calm browsing experience designed for discovery.
            </p>
          </div>
        </div>
      </section>
      <AboutSections />
    </motion.main>
  );
}

export default About;