import { motion } from 'framer-motion';
import CatalogWorkspace from '@/components/CatalogWorkspace';

export function CatalogPage() {
  return (
    <motion.main
      className="min-h-screen bg-white text-[#17191C]"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <section className="border-b border-[#D7DCE2] bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D32F2F]">
              Catalog
            </p>
            <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl lg:text-6xl">
              Curated instruments, arranged like a modern score.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5E6670] sm:text-base">
              Explore a refined selection of strings, winds, percussion, keyboards, and accessories
              through a tactile editorial workspace designed for browsing with intention.
            </p>
          </div>
        </div>
      </section>
      <CatalogWorkspace className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10" />
    </motion.main>
  );
}

export default CatalogPage;