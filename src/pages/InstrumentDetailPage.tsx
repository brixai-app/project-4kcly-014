import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductDetail from '@/components/ProductDetail';
import { cn } from '@/lib/utils';

export function InstrumentDetailPage({ className = '' }: { className?: string }) {
  return (
    <main className={cn('bg-white text-[#1A1A1A]', className)}>
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368] transition-colors hover:text-[#E63946]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </section>

      <ProductDetail className="border-y border-[#D8D4CC]" />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-6 shadow-[0_18px_50px_rgba(26,26,26,0.06)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">Need a guided recommendation?</p>
          <h2 className="mt-3 max-w-xl font-[Outfit,sans-serif] text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-4xl">
            Speak with our instrument specialists for fit, tone, and availability.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5F6368]">
            We can help with sizing, setup, accessories, and curated alternatives if this piece is not the perfect match.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#C92D39]"
            >
              Request info
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-md border border-[#D8D4CC] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] transition-colors hover:border-[#1A1A1A]"
            >
              Explore more
            </Link>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          className="rounded-[18px] border border-[#D8D4CC] bg-white p-6 shadow-[0_18px_50px_rgba(26,26,26,0.06)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5F6368]">Contact</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#1A1A1A]">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#E63946]" />
              <span>studio@sursangeet.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#E63946]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#E63946]" />
              <span>Mumbai, India</span>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-[#D8D4CC]" />
          <p className="mt-5 text-sm leading-6 text-[#5F6368]">
            Response times are typically within one business day. For urgent inquiries, include your preferred contact method and timeline.
          </p>
        </motion.aside>
      </section>
    </main>
  );
}

export default InstrumentDetailPage;