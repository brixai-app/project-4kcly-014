import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Circle as ChevronLeft, ChevronRight, Circle as Expand, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { instruments } from "@/data/mockData";
import type { Instrument, Specification } from "@/types";

type Props = {
  instrumentId?: string;
  className?: string;
};

const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const parseSpecifications = (instrument?: Instrument): Specification[] => {
  const fallback: Specification[] = [
    { label: "Category", value: instrument?.category ?? "—" },
    { label: "Finish", value: "Hand-finished" },
    { label: "Build", value: "Studio-grade" },
    { label: "Voice", value: "Balanced resonance" },
  ];
  if (!instrument?.specificationsJson) return fallback;
  try {
    const parsed = JSON.parse(instrument.specificationsJson) as Specification[];
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export function ProductExperience({ instrumentId, className = "" }: Props) {
  const selected = useMemo(() => instruments.find((item) => item.id === instrumentId) ?? instruments[0], [instrumentId]);
  const related = useMemo(() => {
    const ids = selected?.relatedIdsJson ? (JSON.parse(selected.relatedIdsJson) as string[]) : [];
    const byIds = ids.map((id) => instruments.find((item) => item.id === id)).filter(Boolean) as Instrument[];
    return byIds.length ? byIds : instruments.filter((item) => item.id !== selected?.id).slice(0, 4);
  }, [selected]);
  const [activeImage, setActiveImage] = useState(selected?.image ?? instruments[0]?.image ?? "");
  const [open, setOpen] = useState(false);

  const gallery = useMemo(
    () => [selected?.image, ...related.map((item) => item.image)].filter(Boolean) as string[],
    [related, selected]
  );
  const specs = parseSpecifications(selected);

  return (
    <section className={cn("w-full bg-white", className)}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[16px] border border-[#CAD5D7] bg-[#F7F8F6] shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
            <button type="button" onClick={() => setOpen(true)} className="group relative block w-full">
              <img
                src={activeImage}
                alt={selected?.name ?? "Instrument"}
                crossOrigin="anonymous"
                className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-white/30 bg-white/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black">
                <Expand className="h-4 w-4" />
                Expand image
              </div>
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                className={cn(
                  "h-24 w-24 shrink-0 overflow-hidden rounded-md border transition-all",
                  activeImage === image ? "border-[#E63946] ring-2 ring-[#E63946]/20" : "border-[#CAD5D7]"
                )}
              >
                <img src={image} alt={`${selected?.name ?? "Instrument"} thumbnail ${index + 1}`} crossOrigin="anonymous" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">{selected?.category ?? "Instrument"}</p>
            <h1 className="max-w-xl text-4xl font-light uppercase tracking-tight text-black md:text-5xl">{selected?.name ?? "Selected Instrument"}</h1>
            <p className="max-w-2xl text-sm leading-7 text-[#526166] md:text-base">{selected?.detailedDescription ?? selected?.description ?? "A refined instrument showcase with editorial imagery and detailed specifications."}</p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-black">{formatPrice(selected?.price ?? 0)}</span>
              <span className="h-px flex-1 bg-[#CAD5D7]" />
            </div>
          </div>

          <div className="grid gap-3 rounded-[16px] border border-[#CAD5D7] bg-[#F7F8F6] p-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-start justify-between gap-4 border-b border-[#CAD5D7]/70 pb-3 last:border-b-0 last:pb-0">
                <span className="min-w-0 text-xs font-semibold uppercase tracking-[0.22em] text-[#526166]">{spec.label}</span>
                <span className="max-w-[60%] text-right text-sm text-black">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">Related instruments</h2>
              <div className="flex items-center gap-2">
                <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CAD5D7] bg-white text-black transition hover:border-[#E63946] hover:text-[#E63946]">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CAD5D7] bg-white text-black transition hover:border-[#E63946] hover:text-[#E63946]">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {related.map((item) => (
                <motion.article
                  key={item.id}
                  whileHover={{ y: -4 }}
                  className="group min-w-[220px] overflow-hidden rounded-[16px] border border-[#CAD5D7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <button type="button" onClick={() => setActiveImage(item.image)} className="block w-full text-left">
                    <img src={item.image} alt={item.name} crossOrigin="anonymous" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="space-y-2 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#526166]">{item.category}</p>
                      <h3 className="line-clamp-2 text-sm font-semibold text-black">{item.name}</h3>
                      <p className="text-sm font-semibold text-black">{formatPrice(item.price)}</p>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,1100px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-white/10 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-[#CAD5D7] px-4 py-3">
              <Dialog.Title className="text-xs font-semibold uppercase tracking-[0.28em] text-[#526166]">{selected?.name ?? "Instrument"}</Dialog.Title>
              <Dialog.Close className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CAD5D7] text-black transition hover:border-[#E63946] hover:text-[#E63946]">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <img src={activeImage} alt={selected?.name ?? "Instrument"} crossOrigin="anonymous" className="h-full w-full object-cover" />
              <div className="space-y-4 p-5">
                <p className="text-sm leading-7 text-[#526166]">{selected?.description ?? ""}</p>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#C92532]">
                    <ArrowLeft className="h-4 w-4" />
                    Close
                  </button>
                  <button type="button" onClick={() => setActiveImage(gallery[0] ?? activeImage)} className="inline-flex items-center gap-2 rounded-md border border-[#CAD5D7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:border-[#E63946] hover:text-[#E63946]">
                    <ArrowRight className="h-4 w-4" />
                    Reset view
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

export default ProductExperience;