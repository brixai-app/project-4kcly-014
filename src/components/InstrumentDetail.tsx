import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Mail, MapPin, Phone } from 'lucide-react';
import type { Instrument } from '@/types';
import ContactExperience from '@/components/ContactExperience';
import { cn } from '@/lib/utils';

type InstrumentDetailProps = {
  instrument?: Instrument | null;
  className?: string;
};

export function InstrumentDetail({ instrument = null, className = '' }: InstrumentDetailProps) {
  const fallbackImage = 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80';
  const image = instrument?.image ?? fallbackImage;
  const name = instrument?.name ?? 'Instrument';
  const category = instrument?.category ?? 'String';
  const availability = instrument?.availability ?? 'available';
  const price = instrument?.price ?? 0;
  const description =
    instrument?.description ??
    'A curated instrument selected for its tonal character, tactile finish, and stage-ready presence.';
  const origin = instrument?.origin ?? 'India';
  const materials = instrument?.materials ?? ['Hand-finished wood', 'Precision hardware', 'Natural lacquer'];
  const accentClass =
    instrument?.accent === 'green'
      ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
      : instrument?.accent === 'blue'
        ? 'text-blue-700 border-blue-200 bg-blue-50'
        : 'text-red-700 border-red-200 bg-red-50';

  const availabilityLabel =
    availability === 'limited' ? 'Limited availability' : availability === 'sold-out' ? 'Sold out' : 'Available now';

  return (
    <section className={cn('w-full bg-white text-[#17191C]', className)}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8">
        <div className="space-y-5">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670] transition-colors hover:text-[#17191C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </Link>

          <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] shadow-sm"
            >
              <img
                src={image}
                alt={name}
                crossOrigin="anonymous"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>

            <div className="grid gap-4">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
                className="overflow-hidden rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5]"
              >
                <img
                  src={instrument?.image ?? 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85'}
                  alt={`${name} detail`}
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>

              <div className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670]">At a glance</p>
                <div className="mt-4 space-y-3 text-sm text-[#5E6670]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#D32F2F]" />
                    <span>{origin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#D32F2F]" />
                    <span>Private consultation available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#D32F2F]" />
                    <span>Concierge response within one business day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:pt-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn('border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]', accentClass)}>
              {category}
            </span>
            <span className="border border-[#D7DCE2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
              {availabilityLabel}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-['Playfair_Display',serif] text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl">
              {name}
            </h1>
            <div className="h-px w-20 bg-[#D32F2F]" />
            <p className="max-w-xl text-base leading-7 text-[#5E6670]">{description}</p>
          </div>

          <div className="rounded-[10px] border border-[#D7DCE2] bg-white p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670]">Display price</p>
                <p className="mt-2 text-3xl font-semibold text-[#17191C]">₹{price.toLocaleString('en-IN')}</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">Enquire to reserve</span>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670]">Materials</p>
            <ul className="mt-4 space-y-3">
              {materials.map((material) => (
                <li key={material} className="flex items-start gap-3 text-sm text-[#17191C]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D32F2F]" />
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#B71C1C]"
            >
              Contact concierge
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#D7DCE2] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#17191C] transition-colors hover:bg-[#F5F5F5]"
            >
              Continue browsing
            </Link>
          </div>

          <div className="rounded-[10px] border border-[#D7DCE2] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5E6670]">Need a guided recommendation?</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5E6670]">
              Share your performance context, preferred tonal range, and budget. Our team will respond with a tailored shortlist and availability update.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D7DCE2] bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
          <ContactExperience embedded open={false} className="w-full" />
        </div>
      </div>
    </section>
  );
}

export default InstrumentDetail;