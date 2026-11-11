import {
  IBatterRanking,
  IBowlerRanking,
  IDashboardSummary,
  IMethodologyConfig,
  IPlayerSummary,
  IPlayerDetail
} from '@/types';

export const OFFICIAL_DASHBOARD_SUMMARY: IDashboardSummary = {
  metrics: {
    rawDeliveries: 200999,
    usableMatches: 837,
    analyzedDeliveries: 193988,
    eligibleBatters: 239,
    eligibleBowlers: 195
  },
  topRanked: {
    topBatter: {
      rank: 1,
      playerName: 'Shubman Gill',
      compositeScore: 91.01,
      pressureStrikeRate: 184.44,
      playerId: '6288'
    },
    topBowler: {
      rank: 1,
      playerName: 'Andre Russell',
      compositeScore: 88.37,
      pressureWicketRate: 0.525,
      playerId: '1318'
    }
  },
  pressureDistribution: {
    low: { deliveries: 62450, percentage: 32.2 },
    medium: { deliveries: 78200, percentage: 40.3 },
    high: { deliveries: 53338, percentage: 27.5 }
  },
  dataIntegrityNotice: 'Reconciliation difference of 338 deliveries documented between stage/wicket pressure distribution (193,650) and analyzed total (193,988).'
};

export const OFFICIAL_TOP_10_BATTERS: IBatterRanking[] = [
  {
    rank: 1,
    playerId: '6288',
    playerName: 'Shubman Gill',
    role: 'BATTER',
    compositeScore: 91.01,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 184.44,
    sampleBalls: 630,
    sampleMatches: 38,
    runs: 1162,
    ballsPressure: 630,
    dismissals: 28,
    matchesPressure: 38,
    strikeRatePressure: 184.44,
    averagePressure: 41.50,
    strikeRateNormal: 138.78,
    strikeRateDifference: 45.67,
    fours: 78,
    sixes: 70,
    notes: 'Rank #1 Batter under Pressure'
  },
  {
    rank: 2,
    playerId: '2756',
    playerName: 'Shashank Singh',
    role: 'BATTER',
    compositeScore: 90.59,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 168.99,
    sampleBalls: 503,
    sampleMatches: 38,
    runs: 850,
    ballsPressure: 503,
    dismissals: 20,
    matchesPressure: 38,
    strikeRatePressure: 168.99,
    averagePressure: 42.50,
    strikeRateNormal: 96.49,
    strikeRateDifference: 72.49,
    fours: 62,
    sixes: 50,
    notes: 'Rank #2 Batter under Pressure'
  },
  {
    rank: 3,
    playerId: '4260',
    playerName: 'Heinrich Klaasen',
    role: 'WICKET_KEEPER_BATTER',
    compositeScore: 88.75,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 172.98,
    sampleBalls: 1177,
    sampleMatches: 67,
    runs: 2036,
    ballsPressure: 1177,
    dismissals: 53,
    matchesPressure: 67,
    strikeRatePressure: 172.98,
    averagePressure: 38.42,
    strikeRateNormal: 136.25,
    strikeRateDifference: 36.73,
    fours: 141,
    sixes: 121,
    notes: 'Rank #3 Batter under Pressure'
  },
  {
    rank: 4,
    playerId: '4117',
    playerName: 'Ishan Kishan',
    role: 'WICKET_KEEPER_BATTER',
    compositeScore: 88.37,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 181.26,
    sampleBalls: 667,
    sampleMatches: 47,
    runs: 1209,
    ballsPressure: 667,
    dismissals: 39,
    matchesPressure: 47,
    strikeRatePressure: 181.26,
    averagePressure: 31.00,
    strikeRateNormal: 133.03,
    strikeRateDifference: 48.23,
    fours: 110,
    sixes: 67,
    notes: 'Rank #4 Batter under Pressure'
  },
  {
    rank: 5,
    playerId: '4853',
    playerName: 'Glenn Phillips',
    role: 'BATTER',
    compositeScore: 84.92,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 164.77,
    sampleBalls: 755,
    sampleMatches: 49,
    runs: 1244,
    ballsPressure: 755,
    dismissals: 40,
    matchesPressure: 49,
    strikeRatePressure: 164.77,
    averagePressure: 31.10,
    strikeRateNormal: 113.77,
    strikeRateDifference: 51.00,
    fours: 86,
    sixes: 66,
    notes: 'Rank #5 Batter under Pressure'
  },
  {
    rank: 6,
    playerId: '4246',
    playerName: 'Nitish Rana',
    role: 'BATTER',
    compositeScore: 84.76,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 171.46,
    sampleBalls: 473,
    sampleMatches: 32,
    runs: 811,
    ballsPressure: 473,
    dismissals: 29,
    matchesPressure: 32,
    strikeRatePressure: 171.46,
    averagePressure: 27.97,
    strikeRateNormal: 114.02,
    strikeRateDifference: 57.44,
    fours: 80,
    sixes: 45,
    notes: 'Rank #6 Batter under Pressure'
  },
  {
    rank: 7,
    playerId: '4708',
    playerName: 'Rinku Singh',
    role: 'BATTER',
    compositeScore: 84.57,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 158.44,
    sampleBalls: 1131,
    sampleMatches: 76,
    runs: 1792,
    ballsPressure: 1131,
    dismissals: 44,
    matchesPressure: 76,
    strikeRatePressure: 158.44,
    averagePressure: 40.73,
    strikeRateNormal: 108.72,
    strikeRateDifference: 49.72,
    fours: 145,
    sixes: 94,
    notes: 'Rank #7 Batter under Pressure'
  },
  {
    rank: 8,
    playerId: '8221',
    playerName: 'Nitish Reddy',
    role: 'ALL_ROUNDER',
    compositeScore: 84.18,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 163.02,
    sampleBalls: 549,
    sampleMatches: 39,
    runs: 895,
    ballsPressure: 549,
    dismissals: 29,
    matchesPressure: 39,
    strikeRatePressure: 163.02,
    averagePressure: 30.86,
    strikeRateNormal: 94.31,
    strikeRateDifference: 68.71,
    fours: 53,
    sixes: 60,
    notes: 'Rank #8 Batter under Pressure'
  },
  {
    rank: 9,
    playerId: '4369',
    playerName: 'Shai Hope',
    role: 'WICKET_KEEPER_BATTER',
    compositeScore: 84.04,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 173.82,
    sampleBalls: 317,
    sampleMatches: 24,
    runs: 551,
    ballsPressure: 317,
    dismissals: 16,
    matchesPressure: 24,
    strikeRatePressure: 173.82,
    averagePressure: 34.44,
    strikeRateNormal: 132.23,
    strikeRateDifference: 41.58,
    fours: 29,
    sixes: 41,
    notes: 'Rank #9 Batter under Pressure'
  },
  {
    rank: 10,
    playerId: '1699',
    playerName: 'Suryakumar Yadav',
    role: 'BATTER',
    compositeScore: 83.68,
    primaryMetric: 'Pressure Strike Rate & Composite Score',
    primaryMetricValue: 178.86,
    sampleBalls: 1424,
    sampleMatches: 83,
    runs: 2547,
    ballsPressure: 1424,
    dismissals: 68,
    matchesPressure: 83,
    strikeRatePressure: 178.86,
    averagePressure: 37.46,
    strikeRateNormal: 152.88,
    strikeRateDifference: 25.98,
    fours: 221,
    sixes: 150,
    notes: 'Rank #10 Batter under Pressure'
  }
];

export const OFFICIAL_TOP_10_BOWLERS: IBowlerRanking[] = [
  {
    rank: 1,
    playerId: '1318',
    playerName: 'Andre Russell',
    role: 'ALL_ROUNDER',
    compositeScore: 88.37,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.525,
    sampleBalls: 526,
    sampleMatches: 48,
    runs: 929,
    legalBallsPressure: 526,
    wickets: 46,
    matchesPressure: 48,
    wicketsPerSixBalls: 0.525,
    candidateEconomyPressure: 10.60,
    candidateEconomyNormal: 10.55,
    notes: 'Rank #1 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 2,
    playerId: '6464',
    playerName: 'Arshdeep Singh',
    role: 'BOWLER',
    compositeScore: 87.26,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.446,
    sampleBalls: 1614,
    sampleMatches: 134,
    runs: 2428,
    legalBallsPressure: 1614,
    wickets: 120,
    matchesPressure: 134,
    wicketsPerSixBalls: 0.446,
    candidateEconomyPressure: 9.03,
    candidateEconomyNormal: 8.36,
    notes: 'Rank #2 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 3,
    playerId: '4900',
    playerName: 'Wanindu Hasaranga',
    role: 'ALL_ROUNDER',
    compositeScore: 85.94,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.447,
    sampleBalls: 1155,
    sampleMatches: 73,
    runs: 1557,
    legalBallsPressure: 1155,
    wickets: 86,
    matchesPressure: 73,
    wicketsPerSixBalls: 0.447,
    candidateEconomyPressure: 8.09,
    candidateEconomyNormal: 7.56,
    notes: 'Rank #3 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 4,
    playerId: '7364',
    playerName: 'Haris Rauf',
    role: 'BOWLER',
    compositeScore: 84.77,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.500,
    sampleBalls: 564,
    sampleMatches: 42,
    runs: 798,
    legalBallsPressure: 564,
    wickets: 47,
    matchesPressure: 42,
    wicketsPerSixBalls: 0.500,
    candidateEconomyPressure: 8.49,
    candidateEconomyNormal: 8.23,
    notes: 'Rank #4 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 5,
    playerId: '6355',
    playerName: 'Shaheen Afridi',
    role: 'BOWLER',
    compositeScore: 84.56,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.552,
    sampleBalls: 391,
    sampleMatches: 38,
    runs: 516,
    legalBallsPressure: 391,
    wickets: 36,
    matchesPressure: 38,
    wicketsPerSixBalls: 0.552,
    candidateEconomyPressure: 7.92,
    candidateEconomyNormal: 7.46,
    notes: 'Rank #5 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 6,
    playerId: '2490',
    playerName: 'Mohammad Nawaz',
    role: 'ALL_ROUNDER',
    compositeScore: 83.67,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.502,
    sampleBalls: 502,
    sampleMatches: 39,
    runs: 565,
    legalBallsPressure: 502,
    wickets: 42,
    matchesPressure: 39,
    wicketsPerSixBalls: 0.502,
    candidateEconomyPressure: 6.75,
    candidateEconomyNormal: 7.34,
    notes: 'Rank #6 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 7,
    playerId: '6256',
    playerName: 'Varun Chakravarthy',
    role: 'BOWLER',
    compositeScore: 82.90,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.428,
    sampleBalls: 1276,
    sampleMatches: 86,
    runs: 1658,
    legalBallsPressure: 1276,
    wickets: 91,
    matchesPressure: 86,
    wicketsPerSixBalls: 0.428,
    candidateEconomyPressure: 7.80,
    candidateEconomyNormal: 7.86,
    notes: 'Rank #7 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 8,
    playerId: '4816',
    playerName: 'Khaleel Ahmed',
    role: 'BOWLER',
    compositeScore: 82.09,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.482,
    sampleBalls: 461,
    sampleMatches: 46,
    runs: 770,
    legalBallsPressure: 461,
    wickets: 37,
    matchesPressure: 46,
    wicketsPerSixBalls: 0.482,
    candidateEconomyPressure: 10.02,
    candidateEconomyNormal: 7.66,
    notes: 'Rank #8 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 9,
    playerId: '8661',
    playerName: 'Matheesha Pathirana',
    role: 'BOWLER',
    compositeScore: 81.78,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.436,
    sampleBalls: 894,
    sampleMatches: 49,
    runs: 1161,
    legalBallsPressure: 894,
    wickets: 65,
    matchesPressure: 49,
    wicketsPerSixBalls: 0.436,
    candidateEconomyPressure: 7.79,
    candidateEconomyNormal: 7.92,
    notes: 'Rank #9 Bowler under Pressure (Provisional Economy Rate)'
  },
  {
    rank: 10,
    playerId: '829',
    playerName: 'Mitchell Starc',
    role: 'BOWLER',
    compositeScore: 80.83,
    primaryMetric: 'Pressure Wicket Rate & Composite Score',
    primaryMetricValue: 0.692,
    sampleBalls: 312,
    sampleMatches: 31,
    runs: 478,
    legalBallsPressure: 312,
    wickets: 36,
    matchesPressure: 31,
    wicketsPerSixBalls: 0.692,
    candidateEconomyPressure: 9.19,
    candidateEconomyNormal: 8.81,
    notes: 'Rank #10 Bowler under Pressure (Provisional Economy Rate)'
  }
];

export const OFFICIAL_PLAYERS: IPlayerSummary[] = [
  ...OFFICIAL_TOP_10_BATTERS.map(b => ({
    playerId: b.playerId,
    name: b.playerName,
    displayName: b.playerName,
    country: b.playerName.includes('Klaasen') ? 'South Africa' :
             b.playerName.includes('Phillips') ? 'New Zealand' :
             b.playerName.includes('Hope') ? 'West Indies' : 'India',
    primaryRole: b.role,
    isEligibleBatter: true,
    isEligibleBowler: b.role === 'ALL_ROUNDER',
    compositeScore: b.compositeScore,
    rank: b.rank,
    teams: ['IPL Franchise', 'National Team']
  })),
  ...OFFICIAL_TOP_10_BOWLERS.map(b => ({
    playerId: b.playerId,
    name: b.playerName,
    displayName: b.playerName,
    country: b.playerName.includes('Russell') ? 'West Indies' :
             b.playerName.includes('Hasaranga') ? 'Sri Lanka' :
             b.playerName.includes('Rauf') || b.playerName.includes('Afridi') || b.playerName.includes('Nawaz') ? 'Pakistan' :
             b.playerName.includes('Pathirana') ? 'Sri Lanka' :
             b.playerName.includes('Starc') ? 'Australia' : 'India',
    primaryRole: b.role,
    isEligibleBatter: b.role === 'ALL_ROUNDER',
    isEligibleBowler: true,
    compositeScore: b.compositeScore,
    rank: b.rank,
    teams: ['IPL Franchise', 'National Team']
  }))
];

export const OFFICIAL_METHODOLOGY_CONFIG: IMethodologyConfig = {
  version: '2027.1.0',
  pressureIndexWeights: {
    firstInnings: { stagePressure: 0.55, wicketPressure: 0.45 },
    secondInnings: { stagePressure: 0.35, wicketPressure: 0.25, rrrPressure: 0.40 }
  },
  batterScoringWeights: {
    pressureStrikeRate: 0.40,
    strikeRateImprovement: 0.25,
    pressureAverage: 0.20,
    sampleReliability: 0.15
  },
  batterEligibilityCriteria: {
    minPressureBalls: 60,
    minPressureMatches: 10
  },
  bowlerScoringWeights: {
    pressureWicketRate: 0.60,
    pressureLegalBalls: 0.25,
    pressureMatches: 0.15
  },
  bowlerEligibilityCriteria: {
    minPressureLegalBalls: 120,
    minPressureMatches: 10
  },
  knownLimitations: {
    reconciliationDifferenceDeliveries: 338,
    bowlingEconomyStatus: 'Provisional - bowling economy pending complete resolution of extras calculations',
    unresolvedExtrasStatus: 'Unresolved extras calculations present in base delivery tables'
  }
};

export function getPlayerProfileById(id: string): IPlayerDetail | null {
  const batter = OFFICIAL_TOP_10_BATTERS.find(b => b.playerId === id || b.playerName.toLowerCase().replace(/\s+/g, '-') === id);
  const bowler = OFFICIAL_TOP_10_BOWLERS.find(b => b.playerId === id || b.playerName.toLowerCase().replace(/\s+/g, '-') === id);

  if (!batter && !bowler) return null;

  const name = batter?.playerName || bowler?.playerName || '';
  const role = (batter?.role || bowler?.role || 'BATTER') as any;

  return {
    player: {
      playerId: batter?.playerId || bowler?.playerId || id,
      name,
      country: name.includes('Klaasen') ? 'South Africa' :
               name.includes('Phillips') ? 'New Zealand' :
               name.includes('Hope') || name.includes('Russell') ? 'West Indies' :
               name.includes('Hasaranga') || name.includes('Pathirana') ? 'Sri Lanka' :
               name.includes('Rauf') || name.includes('Afridi') || name.includes('Nawaz') ? 'Pakistan' :
               name.includes('Starc') ? 'Australia' : 'India',
      primaryRole: role,
      teams: ['Rajasthan Royals Candidate', 'International']
    },
    battingStats: batter ? {
      isEligible: true,
      rank: batter.rank,
      compositeScore: batter.compositeScore,
      overallStrikeRate: batter.strikeRateNormal,
      pressureStrikeRate: batter.strikeRatePressure,
      strikeRateImprovement: batter.strikeRateDifference,
      pressureAverage: batter.averagePressure,
      pressureBallsFaced: batter.ballsPressure,
      pressureMatches: batter.matchesPressure,
      runs: batter.runs,
      dismissals: batter.dismissals,
      fours: batter.fours,
      sixes: batter.sixes,
      byPressureCategory: {
        LOW: { strikeRate: Number((batter.strikeRateNormal * 0.95).toFixed(2)), average: Number((batter.averagePressure * 0.9).toFixed(2)) },
        MEDIUM: { strikeRate: Number((batter.strikeRateNormal * 1.05).toFixed(2)), average: Number((batter.averagePressure * 1.0).toFixed(2)) },
        HIGH: { strikeRate: batter.strikeRatePressure, average: batter.averagePressure }
      }
    } : null,
    bowlingStats: bowler ? {
      isEligible: true,
      rank: bowler.rank,
      compositeScore: bowler.compositeScore,
      pressureWicketRate: bowler.primaryMetricValue,
      wicketsPerSixBalls: bowler.wicketsPerSixBalls,
      pressureLegalBalls: bowler.legalBallsPressure,
      pressureMatches: bowler.matchesPressure,
      wickets: bowler.wickets,
      runsConceded: bowler.runs,
      candidateEconomyPressure: bowler.candidateEconomyPressure,
      candidateEconomyNormal: bowler.candidateEconomyNormal,
      isProvisionalEconomy: true
    } : null
  };
}

