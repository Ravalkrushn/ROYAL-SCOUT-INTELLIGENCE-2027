import React from 'react';
import Link from 'next/link';
import { PlayerRole } from '@/types';
import { Award, ArrowRight, Activity, Zap } from 'lucide-react';

interface PlayerCardProps {
  id: string;
  name: string;
  role: PlayerRole;
  rank?: number;
  compositeScore: number;
  primaryMetricName: string;
  primaryMetricValue: string | number;
  sampleBalls: number;
  sampleMatches: number;
  isBatter?: boolean;
}

export default function PlayerCard({
  id,
  name,
  role,
  rank,
  compositeScore,
  primaryMetricName,
  primaryMetricValue,
  sampleBalls,
  sampleMatches,
  isBatter = true,
}: PlayerCardProps) {
  const roleLabels: Record<PlayerRole, string> = {
    BATTER: 'Batter',
    BOWLER: 'Bowler',
    ALL_ROUNDER: 'All-Rounder',
    WICKET_KEEPER_BATTER: 'Wicket-Keeper Batter',
  };

  const getRankBadgeColor = (r?: number) => {
    if (r === 1) return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40';
    if (r === 2) return 'bg-slate-300/20 text-slate-200 border-slate-300/40';
    if (r === 3) return 'bg-amber-700/20 text-amber-300 border-amber-700/40';
    return 'bg-[#1E2E4A] text-gray-300 border-[#1E2E4A]';
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#1E2E4A] bg-[#151E32]/90 p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-[#E83E8C]/50 hover:shadow-xl">
      <div>
        {/* Top header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {rank && (
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${getRankBadgeColor(rank)}`}>
                {rank}
              </span>
            )}
            <span className="rounded bg-[#0F172A] px-2 py-0.5 text-[10px] font-medium tracking-wide text-gray-400 border border-[#1E2E4A]">
              {roleLabels[role] || role}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Score</span>
            <span className="rounded-md bg-[#E83E8C]/15 px-2 py-0.5 text-xs font-black text-[#E83E8C] border border-[#E83E8C]/30">
              {compositeScore.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Player name */}
        <h4 className="mt-3 text-lg font-bold text-white group-hover:text-[#55B7E8] transition-colors line-clamp-1">
          {name}
        </h4>

        {/* Metric highlight */}
        <div className="mt-4 rounded-lg bg-[#0B0F19]/80 p-3 border border-[#1E2E4A]/80">
          <p className="text-[11px] font-medium text-gray-400 truncate">{primaryMetricName}</p>
          <p className="mt-1 text-xl font-black text-white">
            {primaryMetricValue}
          </p>
        </div>

        {/* Sample validation */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
          <span>Sample: <strong className="text-gray-300 font-semibold">{sampleBalls}</strong> balls</span>
          <span><strong className="text-gray-300 font-semibold">{sampleMatches}</strong> matches</span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 border-t border-[#1E2E4A]/80 flex items-center justify-between">
        <Link
          href={`/player/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55B7E8] hover:text-[#E83E8C] transition-colors"
        >
          <span>View Full Profile</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href={`/comparison?p1=${id}`}
          className="text-[11px] text-gray-400 hover:text-white transition-colors"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}

