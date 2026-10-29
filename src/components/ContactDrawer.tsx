import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';
import { useShowcase } from '@/context/ShowcaseContext';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/ContactForm';

export interface ContactDrawerProps {
  className?: string;
}

export function ContactDrawer({ className = '' }: ContactDrawerProps) {
  const { contactDrawerOpen, setContactDrawerOpen } = useShowcase?.() ?? {
    contactDrawerOpen: false,
    setContactDrawerOpen: () => {},
  };

  return (
    <Dialog.Root open={contactDrawerOpen ?? false} onOpenChange={(open) => setContactDrawerOpen?.(open)}>
      <AnimatePresence>
        {contactDrawerOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                className={cn(
                  'fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[#457B9D]/70 bg-[#25282B] text-[#F1FAEE] shadow-2xl outline-none',
                  className
                )}
                initial={{ x: '100%', opacity: 0.9 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4 border-b border-[#457B9D]/40 px-6 py-5">
                    <div className="min-w-0">
                      <Dialog.Title className="font-['Outfit'] text-2xl font-light tracking-tight">
                        Contact SurSangeet
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-[#A8DADC]">
                        Send a note for bookings, collaborations, or press.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center border border-[#457B9D]/60 text-[#F1FAEE] transition-colors hover:bg-[#E63946] hover:text-black"
                        aria-label="Close contact drawer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <ContactForm />
                  </div>
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