import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Circle as Music2, Sparkles } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F1DE] text-[#1D3557]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-[#C9C3A8] bg-[#FFFDF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]"
            >
              <Sparkles className="h-4 w-4 text-[#E63946]" />
              Page not found
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="max-w-xl font-['Outfit',sans-serif] text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl"
            >
              The stage went quiet.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="max-w-lg text-base leading-7 text-[#596579] sm:text-lg"
            >
              This page drifted off the score. Return to the collection and keep exploring SurSangeet’s instruments, textures, and stories.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 border border-[#E63946] bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#C92535]"
              >
                <Home className="h-4 w-4" />
                Return home
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 border border-[#C9C3A8] bg-[#FFFDF2] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#1D3557] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Browse catalog
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="relative aspect-[4/5] rounded-[32px] border border-[#C9C3A8] bg-[#FFFDF2] p-6 shadow-[0_24px_80px_rgba(29,53,87,0.08)]">
              <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-[#E63946] bg-[#F4F1DE]" />
              <div className="absolute right-8 top-10 h-16 w-16 rounded-full bg-[#1D3557]" />
              <div className="absolute bottom-8 left-8 h-20 w-20 rounded-[28px] bg-[#E63946]" />
              <div className="absolute bottom-10 right-10 h-14 w-14 rounded-full border-2 border-[#596579]" />
              <div className="absolute inset-x-10 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#1D3557]" />
              <div className="absolute left-1/2 top-1/2 h-56 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1D3557]" />
              <div className="absolute left-1/2 top-[28%] h-28 w-28 -translate-x-1/2 rounded-full border-4 border-[#E63946] bg-[#FFFDF2]" />
              <div className="absolute left-1/2 top-[58%] h-28 w-28 -translate-x-1/2 rounded-full border-4 border-[#1D3557] bg-[#F4F1DE]" />
              <div className="absolute left-1/2 top-[42%] h-10 w-10 -translate-x-1/2 rounded-full bg-[#E63946]" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-[18%] -translate-x-1/2"
              >
                <Music2 className="h-10 w-10 text-[#E63946]" />
              </motion.div>
              <div className="absolute inset-x-8 bottom-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-[#596579]">
                <span>Lost note</span>
                <span>404</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;