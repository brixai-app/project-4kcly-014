import { motion } from 'framer-motion';
import CatalogExperience from '@/components/CatalogExperience';

export function CatalogPage() {
  return (
    <main className="bg-white text-[#18222C]">
      <section className="border-b border-[#D7DDE3] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#5F6B76]">
              Catalog
            </p>
            <h1 className="font-['Outfit',sans-serif] text-4xl font-light tracking-tight text-[#18222C] sm:text-5xl lg:text-6xl">
              A tactile archive of instruments, materials, and sound.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5F6B76] sm:text-base">
              Explore a curated range of strings, percussion, winds, keyboards, electronics, and accessories through a refined editorial catalog with search, filters, and availability controls.
            </p>
          </motion.div>
        </div>
      </section>
      <CatalogExperience />
    </main>
  );
}

export default CatalogPage;