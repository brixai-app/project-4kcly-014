import React, { useMemo, useState } from 'react';
import { CheckCircle2, Loader2, Mail, MessageSquare, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContactFormProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  submitLabel?: string;
  title?: string;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm({
  className = '',
  onSubmit,
  submitLabel = 'Send message',
  title = 'Get in touch',
  description = 'Send a message and I’ll get back to you as soon as possible.',
}: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.message.trim().length > 10;
  }, [form]);

  const handleChange =
    (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError(null);
      if (submitted) setSubmitted(false);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError('Please complete all fields with a valid email and a message of at least 10 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit?.(form);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[#F1FAEE]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#A8B2B8]">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#F1FAEE]">
              <User className="h-4 w-4 text-[#A8DADC]" />
              Name
            </span>
            <div className="relative">
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-xl border border-[#457B9D]/40 bg-[#1F2225] px-4 py-3 text-[#F1FAEE] placeholder:text-[#7E8A91] outline-none transition focus:border-[#A8DADC] focus:ring-2 focus:ring-[#A8DADC]/20"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#F1FAEE]">
              <Mail className="h-4 w-4 text-[#A8DADC]" />
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-[#457B9D]/40 bg-[#1F2225] px-4 py-3 text-[#F1FAEE] placeholder:text-[#7E8A91] outline-none transition focus:border-[#A8DADC] focus:ring-2 focus:ring-[#A8DADC]/20"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#F1FAEE]">
            <MessageSquare className="h-4 w-4 text-[#A8DADC]" />
            Message
          </span>
          <textarea
            value={form.message}
            onChange={handleChange('message')}
            placeholder="Tell me about your project, question, or idea..."
            rows={6}
            className="w-full resize-none rounded-xl border border-[#457B9D]/40 bg-[#1F2225] px-4 py-3 text-[#F1FAEE] placeholder:text-[#7E8A91] outline-none transition focus:border-[#A8DADC] focus:ring-2 focus:ring-[#A8DADC]/20"
          />
        </label>

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
        ) : null}

        {submitted ? (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            Thanks! Your message has been prepared successfully.
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#A8DADC] px-4 py-3 font-medium text-[#1D1F21] transition',
            'hover:bg-[#B8E4E6] focus:outline-none focus:ring-2 focus:ring-[#A8DADC]/40 focus:ring-offset-2 focus:ring-offset-[#25282B]',
            'disabled:cursor-not-allowed disabled:opacity-70'
          )}
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isSubmitting ? 'Sending...' : submitLabel}
        </button>
      </form>
    </div>
  );
}