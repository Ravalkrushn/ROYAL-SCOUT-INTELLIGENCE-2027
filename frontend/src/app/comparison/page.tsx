'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Shield } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import ChartContainer from '@/components/common/ChartContainer';
import LoadingState from '@/components/common/LoadingState';
import { fetchTop10Batters, fetchTop10Bowlers } from '@/lib/api';
import { IBatterRanking, IBowlerRanking } from '@/types';

function PlayerComparisonContent() {
  const searchParams = useSearchParams();
  const initialP1 = searchParams.get('p1');
  const initialP2 = searchParams.get('p2');

  const [discipline, setDiscipline] = useState<'batting' | 'bowling'>('batting');
  const [batters, setBatters] = useState<IBatterRanking[]>([]);
  const [bowlers, setBowlers] = useState<IBowlerRanking[]>([]);
  const [player1Id, setPlayer1Id] = useState<string>('');
  const [player2Id, setPlayer2Id] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [batRes, bowlRes] = await Promise.all([
          fetchTop10Batters(),
          fetchTop10Bowlers()
        ]);
        setBatters(batRes.data);
        setBowlers(bowlRes.data);

        // Check if initial param belongs to bowling
        if (initialP1 && bowlRes.data.some(b => b.playerId === initialP1)) {
          setDiscipline('bowling');
          setPlayer1Id(initialP1);
          setPlayer2Id(initialP2 || bowlRes.data[1]?.playerId || '');
        } else {
          setDiscipline('batting');
          setPlayer1Id(initialP1 || batRes.data[0]?.playerId || '');
          setPlayer2Id(initialP2 || batRes.data[1]?.playerId || '');
        }
      } catch (err) {
        console.error('Failed to load comparison data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [initialP1, initialP2]);

  // Handle discipline toggle
  const handleDisciplineChange = (newDiscipline: 'batting' | 'bowling') => {
    setDiscipline(newDiscipline);
    if (newDiscipline === 'batting') {
      setPlayer1Id(batters[0]?.playerId || '');
      setPlayer2Id(batters[1]?.playerId || '');
    } else {
      setPlayer1Id(bowlers[0]?.playerId || '');
      setPlayer2Id(bowlers[1]?.playerId || '');
    }
  };

  const p1Batter = batters.find(b => b.playerId === player1Id);
  const p2Batter = batters.find(b => b.playerId === player2Id);

  const p1Bowler = bowlers.find(b => b.playerId === player1Id);
  const p2Bowler = bowlers.find(b => b.playerId === player2Id);

  if (loading) {
    return <LoadingState message="Loading Player Comparison Matrix..." />;
  }

  // Batter comparison metrics
  const batterComparisonMetrics = p1Batter && p2Batter ? [
    { metric: 'Composite Score', p1: p1Batter.compositeScore, p2: p2Batter.compositeScore, winner: p1Batter.compositeScore >= p2Batter.compositeScore ? 1 : 2 },
    { metric: 'Pressure Strike Rate', p1: p1Batter.strikeRatePressure, p2: p2Batter.strikeRatePressure, winner: p1Batter.strikeRatePressure >= p2Batter.strikeRatePressure ? 1 : 2 },
    { metric: 'Normal Strike Rate', p1: p1Batter.strikeRateNormal, p2: p2Batter.strikeRateNormal, winner: p1Batter.strikeRateNormal >= p2Batter.strikeRateNormal ? 1 : 2 },
    { metric: 'SR Improvement', p1: p1Batter.strikeRateDifference, p2: p2Batter.strikeRateDifference, winner: p1Batter.strikeRateDifference >= p2Batter.strikeRateDifference ? 1 : 2 },
    { metric: 'Pressure Average', p1: p1Batter.averagePressure, p2: p2Batter.averagePressure, winner: p1Batter.averagePressure >= p2Batter.averagePressure ? 1 : 2 },
    { metric: 'Pressure Deliveries', p1: p1Batter.ballsPressure, p2: p2Batter.ballsPressure, winner: p1Batter.ballsPressure >= p2Batter.ballsPressure ? 1 : 2 },
    { metric: 'Pressure Matches', p1: p1Batter.matchesPressure, p2: p2Batter.matchesPressure, winner: p1Batter.matchesPressure >= p2Batter.matchesPressure ? 1 : 2 },
  ] : [];

  // Bowler comparison metrics
  const bowlerComparisonMetrics = p1Bowler && p2Bowler ? [
    { metric: 'Composite Score', p1: p1Bowler.compositeScore, p2: p2Bowler.compositeScore, winner: p1Bowler.compositeScore >= p2Bowler.compositeScore ? 1 : 2 },
    { metric: 'Wickets Per 6 Balls', p1: p1Bowler.wicketsPerSixBalls, p2: p2Bowler.wicketsPerSixBalls, winner: p1Bowler.wicketsPerSixBalls >= p2Bowler.wicketsPerSixBalls ? 1 : 2 },
    { metric: 'Pressure Wickets', p1: p1Bowler.wickets, p2: p2Bowler.wickets, winner: p1Bowler.wickets >= p2Bowler.wickets ? 1 : 2 },
    { metric: 'Pressure Legal Balls', p1: p1Bowler.legalBallsPressure, p2: p2Bowler.legalBallsPressure, winner: p1Bowler.legalBallsPressure >= p2Bowler.legalBallsPressure ? 1 : 2 },
    { metric: 'Pressure Matches', p1: p1Bowler.matchesPressure, p2: p2Bowler.matchesPressure, winner: p1Bowler.matchesPressure >= p2Bowler.matchesPressure ? 1 : 2 },
    { metric: 'Provisional Pressure Econ', p1: p1Bowler.candidateEconomyPressure, p2: p2Bowler.candidateEconomyPressure, winner: p1Bowler.candidateEconomyPressure <= p2Bowler.candidateEconomyPressure ? 1 : 2, isLowerBetter: true },
  ] : [];

  // Clean formatted chart data with fixed keys for reliable rendering
  const p1Name = discipline === 'batting' ? p1Batter?.playerName || 'Player 1' : p1Bowler?.playerName || 'Player 1';
  const p2Name = discipline === 'batting' ? p2Batter?.playerName || 'Player 2' : p2Bowler?.playerName || 'Player 2';

  const chartData = discipline === 'batting' && p1Batter && p2Batter ? [
    {
      metric: 'Comp. Score',
      p1: Number(p1Batter.compositeScore.toFixed(2)),
      p2: Number(p2Batter.compositeScore.toFixed(2)),
      unit: 'pts',
      diff: Number((p1Batter.compositeScore - p2Batter.compositeScore).toFixed(2))
    },
    {
      metric: 'Pressure SR',
      p1: Number(p1Batter.strikeRatePressure.toFixed(2)),
      p2: Number(p2Batter.strikeRatePressure.toFixed(2)),
      unit: '',
      diff: Number((p1Batter.strikeRatePressure - p2Batter.strikeRatePressure).toFixed(2))
    },
    {
      metric: 'Normal SR',
      p1: Number(p1Batter.strikeRateNormal.toFixed(2)),
      p2: Number(p2Batter.strikeRateNormal.toFixed(2)),
      unit: '',
      diff: Number((p1Batter.strikeRateNormal - p2Batter.strikeRateNormal).toFixed(2))
    },
    {
      metric: 'SR Delta (+)',
      p1: Number(p1Batter.strikeRateDifference.toFixed(2)),
      p2: Number(p2Batter.strikeRateDifference.toFixed(2)),
      unit: '',
      diff: Number((p1Batter.strikeRateDifference - p2Batter.strikeRateDifference).toFixed(2))
    },
    {
      metric: 'Pressure Avg',
      p1: Number(p1Batter.averagePressure.toFixed(2)),
      p2: Number(p2Batter.averagePressure.toFixed(2)),
      unit: '',
      diff: Number((p1Batter.averagePressure - p2Batter.averagePressure).toFixed(2))
    },
  ] : discipline === 'bowling' && p1Bowler && p2Bowler ? [
    {
      metric: 'Comp. Score',
      p1: Number(p1Bowler.compositeScore.toFixed(2)),
      p2: Number(p2Bowler.compositeScore.toFixed(2)),
      unit: 'pts',
      diff: Number((p1Bowler.compositeScore - p2Bowler.compositeScore).toFixed(2))
    },
    {
      metric: 'Wkt/6b (x100)',
      p1: Number((p1Bowler.wicketsPerSixBalls * 100).toFixed(1)),
      p2: Number((p2Bowler.wicketsPerSixBalls * 100).toFixed(1)),
      unit: '',
      diff: Number(((p1Bowler.wicketsPerSixBalls - p2Bowler.wicketsPerSixBalls) * 100).toFixed(1))
    },
    {
      metric: 'Total Wickets',
      p1: p1Bowler.wickets,
      p2: p2Bowler.wickets,
      unit: 'wkts',
      diff: p1Bowler.wickets - p2Bowler.wickets
    },
    {
      metric: 'Pressure Econ*',
      p1: Number(p1Bowler.candidateEconomyPressure.toFixed(2)),
      p2: Number(p2Bowler.candidateEconomyPressure.toFixed(2)),
      unit: 'rpo',
      diff: Number((p1Bowler.candidateEconomyPressure - p2Bowler.candidateEconomyPressure).toFixed(2))
    },
  ] : [];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Head-to-Head Player Comparison"
        subtitle="Compare pressure metrics directly. To prevent distorted evaluations, cross-discipline comparison (batters vs bowlers) is restricted by scouting governance."
        badge="Direct Head-to-Head"
      />

      {/* Cross-Discipline Guardrail Banner */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-4 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Shield className="h-4 w-4 text-[#55B7E8]" />
            <span>Discipline Mode: Compare only compatible statistical domains</span>
          </div>

          <div className="flex items-center rounded-lg border border-[#1E2E4A] bg-[#151E32] p-1">
            <button
              onClick={() => handleDisciplineChange('batting')}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                discipline === 'batting'
                  ? 'bg-[#E83E8C] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Batters vs Batters
            </button>
            <button
              onClick={() => handleDisciplineChange('bowling')}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                discipline === 'bowling'
                  ? 'bg-[#55B7E8] text-[#0B0F19] shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Bowlers vs Bowlers
            </button>
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player 1 Selector */}
        <div className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-lg">
          <label className="text-xs font-bold uppercase text-[#E83E8C]">Select Player 1</label>
          <select
            value={player1Id}
            onChange={(e) => setPlayer1Id(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-3 text-sm font-bold text-white focus:border-[#E83E8C] focus:outline-none"
          >
            {discipline === 'batting'
              ? batters.map(b => (
                  <option key={b.playerId} value={b.playerId} disabled={b.playerId === player2Id}>
                    #{b.rank} {b.playerName} ({b.role.replace(/_/g, ' ')})
                  </option>
                ))
              : bowlers.map(b => (
                  <option key={b.playerId} value={b.playerId} disabled={b.playerId === player2Id}>
                    #{b.rank} {b.playerName} ({b.role.replace(/_/g, ' ')})
                  </option>
                ))}
          </select>
        </div>

        {/* Player 2 Selector */}
        <div className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-lg">
          <label className="text-xs font-bold uppercase text-[#55B7E8]">Select Player 2</label>
          <select
            value={player2Id}
            onChange={(e) => setPlayer2Id(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-3 text-sm font-bold text-white focus:border-[#55B7E8] focus:outline-none"
          >
            {discipline === 'batting'
              ? batters.map(b => (
                  <option key={b.playerId} value={b.playerId} disabled={b.playerId === player1Id}>
                    #{b.rank} {b.playerName} ({b.role.replace(/_/g, ' ')})
                  </option>
                ))
              : bowlers.map(b => (
                  <option key={b.playerId} value={b.playerId} disabled={b.playerId === player1Id}>
                    #{b.rank} {b.playerName} ({b.role.replace(/_/g, ' ')})
                  </option>
                ))}
          </select>
        </div>
      </div>

      {/* Head-to-Head Comparative Metric Table */}
      <div className="overflow-hidden rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 shadow-xl">
        <div className="bg-[#0E1526] px-6 py-4 border-b border-[#1E2E4A] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {discipline === 'batting'
              ? `${p1Batter?.playerName || 'Player 1'} vs ${p2Batter?.playerName || 'Player 2'}`
              : `${p1Bowler?.playerName || 'Player 1'} vs ${p2Bowler?.playerName || 'Player 2'}`}
          </h3>
          <span className="text-xs text-gray-400">Green highlight denotes superior metric</span>
        </div>

        <div className="divide-y divide-[#1E2E4A]/60">
          {(discipline === 'batting' ? batterComparisonMetrics : bowlerComparisonMetrics).map((row) => (
            <div key={row.metric} className="grid grid-cols-12 items-center px-6 py-3.5 text-xs hover:bg-[#1E293B]/40 transition-colors">
              {/* Player 1 metric */}
              <div className={`col-span-4 text-left font-bold ${
                row.winner === 1 ? 'text-emerald-400 text-sm' : 'text-gray-300'
              }`}>
                {typeof row.p1 === 'number' ? (Number.isInteger(row.p1) ? row.p1 : row.p1.toFixed(2)) : row.p1}
                {row.winner === 1 && <span className="ml-1 text-[10px] text-emerald-400">★</span>}
              </div>

              {/* Metric title */}
              <div className="col-span-4 text-center font-bold text-gray-400">
                {row.metric}
              </div>

              {/* Player 2 metric */}
              <div className={`col-span-4 text-right font-bold ${
                row.winner === 2 ? 'text-emerald-400 text-sm' : 'text-gray-300'
              }`}>
                {row.winner === 2 && <span className="mr-1 text-[10px] text-emerald-400">★</span>}
                {typeof row.p2 === 'number' ? (Number.isInteger(row.p2) ? row.p2 : row.p2.toFixed(2)) : row.p2}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated Composite Score Visual Comparison Card */}
      {((p1Batter && p2Batter) || (p1Bowler && p2Bowler)) && (
        <div className="rounded-2xl border-2 border-[#1E2E4A] bg-gradient-to-r from-[#151E32] via-[#0E1526] to-[#151E32] p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#E83E8C]">Primary Ranking Metric</span>
              <h3 className="text-xl font-black text-white mt-0.5">Composite Score Matchup (0–100 Scale)</h3>
              <p className="text-xs text-gray-400">Weighted pressure composite index derived from Colab analytics</p>
            </div>
            
            {/* Edge Badge */}
            {(() => {
              const p1Score = discipline === 'batting' ? p1Batter?.compositeScore || 0 : p1Bowler?.compositeScore || 0;
              const p2Score = discipline === 'batting' ? p2Batter?.compositeScore || 0 : p2Bowler?.compositeScore || 0;
              const delta = Number(Math.abs(p1Score - p2Score).toFixed(2));
              const leader = p1Score >= p2Score ? p1Name : p2Name;
              return (
                <div className="inline-flex items-center gap-2 rounded-xl bg-[#0B0F19] px-4 py-2 border border-[#1E2E4A] text-xs font-bold shadow-md">
                  <span className="text-gray-400">Score Delta:</span>
                  <span className="text-emerald-400 font-mono text-sm">+{delta} pts</span>
                  <span className="text-gray-300">({leader})</span>
                </div>
              );
            })()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player 1 Composite Meter */}
            <div className="bg-[#0B0F19]/80 rounded-xl p-4 border border-[#E83E8C]/40">
              <div className="flex justify-between items-center mb-2">
                <span className="font-extrabold text-sm text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E83E8C]" />
                  {p1Name}
                </span>
                <span className="font-black text-xl text-[#E83E8C] font-mono">
                  {discipline === 'batting' ? p1Batter?.compositeScore.toFixed(2) : p1Bowler?.compositeScore.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-[#1E2E4A] h-3.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-[#E83E8C] to-[#D62575] h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{
                    width: `${Math.min(100, Math.max(0, (discipline === 'batting' ? p1Batter?.compositeScore || 0 : p1Bowler?.compositeScore || 0)))}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                <span>Rank #{discipline === 'batting' ? p1Batter?.rank : p1Bowler?.rank} in Pressure Table</span>
                <span>Max: 100.00 pts</span>
              </div>
            </div>

            {/* Player 2 Composite Meter */}
            <div className="bg-[#0B0F19]/80 rounded-xl p-4 border border-[#55B7E8]/40">
              <div className="flex justify-between items-center mb-2">
                <span className="font-extrabold text-sm text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#55B7E8]" />
                  {p2Name}
                </span>
                <span className="font-black text-xl text-[#55B7E8] font-mono">
                  {discipline === 'batting' ? p2Batter?.compositeScore.toFixed(2) : p2Bowler?.compositeScore.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-[#1E2E4A] h-3.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-[#55B7E8] to-[#3AA5DE] h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{
                    width: `${Math.min(100, Math.max(0, (discipline === 'batting' ? p2Batter?.compositeScore || 0 : p2Bowler?.compositeScore || 0)))}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                <span>Rank #{discipline === 'batting' ? p2Batter?.rank : p2Bowler?.rank} in Pressure Table</span>
                <span>Max: 100.00 pts</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Chart Comparison */}
      <ChartContainer
        title="Side-by-Side Performance Comparison"
        subtitle="Visualizing performance delta across composite and pressure metrics"
        height={360}
      >
        <BarChart data={chartData} margin={{ top: 25, right: 20, left: -10, bottom: 15 }}>
          <XAxis dataKey="metric" stroke="#94A3B8" fontSize={11} tick={{ fill: '#94A3B8', fontWeight: 600 }} />
          <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 'auto']} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = chartData.find(d => d.metric === label);
                const p1Val = payload[0]?.value;
                const p2Val = payload[1]?.value;
                const diff = typeof p1Val === 'number' && typeof p2Val === 'number' ? Number((p1Val - p2Val).toFixed(2)) : 0;
                return (
                  <div className="rounded-xl border border-[#1E2E4A] bg-[#0E1526]/95 backdrop-blur-md p-3.5 shadow-2xl text-xs space-y-2 min-w-[200px]">
                    <p className="font-extrabold text-white text-sm border-b border-[#1E2E4A] pb-1.5">{label}</p>
                    <div className="flex items-center justify-between gap-3 text-[#E83E8C]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E83E8C]" />
                        <span className="font-bold">{p1Name}:</span>
                      </span>
                      <span className="font-mono font-black text-sm">{p1Val} {item?.unit}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-[#55B7E8]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#55B7E8]" />
                        <span className="font-bold">{p2Name}:</span>
                      </span>
                      <span className="font-mono font-black text-sm">{p2Val} {item?.unit}</span>
                    </div>
                    <div className="pt-1.5 border-t border-[#1E2E4A] flex justify-between text-[11px] font-bold">
                      <span className="text-gray-400">Delta:</span>
                      <span className={diff >= 0 ? 'text-[#E83E8C]' : 'text-[#55B7E8]'}>
                        {diff >= 0 ? `+${diff} (${p1Name})` : `+${Math.abs(diff)} (${p2Name})`}
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }}
            formatter={(value) => <span className="text-gray-200 font-bold">{value}</span>}
          />
          <Bar
            dataKey="p1"
            name={p1Name}
            fill="#E83E8C"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="p2"
            name={p2Name}
            fill="#55B7E8"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default function PlayerComparisonPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading comparison matrix..." />}>
      <PlayerComparisonContent />
    </Suspense>
  );
}
