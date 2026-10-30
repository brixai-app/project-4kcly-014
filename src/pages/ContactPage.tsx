import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { RequestInfoDrawer } from '@/components/RequestInfoDrawer';

export function ContactPage({ className = '' }: { className?: string }) {
  return (
    <main className={cn('bg-white text-[#1A1A1A]', className)}>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="min-w-0"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5F6368]">Contact</p>
          <h1 className="mt-4 max-w-2xl font-[Outfit] text-5xl font-light tracking-tight md:text-7xl">
            Start a conversation around your next instrument.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#5F6368] md:text-base">
            Reach out for availability, custom guidance, studio sourcing, or a private recommendation. We respond with
            focused, instrument-aware support.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Mail, label: 'Email', value: 'hello@sursangeet.com' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Studio', value: 'Mumbai, India' },
              { icon: Clock, label: 'Hours', value: 'Mon–Sat · 10:00–19:00' },
            ].map((item) => (
              <div key={item.label} className="rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-4">
                <item.icon className="h-5 w-5 text-[#E63946]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#5F6368]">{item.label}</p>
                <p className="mt-1 break-words text-sm font-medium text-[#1A1A1A]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:bg-[#C92D39]"
            >
              Explore Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <RequestInfoDrawer className="min-w-0" />
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="min-w-0 rounded-[18px] border border-[#D8D4CC] bg-[#F4F1EB] p-5 md:p-6"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5F6368]">Response information</p>
            <h2 className="font-[Outfit] text-2xl font-light tracking-tight">What happens after you reach out</h2>
            <div className="space-y-3 text-sm leading-7 text-[#5F6368]">
              <p>We review your inquiry, match it to the right instrument specialist, and reply with clear next steps.</p>
              <p>For product-specific questions, include the instrument name or category so we can respond faster.</p>
              <p>For studio or bulk sourcing, we can coordinate availability, recommendations, and delivery timing.</p>
            </div>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}

export default ContactPage;