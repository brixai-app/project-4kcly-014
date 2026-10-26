import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Phone, MapPin, Send, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { ContactMessage, FormError } from '@/types';
import { cn } from '@/lib/utils';

type ContactExperienceProps = {
  className?: string;
  embedded?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type ContactFormProps = {
  className?: string;
  embedded?: boolean;
  onSuccess?: () => void;
};

const initialMessage: ContactMessage = { name: '', email: '', subject: '', message: '' };

const contactPoints = [
  { icon: Mail, label: 'Email', value: 'hello@sursangeet.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Studio', value: 'Mumbai, India' },
];

function validate(values: ContactMessage): FormError[] {
  const errors: FormError[] = [];
  if (!values.name.trim()) errors.push({ field: 'name', message: 'Please enter your name.' });
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.push({ field: 'email', message: 'Please enter a valid email.' });
  if (!values.subject.trim()) errors.push({ field: 'subject', message: 'Please add a subject.' });
  if (values.message.trim().length < 20) errors.push({ field: 'message', message: 'Message should be at least 20 characters.' });
  return errors;
}

export function ContactForm({ className = '', embedded = false, onSuccess = () => {} }: ContactFormProps) {
  const [values, setValues] = useState<ContactMessage>(initialMessage);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const errorMap = useMemo(() => Object.fromEntries(errors.map((e) => [e.field, e.message])), [errors]);

  const handleChange = (field: keyof ContactMessage, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    setSubmitting(false);
    setValues(initialMessage);
    setErrors([]);
    toast.success('Message sent. We will respond shortly.');
    onSuccess();
  };

  const fieldBase =
    'w-full border border-[#D7DCE2] bg-white px-4 py-3 text-sm text-[#17191C] outline-none transition focus:border-[#D32F2F]';
  const labelBase = 'text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5E6670]';

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-5', className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {(['name', 'email'] as const).map((field) => (
          <label key={field} className="space-y-2">
            <span className={labelBase}>{field}</span>
            <input
              value={values[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className={cn(fieldBase, errorMap?.[field] ? 'border-[#D32F2F]' : '')}
              aria-invalid={Boolean(errorMap?.[field])}
              aria-describedby={`${field}-error`}
              placeholder={field === 'name' ? 'Your name' : 'you@example.com'}
            />
            <AnimatePresence>
              {errorMap?.[field] ? (
                <motion.p id={`${field}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-[#D32F2F]">
                  {errorMap?.[field]}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </label>
        ))}
      </div>

      <label className="space-y-2 block">
        <span className={labelBase}>Subject</span>
        <input
          value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={cn(fieldBase, errorMap?.subject ? 'border-[#D32F2F]' : '')}
          aria-invalid={Boolean(errorMap?.subject)}
          aria-describedby="subject-error"
          placeholder="How can we help?"
        />
        <AnimatePresence>
          {errorMap?.subject ? (
            <motion.p id="subject-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-[#D32F2F]">
              {errorMap?.subject}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </label>

      <label className="space-y-2 block">
        <span className={labelBase}>Message</span>
        <textarea
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={cn(fieldBase, 'min-h-[160px] resize-none', errorMap?.message ? 'border-[#D32F2F]' : '')}
          aria-invalid={Boolean(errorMap?.message)}
          aria-describedby="message-error"
          placeholder="Tell us about the instrument, commission, or collaboration you have in mind."
        />
        <AnimatePresence>
          {errorMap?.message ? (
            <motion.p id="message-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-[#D32F2F]">
              {errorMap?.message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </label>

      <div className={cn('flex items-center justify-between gap-4', embedded ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row')}>
        <p className="text-sm text-[#5E6670]">We typically reply within one business day.</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#B71C1C] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Check className="h-4 w-4 animate-pulse" />
              Sending
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactExperience({ className = '', embedded = false, open = false, onOpenChange = () => {} }: ContactExperienceProps) {
  const content = (
    <div className={cn('grid gap-8 lg:grid-cols-[0.9fr_1.1fr]', className)}>
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D32F2F]">Contact SurSangeet</p>
          <h2 className="max-w-xl font-['Playfair_Display'] text-4xl font-light tracking-tight text-[#17191C] sm:text-5xl">
            Begin a conversation about instruments, sourcing, or a bespoke commission.
          </h2>
          <p className="max-w-lg text-sm leading-7 text-[#5E6670]">
            Share your brief and we will respond with a considered, editorially curated reply.
          </p>
        </div>

        <div className="space-y-3 border-l border-[#D7DCE2] pl-5">
          {contactPoints.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center border border-[#D7DCE2] bg-white text-[#D32F2F]">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5E6670]">{item.label}</p>
                  <p className="text-sm text-[#17191C]">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-[#D7DCE2] bg-[#F5F5F5] p-5 sm:p-6">
        <ContactForm embedded={embedded} onSuccess={() => onOpenChange(false)} />
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40" />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-[#D7DCE2] px-5 py-4 sm:px-6">
              <div>
                <Dialog.Title className="font-['Playfair_Display'] text-2xl font-light text-[#17191C]">Contact</Dialog.Title>
                <Dialog.Description className="text-sm text-[#5E6670]">Send a message to the SurSangeet team.</Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="inline-flex h-10 w-10 items-center justify-center border border-[#D7DCE2] text-[#17191C] transition hover:border-[#D32F2F] hover:text-[#D32F2F]">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            <div className="p-5 sm:p-6">{content}</div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ContactExperience;