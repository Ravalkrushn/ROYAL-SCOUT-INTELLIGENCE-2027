'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, Activity, Database, GitCompare } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/batting', label: 'Batting' }, 
    { href: '/bowling', label: 'Bowling' },
    { href: '/players', label: 'Player Explorer' },
    { href: '/comparison', label: 'Comparison' },
    { href: '/methodology', label: 'Methodology' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2E4A] bg-[#0B0F19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-[#151E32] hover:text-white md:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border-2 border-[#E83E8C] shadow-lg shadow-[#E83E8C]/25 transition-transform group-hover:scale-105 bg-[#0B0F19]">
              <img
                src="/rr-logo.png"
                alt="Rajasthan Royals"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-wider text-white">ROYAL SCOUT</span>
                <span className="rounded bg-[#E83E8C]/20 px-1.5 py-0.2 text-[10px] font-bold text-[#E83E8C]">2027</span>
              </div>
              <p className="text-[11px] font-medium text-[#55B7E8]">Rajasthan Royals Intelligence</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#E83E8C]/15 text-[#E83E8C] border border-[#E83E8C]/30 shadow-sm'
                    : 'text-gray-300 hover:bg-[#151E32] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#1E2E4A] bg-[#151E32] px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]"></span>
            </span>
            <span className="text-[11px] font-medium text-gray-300">SupeRR Selector</span>
            <span className="text-[10px] text-[#55B7E8] font-mono">Season 2</span>
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-[#151E32] hover:text-white md:hidden"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1E2E4A] bg-[#0F172A] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E83E8C]/20 text-[#E83E8C] border border-[#E83E8C]/30'
                      : 'text-gray-300 hover:bg-[#151E32] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

