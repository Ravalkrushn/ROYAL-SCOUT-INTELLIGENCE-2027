'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { Zap, Filter, Search, Award, TrendingUp, Layers } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import RankingTable from '@/components/common/RankingTable';
import ChartContainer from '@/components/common/ChartContainer';
import SearchInput from '@/components/common/SearchInput';
import DropdownFilter from '@/components/common/DropdownFilter';
import LoadingState from '@/components/common/LoadingState';
import { fetchTop10Batters } from '@/lib/api';
import { IBatterRanking } from '@/types';

export default function BattingIntelligencePage() {
  const [batters, setBatters] = useState<IBatterRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [dataSource, setDataSource] = useState<string>('VERIFIED_BASELINE');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchTop10Batters();
        setBatters(res.data);
        setDataSource(res.source);
      } catch (err) {
        console.error('Failed to load batters:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBatters = useMemo(() => {
    let result = [...batters];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.playerName.toLowerCase().includes(q));
    }

    if (sortBy === 'compositeScore') {
      result.sort((a, b) => b.compositeScore - a.compositeScore);
    } else if (sortBy === 'strikeRatePressure') {
      result.sort((a, b) => b.strikeRatePressure - a.strikeRatePressure);
    } else if (sortBy === 'strikeRateDifference') {
      result.sort((a, b) => b.strikeRateDifference - a.strikeRateDifference);
    } else if (sortBy === 'averagePressure') {
      result.sort((a, b) => b.averagePressure - a.averagePressure);
    } else {
      result.sort((a, b) => a.rank - b.rank);
    }

    return result;
  }, [batters, searchQuery, sortBy]);

  if (loading) {
    return <LoadingState message="Loading Batting Intelligence..." />;
  }

  // Chart data: SR comparison
  const srChartData = batters.map(b => ({
    name: b.playerName.split(' ')[1] || b.playerName,
    pressureSR: b.strikeRatePressure,
    normalSR: b.strikeRateNormal,
    diff: b.strikeRateDifference
  }));

  // Chart data: Boundaries
  const boundaryChartData = batters.map(b => ({
    name: b.playerName.split(' ')[1] || b.playerName,
    fours: b.fours,
    sixes: b.sixes,
    total: b.fours + b.sixes
  }));

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Batting Intelligence Model"
        subtitle="Evaluating clutch execution: Pressure Strike Rate (40%), SR Improvement (25%), Pressure Average (20%), and Sample Reliability (15%). Minimum 60 pressure balls & 10 matches."
        badge={dataSource === 'LIVE_API' ? 'Live API Data' : 'Official Verified Rankings'}
      />

      {/* Control bar: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-4 shadow-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search batter by name (e.g. Gill, Klaasen)..."
        />

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <DropdownFilter
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: 'Official Rank', value: 'rank' },
              { label: 'Composite Score', value: 'compositeScore' },
              { label: 'Pressure Strike Rate', value: 'strikeRatePressure' },
              { label: 'SR Improvement (Delta)', value: 'strikeRateDifference' },
              { label: 'Pressure Average', value: 'averagePressure' }
            ]}
          />
        </div>
      </div>

      {/* Primary Ranking Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Showing {filteredBatters.length} of {batters.length} Top Batters</span>
          <span className="text-[#55B7E8]">Click any player to inspect complete ball-by-ball profile</span>
        </div>
        <RankingTable type="batting" data={filteredBatters} />
      </div>

      {/* Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strike Rate Comparison */}
        <ChartContainer
          title="Pressure Strike Rate vs Normal Strike Rate"
          subtitle="Measures batter acceleration under high match pressure compared to neutral conditions"
          badge="SR Delta"
          height={320}
        >
          <BarChart data={srChartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-25} textAnchor="end" />
            <YAxis stroke="#64748B" fontSize={11} domain={[80, 200]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0E1526', borderColor: '#1E2E4A', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="pressureSR" name="Pressure Strike Rate" fill="#E83E8C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="normalSR" name="Normal Strike Rate" fill="#55B7E8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>

        {/* Boundary Contribution */}
        <ChartContainer
          title="Boundary Profile Under Pressure (Fours & Sixes)"
          subtitle="Total recorded boundary hits during high-pressure deliveries"
          badge="Boundaries"
          height={320}
        >
          <BarChart data={boundaryChartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-25} textAnchor="end" />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0E1526', borderColor: '#1E2E4A', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="fours" name="Fours (4s)" fill="#55B7E8" stackId="a" radius={[0, 0, 0, 0]} />
            <Bar dataKey="sixes" name="Sixes (6s)" fill="#E83E8C" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Methodology Insights Card */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-5 text-xs text-gray-300">
        <h4 className="text-sm font-bold text-white mb-2">Batter Analytical Insights:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-400">
          <li><strong>Shubman Gill (#1)</strong> achieves highest composite score (91.01) with an elite 184.44 Pressure SR (+45.67 over normal) and 41.50 pressure average across 630 balls.</li>
          <li><strong>Shashank Singh (#2)</strong> demonstrates the largest strike rate surge (+72.49 SR difference) while maintaining an outstanding 42.50 pressure average.</li>
          <li><strong>Heinrich Klaasen (#3)</strong> and <strong>Suryakumar Yadav (#10)</strong> maintain the highest total pressure volume with 1,177 and 1,424 pressure deliveries respectively.</li>
        </ul>
      </div>
    </div>
  );
}

