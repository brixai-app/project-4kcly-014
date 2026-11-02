import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactFormModal from '@/components/ContactFormModal';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import CatalogPage from '@/pages/CatalogPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';
import type { ContactFormValues } from '@/types';

function AppShell() {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSeed, setContactSeed] = useState<Partial<ContactFormValues>>({});

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<Partial<ContactFormValues> | undefined>)?.detail ?? {};
      setContactSeed(detail ?? {});
      setContactOpen(true);
    };
    window.addEventListener('sur-sangeet:open-contact', handler as EventListener);
    return () => window.removeEventListener('sur-sangeet:open-contact', handler as EventListener);
  }, []);

  const pageKey = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#1D3557]">
      <Header onContactClick={() => setContactOpen(true)} />
      <AnimatePresence mode="wait">
        <motion.main
          key={pageKey}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="min-h-[calc(100vh-0px)]"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage onContactClick={() => setContactOpen(true)} />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer onContactClick={() => setContactOpen(true)} />
      <ContactFormModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        initialValues={contactSeed}
        onSubmit={async () => {
          setContactOpen(false);
          setContactSeed({});
        }}
      />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

export default App;