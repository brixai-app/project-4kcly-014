import React, { useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { inquiryTopics, instruments, type Inquiry, type Instrument, type InquiryTopic } from '@/types';

type DrawerState = {
  name: string;
  email: string;
  topic: InquiryTopic;
  instrumentId: string;
  message: string;
};

const navItems = [
  { label: 'Collection', to: '/collection' },
  { label: 'Editorial', to: '/editorial' },
  { label: 'Contact', to: '#contact' },
];

const initialDrawerState: DrawerState = {
  name: '',
  email: '',
  topic: 'availability',
  instrumentId: '',
  message: '',
};

export function SiteHeader({ onOpenInquiry = () => {} }: { onOpenInquiry?: () => void }) {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-[#C9BBA8] bg-[#F9F6F2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-['Bodoni_Moda'] text-2xl tracking-[0.2em] text-[#2E2B28]">
          SurSangeet
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors hover:text-[#8B0000]',
                location.pathname === item.to ? 'text-[#8B0000]' : 'text-[#6F675E]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={onOpenInquiry}
          className="inline-flex items-center gap-2 border border-[#C9BBA8] bg-[#EFE9E1] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#2E2B28] transition-colors hover:bg-[#8B0000] hover:text-white"
        >
          <Mail className="h-4 w-4" />
          Inquiry
        </button>
      </div>
    </header>
  );
}

export function ContactDrawer({
  open = false,
  onOpenChange = () => {},
}: {
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
}) {
  const [form, setForm] = useState<DrawerState>(initialDrawerState);
  const selectedInstrument = useMemo(
    () => instruments.find((item) => item.id === form.instrumentId) ?? instruments[0],
    [form.instrumentId]
  );

  const update = (patch: Partial<DrawerState>) => setForm((prev) => ({ ...prev, ...patch }));

  const submit = () => {
    const payload: Inquiry = {
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      instrumentId: form.instrumentId || undefined,
      message: form.message.trim(),
    };
    const valid = Boolean(payload.name && payload.email && payload.message && payload.email.includes('@'));
    if (!valid) {
      toast.error('Please complete the inquiry form with a valid email.');
      return;
    }
    toast.success('Inquiry received. Our curatorial team will respond shortly.');
    setForm(initialDrawerState);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0a0a0a]/55" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-[#C9BBA8] bg-[#F9F6F2] shadow-2xl outline-none">
          <div className="flex items-center justify-between border-b border-[#C9BBA8] px-5 py-4">
            <div>
              <Dialog.Title className="font-['Bodoni_Moda'] text-2xl text-[#2E2B28]">Private Inquiry</Dialog.Title>
              <Dialog.Description className="text-xs uppercase tracking-[0.28em] text-[#6F675E]">
                Curatorial response within one business day
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" className="border border-[#C9BBA8] p-2 text-[#2E2B28] transition-colors hover:bg-[#8B0000] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-6 px-5 py-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.name} onChange={(e) => update({ name: e.target.value })} placeholder="Full name" className="border border-[#C9BBA8] bg-white px-4 py-3 text-sm text-[#2E2B28] outline-none placeholder:text-[#6F675E]" />
              <input value={form.email} onChange={(e) => update({ email: e.target.value })} placeholder="Email address" className="border border-[#C9BBA8] bg-white px-4 py-3 text-sm text-[#2E2B28] outline-none placeholder:text-[#6F675E]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <select value={form.topic} onChange={(e) => update({ topic: e.target.value as InquiryTopic })} className="border border-[#C9BBA8] bg-white px-4 py-3 text-sm text-[#2E2B28] outline-none">
                {inquiryTopics.map((topic) => (
                  <option key={topic} value={topic}>{topic.replace('-', ' ')}</option>
                ))}
              </select>
              <select value={form.instrumentId} onChange={(e) => update({ instrumentId: e.target.value })} className="border border-[#C9BBA8] bg-white px-4 py-3 text-sm text-[#2E2B28] outline-none">
                <option value="">Select instrument</option>
                {instruments.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <textarea value={form.message} onChange={(e) => update({ message: e.target.value })} rows={6} placeholder="Share your request, provenance questions, or viewing preferences." className="w-full border border-[#C9BBA8] bg-white px-4 py-3 text-sm text-[#2E2B28] outline-none placeholder:text-[#6F675E]" />
            <div className="border border-[#C9BBA8] bg-[#EFE9E1] p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#6F675E]">Selected instrument</p>
              <p className="mt-2 font-['Bodoni_Moda'] text-xl text-[#2E2B28]">{selectedInstrument?.name ?? 'Curatorial selection'}</p>
              <p className="mt-1 text-sm text-[#6F675E]">{selectedInstrument?.origin ?? 'Private collection'}</p>
            </div>
            <button type="button" onClick={submit} className="inline-flex w-full items-center justify-center gap-2 bg-[#8B0000] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#690000]">
              Submit inquiry <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteFooter({ onOpenInquiry = () => {} }: { onOpenInquiry?: () => void }) {
  return (
    <footer id="contact" className="border-t border-[#C9BBA8] bg-[#EFE9E1]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-['Bodoni_Moda'] text-3xl text-[#2E2B28]">SurSangeet</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#6F675E]">
            A museum-grade showcase for rare instruments, provenance-led storytelling, and private viewings by appointment.
          </p>
        </div>
        <div className="space-y-3 text-sm text-[#6F675E]">
          <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#8B0000]" /> New Delhi, India</div>
          <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#8B0000]" /> +91 98765 43210</div>
          <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#8B0000]" /> inquiries@sursangeet.com</div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <button type="button" onClick={onOpenInquiry} className="inline-flex items-center gap-2 border border-[#C9BBA8] bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#2E2B28] transition-colors hover:bg-[#8B0000] hover:text-white">
            Start inquiry <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-xs uppercase tracking-[0.28em] text-[#6F675E]">Appointments by request only</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F9F6F2] text-[#2E2B28]">
      <Toaster richColors position="top-right" />
      <SiteHeader onOpenInquiry={() => setOpen(true)} />
      <main>{children}</main>
      <SiteFooter onOpenInquiry={() => setOpen(true)} />
      <ContactDrawer open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default SiteChrome;