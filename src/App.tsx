import { Suspense, lazy } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));

export function App() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" };

  return (
    <HashRouter>
      <Layout>
        <Suspense
          fallback={
            <div className="min-h-[60vh] bg-white px-4 py-16 text-black sm:px-6 lg:px-8">
              <div className="mx-auto flex max-w-7xl flex-col gap-4">
                <div className="h-10 w-40 animate-pulse bg-[#F7F8F6]" />
                <div className="h-64 w-full animate-pulse bg-[#F7F8F6]" />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="h-40 animate-pulse bg-[#F7F8F6]" />
                  <div className="h-40 animate-pulse bg-[#F7F8F6]" />
                </div>
              </div>
            </div>
          }
        >
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </Suspense>
      </Layout>
      <Toaster position="top-right" richColors closeButton />
    </HashRouter>
  );
}

export default App;