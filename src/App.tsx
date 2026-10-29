import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { ShowcaseProvider } from '@/context/ShowcaseContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactDrawer from '@/components/ContactDrawer';
import InstrumentDetailDrawer from '@/components/InstrumentDetailDrawer';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="min-h-0"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <HashRouter>
      <ShowcaseProvider>
        <div className="min-h-screen bg-[#1D1D1D] text-[#F1FAEE] antialiased">
          <Header />
          <main className="relative">
            <AppRoutes />
          </main>
          <Footer />
          <ContactDrawer />
          <InstrumentDetailDrawer />
          <Toaster position="top-right" richColors closeButton theme="dark" />
        </div>
      </ShowcaseProvider>
    </HashRouter>
  );
}

export default App;