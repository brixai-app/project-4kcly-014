import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import InstrumentDetail from '@/components/InstrumentDetail';
import { instruments } from '@/data/mockData';

export function InstrumentDetailPage() {
  const { slug } = useParams();
  const instrument = instruments?.find((item) => item?.slug === slug) ?? null;

  if (!instrument) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 text-[#17191C] sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center border border-[#D7DCE2] bg-[#F5F5F5] p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 border border-[#D7DCE2] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
              <AlertCircle className="h-4 w-4 text-[#D32F2F]" />
              Instrument not found
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl font-light tracking-tight sm:text-6xl">
              The instrument you requested is unavailable.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#5E6670] sm:text-base">
              The route was resolved, but no matching piece exists in the current collection. Return to the catalog to continue exploring the archive.
            </p>
            <Link
              to="/catalog"
              className="mt-8 inline-flex items-center gap-2 border border-[#D32F2F] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#B71C1C]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to catalog
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white text-[#17191C]"
    >
      <InstrumentDetail instrument={instrument} className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10" />
    </motion.main>
  );
}

export default InstrumentDetailPage;