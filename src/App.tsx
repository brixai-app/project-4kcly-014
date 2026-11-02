import React, { useMemo, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactDrawer from './components/ContactDrawer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import InstrumentsPage from './pages/InstrumentsPage';
import InstrumentDetailPage from './pages/InstrumentDetailPage';

function AnimatedRoutes() {
  const location = useLocation();
  const transition = useMemo(
    () => ({
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
    []
  );

  return (
    <AnimatePresence mode="wait">
      <motion.main key={location.pathname} {...transition} className="min-h-[calc(100vh-0px)]">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/instruments" element={<InstrumentsPage />} />
          <Route path="/instruments/:slug" element={<InstrumentDetailPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen bg-white text-[#142D35] antialiased">
        <Header onOpenContact={() => setContactOpen(true)} />
        <AnimatedRoutes />
        <Footer />
        <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
        <Toaster position="top-right" richColors closeButton />
      </div>
    </HashRouter>
  );
}

export default App;