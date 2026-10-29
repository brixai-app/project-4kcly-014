import { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/ShowcaseContext';
import { instruments } from '@/data/mockData';

export interface InstrumentDetailDrawerProps {
  className?: string;
}

export function InstrumentDetailDrawer({ className = '' }: InstrumentDetailDrawerProps) {
  const { drawerState, closeDrawer, openContactDrawer } = useShowcase() ?? {};
  const instrument = useMemo(
    () => instruments?.find((item) => item?.id === drawerState?.instrumentId) ?? null,
    [drawerState?.instrumentId]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [instrument?.id]);

  const gallery = useMemo(() => {
    const base = instrument?.image ? [instrument.image] : [];
    const extras = [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    ];
    return Array.from(new Set([...base, ...extras])).slice(0, 4);
  }, [instrument?.image]);

  const currentImage = gallery?.[index] ?? instrument?.image ?? '';
  const specs = instrument?.specifications ?? {};
  const tags = instrument?.tags ?? [];

  const goPrev = () => setIndex((v) => (v - 1 + gallery.length) % gallery.length);
  const goNext = () => setIndex((v) => (v + 1) % gallery.length);

  return (
    <Dialog.Root open={drawerState?.open ?? false} onOpenChange={(open) => (!open ? closeDrawer?.() : undefined)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed right-0 top-0 z-50 h-full w-full max-w-3xl overflow-hidden border-l border-[#457B9D]/60 bg-[#1D1D1D] text-[#F1FAEE] shadow-2xl outline-none',
            className
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#457B9D]/40 px-5 py-4">
              <div className="min-w-0">
                <Dialog.Title className="truncate font-[Outfit] text-lg font-semibold tracking-wide">
                  {instrument?.name ?? 'Instrument Details'}
                </Dialog.Title>
                <Dialog.Description className="truncate text-xs uppercase tracking-[0.28em] text-[#A8DADC]">
                  {instrument?.category ?? 'Showcase'}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="inline-flex h-10 w-10 items-center justify-center border border-[#457B9D]/50 text-[#F1FAEE] transition-colors hover:bg-[#E63946] hover:text-black">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            <div className="grid flex-1 gap-0 overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex min-h-0 flex-col border-b border-[#457B9D]/30 lg:border-b-0 lg:border-r">
                <div className="relative flex-1 overflow-hidden bg-black/20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={instrument?.name ?? 'Instrument image'}
                      crossOrigin="anonymous"
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                    <button
                      onClick={goPrev}
                      className="inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-black/30 text-white transition-colors hover:bg-[#E63946] hover:text-black"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/80">
                      {index + 1}/{gallery.length}
                    </div>
                    <button
                      onClick={goNext}
                      className="inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-black/30 text-white transition-colors hover:bg-[#E63946] hover:text-black"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto border-t border-[#457B9D]/30 p-4">
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setIndex(i)}
                      className={cn(
                        'h-20 w-24 shrink-0 overflow-hidden border transition-all',
                        i === index ? 'border-[#E63946] ring-1 ring-[#E63946]' : 'border-[#457B9D]/40 opacity-70'
                      )}
                    >
                      <img src={src} alt={`${instrument?.name ?? 'Instrument'} thumbnail ${i + 1}`} crossOrigin="anonymous" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex min-h-0 flex-col overflow-y-auto px-5 py-5">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="border border-[#457B9D]/40 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#A8DADC]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="text-3xl font-light tracking-tight text-[#F1FAEE]">{instrument?.name ?? 'Untitled Instrument'}</div>
                    <div className="text-sm leading-6 text-[#A8DADC]">{instrument?.description ?? 'No description available.'}</div>
                    <div className="text-lg font-semibold text-[#E63946]">{instrument?.price ?? 'On request'}</div>
                  </div>

                  <div className="grid gap-3 rounded-[18px] border border-[#457B9D]/40 bg-[#25282B] p-4">
                    {[
                      ['Origin', specs?.origin],
                      ['Material', specs?.material],
                      ['Tuning', specs?.tuning],
                      ['Range', specs?.range],
                      ['Dimensions', specs?.dimensions],
                      ['Weight', specs?.weight],
                      ['Finish', specs?.finish],
                    ]
                      .filter(([, value]) => Boolean(value))
                      .map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between gap-4 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                          <span className="text-xs uppercase tracking-[0.24em] text-[#A8DADC]">{label}</span>
                          <span className="max-w-[60%] text-right text-sm text-[#F1FAEE]">{value}</span>
                        </div>
                      ))}
                  </div>

                  <div className="rounded-[18px] border border-[#457B9D]/40 bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#A8DADC]">
                      <Check className="h-4 w-4 text-[#E63946]" />
                      Curated for live performance and studio sessions
                    </div>
                    <p className="text-sm leading-6 text-[#F1FAEE]/90">
                      {instrument?.description ??
                        'This instrument is presented as part of the SurSangeet editorial showcase, with emphasis on tone, craftsmanship, and stage presence.'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => openContactDrawer?.(instrument?.id)}
                      className="inline-flex items-center justify-center gap-2 border border-[#E63946] bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:bg-[#C92F3C]"
                    >
                      Contact About This Piece
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <Dialog.Close asChild>
                      <button className="inline-flex items-center justify-center gap-2 border border-[#457B9D]/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#F1FAEE] transition-colors hover:bg-white/5">
                        <ChevronUp className="h-4 w-4" />
                        Close Drawer
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default InstrumentDetailDrawer;