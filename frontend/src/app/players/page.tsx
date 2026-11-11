'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Search, Filter, LayoutGrid, List, Users } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import PlayerCard from '@/components/common/PlayerCard';
import SearchInput from '@/components/common/SearchInput';
import DropdownFilter from '@/components/common/DropdownFilter';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import { fetchTop10Batters, fetchTop10Bowlers } from '@/lib/api';
import { IBatterRanking, IBowlerRanking, PlayerRole } from '@/types';

export default function PlayersExplorerPage() {
  const [batters, setBatters] = useState<IBatterRanking[]>([]);
  const [bowlers, setBowlers] = useState<IBowlerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    async function loadData() {
      try {
        const [batRes, bowlRes] = await Promise.all([
          fetchTop10Batters(),
          fetchTop10Bowlers()
        ]);
        setBatters(batRes.data);
        setBowlers(bowlRes.data);
      } catch (err) {
        console.error('Failed to load players:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Combine unified player list
  const combinedPlayers = useMemo(() => {
    const list: Array<{
      id: string;
      name: string;
      role: PlayerRole;
      rank: number;
      compositeScore: number;
      primaryMetricName: string;
      primaryMetricValue: string;
      sampleBalls: number;
      sampleMatches: number;
      isBatter: boolean;
    }> = [];

    batters.forEach(b => {
      list.push({
        id: b.playerId,
        name: b.playerName,
        role: b.role,
        rank: b.rank,
        compositeScore: b.compositeScore,
        primaryMetricName: 'Pressure Strike Rate',
        primaryMetricValue: `${b.strikeRatePressure.toFixed(2)} SR`,
        sampleBalls: b.ballsPressure,
        sampleMatches: b.matchesPressure,
        isBatter: true,
      });
    });

    bowlers.forEach(bowl => {
      list.push({
        id: bowl.playerId,
        name: bowl.playerName,
        role: bowl.role,
        rank: bowl.rank,
        compositeScore: bowl.compositeScore,
        primaryMetricName: 'Wickets Per 6 Balls',
        primaryMetricValue: `${bowl.wicketsPerSixBalls.toFixed(3)} W/6b`,
        sampleBalls: bowl.legalBallsPressure,
        sampleMatches: bowl.matchesPressure,
        isBatter: false,
      });
    });

    return list;
  }, [batters, bowlers]);

  const filteredPlayers = useMemo(() => {
    let result = [...combinedPlayers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    if (roleFilter !== 'ALL') {
      if (roleFilter === 'BATTER') {
        result = result.filter(p => p.isBatter);
      } else if (roleFilter === 'BOWLER') {
        result = result.filter(p => !p.isBatter);
      } else if (roleFilter === 'ALL_ROUNDER') {
        result = result.filter(p => p.role === 'ALL_ROUNDER');
      } else if (roleFilter === 'WICKET_KEEPER') {
        result = result.filter(p => p.role === 'WICKET_KEEPER_BATTER');
      }
    }

    return result;
  }, [combinedPlayers, searchQuery, roleFilter]);

  if (loading) {
    return <LoadingState message="Loading Player Explorer..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Player Scouting Explorer"
        subtitle="Search and analyze evaluated cricketers based on high-pressure performance and composite scores."
        badge={`${filteredPlayers.length} Evaluated Stars`}
        actions={
          <div className="flex items-center rounded-xl border border-[#1E2E4A] bg-[#151E32] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-[#55B7E8] text-[#0B0F19]' : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-[#55B7E8] text-[#0B0F19]' : 'text-gray-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-4 shadow-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by player name..."
        />

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <DropdownFilter
            label="Role"
            value={roleFilter}
            onChange={setRoleFilter}
            options={[
              { label: 'All Players', value: 'ALL' },
              { label: 'Batters Only', value: 'BATTER' },
              { label: 'Bowlers Only', value: 'BOWLER' },
              { label: 'All-Rounders', value: 'ALL_ROUNDER' },
              { label: 'Wicket-Keepers', value: 'WICKET_KEEPER' },
            ]}
          />
        </div>
      </div>

      {/* Players Rendering */}
      {filteredPlayers.length === 0 ? (
        <EmptyState
          title="No cricketers found"
          description="Try modifying your search query or reset the role filter."
          onReset={() => {
            setSearchQuery('');
            setRoleFilter('ALL');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={`${player.id}-${player.isBatter ? 'bat' : 'bowl'}`}
              id={player.id}
              name={player.name}
              role={player.role}
              rank={player.rank}
              compositeScore={player.compositeScore}
              primaryMetricName={player.primaryMetricName}
              primaryMetricValue={player.primaryMetricValue}
              sampleBalls={player.sampleBalls}
              sampleMatches={player.sampleMatches}
              isBatter={player.isBatter}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 shadow-xl">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0E1526] text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-[#1E2E4A]">
              <tr>
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3">Player Name</th>
                <th className="px-4 py-3 text-center">Discipline</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-right">Composite Score</th>
                <th className="px-4 py-3 text-right">Primary Metric</th>
                <th className="px-4 py-3 text-right">Sample Balls</th>
                <th className="px-4 py-3 text-right">Matches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4A]/60">
              {filteredPlayers.map((p) => (
                <tr key={`${p.id}-${p.isBatter ? 'bat' : 'bowl'}`} className="hover:bg-[#1E293B]/50 transition-colors">
                  <td className="px-4 py-3 text-center font-bold text-gray-300">{p.rank}</td>
                  <td className="px-4 py-3 font-bold text-white hover:text-[#55B7E8]">
                    <a href={`/player/${p.id}`}>{p.name}</a>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      p.isBatter ? 'bg-[#E83E8C]/20 text-[#E83E8C]' : 'bg-[#55B7E8]/20 text-[#55B7E8]'
                    }`}>
                      {p.isBatter ? 'Batting' : 'Bowling'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-400">{p.role.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 text-right font-black text-[#E83E8C]">{p.compositeScore.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-400">{p.primaryMetricValue}</td>
                  <td className="px-4 py-3 text-right text-gray-400">{p.sampleBalls}</td>
                  <td className="px-4 py-3 text-right text-gray-400">{p.sampleMatches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

