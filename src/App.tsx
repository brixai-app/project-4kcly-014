import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import SiteChrome from '@/components/SiteChrome';
import { HomePage, AboutPage } from '@/pages/EditorialPages';
import { CollectionPage, InstrumentDetailPage } from '@/pages/CollectionPages';
import { NotFoundState } from '@/components/InstrumentStory';

export function App() {
  return (
    <HashRouter>
      <Toaster richColors position="top-right" />
      <AppRoutes />
    </HashRouter>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <SiteChrome>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/instrument/:id" element={<InstrumentDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundState onBack={() => window.history.back()} />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </SiteChrome>
  );
}

export default App;