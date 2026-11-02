import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SharedSectionProps } from '@/types';
import { cn } from '@/lib/utils';

type ContactPageProps = SharedSectionProps & {
  onContactClick?: () => void;
};

export function ContactPage({ className = '', title = 'Let’s shape your next sound', subtitle = 'Reach out for collection guidance, sourcing questions, or a tailored instrument recommendation.', onContactClick = () => undefined }: ContactPageProps) {
  const points = [
    { icon: Mail, label: 'Email', value: 'hello@sursangeet.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Studio', value: 'Mumbai, India' },
  ];

  return (
    <section className={cn('bg-[#F4F1DE] px-4 py-10 text-[#1D3557] sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#596579]">
              <Sparkles className="h-4 w-4 text-[#E63946]" />
              Contact
            </div>
            <h1 className="mt-4 max-w-2xl text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#596579] sm:text-base">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={onContactClick} className="inline-flex items-center gap-2 rounded-md bg-[#E63946] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-[#C92535]">
                Open inquiry form
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md border border-[#C9C3A8] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#1D3557] transition hover:bg-white">
                Browse catalog
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }} className="rounded-[24px] border border-[#C9C3A8] bg-[#1D3557] p-6 text-[#FFFDF2] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#F4F1DE]/80">What to include</p>
            <div className="mt-5 flex flex-col gap-3">
              {['Instrument type or mood', 'Budget range', 'Timeline or occasion', 'Any reference artists or sounds'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-[#FFFDF2]/90">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#E63946] p-5 text-black">
              <p className="text-xs font-semibold uppercase tracking-[0.28em]">Response promise</p>
              <p className="mt-2 text-sm leading-6">We reply with thoughtful guidance, availability notes, and a clear next step within one business day.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div key={point.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-[24px] border border-[#C9C3A8] bg-[#FFFDF2] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F1DE] text-[#E63946]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#596579]">{point.label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-[#1D3557]">{point.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactPage;