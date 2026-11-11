'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Target, AlertTriangle, Search, Filter } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import RankingTable from '@/components/common/RankingTable';
import ChartContainer from '@/components/common/ChartContainer';
import SearchInput from '@/components/common/SearchInput';
import DropdownFilter from '@/components/common/DropdownFilter';
import LoadingState from '@/components/common/LoadingState';
import { fetchTop10Bowlers } from '@/lib/api';
import { IBowlerRanking } from '@/types';

export default function BowlingIntelligencePage() {
  const [bowlers, setBowlers] = useState<IBowlerRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [dataSource, setDataSource] = useState<string>('VERIFIED_BASELINE');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchTop10Bowlers();
        setBowlers(res.data);
        setDataSource(res.source);
      } catch (err) {
        console.error('Failed to load bowlers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBowlers = useMemo(() => {
    let result = [...bowlers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.playerName.toLowerCase().includes(q));
    }

    if (sortBy === 'compositeScore') {
      result.sort((a, b) => b.compositeScore - a.compositeScore);
    } else if (sortBy === 'wicketsPerSixBalls') {
      result.sort((a, b) => b.wicketsPerSixBalls - a.wicketsPerSixBalls);
    } else if (sortBy === 'wickets') {
      result.sort((a, b) => b.wickets - a.wickets);
    } else if (sortBy === 'legalBallsPressure') {
      result.sort((a, b) => b.legalBallsPressure - a.legalBallsPressure);
    } else {
      result.sort((a, b) => a.rank - b.rank);
    }

    return result;
  }, [bowlers, searchQuery, sortBy]);

  if (loading) {
    return <LoadingState message="Loading Bowling Intelligence..." />;
  }

  // Chart data: Wicket rate & total wickets
  const wicketChartData = bowlers.map(b => ({
    name: b.playerName.split(' ')[1] || b.playerName,
    wicketRate: Number((b.wicketsPerSixBalls * 100).toFixed(1)),
    wickets: b.wickets,
    score: b.compositeScore
  }));

  // Chart data: Economy comparison (clearly flagged)
  const econChartData = bowlers.map(b => ({
    name: b.playerName.split(' ')[1] || b.playerName,
    pressureEcon: b.candidateEconomyPressure,
    normalEcon: b.candidateEconomyNormal
  }));

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Bowling Intelligence Model"
        subtitle="Evaluating clutch execution: Pressure Wicket Rate (60%), Legal Balls Under Pressure (25%), and Matches (15%). Minimum 120 pressure legal balls & 10 matches."
        badge={dataSource === 'LIVE_API' ? 'Live API Data' : 'Official Verified Rankings'}
      />

      {/* Provisional Economy Disclaimer Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">Data Governance & Provisional Economy Notice:</span>
            <p className="mt-0.5 text-amber-200/90 leading-relaxed">
              Bowling candidate economy rates are explicitly marked as <strong>PROVISIONAL</strong> pending complete
              resolution of delivery-level extras in the baseline data. The primary ranking model relies exclusively
              on validated <em>Pressure Wicket Rate</em>, <em>Legal Deliveries</em>, and <em>Match Sample Reliability</em>.
            </p>
          </div>
        </div>
      </div>

      {/* Control Bar: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-4 shadow-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search bowler by name (e.g. Russell, Arshdeep)..."
        />

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <DropdownFilter
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: 'Official Rank', value: 'rank' },
              { label: 'Composite Score', value: 'compositeScore' },
              { label: 'Wickets per 6 Balls', value: 'wicketsPerSixBalls' },
              { label: 'Total Wickets', value: 'wickets' },
              { label: 'Pressure Legal Balls', value: 'legalBallsPressure' }
            ]}
          />
        </div>
      </div>

      {/* Ranking Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Showing {filteredBowlers.length} of {bowlers.length} Top Bowlers</span>
          <span className="text-amber-400/90">*Asterisk denotes provisional candidate economy</span>
        </div>
        <RankingTable type="bowling" data={filteredBowlers} />
      </div>

      {/* Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wickets & Wicket Rate */}
        <ChartContainer
          title="Pressure Wicket Volume & Rate"
          subtitle="Total wickets taken under high match pressure and strike capability per 6 legal balls"
          badge="Wicket Metrics"
          height={320}
        >
          <BarChart data={wicketChartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-25} textAnchor="end" />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0E1526', borderColor: '#1E2E4A', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="wickets" name="Pressure Wickets" fill="#55B7E8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="wicketRate" name="Wicket Rate (x100)" fill="#E83E8C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>

        {/* Provisional Economy Rates Comparison */}
        <ChartContainer
          title="Provisional Candidate Economy Rates"
          subtitle="*Provisional metric — comparing pressure vs normal candidate economy"
          badge="Provisional"
          infoNotice="Subject to extras reconciliation"
          height={320}
        >
          <BarChart data={econChartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} angle={-25} textAnchor="end" />
            <YAxis stroke="#64748B" fontSize={11} domain={[5, 12]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0E1526', borderColor: '#1E2E4A', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#FFFFFF' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="pressureEcon" name="Pressure Econ (Prov.*)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="normalEcon" name="Normal Econ" fill="#64748B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Bowler Insights Card */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0E1526] p-5 text-xs text-gray-300">
        <h4 className="text-sm font-bold text-white mb-2">Bowler Analytical Insights:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-400">
          <li><strong>Andre Russell (#1)</strong> ranks #1 with composite score 88.37, taking 46 wickets across 526 pressure legal balls at an exceptional 0.525 wickets per 6 balls.</li>
          <li><strong>Arshdeep Singh (#2)</strong> anchors the highest total pressure workload of any bowler: 1,614 pressure legal balls across 134 matches with 120 wickets.</li>
          <li><strong>Mitchell Starc (#10)</strong> registers the highest single-strike efficiency with 0.692 wickets per 6 balls in high-pressure spells.</li>
        </ul>
      </div>
    </div>
  );
}

