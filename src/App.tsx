import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import About from './pages/About';
import Contact from './pages/Contact';
import InstrumentPage from './pages/InstrumentPage';

export function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/instrument/:slug" element={<InstrumentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
      <Toaster position="top-right" richColors closeButton />
    </HashRouter>
  );
}

export default App;