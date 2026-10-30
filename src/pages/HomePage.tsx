import { motion } from "framer-motion";
import HeroBanner from "@/components/HeroBanner";
import { cn } from "@/lib/utils";

export function HomePage() {
  return (
    <motion.main
      className={cn("min-h-screen bg-white")}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <HeroBanner />
    </motion.main>
  );
}

export default HomePage;