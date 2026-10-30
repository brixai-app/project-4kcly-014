import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ContactPage({ className = "" }: { className?: string }) {
  return (
    <main className={cn("bg-white text-black", className)}>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-between rounded-[16px] border border-[#CAD5D7] bg-[#F7F8F6] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] md:p-8"
        >
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#526166]">Contact SurSangeet</p>
            <h1 className="max-w-xl font-[Outfit] text-5xl font-light uppercase tracking-tight md:text-7xl">
              Let the next conversation begin in rhythm.
            </h1>
            <p className="max-w-lg text-sm leading-7 text-[#526166] md:text-base">
              Reach out for instrument guidance, editorial collaborations, or curated recommendations. We respond with clarity, care, and a musician’s ear.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Mail, label: "Email", value: "hello@sursangeet.in" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Studio", value: "Mumbai, India" },
            ].map((item) => (
              <div key={item.label} className="rounded-[16px] border border-[#CAD5D7] bg-white p-4">
                <item.icon className="h-4 w-4 text-[#E63946]" />
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#526166]">{item.label}</p>
                <p className="mt-2 break-words text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="flex flex-col justify-between rounded-[16px] border border-[#CAD5D7] bg-black p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:p-8"
        >
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Editorial response</p>
            <h2 className="font-[Outfit] text-3xl font-light uppercase tracking-tight md:text-4xl">
              Send a note, request a recommendation, or start a collaboration.
            </h2>
            <p className="max-w-md text-sm leading-7 text-white/70">
              The contact drawer keeps the experience focused and accessible, with validated outcomes surfaced through subtle motion and clear feedback.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-between border border-white/20 bg-[#E63946] px-5 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:bg-[#C92532]"
            >
              Explore catalog
              <Send className="h-4 w-4" />
            </Link>
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/75">
              Prefer a direct line? Open the shared contact drawer from the header to send your message without leaving the page.
            </div>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}

export default ContactPage;