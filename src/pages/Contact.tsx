import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe2, MapPin, Mail, Phone, ArrowRight, Circle as Icon } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { mockData } from '@/data/mockData';

export function Contact() {
  const store = (mockData as { store?: { name?: string; address?: string; phone?: string; email?: string; hours?: string[]; mapImage?: string } })?.store ?? {};
  const hours = store?.hours ?? ['Mon–Fri · 10:00–19:00', 'Sat · 11:00–18:00', 'Sun · By appointment'];
  const mapImage = store?.mapImage ?? 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80';

  return (
    <main className="bg-white text-[#17191C]">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col justify-between rounded-[10px] border border-[#D6DADE] bg-[#F5F5F5] p-6 md:p-8"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5E6670]">Contact</p>
              <h1 className="max-w-xl font-serif text-5xl font-light tracking-tight md:text-6xl">
                Speak with the atelier.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-[#5E6670] md:text-base">
                Share your instrument interest, performance needs, or sourcing questions. We respond with curated guidance and availability details.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoBlock icon={MapPin} label="Visit" value={store?.address ?? 'Studio showroom, by appointment'} />
              <InfoBlock icon={Phone} label="Call" value={store?.phone ?? '+91 00000 00000'} />
              <InfoBlock icon={Mail} label="Email" value={store?.email ?? 'hello@sursangeet.com'} />
              <InfoBlock icon={Globe2} label="Response" value="Within one business day" />
            </div>
          </div>
          <div className="mt-10 border-t border-[#D6DADE] pt-6">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-[#D32F2F]" />
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5E6670]">Opening hours</p>
                <div className="space-y-1 text-sm text-[#17191C]">
                  {hours.map((hour) => (
                    <p key={hour}>{hour}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-[10px] border border-[#D6DADE] bg-white">
            <img
              src={mapImage}
              alt="Map view of the SurSangeet showroom area"
              crossOrigin="anonymous"
              className="h-72 w-full object-cover"
            />
            <div className="flex items-center justify-between gap-4 border-t border-[#D6DADE] bg-white px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5E6670]">Studio map</p>
                <p className="mt-1 text-sm text-[#17191C]">{store?.name ?? 'SurSangeet Studio'}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store?.address ?? 'SurSangeet Studio')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D32F2F] transition-colors hover:text-[#B71C1C]"
              >
                Open map <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <ContactForm className="rounded-[10px] border border-[#D6DADE] bg-white p-5 md:p-6" />
        </motion.div>
      </section>
    </main>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[10px] border border-[#D6DADE] bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#D32F2F]" />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5E6670]">{label}</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#17191C]">{value}</p>
    </div>
  );
}

export default Contact;