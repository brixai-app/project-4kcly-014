import React, { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, X, Volume2, ChevronRight, MapPin, Clock, Sparkles } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Instrument } from '@/types';

export function InstrumentDetailExperience({ className = '' }: { className?: string }) {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const [loading, setLoading] = useState(true);
  const [listenOpen, setListenOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/instruments');
        const json = (await res.json().catch(() => null)) as { data?: Instrument[] } | null;
        const found = json?.data?.find((item) => item?.slug === slug) ?? null;
        if (active) setInstrument(found);
      } catch {
        if (active) setInstrument(null);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [slug]);

  const gallery = useMemo(() => {
    const fallback = [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    ];
    return instrument?.gallery?.length ? instrument.gallery : [instrument?.image ?? fallback[0], ...fallback].slice(0, 3);
  }, [instrument]);

  const audioUrl = instrument?.audioUrl ?? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <section className={cn('min-h-[calc(100vh-5rem)] bg-white text-[#142D35]', className)}>
      <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-[#0a0a0a]">
          <img
            src={instrument?.image ?? gallery[0]}
            alt={instrument?.name ?? 'Instrument'}
            crossOrigin="anonymous"
            className="h-full w-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <div className="h-px w-10 bg-white/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">Listening Room</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <div className="max-w-xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                {instrument?.category ?? 'Instrument'}
              </p>
              <h1 className="text-4xl font-light uppercase tracking-[0.18em] sm:text-6xl">{instrument?.name ?? 'Loading...'}</h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/85">{instrument?.story ?? instrument?.description ?? 'A detailed instrument story is loading.'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#F9FAFB]">
          <div className="border-b border-[#D7DFDD] px-5 py-5 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5E6E73]">Detail Experience</p>
                <h2 className="mt-2 truncate text-2xl font-light uppercase tracking-[0.18em] text-[#142D35] sm:text-3xl">
                  {instrument?.name ?? (loading ? 'Loading instrument' : 'Instrument not found')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setListenOpen(true)}
                className="inline-flex items-center gap-2 border border-[#142D35] bg-[#E63946] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-[#C92E3A]"
              >
                <Volume2 className="h-4 w-4" />
                Listen
              </button>
            </div>
          </div>

          <div className="flex-1 px-5 py-6 sm:px-8">
            <div className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#D7DFDD] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5E6E73]">Origin</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#142D35]"><MapPin className="h-4 w-4 text-[#E63946]" />{instrument?.origin ?? 'Unknown'}</p>
                </div>
                <div className="border border-[#D7DFDD] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5E6E73]">Tuning</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#142D35]"><Clock className="h-4 w-4 text-[#E63946]" />{instrument?.tuning ?? 'Standard'}</p>
                </div>
              </div>

              <div className="border border-[#D7DFDD] bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5E6E73]">Materials</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(instrument?.materials?.length ? instrument.materials : ['Wood', 'Metal', 'Natural Finish']).map((item) => (
                    <span key={item} className="border border-[#D7DFDD] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#142D35]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-[#D7DFDD] bg-[#0a0a0a] p-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Gallery</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {gallery.map((src, index) => (
                    <motion.div
                      key={`${src}-${index}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="overflow-hidden border border-white/10 bg-white/5"
                    >
                      <img src={src} alt={`${instrument?.name ?? 'Instrument'} ${index + 1}`} crossOrigin="anonymous" className="h-40 w-full object-cover transition duration-500 hover:scale-105" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border border-[#D7DFDD] bg-white p-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5E6E73]">Story</p>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#142D35]">
                    {instrument?.description ?? 'This instrument is presented through an editorial split-screen composition with immersive listening controls.'}
                  </p>
                </div>
                <Sparkles className="h-5 w-5 shrink-0 text-[#E63946]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog.Root open={listenOpen} onOpenChange={setListenOpen}>
        <AnimatePresence>
          {listenOpen ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60" />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#D7DFDD] bg-white shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-[#D7DFDD] px-5 py-4">
                    <div>
                      <Dialog.Title className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5E6E73]">Listen Drawer</Dialog.Title>
                      <p className="mt-1 text-sm text-[#142D35]">{instrument?.name ?? 'Instrument'}</p>
                    </div>
                    <Dialog.Close asChild>
                      <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DFDD] text-[#142D35] transition hover:bg-[#F9FAFB]">
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="border border-[#D7DFDD] bg-[#0a0a0a] p-5 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Mock Audio Controls</p>
                      <div className="mt-5 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setPlaying((v) => !v)}
                          className="inline-flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10 transition hover:bg-white/20"
                        >
                          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <div className="flex-1">
                          <div className="h-1.5 w-full bg-white/15">
                            <div className="h-1.5 w-2/5 bg-[#E63946]" />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/70">
                            <span>00:42</span>
                            <span>03:18</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center gap-2 text-sm text-white/80">
                        <Volume2 className="h-4 w-4 text-[#E63946]" />
                        <span>Preview audio is mocked for editorial presentation.</span>
                      </div>
                      <audio src={audioUrl} controls className="mt-5 w-full" />
                    </div>
                    <div className="mt-5 border border-[#D7DFDD] bg-[#F9FAFB] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5E6E73]">Listening Notes</p>
                      <p className="mt-2 text-sm leading-7 text-[#142D35]">
                        {instrument?.story ?? 'Open the drawer to explore a focused listening experience with motion-led controls.'}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#D7DFDD] p-5">
                    <Dialog.Close asChild>
                      <button type="button" className="inline-flex w-full items-center justify-center gap-2 border border-[#142D35] bg-[#E63946] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-[#C92E3A]">
                        Close
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}

export default InstrumentDetailExperience;