import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface ContactPageProps {
  className?: string;
}

export function ContactPage({ className = '' }: ContactPageProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    setOpen(true);
  }, []);

  const canSubmit = useMemo(
    () => Boolean(form.name?.trim() && form.email?.trim() && form.subject?.trim() && form.message?.trim()),
    [form]
  );

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast.error('Please complete every field before sending.');
      return;
    }
    toast.success('Message prepared. We will respond shortly.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className={cn('mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8', className)}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-[18px] border border-[#D8DEE5] bg-[#F7F5F2] p-6 shadow-[0_18px_50px_rgba(34,34,34,0.08)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Contact</p>
          <h1 className="mt-4 max-w-xl font-['Outfit'] text-4xl font-light tracking-tight text-[#222222] sm:text-5xl">
            Let’s shape your next musical conversation.
          </h1>
          <p className="mt-4 max-w-2xl font-['Open_Sans'] text-sm leading-7 text-[#5E6670] sm:text-base">
            Reach out for instrument guidance, availability questions, or a curated recommendation. The drawer opens automatically on entry for a direct line to the studio.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Mail, label: 'Email', value: 'hello@sursangeet.com' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Studio', value: 'New Delhi, India' },
            ].map((item) => (
              <div key={item.label} className="rounded-[18px] border border-[#D8DEE5] bg-white p-4">
                <item.icon className="h-5 w-5 text-[#E63946]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">{item.label}</p>
                <p className="mt-1 break-words text-sm font-medium text-[#222222]">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="rounded-[18px] border border-[#D8DEE5] bg-white p-6 shadow-[0_18px_50px_rgba(34,34,34,0.08)]"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5E6670]">Message</p>
              <h2 className="mt-2 font-['Outfit'] text-2xl font-light tracking-tight text-[#222222]">Start the drawer</h2>
            </div>
            <div className={cn('h-3 w-3 rounded-full', open ? 'bg-[#E63946]' : 'bg-[#D8DEE5]')} />
          </div>

          <div className="mt-6 grid gap-4">
            {[
              ['name', 'Your name'],
              ['email', 'Email address'],
              ['subject', 'Subject'],
            ].map(([field, label]) => (
              <label key={field} className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">{label}</span>
                <input
                  value={form[field as keyof typeof form]}
                  onChange={(e) => handleChange(field as keyof typeof form, e.target.value)}
                  className="w-full rounded-md border border-[#D8DEE5] bg-[#F7F5F2] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-[#E63946]"
                />
              </label>
            ))}
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">Message</span>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full rounded-md border border-[#D8DEE5] bg-[#F7F5F2] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-[#E63946]"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#C92836]"
          >
            <Send className="h-4 w-4" />
            Send inquiry
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactPage;