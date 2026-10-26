import { Mail, MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export function ContactPage() {
  const contactPoints = [
    { icon: Mail, label: 'Email', value: 'hello@sursangeet.in', href: 'mailto:hello@sursangeet.in' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, label: 'Studio', value: 'Bengaluru, India', href: 'https://maps.google.com/?q=Bengaluru,India' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat · 10:00–19:00', href: undefined },
  ];

  return (
    <main className="bg-white text-[#18222C]">
      <section className="border-b border-[#D7DDE3]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#D7DDE3] bg-[#F5F5F5] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">
              <Sparkles className="h-4 w-4 text-[#D32F2F]" />
              Contact SurSangeet
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl font-[Outfit,sans-serif] text-5xl font-light tracking-tight md:text-6xl">
                Reach the studio for guidance, sourcing, and tailored instrument recommendations.
              </h1>
              <p className="max-w-xl text-base leading-7 text-[#5F6B76] md:text-lg">
                Whether you are comparing tonal character, checking availability, or planning a curated setup, our team responds with precise, human support.
              </p>
            </div>
          </div>

          <div className="grid gap-3 self-end rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-5">
            {contactPoints.map((point) => {
              const Icon = point.icon;
              const content = (
                <div className="flex items-start gap-4 rounded-[12px] border border-[#D7DDE3] bg-white p-4 transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#D7DDE3] bg-[#F5F5F5] text-[#D32F2F]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5F6B76]">{point.label}</div>
                    <div className="text-sm font-medium text-[#18222C]">{point.value}</div>
                  </div>
                </div>
              );
              return point.href ? (
                <a key={point.label} href={point.href} className="block focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2">
                  {content}
                </a>
              ) : (
                <div key={point.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <ContactForm />
      </section>
    </main>
  );
}

export default ContactPage;