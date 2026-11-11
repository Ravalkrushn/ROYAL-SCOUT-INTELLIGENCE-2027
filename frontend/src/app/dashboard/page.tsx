'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Zap,
  Target,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import KpiCard from '@/components/common/KpiCard';
import ChartContainer from '@/components/common/ChartContainer';
import LoadingState from '@/components/common/LoadingState';
import { fetchDashboardSummary, fetchTop10Batters, fetchTop10Bowlers } from '@/lib/api';
import { IDashboardSummary, IBatterRanking, IBowlerRanking } from '@/types';

export default function DashboardPage() {
  const [summary, setSummary] = useState<IDashboardSummary | null>(null);
  const [topBatters, setTopBatters] = useState<IBatterRanking[]>([]);
  const [topBowlers, setTopBowlers] = useState<IBowlerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<string>('VERIFIED_BASELINE');

  useEffect(() => {
    async function loadData() {
      try {
        const [sumRes, batRes, bowlRes] = await Promise.all([
          fetchDashboardSummary(),
          fetchTop10Batters(),
          fetchTop10Bowlers()
        ]);
        setSummary(sumRes.data);
        setTopBatters(batRes.data);
        setTopBowlers(bowlRes.data);
        setDataSource(sumRes.source);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !summary) {
    return <LoadingState message="Loading Executive Dashboard..." />;
  }

  // Pie chart data for pressure distribution
  const pressureData = [
    { name: 'Low Pressure (32.2%)', value: summary.pressureDistribution.low.deliveries, color: '#55B7E8' },
    { name: 'Medium Pressure (40.3%)', value: summary.pressureDistribution.medium.deliveries, color: '#F59E0B' },
    { name: 'High Pressure (27.5%)', value: summary.pressureDistribution.high.deliveries, color: '#E83E8C' }
  ];

  // Bar chart data for top 5 batters
  const batterChartData = topBatters.slice(0, 5).map(b => ({
    name: b.playerName.split(' ')[1] || b.playerName,
    pressureSR: b.strikeRatePressure,
    normalSR: b.strikeRateNormal,
    score: b.compositeScore
  }));

  // Bar chart data for top 5 bowlers
  const bowlerChartData = topBowlers.slice(0, 5).map(b => ({
    name: b.playerName.split(' ')[1] || b.playerName,
    wicketRate: Number((b.wicketsPerSixBalls * 100).toFixed(1)),
    wickets: b.wickets,
    score: b.compositeScore
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <SectionHeader
        title="Executive Intelligence Dashboard"
        subtitle="Rajasthan Royals player intelligence synthesis across 837 matches and 193,988 high-intensity deliveries."
        badge={dataSource === 'LIVE_API' ? 'Live Backend API' : 'Official Verified Baseline'}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/comparison"
              className="rounded-xl bg-[#E83E8C] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#D62575] transition-colors"
            >
              Compare Players
            </Link>
          </div>
        }
      />

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Analysed Deliveries"
          value={summary.metrics.analyzedDeliveries.toLocaleString()}
          subtitle="From 200,999 raw ball records"
          badge="193.9k"
          badgeType="pink"
          icon={Layers}
        />
        <KpiCard
          title="Usable Matches"
          value={summary.metrics.usableMatches}
          subtitle="IPL & T20I (2022–2026)"
          badge="837 Matches"
          badgeType="blue"
          icon={Activity}
        />
        <KpiCard
          title="Eligible Batters"
          value={summary.metrics.eligibleBatters}
          subtitle="≥60 balls & ≥10 matches"
          badge="Top 10 Ranked"
          badgeType="emerald"
          icon={Zap}
        />
        <KpiCard
          title="Eligible Bowlers"
          value={summary.metrics.eligibleBowlers}
          subtitle="≥120 balls & ≥10 matches"
          badge="Top 10 Ranked"
          badgeType="amber"
          icon={Target}
        />
      </div>

      {/* Pressure Distribution & Analytics Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pressure Distribution Pie Chart */}
        <div className="lg:col-span-1 rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Pressure Distribution</h3>
              <span className="rounded bg-[#55B7E8]/15 px-2 py-0.5 text-[10px] font-bold text-[#55B7E8] border border-[#55B7E8]/30">
                193,650 Deliveries
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Categorized via Stage Pressure, Wicket Pressure, and Required Run Rate algorithms.
            </p>
          </div>

          <div className="h-56 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pressureData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pressureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0E1526', borderColor: '#1E2E4A', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#FFFFFF' }}
                  formatter={(val: unknown) => [`${Number(val).toLocaleString()} balls`, 'Deliveries']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-[#1E2E4A] pt-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-[#55B7E8]"></span>
                <span>Low Pressure</span>
              </span>
              <span className="font-bold text-white">62,450 balls (32.2%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]"></span>
                <span>Medium Pressure</span>
              </span>
              <span className="font-bold text-white">78,200 balls (40.3%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E83E8C]"></span>
                <span>High Pressure</span>
              </span>
              <span className="font-bold text-white">53,338 balls (27.5%)</span>
            </div>
          </div>
        </div>

        {/* Top 5 Batters Strike Rate Comparison Chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white">Top 5 Batters — Strike Rate Under Pressure</h3>
              <p className="text-xs text-gray-400">Comparison of Pressure Strike Rate vs Normal Strike Rate</p>
            </div>
            <Link
              href="/batting"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#E83E8C] hover:underline"
            >
              <span>Full Table</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batterChartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[80, 200]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0E1526', borderColor: '#1E2E4A', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="pressureSR" name="Pressure Strike Rate" fill="#E83E8C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="normalSR" name="Normal Strike Rate" fill="#55B7E8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-2 text-[11px] text-gray-400 border-t border-[#1E2E4A] pt-2">
            Top batters exhibit substantial positive strike-rate delta (+22 to +72) under match-defining pressure conditions.
          </p>
        </div>
      </div>

      {/* Top 10 Leaders Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Batters Mini Table */}
        <div className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#E83E8C]" />
              <h3 className="text-base font-bold text-white">Top 5 Batters Snapshot</h3>
            </div>
            <Link href="/batting" className="text-xs font-bold text-[#E83E8C] hover:underline">
              View All 10
            </Link>
          </div>

          <div className="divide-y divide-[#1E2E4A]">
            {topBatters.slice(0, 5).map((batter) => (
              <div key={batter.playerId} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E1526] font-bold text-gray-300 border border-[#1E2E4A]">
                    {batter.rank}
                  </span>
                  <div>
                    <Link href={`/player/${batter.playerId}`} className="font-bold text-white hover:text-[#55B7E8]">
                      {batter.playerName}
                    </Link>
                    <p className="text-[10px] text-gray-400">{batter.role.replace(/_/g, ' ')}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-400">{batter.strikeRatePressure.toFixed(1)} SR</span>
                  <p className="text-[10px] text-gray-400">Score: {batter.compositeScore.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Bowlers Mini Table */}
        <div className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#55B7E8]" />
              <h3 className="text-base font-bold text-white">Top 5 Bowlers Snapshot</h3>
            </div>
            <Link href="/bowling" className="text-xs font-bold text-[#55B7E8] hover:underline">
              View All 10
            </Link>
          </div>

          <div className="divide-y divide-[#1E2E4A]">
            {topBowlers.slice(0, 5).map((bowler) => (
              <div key={bowler.playerId} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E1526] font-bold text-gray-300 border border-[#1E2E4A]">
                    {bowler.rank}
                  </span>
                  <div>
                    <Link href={`/player/${bowler.playerId}`} className="font-bold text-white hover:text-[#55B7E8]">
                      {bowler.playerName}
                    </Link>
                    <p className="text-[10px] text-gray-400">{bowler.role.replace(/_/g, ' ')}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-400">{bowler.wicketsPerSixBalls.toFixed(3)} Wkt/6b</span>
                  <p className="text-[10px] text-amber-300">Econ: {bowler.candidateEconomyPressure.toFixed(1)}*</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Governance & Analytical Discrepancy Note */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-4 text-xs text-gray-400 flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-gray-300">Official Data Governance Notice:</p>
          <p className="mt-0.5">
            {typeof summary.dataIntegrityNotice === 'string'
              ? summary.dataIntegrityNotice
              : summary.dataIntegrityNotice?.description || 'Analysis includes 338 documented delivery reconciliation variance between Colab state assignment and ball-by-ball sum.'}
          </p>
        </div>
      </div>
    </div>
  );
}

