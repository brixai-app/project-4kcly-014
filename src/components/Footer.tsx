import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { cn } from "@/lib/utils";
import { navigation } from "@/data/mockData";

type FooterProps = { className?: string };

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

export function Footer({ className = "" }: FooterProps) {
  const routes = navigation?.slice?.(0, 4) ?? [];
  const categories = ["Strings", "Percussion", "Wind", "Keyboard"];
  return (
    <footer className={cn("border-t border-[#CAD5D7] bg-[#F7F8F6] text-black", className)}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E63946]">SurSangeet</p>
          <h2 className="mt-4 max-w-md font-[Outfit,sans-serif] text-3xl font-light uppercase tracking-tight sm:text-4xl">
            A vivid instrument journal for modern listeners and collectors.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#526166]">
            SurSangeet curates expressive instruments through editorial imagery, tactile detail, and a responsive browsing experience built for discovery.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#526166]">Navigate</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {routes.map((item) => (
                <Link key={item?.label ?? item?.path} to={item?.path ?? "/"} className="group inline-flex items-center justify-between gap-3 text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:text-[#E63946]">
                  <span className="min-w-0 truncate">{item?.label ?? ""}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#526166]">Families</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {categories.map((category) => (
                <Link key={category} to="/catalog" className="text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:text-[#E63946]">
                  <span className="min-w-0 truncate">{category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#526166]">Contact</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#526166]">
            <a href="mailto:hello@sursangeet.com" className="inline-flex items-center gap-3 transition-colors hover:text-black">
              <Mail className="h-4 w-4 shrink-0 text-[#E63946]" />
              <span className="min-w-0 truncate">hello@sursangeet.com</span>
            </a>
            <a href="tel:+911234567890" className="inline-flex items-center gap-3 transition-colors hover:text-black">
              <Phone className="h-4 w-4 shrink-0 text-[#E63946]" />
              <span className="min-w-0 truncate">+91 12345 67890</span>
            </a>
            <div className="inline-flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
              <span className="min-w-0 break-words">Studio 12, Resonance House, New Delhi, India</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="inline-flex h-10 w-10 items-center justify-center border border-[#CAD5D7] bg-white text-black transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#E63946] hover:text-[#E63946]">
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-[#CAD5D7] px-5 py-4 text-xs uppercase tracking-[0.3em] text-[#526166] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} SurSangeet</span>
          <span>Editorial instrument showcase</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;