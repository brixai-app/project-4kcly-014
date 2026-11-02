import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export function ContactPage({ className = '' }: { className?: string }) {
  return (
    <main className={className}>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-6 lg:px-8">
        <div className="flex min-w-0 flex-col justify-between gap-8 rounded-sm border border-[#D7DFDD] bg-white p-6 md:p-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E63946]">Contact</p>
            <h1 className="max-w-xl font-['Montserrat',sans-serif] text-4xl font-light uppercase tracking-tight text-[#142D35] sm:text-5xl lg:text-6xl">
              Begin a conversation with the workshop
            </h1>
            <p className="max-w-xl text-sm leading-7 text-[#5E6E73] sm:text-base">
              Share your instrument interests, listening requests, or collaboration ideas. We respond with clarity, care, and a direct line to the right specialist.
            </p>
          </div>

          <div className="grid gap-3 border-t border-[#D7DFDD] pt-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#142D35]">Email</p>
                <p className="truncate text-sm text-[#5E6E73]">hello@sursangeet.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#142D35]">Phone</p>
                <p className="truncate text-sm text-[#5E6E73]">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#142D35]">Studio</p>
                <p className="break-words text-sm text-[#5E6E73]">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-sm border border-[#D7DFDD] bg-[#F9FAFB] p-4 sm:p-6 md:p-8">
          <ContactForm className="w-full" />
        </div>
      </section>
    </main>
  );
}

export default ContactPage;