import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import CatalogExplorer from '@/components/CatalogExplorer';

export interface HomePageProps {
  className?: string;
}

export function HomePage({ className = '' }: HomePageProps) {
  return (
    <motion.main
      className={`min-h-screen bg-[#1D1D1D] text-[#F1FAEE] ${className}`.trim()}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <HeroBanner className="w-full" />
      <CatalogExplorer className="w-full" />
    </motion.main>
  );
}

export default HomePage;