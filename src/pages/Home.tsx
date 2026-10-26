import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import HomeSections from '@/components/HomeSections';

export function Home() {
  return (
    <motion.main
      className="min-h-screen bg-white text-[#17191C]"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <HeroBanner />
      <HomeSections />
    </motion.main>
  );
}

export default Home;