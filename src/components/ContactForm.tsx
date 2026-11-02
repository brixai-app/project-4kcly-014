import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Circle as Loader2, Mail, Phone, User } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { ContactFormProps, ContactMessage, ContactValidationResult } from '@/types';

const defaultValues: ContactMessage = {
  name: '',
  email: '',
  subject: '',
  message: '',
  phone: '',
  preferredInstrument: '',
};

function validate(values: ContactMessage): ContactValidationResult {
  const errors: Partial<Record<keyof ContactMessage, string>> = {};
  if (!values.name?.trim()) errors.name = 'Name is required.';
  if (!values.email?.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject?.trim()) errors.subject = 'Subject is required.';
  if (!values.message?.trim() || values.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.';
  if (values.phone?.trim() && !/^[0-9+\-\s()]{7,}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function ContactForm({ className = '', initialValues = {}, onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactMessage>({ ...defaultValues, ...initialValues });
  const [touched, setTouched] = useState<Partial<Record<keyof ContactMessage, boolean>>>({});
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validation = useMemo(() => validate(values), [values]);
  const showError = (field: keyof ContactMessage) => Boolean(touched?.[field] && validation.errors?.[field]);

  const update = (field: keyof ContactMessage, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const markTouched = (field: keyof ContactMessage) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true, phone: true, preferredInstrument: true });
    const result = validate(values);
    if (!result.valid) {
      toast.error('Please complete the highlighted fields.');
      return;
    }
    try {
      setPending(true);
      if (onSubmit) await onSubmit(values);
      else {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string; error?: string } | null;
        if (!res.ok || data?.success === false) throw new Error(data?.message ?? data?.error ?? 'Submission failed.');
      }
      toast.success('Message sent successfully.');
      setSubmitted(true);
      setValues({ ...defaultValues, preferredInstrument: values.preferredInstrument ?? '' });
      setTouched({});
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send message.');
    } finally {
      setPending(false);
    }
  };

  const fieldBase =
    'w-full rounded-md border border-[#D7DFDD] bg-white px-4 py-3 text-sm text-[#142D35] outline-none transition focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15';
  const labelBase = 'mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5E6E73]';

  return (
    <form onSubmit={handleSubmit} className={cn('w-full rounded-md border border-[#D7DFDD] bg-[#F9FAFB] p-5 md:p-6', className)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelBase}><User className="h-4 w-4" />Name</label>
          <input value={values.name} onChange={(e) => update('name', e.target.value)} onBlur={() => markTouched('name')} className={fieldBase} placeholder="Your name" aria-invalid={showError('name')} />
          {showError('name') && <p className="mt-2 flex items-center gap-2 text-sm text-[#E63946]"><AlertCircle className="h-4 w-4" />{validation.errors.name}</p>}
        </div>
        <div>
          <label className={labelBase}><Mail className="h-4 w-4" />Email</label>
          <input value={values.email} onChange={(e) => update('email', e.target.value)} onBlur={() => markTouched('email')} className={fieldBase} placeholder="you@example.com" type="email" aria-invalid={showError('email')} />
          {showError('email') && <p className="mt-2 flex items-center gap-2 text-sm text-[#E63946]"><AlertCircle className="h-4 w-4" />{validation.errors.email}</p>}
        </div>
        <div>
          <label className={labelBase}><Phone className="h-4 w-4" />Phone</label>
          <input value={values.phone ?? ''} onChange={(e) => update('phone', e.target.value)} onBlur={() => markTouched('phone')} className={fieldBase} placeholder="+91..." inputMode="tel" aria-invalid={showError('phone')} />
          {showError('phone') && <p className="mt-2 flex items-center gap-2 text-sm text-[#E63946]"><AlertCircle className="h-4 w-4" />{validation.errors.phone}</p>}
        </div>
        <div>
          <label className={labelBase}>Preferred Instrument</label>
          <input value={values.preferredInstrument ?? ''} onChange={(e) => update('preferredInstrument', e.target.value)} onBlur={() => markTouched('preferredInstrument')} className={fieldBase} placeholder="Sitar, violin, flute..." />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelBase}>Subject</label>
        <input value={values.subject} onChange={(e) => update('subject', e.target.value)} onBlur={() => markTouched('subject')} className={fieldBase} placeholder="How can we help?" aria-invalid={showError('subject')} />
        {showError('subject') && <p className="mt-2 flex items-center gap-2 text-sm text-[#E63946]"><AlertCircle className="h-4 w-4" />{validation.errors.subject}</p>}
      </div>

      <div className="mt-4">
        <label className={labelBase}>Message</label>
        <textarea value={values.message} onChange={(e) => update('message', e.target.value)} onBlur={() => markTouched('message')} className={cn(fieldBase, 'min-h-[160px] resize-y')} placeholder="Tell us about your instrument interest, listening request, or visit inquiry." aria-invalid={showError('message')} />
        <div className="mt-2 flex items-center justify-between gap-3">
          {showError('message') ? (
            <p className="flex items-center gap-2 text-sm text-[#E63946]"><AlertCircle className="h-4 w-4" />{validation.errors.message}</p>
          ) : (
            <p className="text-sm text-[#5E6E73]">Minimum 20 characters.</p>
          )}
          {submitted && <p className="flex items-center gap-2 text-sm text-[#0F766E]"><CheckCircle2 className="h-4 w-4" />Sent</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#C92E3A] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
        {pending ? 'Sending' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;