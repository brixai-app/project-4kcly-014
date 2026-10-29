import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { InstrumentProvider } from './context/InstrumentContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';

export function App() {
  return (
    <HashRouter>
      <InstrumentProvider>
        <div className="min-h-screen bg-white text-[#222222] antialiased">
          <NavBar />
          <main className="pt-0">
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <HomePage />
                    </motion.div>
                  }
                />
                <Route
                  path="/catalog"
                  element={
                    <motion.div
                      key="catalog"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <CatalogPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <AboutPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <ContactPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/instrument/:id"
                  element={
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <ProductDetailPage />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Toaster position="top-right" richColors closeButton />
        </div>
      </InstrumentProvider>
    </HashRouter>
  );
}

export default App;