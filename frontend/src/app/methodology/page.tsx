'use client';

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Database,
  Calculator
} from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import LoadingState from '@/components/common/LoadingState';
import { fetchMethodology } from '@/lib/api';
import { IMethodologyConfig } from '@/types';

export default function MethodologyPage() {
  const [config, setConfig] = useState<IMethodologyConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchMethodology();
        setConfig(res.data);
      } catch (err) {
        console.error('Failed to load methodology:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !config) {
    return <LoadingState message="Loading Methodology & Audit Framework..." />;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Methodology, Scoring Weights & Audit Trail"
        subtitle="Transparent documentation of the mathematical formulations, match-state pressure weights, player eligibility thresholds, and dataset reconciliation."
        badge={`Model v${config.version}`}
      />

      {/* Dataset Foundations Overview */}
      <section className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-[#55B7E8]" />
          <h3 className="text-base font-bold text-white">1. Dataset Baseline & Eligibility</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="rounded-lg bg-[#0B0F19] p-3.5 border border-[#1E2E4A]">
            <span className="text-gray-400 uppercase text-[10px]">Raw Records</span>
            <p className="mt-1 text-xl font-black text-white">200,999</p>
            <p className="text-[10px] text-gray-500">Ball-by-ball deliveries</p>
          </div>
          <div className="rounded-lg bg-[#0B0F19] p-3.5 border border-[#1E2E4A]">
            <span className="text-gray-400 uppercase text-[10px]">Usable Matches</span>
            <p className="mt-1 text-xl font-black text-[#55B7E8]">837</p>
            <p className="text-[10px] text-gray-500">IPL & T20I (2022–2026)</p>
          </div>
          <div className="rounded-lg bg-[#0B0F19] p-3.5 border border-[#1E2E4A]">
            <span className="text-gray-400 uppercase text-[10px]">Analysed Balls</span>
            <p className="mt-1 text-xl font-black text-[#E83E8C]">193,988</p>
            <p className="text-[10px] text-gray-500">State-calculated deliveries</p>
          </div>
          <div className="rounded-lg bg-[#0B0F19] p-3.5 border border-[#1E2E4A]">
            <span className="text-gray-400 uppercase text-[10px]">Eligible Pool</span>
            <p className="mt-1 text-xl font-black text-emerald-400">434 Players</p>
            <p className="text-[10px] text-gray-500">239 Batters, 195 Bowlers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300">
          <div className="rounded-lg bg-[#0E1526] p-4 border border-[#1E2E4A]">
            <h4 className="font-bold text-white text-sm mb-1">Batter Eligibility Criteria:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Minimum <strong>{config.batterEligibilityCriteria.minPressureBalls} pressure balls faced</strong></li>
              <li>Minimum <strong>{config.batterEligibilityCriteria.minPressureMatches} pressure match innings</strong></li>
              <li>Filters out speculative flash-in-the-pan performances</li>
            </ul>
          </div>
          <div className="rounded-lg bg-[#0E1526] p-4 border border-[#1E2E4A]">
            <h4 className="font-bold text-white text-sm mb-1">Bowler Eligibility Criteria:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Minimum <strong>{config.bowlerEligibilityCriteria.minPressureLegalBalls} pressure legal deliveries</strong></li>
              <li>Minimum <strong>{config.bowlerEligibilityCriteria.minPressureMatches} pressure match innings</strong></li>
              <li>Guarantees sustained sample reliability in death/middle pressure</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pressure Model Mechanics */}
      <section className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#E83E8C]" />
          <h3 className="text-base font-bold text-white">2. Pre-Delivery Match-State Pressure Formulation</h3>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          Pressure is evaluated prior to each individual delivery based on the game situation. It adapts dynamically depending on whether the team is setting a target (1st Innings) or chasing under the required run rate (2nd Innings):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* First Innings */}
          <div className="rounded-xl bg-[#0B0F19] p-5 border border-[#1E2E4A]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-white">1st Innings Model</span>
              <span className="rounded bg-[#55B7E8]/20 px-2 py-0.5 text-[10px] font-bold text-[#55B7E8]">Setting Target</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Stage Pressure (Powerplay, Middle, Death):</span>
                  <span className="font-bold text-white">55%</span>
                </div>
                <div className="w-full bg-[#1E2E4A] rounded-full h-2">
                  <div className="bg-[#55B7E8] h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Wicket Pressure (Wickets lost vs balls remaining):</span>
                  <span className="font-bold text-white">45%</span>
                </div>
                <div className="w-full bg-[#1E2E4A] rounded-full h-2">
                  <div className="bg-[#E83E8C] h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Innings */}
          <div className="rounded-xl bg-[#0B0F19] p-5 border border-[#1E2E4A]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-white">2nd Innings Model</span>
              <span className="rounded bg-[#E83E8C]/20 px-2 py-0.5 text-[10px] font-bold text-[#E83E8C]">Chasing Target</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Required Run Rate (RRR) Pressure:</span>
                  <span className="font-bold text-[#E83E8C]">40%</span>
                </div>
                <div className="w-full bg-[#1E2E4A] rounded-full h-2">
                  <div className="bg-[#E83E8C] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Stage Pressure:</span>
                  <span className="font-bold text-white">35%</span>
                </div>
                <div className="w-full bg-[#1E2E4A] rounded-full h-2">
                  <div className="bg-[#55B7E8] h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Wicket Pressure:</span>
                  <span className="font-bold text-white">25%</span>
                </div>
                <div className="w-full bg-[#1E2E4A] rounded-full h-2">
                  <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Composite Scoring Formulas */}
      <section className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-[#F59E0B]" />
          <h3 className="text-base font-bold text-white">3. Composite Scoring Weights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Batter Weights */}
          <div className="rounded-xl bg-[#0B0F19] p-5 border border-[#1E2E4A]">
            <h4 className="font-bold text-white text-sm mb-3">Batter Scoring Weights:</h4>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center py-1 border-b border-[#1E2E4A]">
                <span className="text-gray-300">Pressure Strike Rate</span>
                <span className="font-mono font-bold text-[#E83E8C]">40%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1E2E4A]">
                <span className="text-gray-300">Strike Rate Improvement (Over Normal)</span>
                <span className="font-mono font-bold text-[#55B7E8]">25%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1E2E4A]">
                <span className="text-gray-300">Pressure Batting Average</span>
                <span className="font-mono font-bold text-[#F59E0B]">20%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-300">Sample Reliability (Pressure Balls & Matches)</span>
                <span className="font-mono font-bold text-emerald-400">15%</span>
              </div>
            </div>
          </div>

          {/* Bowler Weights */}
          <div className="rounded-xl bg-[#0B0F19] p-5 border border-[#1E2E4A]">
            <h4 className="font-bold text-white text-sm mb-3">Bowler Scoring Weights:</h4>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center py-1 border-b border-[#1E2E4A]">
                <span className="text-gray-300">Pressure Wicket Rate (Wickets / 6 legal balls)</span>
                <span className="font-mono font-bold text-[#E83E8C]">60%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1E2E4A]">
                <span className="text-gray-300">Pressure Legal Deliveries (Workload)</span>
                <span className="font-mono font-bold text-[#55B7E8]">25%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-300">Pressure Matches (Consistency)</span>
                <span className="font-mono font-bold text-[#F59E0B]">15%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documented Known Limitations & Governance */}
      <section className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-xs text-amber-200 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-amber-300">4. Documented Analytical Limitations & Audit Discrepancies</h3>
        </div>

        <p className="leading-relaxed">
          In strict compliance with the competition's academic and scouting integrity rules, all discrepancies and provisional calculations are documented transparently:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-amber-200/90">
          <li>
            <strong>338-Delivery Reconciliation Variance:</strong> The sum of deliveries across the categorical stage/wicket pressure distribution totals 193,650 balls, representing a documented 338-delivery variance against the 193,988 analysed deliveries. This difference is preserved and not artificially flattened.
          </li>
          <li>
            <strong>Provisional Bowling Economy Status:</strong> Bowling candidate economy rates are explicitly flagged as provisional pending complete reconciliation of extras calculations (wides and no-balls) in the raw delivery tables.
          </li>
          <li>
            <strong>Unresolved Extras:</strong> Extras calculations in base delivery tables remain under review; composite bowler rankings do not falsely penalize bowlers for unverified extras.
          </li>
        </ul>
      </section>
    </div>
  );
}

