import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FooterProps = {
  className?: string;
  onContactClick?: () => void;
};

export function Footer({ className = '', onContactClick = () => undefined }: FooterProps) {
  const year = new Date().getFullYear();
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
    { href: 'https://youtube.com', label: 'YouTube', icon: Youtube },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://github.com', label: 'GitHub', icon: Github },
  ];

  return (
    <footer className={cn('border-t border-[#C9C3A8] bg-[#FFFDF2] text-[#1D3557]', className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]">SurSangeet</p>
            <h2 className="max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
              A tactile instrument showcase shaped by rhythm, craft, and discovery.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-[#596579]">
              Explore curated instruments through editorial imagery, refined filtering, and a collection-first experience designed to feel warm, precise, and alive.
            </p>
            <button
              type="button"
              onClick={() => onContactClick?.()}
              className="inline-flex items-center gap-2 border border-[#1D3557] bg-[#E63946] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:bg-[#C92535]"
            >
              Send inquiry
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]">Navigate</p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="min-w-0 text-sm font-medium text-[#1D3557] transition-colors hover:text-[#E63946]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#596579]">Contact</p>
            <div className="flex flex-col gap-2.5 text-sm text-[#596579]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <span className="min-w-0 break-words">Mumbai, India</span>
              </div>
              <a href="mailto:hello@sursangeet.com" className="flex items-start gap-3 transition-colors hover:text-[#E63946]">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <span className="min-w-0 break-words">hello@sursangeet.com</span>
              </a>
              <a href="tel:+910000000000" className="flex items-start gap-3 transition-colors hover:text-[#E63946]">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <span className="min-w-0 break-words">+91 00000 00000</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[#C9C3A8] text-[#1D3557] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#C9C3A8] pt-6 text-xs uppercase tracking-[0.28em] text-[#596579] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SurSangeet</p>
          <p>Editorial instrument discovery</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;