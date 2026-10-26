import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { mockData } from '@/data/mockData';
import InstrumentDetail from '@/components/InstrumentDetail';
import type { Instrument } from '@/types';

export function InstrumentPage() {
  const { slug } = useParams<{ slug?: string }>();
  const instrument = (mockData?.items ?? []).find((item: Instrument) => item?.slug === slug);

  if (!instrument) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 text-[#17191C] sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full border border-[#D6DADE] bg-[#F5F5F5] p-8 sm:p-12"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#5E6670]">Collection not found</p>
            <h1 className="font-['Playfair_Display'] text-4xl font-light tracking-tight sm:text-5xl">
              This instrument has moved off the stage.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5E6670] sm:text-base">
              The requested detail page could not be resolved from the current collection. Explore the catalog to continue browsing the archive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 border border-[#17191C] bg-[#17191C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#D32F2F]"
              >
                Back to catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 border border-[#D6DADE] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#17191C] transition-colors hover:border-[#17191C]"
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-[#17191C]">
      <section className="border-b border-[#D6DADE] bg-[#F5F5F5]">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[52vh] overflow-hidden lg:min-h-[78vh]">
            <img
              src={instrument?.image ?? ''}
              alt={instrument?.name ?? 'Instrument'}
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute left-6 top-6 h-[72%] w-px bg-[#D32F2F]" />
            <div className="absolute left-6 top-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/85">
              <Sparkles className="h-4 w-4 text-[#D32F2F]" />
              Featured collection
            </div>
            <div className="absolute bottom-6 left-6 right-6 max-w-2xl text-white">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/75">{instrument?.category ?? 'Collection'}</p>
              <h1 className="font-['Playfair_Display'] text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
                {instrument?.name ?? 'Instrument'}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                {instrument?.shortDescription ?? ''}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between border-t border-[#D6DADE] bg-white p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670] transition-colors hover:text-[#17191C]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to catalog
                </Link>
                <span className="inline-flex items-center gap-2 border border-[#D6DADE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5E6670]">
                  <MapPin className="h-3.5 w-3.5 text-[#D32F2F]" />
                  {instrument?.origin ?? 'India'}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5E6670]">Price</p>
                <p className="mt-2 font-['Playfair_Display'] text-4xl font-light tracking-tight">
                  ₹{instrument?.price?.toLocaleString?.('en-IN') ?? '0'}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-[#D6DADE] bg-[#F5F5F5] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Availability</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#D32F2F]" />
                    {instrument?.availability ?? 'available'}
                  </p>
                </div>
                <div className="border border-[#D6DADE] bg-[#F5F5F5] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Accent</p>
                  <p className="mt-2 text-sm font-medium capitalize">{instrument?.accent ?? 'red'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5E6670]">Materials</p>
                <div className="flex flex-wrap gap-2">
                  {(instrument?.materials ?? []).map((material) => (
                    <span
                      key={material}
                      className="border border-[#D6DADE] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#17191C]"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#D6DADE] pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-[#D32F2F] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#B71C1C]"
              >
                Inquire about this instrument
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InstrumentDetail instrument={instrument} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14" />
    </main>
  );
}

export default InstrumentPage;