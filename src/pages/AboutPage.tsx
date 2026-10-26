import { motion } from 'framer-motion';
import AboutEditorial from '@/components/AboutEditorial';

export function AboutPage() {
  return (
    <motion.main
      className="min-h-screen bg-white text-[#17191C]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <AboutEditorial className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8" />
    </motion.main>
  );
}

export default AboutPage;