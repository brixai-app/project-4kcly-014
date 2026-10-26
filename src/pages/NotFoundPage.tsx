import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Circle as Music2 } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-[#18222C]">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="grid w-full gap-8 rounded-[12px] border border-[#D7DDE3] bg-[#F5F5F5] p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12"
        >
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-3 text-[#D32F2F]">
              <Music2 className="h-6 w-6" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">SurSangeet</span>
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#5F6B76]">
              Page not found
            </p>
            <h1 className="max-w-xl text-5xl font-light tracking-tight text-[#18222C] md:text-7xl">
              This note drifted off the score.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#5F6B76] md:text-lg">
              The page you&apos;re looking for doesn&apos;t exist, may have moved, or was never part of the arrangement.
            </p>
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md bg-[#D32F2F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-[#B71C1C] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2"
              >
                Return home
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[12px] border border-[#D7DDE3] bg-white"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(211,47,47,0.08),rgba(95,107,118,0.04),rgba(25,118,210,0.06))]" />
            <div className="relative flex h-full min-h-[320px] flex-col justify-between p-8 md:min-h-[420px] md:p-10">
              <div className="flex items-center justify-between text-[#5F6B76]">
                <span className="text-xs font-semibold uppercase tracking-[0.28em]">404</span>
                <span className="text-xs font-semibold uppercase tracking-[0.28em]">Silent gap</span>
              </div>
              <div className="space-y-4">
                <div className="h-px w-full bg-[#D7DDE3]" />
                <div className="h-px w-3/4 bg-[#D32F2F]" />
                <div className="h-px w-1/2 bg-[#2E7D32]" />
                <div className="h-px w-2/3 bg-[#1565C0]" />
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#5F6B76]">
                Try heading back to the homepage to browse instruments, collections, and editorial stories.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}

export default NotFoundPage;