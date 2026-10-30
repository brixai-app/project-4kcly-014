import React from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { ShowcaseProvider } from './context/ShowcaseContext';
import { AppLayout } from './components/AppLayout';
import { Home } from './pages/Home';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { InstrumentDetailPage } from './pages/InstrumentDetailPage';

function RouteTransition({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <HashRouter>
      <ShowcaseProvider>
        <AppLayout>
          <Toaster position="top-right" richColors closeButton />
          <RouteTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/instrument/:id" element={<InstrumentDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RouteTransition>
        </AppLayout>
      </ShowcaseProvider>
    </HashRouter>
  );
}

export default App;