import React from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { IBatterRanking, IBowlerRanking } from '@/types';

interface RankingTableProps {
  type: 'batting' | 'bowling';
  data: (IBatterRanking | IBowlerRanking)[];
  onSort?: (field: string) => void;
  currentSort?: { field: string; direction: 'asc' | 'desc' };
}

export default function RankingTable({
  type,
  data,
  onSort,
  currentSort,
}: RankingTableProps) {
  const isBatting = type === 'batting';

  return (
    <div className="overflow-x-auto rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 shadow-xl">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-[#0E1526] text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-[#1E2E4A]">
          <tr>
            <th scope="col" className="px-4 py-3.5 text-center">Rank</th>
            <th scope="col" className="px-4 py-3.5">Player</th>
            <th scope="col" className="px-4 py-3.5 text-center">Role</th>
            <th scope="col" className="px-4 py-3.5 text-right">Composite Score</th>
            {isBatting ? (
              <>
                <th scope="col" className="px-4 py-3.5 text-right">Pressure SR</th>
                <th scope="col" className="px-4 py-3.5 text-right">Normal SR</th>
                <th scope="col" className="px-4 py-3.5 text-right">SR Diff</th>
                <th scope="col" className="px-4 py-3.5 text-right">Pressure Avg</th>
                <th scope="col" className="px-4 py-3.5 text-right">Balls</th>
                <th scope="col" className="px-4 py-3.5 text-right">Matches</th>
              </>
            ) : (
              <>
                <th scope="col" className="px-4 py-3.5 text-right">Wkt Rate (/6b)</th>
                <th scope="col" className="px-4 py-3.5 text-right">Wickets</th>
                <th scope="col" className="px-4 py-3.5 text-right">Legal Balls</th>
                <th scope="col" className="px-4 py-3.5 text-right">Matches</th>
                <th scope="col" className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>Econ (Press.)</span>
                    <span title="Provisional calculation pending extras resolution" className="text-amber-400">⚠️</span>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3.5 text-right">Econ (Norm.)</th>
              </>
            )}
            <th scope="col" className="px-4 py-3.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E2E4A]/60">
          {data.map((player) => {
            const b = isBatting ? (player as IBatterRanking) : null;
            const bowl = !isBatting ? (player as IBowlerRanking) : null;

            return (
              <tr
                key={player.playerId}
                className="hover:bg-[#1E293B]/50 transition-colors"
              >
                {/* Rank Badge */}
                <td className="px-4 py-3.5 text-center whitespace-nowrap">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black border ${
                      player.rank === 1
                        ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40'
                        : player.rank === 2
                        ? 'bg-slate-300/20 text-slate-200 border-slate-300/40'
                        : player.rank === 3
                        ? 'bg-amber-700/20 text-amber-300 border-amber-700/40'
                        : 'bg-[#0B0F19] text-gray-300 border-[#1E2E4A]'
                    }`}
                  >
                    {player.rank}
                  </span>
                </td>

                {/* Player Name */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Link
                    href={`/player/${player.playerId}`}
                    className="font-bold text-white hover:text-[#55B7E8] transition-colors"
                  >
                    {player.playerName}
                  </Link>
                  {player.notes && (
                    <p className="text-[10px] text-gray-400 truncate max-w-xs">{player.notes}</p>
                  )}
                </td>

                {/* Role */}
                <td className="px-4 py-3.5 text-center whitespace-nowrap">
                  <span className="rounded bg-[#0B0F19] px-2 py-0.5 text-[10px] font-semibold text-gray-400 border border-[#1E2E4A]">
                    {player.role.replace(/_/g, ' ')}
                  </span>
                </td>

                {/* Composite Score */}
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <span className="rounded-md bg-[#E83E8C]/15 px-2 py-0.5 text-xs font-black text-[#E83E8C] border border-[#E83E8C]/30">
                    {player.compositeScore.toFixed(2)}
                  </span>
                </td>

                {/* Stats Columns */}
                {isBatting && b ? (
                  <>
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-400 whitespace-nowrap">
                      {b.strikeRatePressure.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-300 whitespace-nowrap">
                      {b.strikeRateNormal.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-[#55B7E8] whitespace-nowrap">
                      +{b.strikeRateDifference.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium text-gray-200 whitespace-nowrap">
                      {b.averagePressure.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-400 whitespace-nowrap">
                      {b.ballsPressure}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-400 whitespace-nowrap">
                      {b.matchesPressure}
                    </td>
                  </>
                ) : bowl ? (
                  <>
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-400 whitespace-nowrap">
                      {bowl.wicketsPerSixBalls.toFixed(3)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-white whitespace-nowrap">
                      {bowl.wickets}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-400 whitespace-nowrap">
                      {bowl.legalBallsPressure}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-400 whitespace-nowrap">
                      {bowl.matchesPressure}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-amber-300 whitespace-nowrap">
                      {bowl.candidateEconomyPressure.toFixed(2)}*
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-400 whitespace-nowrap">
                      {bowl.candidateEconomyNormal.toFixed(2)}
                    </td>
                  </>
                ) : null}

                {/* Actions */}
                <td className="px-4 py-3.5 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/player/${player.playerId}`}
                      className="rounded bg-[#1E293B] p-1.5 text-[#55B7E8] hover:bg-[#55B7E8] hover:text-[#0B0F19] transition-colors"
                      title="View Player Profile"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/comparison?p1=${player.playerId}`}
                      className="text-[11px] font-semibold text-gray-400 hover:text-white"
                      title="Compare Player"
                    >
                      Compare
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

