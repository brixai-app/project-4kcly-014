import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useInstruments } from '@/context/InstrumentContext';
import InstrumentDetail from '@/components/InstrumentDetail';
import { cn } from '@/lib/utils';

export interface ProductDetailPageProps {
  className?: string;
}

export function ProductDetailPage({ className = '' }: ProductDetailPageProps) {
  const { id } = useParams<{ id?: string }>();
  const { instruments = [] } = useInstruments?.() ?? {};
  const instrument = instruments?.find?.((item) => item?.id === id) ?? null;

  return (
    <main className={cn('mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8', className)}>
      {instrument ? (
        <InstrumentDetail instrument={instrument} />
      ) : (
        <section className="rounded-[18px] border border-[#D8DEE5] bg-white p-6 shadow-[0_18px_50px_rgba(34,34,34,0.06)]">
          <div className="flex flex-col gap-6">
            <Link
              to="/catalog"
              className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670] transition-colors hover:text-[#E63946]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to catalog
            </Link>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F5F2] text-[#E63946]">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-3xl font-light tracking-tight text-[#222222]">Instrument not found</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5E6670]">
                  The requested instrument could not be resolved from the current collection. Please return to the catalog and choose another piece.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetailPage;