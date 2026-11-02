import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { cn } from '@/lib/utils';
import type { ContactDrawerProps } from '@/types';

export function ContactDrawer({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-contact-drawer', onOpen as EventListener);
    return () => window.removeEventListener('open-contact-drawer', onOpen as EventListener);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-2 border border-[#D7DFDD] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#142D35] transition hover:border-[#E63946] hover:text-[#E63946]',
            className,
          )}
        >
          <Mail className="h-4 w-4" />
          Contact Us
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[520px] flex-col border-l border-[#D7DFDD] bg-white shadow-2xl outline-none"
              >
                <div className="flex items-center justify-between border-b border-[#D7DFDD] px-5 py-4">
                  <div className="min-w-0">
                    <Dialog.Title className="text-sm font-semibold uppercase tracking-[0.22em] text-[#142D35]">
                      Contact SurSangeet
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-[#5E6E73]">
                      Share your inquiry, listening request, or collaboration note.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button type="button" className="inline-flex h-10 w-10 items-center justify-center text-[#142D35] transition hover:text-[#E63946]">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="mb-5 grid gap-3 border-b border-[#D7DFDD] pb-5 text-sm text-[#5E6E73]">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                      <span>hello@sursangeet.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                      <span>Mumbai, India</span>
                    </div>
                  </div>
                  <ContactForm />
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default ContactDrawer;