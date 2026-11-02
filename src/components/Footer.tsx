import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, Twitter, Youtube, Circle as Icon } from 'lucide-react';
import type { FooterProps } from '@/types';
import { cn } from '@/lib/utils';

export function Footer({ className = '', year = new Date().getFullYear() }: FooterProps) {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/instruments', label: 'Instruments' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];
  const socials = [
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram', tone: 'text-[#E63946]' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter', tone: 'text-[#0F766E]' },
    { href: 'https://youtube.com', icon: Youtube, label: 'YouTube', tone: 'text-[#1D4ED8]' },
    { href: 'https://github.com', icon: Github, label: 'GitHub', tone: 'text-[#E63946]' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn', tone: 'text-[#0F766E]' },
  ];
  return (
    <footer className={cn('border-t border-[#D7DFDD] bg-white', className)}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-[Montserrat,Outfit,sans-serif] text-xs font-semibold uppercase tracking-[0.35em] text-[#E63946]">
              SurSangeet
            </p>
            <p className="max-w-md font-[Roboto,sans-serif] text-sm leading-6 text-[#5E6E73]">
              An editorial archive of instruments, resonance, and craft—built for discovery, listening, and contact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ href, icon: Icon, label, tone }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={cn('inline-flex items-center gap-2 border border-[#D7DFDD] px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-colors hover:bg-[#F9FAFB]', tone)}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
        <nav className="space-y-3">
          <p className="font-[Montserrat,Outfit,sans-serif] text-xs font-semibold uppercase tracking-[0.35em] text-[#142D35]">
            Navigate
          </p>
          <div className="flex flex-col gap-2.5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="min-w-0 truncate border-b border-[#D7DFDD] pb-2 text-sm font-medium text-[#142D35] transition-colors hover:text-[#E63946]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="space-y-3">
          <p className="font-[Montserrat,Outfit,sans-serif] text-xs font-semibold uppercase tracking-[0.35em] text-[#142D35]">
            Contact
          </p>
          <div className="space-y-2 text-sm text-[#5E6E73]">
            <p>Studio inquiries and listening sessions by appointment.</p>
            <a href="mailto:hello@sursangeet.com" className="block transition-colors hover:text-[#E63946]">
              hello@sursangeet.com
            </a>
            <a href="tel:+910000000000" className="block transition-colors hover:text-[#0F766E]">
              +91 00000 00000
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#D7DFDD]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs uppercase tracking-[0.25em] text-[#5E6E73] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {year} SurSangeet</span>
          <span className="text-[#142D35]">White gallery space · Vermilion · Teal · Deep blue</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;