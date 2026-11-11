import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Activity,
  Zap,
  Target,
  Users,
  GitCompare,
  BookOpen,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Award,
  AlertTriangle
} from 'lucide-react';
import { fetchDashboardSummary } from '@/lib/api';

export default async function LandingPage() {
  const { data: summary, source } = await fetchDashboardSummary();

  const modules = [
    {
      title: 'Executive Dashboard',
      description: 'High-level scouting KPI overview, delivery distributions, top-ranked batters and bowlers under high match pressure.',
      href: '/dashboard',
      icon: BarChart3,
      badge: 'Overview',
      badgeColor: 'pink',
    },
    {
      title: 'Batting Intelligence',
      description: 'Top 10 Batters evaluated by Pressure Strike Rate (40%), SR Improvement (25%), Pressure Average (20%), and Sample Reliability (15%).',
      href: '/batting',
      icon: Zap,
      badge: 'Batters',
      badgeColor: 'blue',
    },
    {
      title: 'Bowling Intelligence',
      description: 'Top 10 Bowlers ranked by Pressure Wicket Rate (60%), Legal Balls (25%), and Matches (15%). Clear provisional economy audit.',
      href: '/bowling',
      icon: Target,
      badge: 'Bowlers',
      badgeColor: 'pink',
    },
    {
      title: 'Player Explorer',
      description: 'Search and filter across all eligible batters (239) and bowlers (195) with comprehensive pressure performance metrics.',
      href: '/players',
      icon: Users,
      badge: 'Explorer',
      badgeColor: 'blue',
    },
    {
      title: 'Player Comparison',
      description: 'Direct head-to-head analysis comparing batter-vs-batter or bowler-vs-bowler under identical high-stakes conditions.',
      href: '/comparison',
      icon: GitCompare,
      badge: 'H2H Tool',
      badgeColor: 'pink',
    },
    {
      title: 'Methodology & Evidence',
      description: 'Mathematical formulations, innings weighting, eligibility thresholds, and full audit of the 338-delivery variance.',
      href: '/methodology',
      icon: BookOpen,
      badge: 'Audit & Rules',
      badgeColor: 'blue',
    },
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-[#1E2E4A] bg-gradient-to-b from-[#151E32] via-[#0E1526] to-[#0B0F19] p-6 sm:p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-96 w-96 rounded-full bg-gradient-to-br from-[#E83E8C]/20 to-[#55B7E8]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E83E8C]/30 bg-[#E83E8C]/10 pl-1.5 pr-3.5 py-1 text-xs font-bold text-[#E83E8C]">
              <img
                src="/rr-logo.png"
                alt="Rajasthan Royals"
                className="h-5 w-5 rounded-full object-cover border border-[#E83E8C]/50 shadow-sm"
              />
              <span>SupeRR Selector Season 2 Challenge</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              ROYAL SCOUT <span className="rr-gradient-text">INTELLIGENCE</span> 2027
            </h1>

            <p className="mt-4 text-base text-gray-300 sm:text-lg leading-relaxed">
              The definitive cricket scouting and player intelligence platform engineered for
              <strong className="text-white"> Rajasthan Royals</strong>. Built to identify clutch performers
              who consistently excel when match pressure peaks, utilizing ball-by-ball IPL and T20I match data from 2022–2026.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E83E8C] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E83E8C]/30 transition-all hover:bg-[#D62575] hover:scale-105"
              >
                <span>Explore Executive Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/players"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1E2E4A] bg-[#151E32] px-6 py-3.5 text-sm font-bold text-gray-200 transition-all hover:border-[#55B7E8] hover:text-white"
              >
                <span>Browse Player Explorer</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Cricket Image on the Right */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-[#1E2E4A] bg-[#0E1526] shadow-2xl shadow-[#E83E8C]/15 group">
              <img
                src="/hero-cricket.png"
                alt="Royal Scout Cricket Analytics"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle inner dark gradient overlays for seamless container blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1526]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E1526]/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle badge on bottom right of the photo */}
              <div className="absolute bottom-3 right-3 rounded-lg bg-[#0B0F19]/80 backdrop-blur-md border border-[#1E2E4A] px-3 py-1 text-[11px] font-bold text-[#55B7E8] shadow-md">
                Rajasthan Royals Intelligence
              </div>
            </div>
          </div>
        </div>

        {/* Live Baseline Stats Strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#1E2E4A] pt-8 sm:grid-cols-4">
          <div>
            <p className="text-xs uppercase font-medium text-gray-400">Analysed Deliveries</p>
            <p className="mt-1 text-2xl font-black text-white">{summary.metrics.analyzedDeliveries.toLocaleString()}</p>
            <p className="text-[11px] text-gray-500">From 200,999 raw balls</p>
          </div>
          <div>
            <p className="text-xs uppercase font-medium text-gray-400">Usable Matches</p>
            <p className="mt-1 text-2xl font-black text-[#55B7E8]">{summary.metrics.usableMatches}</p>
            <p className="text-[11px] text-gray-500">IPL & T20I (2022–2026)</p>
          </div>
          <div>
            <p className="text-xs uppercase font-medium text-gray-400">Eligible Batters</p>
            <p className="mt-1 text-2xl font-black text-[#E83E8C]">{summary.metrics.eligibleBatters}</p>
            <p className="text-[11px] text-gray-500">≥60 balls & ≥10 matches</p>
          </div>
          <div>
            <p className="text-xs uppercase font-medium text-gray-400">Eligible Bowlers</p>
            <p className="mt-1 text-2xl font-black text-[#F59E0B]">{summary.metrics.eligibleBowlers}</p>
            <p className="text-[11px] text-gray-500">≥120 balls & ≥10 matches</p>
          </div>
        </div>
      </section>

      {/* Top 1 Ranked Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Batter Card */}
        <div className="relative overflow-hidden rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#E83E8C]/15 border border-[#E83E8C]/30 px-3 py-1 text-xs font-bold text-[#E83E8C]">
              Rank #1 Batter Under Pressure
            </span>
            <span className="text-xs font-mono text-gray-400">Composite: 91.01</span>
          </div>

          <h3 className="mt-4 text-2xl font-black text-white">{summary.topRanked.topBatter.playerName}</h3>
          <p className="mt-1 text-xs text-gray-400">Gujarat Titans / India • Right-Hand Batter</p>

          <div className="mt-5 grid grid-cols-3 gap-3 rounded-lg bg-[#0B0F19] p-3.5 border border-[#1E2E4A]">
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Pressure SR</p>
              <p className="text-lg font-black text-emerald-400">184.44</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Normal SR</p>
              <p className="text-lg font-bold text-gray-300">138.78</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase">SR Boost</p>
              <p className="text-lg font-black text-[#55B7E8]">+45.67</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#1E2E4A]">
            <span className="text-xs text-gray-400">Sample: 630 balls in 38 matches</span>
            <Link
              href="/batting"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E83E8C] hover:underline"
            >
              <span>View Batter Rankings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Bowler Card */}
        <div className="relative overflow-hidden rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#55B7E8]/15 border border-[#55B7E8]/30 px-3 py-1 text-xs font-bold text-[#55B7E8]">
              Rank #1 Bowler Under Pressure
            </span>
            <span className="text-xs font-mono text-gray-400">Composite: 88.37</span>
          </div>

          <h3 className="mt-4 text-2xl font-black text-white">{summary.topRanked.topBowler.playerName}</h3>
          <p className="mt-1 text-xs text-gray-400">Kolkata Knight Riders / West Indies • All-Rounder</p>

          <div className="mt-5 grid grid-cols-3 gap-3 rounded-lg bg-[#0B0F19] p-3.5 border border-[#1E2E4A]">
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Wicket Rate</p>
              <p className="text-lg font-black text-emerald-400">0.525 <span className="text-[10px] font-normal text-gray-400">/6b</span></p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Wickets</p>
              <p className="text-lg font-bold text-white">46</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Econ (Press.)</p>
              <p className="text-lg font-bold text-amber-300">10.60*</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#1E2E4A]">
            <span className="text-xs text-amber-400/90">*Provisional economy rate</span>
            <Link
              href="/bowling"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55B7E8] hover:underline"
            >
              <span>View Bowler Rankings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Exploration Modules Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Platform Modules</h2>
          <p className="mt-1 text-xs text-gray-400">
            Dedicated analytical engines designed for talent scouts, auction strategists, and performance analysts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="group flex flex-col justify-between rounded-xl border border-[#1E2E4A] bg-[#151E32]/90 p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-[#55B7E8]/60 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B0F19] text-[#55B7E8] border border-[#1E2E4A] group-hover:text-[#E83E8C] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded bg-[#0B0F19] px-2 py-0.5 text-[10px] font-semibold text-gray-400 border border-[#1E2E4A]">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white group-hover:text-[#55B7E8] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#55B7E8] group-hover:text-[#E83E8C] transition-colors">
                  <span>Open Module</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Governance & Integrity Banner */}
      <section className="rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-500/10 p-2 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Analytical Integrity & Verified Reconciliation</h4>
              <p className="mt-0.5 text-xs text-gray-400 max-w-3xl">
                {typeof summary.dataIntegrityNotice === 'string'
                  ? summary.dataIntegrityNotice
                  : summary.dataIntegrityNotice?.description || 'Analysis includes 338 documented delivery reconciliation variance.'}{' '}
                All player composite scores adhere strictly to the verified Colab analytical outputs.
              </p>
            </div>
          </div>
          <Link
            href="/methodology"
            className="shrink-0 rounded-lg border border-[#1E2E4A] bg-[#151E32] px-3.5 py-1.5 text-xs font-semibold text-gray-300 hover:border-[#55B7E8] hover:text-white transition-colors"
          >
            Review Audit Trail
          </Link>
        </div>
      </section>
    </div>
  );
}
