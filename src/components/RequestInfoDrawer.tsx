import React, { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Phone, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useShowcase } from '@/context/ShowcaseContext';
import type { ContactInquiry, Instrument, ValidationError } from '@/types';

type Props = { className?: string };

const initialInquiry: ContactInquiry = {
  name: '',
  email: '',
  phone: '',
  instrumentId: '',
  subject: '',
  message: '',
  preferredContact: 'email',
};

export function RequestInfoDrawer({ className = '' }: Props) {
  const { navigationState, setNavigationState, instruments = [], submitInquiry = async () => ({ ok: true }) } = useShowcase() as {
    navigationState?: { isDrawerOpen?: boolean; activeInstrumentId?: string | null };
    setNavigationState?: (next: any) => void;
    instruments?: Instrument[];
    submitInquiry?: (inquiry: ContactInquiry) => Promise<{ ok?: boolean; message?: string }>;
  };

  const open = navigationState?.isDrawerOpen ?? false;
  const activeInstrumentId = navigationState?.activeInstrumentId ?? null;
  const activeInstrument = useMemo(
    () => instruments?.find((item) => item?.id === activeInstrumentId) ?? null,
    [activeInstrumentId, instruments]
  );

  const [form, setForm] = useState<ContactInquiry>(initialInquiry);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...initialInquiry, instrumentId: activeInstrument?.id ?? prev.instrumentId ?? '' }));
      setErrors([]);
      setSuccess(false);
    }
  }, [open, activeInstrument?.id]);

  const updateField = (field: keyof ContactInquiry, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const validate = () => {
    const next: ValidationError[] = [];
    if (!form.name?.trim()) next.push({ field: 'name', message: 'Name is required.' });
    if (!form.email?.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.push({ field: 'email', message: 'Enter a valid email address.' });
    if (!form.subject?.trim()) next.push({ field: 'subject', message: 'Subject is required.' });
    if (!form.message?.trim() || form.message.trim().length < 12) next.push({ field: 'message', message: 'Please share a little more detail.' });
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.length) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form, instrumentId: form.instrumentId || activeInstrument?.id || undefined };
      const result = await submitInquiry(payload);
      if (result?.ok === false) throw new Error(result?.message ?? 'Submission failed.');
      setSuccess(true);
      toast.success('Inquiry sent successfully.');
      setForm({ ...initialInquiry, instrumentId: activeInstrument?.id ?? '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (field: string) => errors.find((error) => error.field === field)?.message ?? '';

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => setNavigationState?.((prev: any) => ({ ...(prev ?? {}), isDrawerOpen: next }))}
    >
      <Dialog.Portal>
        <AnimatePresence>
          {open ? (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  className={cn(
                    'fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-[#D8D4CC] bg-white shadow-2xl outline-none',
                    className
                  )}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between border-b border-[#D8D4CC] px-5 py-4">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5F6368]">Request Information</p>
                        <Dialog.Title className="mt-2 font-['Outfit'] text-2xl font-light tracking-tight text-[#1A1A1A]">
                          {activeInstrument?.name ?? 'Instrument Inquiry'}
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 max-w-md text-sm leading-6 text-[#5F6368]">
                          Share your details and we&apos;ll respond with availability, specifications, and guidance.
                        </Dialog.Description>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center border border-[#D8D4CC] text-[#1A1A1A] transition-colors hover:bg-[#F4F1EB]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-5">
                      <div className="space-y-5">
                        <div className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-[#E63946] p-2 text-black">
                              <MessageCircle className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">Selected Instrument</p>
                              <p className="mt-1 truncate font-medium text-[#1A1A1A]">{activeInstrument?.name ?? 'No instrument selected'}</p>
                              <p className="mt-1 text-sm text-[#5F6368]">{activeInstrument?.category ?? 'Browse the catalog to attach an instrument.'}</p>
                            </div>
                          </div>
                        </div>

                        {success ? (
                          <div className="flex items-start gap-3 rounded-[18px] border border-[#D8D4CC] bg-white p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#E63946]" />
                            <div>
                              <p className="font-medium text-[#1A1A1A]">Inquiry received</p>
                              <p className="mt-1 text-sm leading-6 text-[#5F6368]">We&apos;ll get back to you shortly with a tailored response.</p>
                            </div>
                          </div>
                        ) : null}

                        <Field label="Full Name" error={fieldError('name')}>
                          <input value={form.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} placeholder="Your name" />
                        </Field>
                        <Field label="Email Address" error={fieldError('email')}>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6368]" />
                            <input value={form.email} onChange={(e) => updateField('email', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="you@example.com" />
                          </div>
                        </Field>
                        <Field label="Phone" error={fieldError('phone')}>
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6368]" />
                            <input value={form.phone ?? ''} onChange={(e) => updateField('phone', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="+91" />
                          </div>
                        </Field>
                        <Field label="Subject" error={fieldError('subject')}>
                          <input value={form.subject} onChange={(e) => updateField('subject', e.target.value)} className={inputClass} placeholder="Availability, pricing, or custom build" />
                        </Field>
                        <Field label="Message" error={fieldError('message')}>
                          <textarea
                            value={form.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            className={cn(inputClass, 'min-h-32 resize-none py-3')}
                            placeholder="Tell us what you&apos;re looking for..."
                          />
                        </Field>

                        <div className="grid gap-3 sm:grid-cols-3">
                          {(['email', 'phone', 'whatsapp'] as const).map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => updateField('preferredContact', method)}
                              className={cn(
                                'flex items-center justify-center gap-2 border px-3 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-colors',
                                form.preferredContact === method
                                  ? 'border-[#E63946] bg-[#E63946] text-black'
                                  : 'border-[#D8D4CC] bg-white text-[#1A1A1A] hover:bg-[#F4F1EB]'
                              )}
                            >
                              {method === 'email' ? <Mail className="h-4 w-4" /> : method === 'phone' ? <Phone className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                              {method}
                            </button>
                          ))}
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex w-full items-center justify-center gap-2 bg-[#E63946] px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:bg-[#C92D39] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {submitting ? 'Sending...' : 'Send Inquiry'}
                          <Send className="h-4 w-4" />
                        </button>

                        <p className="flex items-start gap-2 text-xs leading-5 text-[#5F6368]">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          We only use your details to respond to this inquiry and coordinate the next step.
                        </p>
                      </div>
                    </form>
                  </div>
                </motion.aside>
              </Dialog.Content>
            </>
          ) : null}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  label = '',
  error = '',
  children,
}: {
  label?: string;
  error?: string;
  children?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-[#5F6368]">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-[#E63946]">{error}</span> : null}
    </label>
  );
}

const inputClass =
  'w-full border border-[#D8D4CC] bg-white px-3 py-3 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#5F6368] focus:border-[#E63946]';

export default RequestInfoDrawer;