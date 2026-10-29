import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { socialLinks, contactDetails, navigationLinks } from '@/data/mockData';
import { cn } from '@/lib/utils';

export interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const socials = socialLinks ?? [];
  const navLinks = navigationLinks ?? [];
  const contact = contactDetails ?? {};

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
  };

  return (
    <footer className={cn('relative overflow-hidden border-t border-[#457B9D]/40 bg-[#1D1D1D] text-[#F1FAEE]', className)}>
      <div className="absolute inset-0 opacity-70">
        <svg viewBox="0 0 1440 320" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#E63946" fillOpacity="0.16" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,149.3C672,171,768,213,864,208C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192V320H0Z" />
          <path fill="#2A9D8F" fillOpacity="0.12" d="M0,256L60,240C120,224,240,192,360,176C480,160,600,160,720,181.3C840,203,960,245,1080,245.3C1200,245,1320,203,1380,181.3L1440,160V320H0Z" />
          <path fill="#457B9D" fillOpacity="0.14" d="M0,288L80,272C160,256,320,224,480,213.3C640,203,800,213,960,224C1120,235,1280,245,1360,250.7L1440,256V320H0Z" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.9fr] md:px-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A8DADC]">SurSangeet</p>
            <p className="max-w-md text-sm leading-6 text-[#F1FAEE]/80">
              A concert-stage showcase for expressive instruments, editorial compositions, and tactile sound culture.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-[#F1FAEE]/85">
            <a href={`mailto:${contact?.email ?? ''}`} className="flex items-center gap-3 transition-colors hover:text-[#E63946]">
              <Mail className="h-4 w-4 text-[#E63946]" />
              <span className="min-w-0 break-words">{contact?.email ?? 'hello@sursangeet.com'}</span>
            </a>
            <a href={`tel:${contact?.phone ?? ''}`} className="flex items-center gap-3 transition-colors hover:text-[#E63946]">
              <Phone className="h-4 w-4 text-[#E63946]" />
              <span>{contact?.phone ?? '+91 98765 43210'}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[#E63946]" />
              <span className="min-w-0 break-words">{contact?.address ?? 'Mumbai, India'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A8DADC]">Navigate</p>
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link: any) => (
              <Link
                key={link?.to ?? link?.label}
                to={link?.to ?? '/'}
                className="group flex items-center justify-between gap-3 border-b border-[#457B9D]/25 py-2 text-sm text-[#F1FAEE]/85 transition-colors hover:text-[#E63946]"
              >
                <span className="min-w-0 truncate">{link?.label ?? 'Link'}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A8DADC]">Follow</p>
          <div className="flex flex-wrap gap-3">
            {socials.map((social: any) => {
              const Icon = iconMap[social?.icon ?? ''] ?? Github;
              return (
                <a
                  key={social?.label ?? social?.href}
                  href={social?.href ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social?.label ?? 'Social link'}
                  className="inline-flex items-center gap-2 border border-[#457B9D]/40 bg-[#25282B]/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#F1FAEE] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
                >
                  <Icon className="h-4 w-4" />
                  <span>{social?.label ?? 'Social'}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#457B9D]/25 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs uppercase tracking-[0.3em] text-[#A8DADC]/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SurSangeet. All rights reserved.</p>
          <p>Crafted for immersive instrument storytelling.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;