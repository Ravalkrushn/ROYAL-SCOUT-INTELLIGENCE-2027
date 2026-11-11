'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { ChevronRight, Shield, AlertTriangle, ExternalLink } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Generate breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { label, href };
    }),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F19]">
      <Navbar />

      {/* Subheader / Breadcrumbs bar */}
      {pathname !== '/' && (
        <div className="border-b border-[#1E2E4A]/60 bg-[#0E1526]/80 px-4 py-2 text-xs backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <nav className="flex items-center space-x-1.5 text-gray-400">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                  {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-600" />}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="font-semibold text-[#55B7E8]">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E83E8C]"></span>
              <span>IPL & T20I (2022–2026)</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Official Footer with Governance & Analytical Limitations */}
      <footer className="mt-auto border-t border-[#1E2E4A] bg-[#0A0D17] text-gray-400">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E83E8C]/20 text-[#E83E8C]">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Royal Scout Intelligence 2027</p>
                <p className="text-[11px] text-gray-500">Rajasthan Royals SupeRR Selector Season 2 Challenge</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400">
              <span className="flex items-center gap-1 text-amber-400/90">
                <AlertTriangle className="h-3 w-3" />
                <span>338-delivery variance documented</span>
              </span>
              <span className="text-gray-600">|</span>
              <span>Provisional Bowling Economy Flagged</span>
              <span className="text-gray-600">|</span>
              <Link href="/methodology" className="text-[#55B7E8] hover:underline">
                Methodology & Audit
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

