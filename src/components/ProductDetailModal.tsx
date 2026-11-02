import { useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModalProps, Product } from '@/types';

export type ProductDetailModalProps = ModalProps & {
  product?: Product | null;
};

export function ProductDetailModal({
  open = false,
  onOpenChange = () => undefined,
  className = '',
  product = null,
}: ProductDetailModalProps) {
  const features = useMemo(() => {
    const raw = product?.description ?? '';
    return raw
      .split(/[\n,•;]+/g)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 6);
  }, [product?.description]);

  const accentClass =
    product?.accent === 'green'
      ? 'bg-emerald-600'
      : product?.accent === 'blue'
        ? 'bg-blue-600'
        : 'bg-[#E63946]';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: '100%', opacity: 0.96 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0.96 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className={cn(
                  'fixed right-0 top-0 z-50 h-full w-full max-w-[42rem] overflow-hidden border-l border-[#C9C3A8] bg-[#FFFDF2] shadow-2xl outline-none',
                  className,
                )}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4 border-b border-[#C9C3A8] px-5 py-4 sm:px-6">
                    <div className="min-w-0">
                      <Dialog.Title className="font-['Outfit'] text-2xl font-light tracking-tight text-[#1D3557]">
                        {product?.name ?? 'Instrument details'}
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-[#596579]">
                        Display-only product story and specifications.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center border border-[#C9C3A8] bg-white text-[#1D3557] transition-colors hover:bg-[#F4F1DE]"
                        aria-label="Close product details"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="space-y-4">
                        <div className="overflow-hidden rounded-[24px] border border-[#C9C3A8] bg-white">
                          <div className="aspect-[4/5] w-full">
                            <img
                              src={product?.image ?? 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'}
                              alt={product?.name ?? 'Instrument image'}
                              crossOrigin="anonymous"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-[20px] border border-[#C9C3A8] bg-white p-4">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#596579]">
                              <Tag className="h-4 w-4" />
                              Category
                            </div>
                            <p className="mt-2 min-w-0 break-words text-sm font-semibold text-[#1D3557]">
                              {product?.category ?? 'Unspecified'}
                            </p>
                          </div>
                          <div className="rounded-[20px] border border-[#C9C3A8] bg-white p-4">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#596579]">
                              <MapPin className="h-4 w-4" />
                              Origin
                            </div>
                            <p className="mt-2 min-w-0 break-words text-sm font-semibold text-[#1D3557]">
                              {product?.origin ?? 'Not listed'}
                            </p>
                          </div>
                          <div className="rounded-[20px] border border-[#C9C3A8] bg-white p-4">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#596579]">
                              <Sparkles className="h-4 w-4" />
                              Status
                            </div>
                            <p className="mt-2 text-sm font-semibold text-[#1D3557]">Display only</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="rounded-[24px] border border-[#C9C3A8] bg-white p-5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#596579]">
                              Collection note
                            </p>
                            <span className={cn('h-2.5 w-2.5 rounded-full', accentClass)} />
                          </div>
                          <p className="mt-3 text-3xl font-light tracking-tight text-[#1D3557]">
                            ₹{Number(product?.price ?? 0).toLocaleString('en-IN')}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#596579]">
                            {product?.description ??
                              'A tactile instrument profile with editorial presentation, crafted for discovery and visual storytelling.'}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-[#C9C3A8] bg-[#F4F1DE] p-5">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#596579]">
                            <FileText className="h-4 w-4" />
                            Parsed features
                          </div>
                          <div className="mt-4 space-y-3">
                            {features.length > 0 ? (
                              features.map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                                  <p className="min-w-0 break-words text-sm leading-6 text-[#1D3557]">{feature}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm leading-6 text-[#596579]">
                                No feature notes were provided for this instrument.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default ProductDetailModal;