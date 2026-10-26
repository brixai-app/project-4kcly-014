import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { CheckCircle2, Mail, MessageCircle, Send, User } from 'lucide-react';
import type { ContactMessage } from '@/types';
import { cn } from '@/lib/utils';

export interface ContactFormProps {
  className?: string;
}

type Errors = Partial<Record<keyof ContactMessage, string>>;

const initialForm: ContactMessage = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validate(values: ContactMessage): Errors {
  const next: Errors = {};
  if (!values.name.trim()) next.name = 'Name is required.';
  if (!values.email.trim()) next.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address.';
  if (!values.subject.trim()) next.subject = 'Subject is required.';
  if (values.message.trim().length < 20) next.message = 'Message must be at least 20 characters.';
  return next;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [form, setForm] = useState<ContactMessage>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactMessage, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const updateField = (field: keyof ContactMessage, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    const next = validate({ ...form, [field]: value });
    setErrors(next);
  };

  const handleBlur = (field: keyof ContactMessage) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please correct the highlighted fields.');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    toast.success('Message sent successfully.');
    setForm(initialForm);
    setErrors({});
    setTouched({});
  };

  const fieldClass = (field: keyof ContactMessage) =>
    cn(
      'w-full rounded-md border bg-white px-4 py-3 text-sm text-[#18222C] outline-none transition focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/15',
      errors[field] && touched[field] ? 'border-[#D32F2F]' : 'border-[#D7DDE3]'
    );

  return (
    <motion.section
      className={cn('rounded-[12px] border border-[#D7DDE3] bg-white p-6 shadow-sm md:p-8', className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="mt-1 rounded-md border border-[#D7DDE3] bg-[#F5F5F5] p-2">
          <MessageCircle className="h-5 w-5 text-[#D32F2F]" />
        </div>
        <div>
          <h2 className="font-['Outfit'] text-2xl font-light tracking-tight text-[#18222C]">Send a note</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-[#5F6B76]">
            Share your instrument preferences, sourcing questions, or collaboration ideas. We reply with care.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#5F6B76]">
              Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6B76]" />
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className={cn(fieldClass('name'), 'pl-10')}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name && touched.name)}
                aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
              />
            </div>
            {errors.name && touched.name ? (
              <p id="name-error" className="mt-2 text-xs text-[#D32F2F]">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#5F6B76]">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6B76]" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={cn(fieldClass('email'), 'pl-10')}
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email && touched.email)}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && touched.email ? (
              <p id="email-error" className="mt-2 text-xs text-[#D32F2F]">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#5F6B76]">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            onBlur={() => handleBlur('subject')}
            className={fieldClass('subject')}
            placeholder="What can we help with?"
            aria-invalid={Boolean(errors.subject && touched.subject)}
            aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
          />
          {errors.subject && touched.subject ? (
            <p id="subject-error" className="mt-2 text-xs text-[#D32F2F]">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#5F6B76]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            className={cn(fieldClass('message'), 'resize-none')}
            placeholder="Tell us about the instrument, tone, finish, or occasion."
            aria-invalid={Boolean(errors.message && touched.message)}
            aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            {errors.message && touched.message ? (
              <p id="message-error" className="text-xs text-[#D32F2F]">
                {errors.message}
              </p>
            ) : (
              <p className="text-xs text-[#5F6B76]">Minimum 20 characters.</p>
            )}
            <p className={cn('text-xs', form.message.trim().length >= 20 ? 'text-[#18222C]' : 'text-[#5F6B76]')}>
              {form.message.trim().length}/20
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[#5F6B76]">
            We use your details only to respond to your inquiry.
          </p>
          <button
            type="submit"
            disabled={isSubmitting || hasErrors}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-md bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#B71C1C] disabled:cursor-not-allowed disabled:opacity-60'
            )}
          >
            {isSubmitting ? (
              <>
                <CheckCircle2 className="h-4 w-4 animate-pulse" />
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
    </motion.section>
  );
}

export default ContactForm;