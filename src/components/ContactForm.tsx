import React, { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { ArrowRight, Check, Mail, MessageCircle, X } from 'lucide-react';
import type { ContactMessage } from '@/types';
import { cn } from '@/lib/utils';

export function ContactDrawer({
  open = false,
  onOpenChange = () => {},
  instrumentId = '',
  className = '',
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  instrumentId?: string;
  className?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            'fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-[#D6DADE] bg-white shadow-2xl outline-none',
            className
          )}
        >
          <div className="flex items-center justify-between border-b border-[#D6DADE] px-5 py-4">
            <div>
              <Dialog.Title className="font-['Playfair_Display'] text-2xl font-medium text-[#17191C]">
                Enquire About an Instrument
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-[#5E6670]">
                Send a curated request and we&apos;ll respond within one business day.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center border border-[#D6DADE] text-[#17191C] transition-colors hover:bg-[#F5F5F5]"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="px-5 py-6">
            <ContactForm instrumentId={instrumentId} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ContactForm({ instrumentId = '', className = '' }: { instrumentId?: string; className?: string }) {
  const initial = useMemo<ContactMessage>(
    () => ({ name: '', email: '', subject: '', message: '', instrumentId: instrumentId || undefined }),
    [instrumentId]
  );
  const [form, setForm] = useState<ContactMessage>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactMessage, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, instrumentId: instrumentId || undefined }));
  }, [instrumentId]);

  const validate = () => {
    const next: Partial<Record<keyof ContactMessage, string>> = {};
    if (!form.name?.trim()) next.name = 'Name is required.';
    if (!form.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.subject?.trim()) next.subject = 'Subject is required.';
    if (!form.message?.trim() || form.message.trim().length < 20) next.message = 'Message must be at least 20 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (key: keyof ContactMessage, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || !validate()) return;
    setSubmitting(true);
    toast.loading('Sending your enquiry...');
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    setSubmitting(false);
    setForm(initial);
    setErrors({});
    toast.dismiss();
    toast.success('Enquiry sent successfully.');
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-5', className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            value={form.name ?? ''}
            onChange={(e) => update('name', e.target.value)}
            className="w-full border border-[#D6DADE] bg-white px-4 py-3 text-sm text-[#17191C] outline-none transition-colors placeholder:text-[#5E6670]/70 focus:border-[#D32F2F]"
            placeholder="Your name"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            value={form.email ?? ''}
            onChange={(e) => update('email', e.target.value)}
            className="w-full border border-[#D6DADE] bg-white px-4 py-3 text-sm text-[#17191C] outline-none transition-colors placeholder:text-[#5E6670]/70 focus:border-[#D32F2F]"
            placeholder="you@example.com"
            autoComplete="email"
            type="email"
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject}>
        <input
          value={form.subject ?? ''}
          onChange={(e) => update('subject', e.target.value)}
          className="w-full border border-[#D6DADE] bg-white px-4 py-3 text-sm text-[#17191C] outline-none transition-colors placeholder:text-[#5E6670]/70 focus:border-[#D32F2F]"
          placeholder="Instrument enquiry"
        />
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          value={form.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          className="min-h-40 w-full resize-none border border-[#D6DADE] bg-white px-4 py-3 text-sm text-[#17191C] outline-none transition-colors placeholder:text-[#5E6670]/70 focus:border-[#D32F2F]"
          placeholder="Tell us what you are looking for, your preferred timeline, and any details that matter."
        />
      </Field>

      <input type="hidden" value={form.instrumentId ?? ''} readOnly />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#B71C1C] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending
          </>
        ) : (
          <>
            Send Enquiry
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="grid gap-3 border-t border-[#D6DADE] pt-4 text-sm text-[#5E6670] sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 text-[#D32F2F]" />
          <span>We reply with availability, pricing, and collection guidance.</span>
        </div>
        <div className="flex items-start gap-3">
          <MessageCircle className="mt-0.5 h-4 w-4 text-[#D32F2F]" />
          <span>Validated submissions are acknowledged instantly.</span>
        </div>
      </div>
    </form>
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-[#5E6670]">{label}</span>
      {children}
      {error ? (
        <span className="mt-2 flex items-center gap-1 text-xs text-[#D32F2F]">
          <Check className="h-3.5 w-3.5" />
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default ContactForm;