import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from 'lucide-react';
import ProductExperience from "@/components/ProductExperience";
import { instruments } from "@/data/mockData";

export function ProductDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const instrument = instruments?.find((item) => item?.id === id);

  if (!instrument) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full rounded-[16px] border border-[#CAD5D7] bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#F7F8F6]">
              <AlertCircle className="h-5 w-5 text-[#E63946]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526166]">Instrument not found</p>
              <h1 className="mt-2 font-['Outfit',sans-serif] text-3xl font-light tracking-tight text-black sm:text-4xl">
                This instrument is unavailable.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526166]">
                The requested product could not be resolved from the centralized catalog data.
              </p>
              <Link
                to="/catalog"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#C92532]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to catalog
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <ProductExperience instrumentId={instrument?.id ?? ""} className="w-full" />;
}

export default ProductDetailPage;