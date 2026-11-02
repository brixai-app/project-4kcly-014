import { motion } from 'framer-motion';
import HomeExperience from '@/components/HomeExperience';

export function HomePage({ className = '' }: { className?: string }) {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      aria-labelledby="home-page-title"
    >
      <title>SurSangeet | Home</title>
      <h1 id="home-page-title" className="sr-only">
        SurSangeet
      </h1>
      <HomeExperience />
    </motion.main>
  );
}

export default HomePage;