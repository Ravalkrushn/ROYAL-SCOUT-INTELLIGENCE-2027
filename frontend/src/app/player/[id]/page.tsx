'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  ArrowLeft,
  Award,
  Zap,
  Target,
  Activity,
  Layers,
  Calendar,
  AlertTriangle,
  GitCompare,
  TrendingUp
} from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import KpiCard from '@/components/common/KpiCard';
import ChartContainer from '@/components/common/ChartContainer';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { fetchPlayerById } from '@/lib/api';
import { IPlayerDetail } from '@/types';

export default function PlayerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [playerDetail, setPlayerDetail] = useState<IPlayerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const res = await fetchPlayerById(id);
        setPlayerDetail(res.data);
      } catch (err) {
        console.error('Failed to load player:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return <LoadingState message="Retrieving player intelligence profile..." />;
  }

  if (!playerDetail) {
    return (
      <div className="py-12">
        <ErrorState
          title="Player Not Found"
          message={`Unable to locate validated profile for player identifier "${id}".`}
          onRetry={() => router.push('/players')}
        />
      </div>
    );
  }

  const { player, battingStats, bowlingStats } = playerDetail;
  const isBatter = !!battingStats;
  const rank = battingStats?.rank || bowlingStats?.rank;
  const compositeScore = battingStats?.compositeScore || bowlingStats?.compositeScore || 0;

  return (
    <div className="space-y-8">
      {/* Top Navigation */}
      <div>
        <Link
          href="/players"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Player Explorer</span>
        </Link>
      </div>

      {/* Player Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1E2E4A] bg-gradient-to-r from-[#151E32] via-[#0E1526] to-[#0B0F19] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#E83E8C] to-[#55B7E8] p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0B0F19]">
                {isBatter ? (
                  <Zap className="h-8 w-8 text-[#E83E8C]" />
                ) : (
                  <Target className="h-8 w-8 text-[#55B7E8]" />
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#E83E8C]/20 border border-[#E83E8C]/40 px-2.5 py-0.5 text-xs font-black text-[#E83E8C]">
                  Rank #{rank}
                </span>
                <span className="rounded-full bg-[#0E1526] border border-[#1E2E4A] px-2.5 py-0.5 text-xs font-medium text-gray-300">
                  {player.primaryRole.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-gray-400">• {player.country}</span>
              </div>

              <h1 className="mt-2 text-2xl font-black text-white sm:text-4xl">{player.name}</h1>
              <p className="mt-1 text-xs text-gray-400">Player ID: {player.playerId} • SupeRR Selector Scouting Candidate</p>
            </div>
          </div>

          {/* Composite Score Card */}
          <div className="flex flex-col items-start sm:items-end justify-center rounded-xl bg-[#0B0F19]/80 p-4 border border-[#1E2E4A]">
            <span className="text-[11px] font-bold uppercase text-gray-400">Composite Score</span>
            <span className="text-3xl sm:text-4xl font-black text-[#E83E8C]">{compositeScore.toFixed(2)}</span>
            <Link
              href={`/comparison?p1=${player.playerId}`}
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#55B7E8] hover:underline"
            >
              <GitCompare className="h-3.5 w-3.5" />
              <span>Compare Player</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {battingStats && (
          <>
            <KpiCard
              title="Pressure Strike Rate"
              value={battingStats.pressureStrikeRate.toFixed(2)}
              subtitle={`Normal SR: ${battingStats.overallStrikeRate.toFixed(2)}`}
              badge={`+${battingStats.strikeRateImprovement.toFixed(2)} Delta`}
              badgeType="pink"
              icon={Zap}
            />
            <KpiCard
              title="Pressure Batting Avg"
              value={battingStats.pressureAverage.toFixed(2)}
              subtitle={`${battingStats.dismissals} dismissals under pressure`}
              badge="Reliable"
              badgeType="blue"
              icon={TrendingUp}
            />
            <KpiCard
              title="Pressure Sample Volume"
              value={`${battingStats.pressureBallsFaced} Balls`}
              subtitle={`Across ${battingStats.pressureMatches} match innings`}
              badge="≥60 Qualified"
              badgeType="emerald"
              icon={Layers}
            />
            <KpiCard
              title="Boundaries Under Pressure"
              value={`${battingStats.fours + battingStats.sixes}`}
              subtitle={`${battingStats.fours} Fours • ${battingStats.sixes} Sixes`}
              badge="Power Hitting"
              badgeType="pink"
              icon={Target}
            />
          </>
        )}

        {bowlingStats && (
          <>
            <KpiCard
              title="Pressure Wicket Rate"
              value={bowlingStats.wicketsPerSixBalls.toFixed(3)}
              subtitle="Wickets per 6 legal balls under pressure"
              badge="Strike Force"
              badgeType="blue"
              icon={Target}
            />
            <KpiCard
              title="Pressure Wickets"
              value={bowlingStats.wickets}
              subtitle={`Conceded ${bowlingStats.runsConceded} runs`}
              badge="Wickets"
              badgeType="emerald"
              icon={Award}
            />
            <KpiCard
              title="Pressure Legal Balls"
              value={bowlingStats.pressureLegalBalls}
              subtitle={`Across ${bowlingStats.pressureMatches} match innings`}
              badge="≥120 Qualified"
              badgeType="pink"
              icon={Layers}
            />
            <KpiCard
              title="Provisional Econ Rate"
              value={`${bowlingStats.candidateEconomyPressure.toFixed(2)}*`}
              subtitle={`Normal Econ: ${bowlingStats.candidateEconomyNormal.toFixed(2)}`}
              badge="*Provisional"
              badgeType="amber"
              icon={AlertTriangle}
            />
          </>
        )}
      </div>

      {/* Pressure Category Breakdown (for Batters) */}
      {battingStats?.byPressureCategory && (
        <div className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-1">Performance by Pressure Category</h3>
          <p className="text-xs text-gray-400 mb-4">
            Cross-tabulation across Low (Stage 1st Innings), Medium, and High (Clutch Chase) conditions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-[#0B0F19] p-4 border border-[#1E2E4A]">
              <span className="text-[11px] font-bold text-[#55B7E8] uppercase">Low Pressure</span>
              <p className="mt-2 text-2xl font-bold text-white">
                {battingStats.byPressureCategory.LOW.strikeRate.toFixed(1)} <span className="text-xs font-normal text-gray-400">SR</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">Avg: {battingStats.byPressureCategory.LOW.average.toFixed(1)}</p>
            </div>

            <div className="rounded-xl bg-[#0B0F19] p-4 border border-[#1E2E4A]">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Medium Pressure</span>
              <p className="mt-2 text-2xl font-bold text-white">
                {battingStats.byPressureCategory.MEDIUM.strikeRate.toFixed(1)} <span className="text-xs font-normal text-gray-400">SR</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">Avg: {battingStats.byPressureCategory.MEDIUM.average.toFixed(1)}</p>
            </div>

            <div className="rounded-xl bg-[#0B0F19] p-4 border border-[#E83E8C]/30 bg-[#E83E8C]/5">
              <span className="text-[11px] font-bold text-[#E83E8C] uppercase">High Pressure (Clutch)</span>
              <p className="mt-2 text-2xl font-black text-emerald-400">
                {battingStats.byPressureCategory.HIGH.strikeRate.toFixed(1)} <span className="text-xs font-normal text-gray-400">SR</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">Avg: {battingStats.byPressureCategory.HIGH.average.toFixed(1)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Provisional Economy Note for Bowlers */}
      {bowlingStats && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Data Governance Note for Bowling Profile:</span>
              <p className="mt-0.5 leading-relaxed">
                Bowling candidate economy rates are marked provisional due to ongoing reconciliation of extras deliveries in the underlying ball-by-ball tables. The bowler composite score is grounded in validated wicket strike efficiency and legal delivery sample size.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

