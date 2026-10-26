import React from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppLayout } from './components/AppLayout';
import { ToastProvider } from './components/ToastProvider';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import InstrumentDetailPage from './pages/InstrumentDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/about"
            element={
              <AppLayout>
                <AboutPage />
              </AppLayout>
            }
          />
          <Route
            path="/catalog"
            element={
              <AppLayout>
                <CatalogPage />
              </AppLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <AppLayout>
                <ContactPage />
              </AppLayout>
            }
          />
          <Route
            path="/instrument/:slug"
            element={
              <AppLayout>
                <InstrumentDetailPage />
              </AppLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <ScrollToTop />
        <AnimatedRoutes />
      </ToastProvider>
    </HashRouter>
  );
}

export default App;