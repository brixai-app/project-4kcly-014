import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import HomeEditorialSections from '@/components/HomeEditorialSections';

export function Home() {
  return (
    <motion.main
      className="min-h-screen bg-white text-[#17191C]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <HeroBanner />
      <HomeEditorialSections />
    </motion.main>
  );
}

export default Home;