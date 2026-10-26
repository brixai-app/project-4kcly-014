import { motion } from 'framer-motion';
import { Clock, Globe2, Mail, MapPin, Phone } from 'lucide-react';
import ContactExperience from '@/components/ContactExperience';
import { locations } from '@/data/mockData';

export function ContactPage() {
  const primaryLocation = locations?.[0] ?? {
    name: 'SurSangeet Atelier',
    address: 'New Delhi, India',
    phone: '+91 98765 43210',
    email: 'hello@sursangeet.com',
    hours: 'Mon–Sat · 10:00–19:00',
    mapImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
  };

  return (
    <main className="bg-white text-[#17191C]">
      <section className="mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-between rounded-[10px] border border-[#D7DCE2] bg-white p-6 md:p-8"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Contact</p>
              <h1 className="max-w-xl font-['Playfair_Display'] text-5xl font-light tracking-tight md:text-6xl">
                Speak with the atelier.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-[#5E6670] md:text-base">
                For bespoke sourcing, instrument guidance, or private appointments, send a note and our team will respond with care.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <Phone className="h-4 w-4 text-[#D32F2F]" />
                  Call
                </div>
                <a className="text-sm font-medium text-[#17191C] transition-colors hover:text-[#D32F2F]" href={`tel:${primaryLocation?.phone ?? ''}`}>
                  {primaryLocation?.phone ?? '+91 98765 43210'}
                </a>
              </div>
              <div className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <Mail className="h-4 w-4 text-[#D32F2F]" />
                  Email
                </div>
                <a className="text-sm font-medium text-[#17191C] transition-colors hover:text-[#D32F2F]" href={`mailto:${primaryLocation?.email ?? 'hello@sursangeet.com'}`}>
                  {primaryLocation?.email ?? 'hello@sursangeet.com'}
                </a>
              </div>
            </div>

            <div className="grid gap-4 border-t border-[#D7DCE2] pt-6 sm:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <MapPin className="h-4 w-4 text-[#D32F2F]" />
                  Visit
                </div>
                <p className="text-sm leading-6 text-[#17191C]">{primaryLocation?.address ?? 'New Delhi, India'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <Clock className="h-4 w-4 text-[#D32F2F]" />
                  Hours
                </div>
                <p className="text-sm leading-6 text-[#17191C]">{primaryLocation?.hours ?? 'Mon–Sat · 10:00–19:00'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">
                  <Globe2 className="h-4 w-4 text-[#D32F2F]" />
                  Reach
                </div>
                <p className="text-sm leading-6 text-[#17191C]">Private appointments and remote consultations available.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[#D7DCE2] pt-6">
            <p className="max-w-lg text-xs uppercase tracking-[0.24em] text-[#5E6670]">
              Curated instruments, thoughtful guidance, and direct access to the collection.
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            className="overflow-hidden rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5]"
          >
            <img
              src={primaryLocation?.mapImage ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85'}
              alt={primaryLocation?.name ?? 'Store location'}
              crossOrigin="anonymous"
              className="h-[28rem] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
            className="rounded-[10px] border border-[#D7DCE2] bg-[#F5F5F5] p-6 md:p-8"
          >
            <ContactExperience embedded className="w-full" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;