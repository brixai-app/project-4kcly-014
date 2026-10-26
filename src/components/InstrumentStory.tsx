import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Play, Pause, Volume2, AlertCircle, MapPin, Calendar, Shield, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Instrument, SoundSample } from '@/types';
import { instruments } from '@/data/mockData';

export function HorizontalImageGallery({ images = [], title = '' }: { images?: string[]; title?: string }) {
  const [active, setActive] = useState(0);
  const safeImages = images?.length ? images : [];
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#6F675E]">Image ribbon</p>
          <h2 className="font-['Bodoni_Moda'] text-2xl text-[#2E2B28]">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActive((p) => Math.max(0, p - 1))} className="border border-[#C9BBA8] bg-[#EFE9E1] p-2 text-[#2E2B28] transition hover:bg-[#F9F6F2]">
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => setActive((p) => Math.min(Math.max(safeImages.length - 1, 0), p + 1))} className="border border-[#C9BBA8] bg-[#EFE9E1] p-2 text-[#2E2B28] transition hover:bg-[#F9F6F2]">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden border border-[#C9BBA8] bg-[#EFE9E1]">
        <motion.div drag="x" dragConstraints={{ left: -(Math.max(safeImages.length - 1, 0) * 280), right: 0 }} className="flex gap-3 p-3">
          {safeImages.map((src, index) => (
            <motion.button key={`${src}-${index}`} onClick={() => setActive(index)} whileHover={{ y: -4 }} className={cn('relative h-56 w-72 shrink-0 overflow-hidden border transition', active === index ? 'border-[#8B0000]' : 'border-[#C9BBA8]')}>
              <img src={src} alt={`${title} ${index + 1}`} crossOrigin="anonymous" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function SoundSamplePlayer({ samples = [] }: { samples?: SoundSample[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sample = samples?.[active] ?? samples?.[0];
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !sample?.url) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.play().then(() => setPlaying(true)).catch(() => toast.error('Audio preview unavailable.'));
  };
  return (
    <div className="border border-[#C9BBA8] bg-[#EFE9E1] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#6F675E]">Sound sample</p>
          <h3 className="font-['Bodoni_Moda'] text-xl text-[#2E2B28]">{sample?.label ?? 'Preview'}</h3>
        </div>
        <button onClick={toggle} className="inline-flex items-center gap-2 border border-[#8B0000] bg-[#8B0000] px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-[#690000]">
          {playing ? <Pause size={14} /> : <Play size={14} />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <audio ref={audioRef} src={sample?.url ?? ''} onEnded={() => setPlaying(false)} />
      <div className="mt-4 grid gap-2">
        {samples.map((item, index) => (
          <button key={`${item.label}-${index}`} onClick={() => { setActive(index); setPlaying(false); }} className={cn('flex items-center justify-between border px-3 py-2 text-left transition', active === index ? 'border-[#8B0000] bg-[#F9F6F2]' : 'border-[#C9BBA8] bg-white hover:bg-[#F9F6F2]')}>
            <span className="text-sm text-[#2E2B28]">{item.label}</span>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-[#6F675E]"><Volume2 size={12} />{item.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function EditorialContent({ instrument }: { instrument?: Instrument }) {
  const safe = instrument ?? instruments?.[0];
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#6F675E]">Provenance</p>
        <h1 className="font-['Bodoni_Moda'] text-4xl leading-none text-[#2E2B28] md:text-6xl">{safe?.name ?? 'Instrument'}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6F675E]">
          <span className="inline-flex items-center gap-2"><MapPin size={14} />{safe?.origin ?? 'Unknown origin'}</span>
          <span className="inline-flex items-center gap-2"><Calendar size={14} />{safe?.year ?? 'Undated'}</span>
          <span className="inline-flex items-center gap-2"><Shield size={14} />{safe?.condition ?? 'collector'}</span>
        </div>
      </div>
      <p className="max-w-3xl text-base leading-8 text-[#2E2B28]">{safe?.description ?? ''}</p>
      <p className="max-w-3xl text-base leading-8 text-[#6F675E]">{safe?.story ?? ''}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(safe?.materials ?? []).map((material) => (
          <div key={material} className="border border-[#C9BBA8] bg-[#EFE9E1] px-4 py-3 text-sm uppercase tracking-[0.25em] text-[#2E2B28]">{material}</div>
        ))}
      </div>
      <div className="border border-[#C9BBA8] bg-[#F9F6F2] p-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#6F675E]"><FileText size={14} />Curatorial note</div>
        <p className="mt-3 text-sm leading-7 text-[#2E2B28]">Each surface mark, repair line, and tonal variation is preserved as part of the instrument&apos;s living archive.</p>
      </div>
    </div>
  );
}

export function NotFoundState({ onBack = () => {} }: { onBack?: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <AlertCircle className="text-[#8B0000]" size={34} />
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#6F675E]">Record missing</p>
        <h2 className="font-['Bodoni_Moda'] text-4xl text-[#2E2B28]">This instrument record could not be located.</h2>
        <p className="max-w-xl text-base leading-8 text-[#6F675E]">The archive may have been updated. Return to the collection or browse another provenance entry.</p>
      </div>
      <button onClick={onBack} className="inline-flex items-center gap-2 border border-[#8B0000] bg-[#8B0000] px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-[#690000]">
        <ArrowLeft size={14} />
        Back to collection
      </button>
    </div>
  );
}

export function InstrumentStory() {
  const { instrumentId } = useParams();
  const navigate = useNavigate();
  const instrument = useMemo(() => instruments?.find((item) => item.id === instrumentId), [instrumentId]);
  const gallery = useMemo(() => [instrument?.image ?? '', ...(instrument?.materials?.slice(0, 2)?.map((_, i) => `https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80 ?? 'instrument'}-${i}/1200/800`) ?? [])].filter(Boolean), [instrument]);
  if (!instrument) return <NotFoundState onBack={() => navigate('/')} />;
  return (
    <section className="bg-[#F9F6F2] text-[#2E2B28]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-6 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-10">
        <div className="space-y-8">
          <HorizontalImageGallery images={gallery} title={instrument.name} />
          <EditorialContent instrument={instrument} />
        </div>
        <div className="space-y-6 md:sticky md:top-6 md:self-start">
          <div className="border border-[#C9BBA8] bg-[#EFE9E1] p-5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#6F675E]">Inquiry</p>
            <h3 className="mt-2 font-['Bodoni_Moda'] text-2xl text-[#2E2B28]">Private viewing request</h3>
            <p className="mt-3 text-sm leading-7 text-[#6F675E]">For availability, provenance, restoration, or shipping, submit a curated inquiry from the editorial archive.</p>
            <button onClick={() => toast.success('Inquiry drawer is available from the site chrome.')} className="mt-5 inline-flex items-center gap-2 border border-[#8B0000] bg-[#8B0000] px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-[#690000]">
              Open inquiry
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="border border-[#C9BBA8] bg-white p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#6F675E]"><Clock size={14} />Archive details</div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-[#EFE9E1] pb-2"><dt className="text-[#6F675E]">Category</dt><dd className="text-[#2E2B28]">{instrument.category}</dd></div>
              <div className="flex justify-between gap-4 border-b border-[#EFE9E1] pb-2"><dt className="text-[#6F675E]">Condition</dt><dd className="text-[#2E2B28]">{instrument.condition}</dd></div>
              <div className="flex justify-between gap-4 border-b border-[#EFE9E1] pb-2"><dt className="text-[#6F675E]">Price</dt><dd className="text-[#2E2B28]">{instrument.price}</dd></div>
            </dl>
          </div>
          <SoundSamplePlayer samples={instrument.soundSamples} />
        </div>
      </div>
    </section>
  );
}

export default InstrumentStory;