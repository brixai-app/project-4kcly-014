import React, { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { ContactFormValues, ModalProps } from '@/types';

export type ContactFormModalProps = ModalProps & {
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
  initialValues?: Partial<ContactFormValues>;
  title?: string;
  subtitle?: string;
};

const emptyValues: ContactFormValues = { name: '', email: '', subject: '', message: '' };

function validate(values: ContactFormValues) {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Subject is required.';
  if (!values.message.trim()) errors.message = 'Message is required.';
  else if (values.message.trim().length < 20) errors.message = 'Message should be at least 20 characters.';
  return errors;
}

export function ContactFormModal({
  open = false,
  onOpenChange = () => undefined,
  className = '',
  onSubmit,
  initialValues = {},
  title = 'Send an inquiry',
  subtitle = 'Tell us what you are looking for and we will respond with care.',
}: ContactFormModalProps) {
  const [values, setValues] = useState<ContactFormValues>({ ...emptyValues, ...initialValues });
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (open) {
      setValues({ ...emptyValues, ...initialValues });
      setTouched({});
      setStatus('idle');
      setSubmitting(false);
    }
  }, [open, initialValues]);

  const errors = useMemo(() => validate(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  const update = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextTouched = { name: true, email: true, subject: true, message: true };
    setTouched(nextTouched);
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please complete the form before sending.');
      return;
    }
    setSubmitting(true);
    try {
      if (onSubmit) await onSubmit(values);
      else {
        const response = await fetch('/api/contact-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error('Request failed');
      }
      setStatus('success');
      toast.success('Your message has been sent.');
      setTimeout(() => onOpenChange(false), 700);
    } catch {
      setStatus('error');
      toast.error('Unable to send your message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (field: keyof ContactFormValues) =>
    cn(
      'w-full rounded-md border border-[#C9C3A8] bg-[#FFFDF2] px-4 py-3 text-sm text-[#1D3557] outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20',
      touched[field] && errors[field] ? 'border-[#E63946]' : ''
    );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0a0a0a]/45 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-[#C9C3A8] bg-[#F4F1DE] shadow-2xl outline-none',
            className
          )}
        >
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex h-full flex-col"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#C9C3A8] px-6 py-5">
              <div className="min-w-0">
                <Dialog.Title className="font-['Outfit'] text-2xl font-light tracking-tight text-[#1D3557]">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 max-w-md text-sm leading-6 text-[#596579]">
                  {subtitle}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#C9C3A8] bg-[#FFFDF2] text-[#1D3557] transition hover:border-[#E63946] hover:text-[#E63946]"
                  aria-label="Close contact form"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col px-6 py-5">
              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#596579]">
                    <User className="h-4 w-4" /> Name
                  </span>
                  <input value={values.name} onChange={(e) => update('name', e.target.value)} className={fieldClass('name')} placeholder="Your name" />
                  <AnimatePresence>
                    {touched.name && errors.name ? (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 flex items-center gap-2 text-xs text-[#E63946]">
                        <AlertCircle className="h-4 w-4" /> {errors.name}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#596579]">
                    <Mail className="h-4 w-4" /> Email
                  </span>
                  <input value={values.email} onChange={(e) => update('email', e.target.value)} className={fieldClass('email')} placeholder="you@example.com" type="email" />
                  <AnimatePresence>
                    {touched.email && errors.email ? (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 flex items-center gap-2 text-xs text-[#E63946]">
                        <AlertCircle className="h-4 w-4" /> {errors.email}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#596579]">
                    <MessageCircle className="h-4 w-4" /> Subject
                  </span>
                  <input value={values.subject} onChange={(e) => update('subject', e.target.value)} className={fieldClass('subject')} placeholder="Instrument inquiry" />
                  <AnimatePresence>
                    {touched.subject && errors.subject ? (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 flex items-center gap-2 text-xs text-[#E63946]">
                        <AlertCircle className="h-4 w-4" /> {errors.subject}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#596579]">
                    <MessageCircle className="h-4 w-4" /> Message
                  </span>
                  <textarea value={values.message} onChange={(e) => update('message', e.target.value)} className={cn(fieldClass('message'), 'min-h-40 resize-none')} placeholder="Share the instrument, collection, or guidance you need." />
                  <AnimatePresence>
                    {touched.message && errors.message ? (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 flex items-center gap-2 text-xs text-[#E63946]">
                        <AlertCircle className="h-4 w-4" /> {errors.message}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </label>

                {status === 'success' ? (
                  <div className="flex items-center gap-2 rounded-md border border-[#C9C3A8] bg-[#FFFDF2] px-4 py-3 text-sm text-[#1D3557]">
                    <CheckCircle2 className="h-4 w-4 text-[#E63946]" /> Message sent successfully.
                  </div>
                ) : null}
                {status === 'error' ? (
                  <div className="flex items-center gap-2 rounded-md border border-[#E63946] bg-[#FFFDF2] px-4 py-3 text-sm text-[#1D3557]">
                    <AlertCircle className="h-4 w-4 text-[#E63946]" /> Something went wrong. Please try again.
                  </div>
                ) : null}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#C9C3A8] pt-5">
                <p className="text-xs leading-5 text-[#596579]">
                  We reply within 1–2 business days.
                </p>
                <button
                  type="submit"
                  disabled={submitting || hasErrors}
                  className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-[#C92535] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Sending' : 'Send'}
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ContactFormModal;