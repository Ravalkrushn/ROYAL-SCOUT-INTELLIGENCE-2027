export type PlayerRole = 'BATTER' | 'BOWLER' | 'ALL_ROUNDER' | 'WICKET_KEEPER_BATTER';

export interface IBatterRanking {
  rank: number;
  playerId: string;
  playerName: string;
  role: PlayerRole;
  compositeScore: number;
  primaryMetric: string;
  primaryMetricValue: number;
  sampleBalls: number;
  sampleMatches: number;
  runs: number;
  ballsPressure: number;
  dismissals: number;
  matchesPressure: number;
  strikeRatePressure: number;
  averagePressure: number;
  strikeRateNormal: number;
  strikeRateDifference: number;
  fours: number;
  sixes: number;
  notes?: string;
}

export interface IBowlerRanking {
  rank: number;
  playerId: string;
  playerName: string;
  role: PlayerRole;
  compositeScore: number;
  primaryMetric: string;
  primaryMetricValue: number;
  sampleBalls: number;
  sampleMatches: number;
  runs: number;
  legalBallsPressure: number;
  wickets: number;
  matchesPressure: number;
  wicketsPerSixBalls: number;
  candidateEconomyPressure: number;
  candidateEconomyNormal: number;
  notes?: string;
}

export interface IPlayerSummary {
  playerId: string;
  name: string;
  displayName?: string;
  country: string;
  primaryRole: PlayerRole;
  battingStyle?: string;
  bowlingStyle?: string;
  isEligibleBatter: boolean;
  isEligibleBowler: boolean;
  teams?: string[];
  compositeScore: number;
  rank?: number;
}

export interface IDashboardSummary {
  metrics: {
    rawDeliveries: number;
    usableMatches: number;
    analyzedDeliveries: number;
    eligibleBatters: number;
    eligibleBowlers: number;
  };
  topRanked: {
    topBatter: {
      rank: number;
      playerName: string;
      compositeScore: number;
      pressureStrikeRate: number;
      playerId?: string;
    };
    topBowler: {
      rank: number;
      playerName: string;
      compositeScore: number;
      pressureWicketRate: number;
      playerId?: string;
    };
  };
  pressureDistribution: {
    low: { deliveries: number; percentage: number };
    medium: { deliveries: number; percentage: number };
    high: { deliveries: number; percentage: number };
  };
  dataIntegrityNotice: string | {
    description?: string;
    reconciliationDifferenceDeliveries?: number;
    bowlingEconomyStatus?: string;
  };
}

export interface IMethodologyConfig {
  version: string;
  pressureIndexWeights: {
    firstInnings: { stagePressure: number; wicketPressure: number };
    secondInnings: { stagePressure: number; wicketPressure: number; rrrPressure: number };
  };
  batterScoringWeights: {
    pressureStrikeRate: number;
    strikeRateImprovement: number;
    pressureAverage: number;
    sampleReliability: number;
  };
  batterEligibilityCriteria: {
    minPressureBalls: number;
    minPressureMatches: number;
  };
  bowlerScoringWeights: {
    pressureWicketRate: number;
    pressureLegalBalls: number;
    pressureMatches: number;
  };
  bowlerEligibilityCriteria: {
    minPressureLegalBalls: number;
    minPressureMatches: number;
  };
  knownLimitations: {
    reconciliationDifferenceDeliveries: number;
    bowlingEconomyStatus: string;
    unresolvedExtrasStatus: string;
  };
}

export interface IPlayerDetail {
  player: {
    playerId: string;
    name: string;
    country: string;
    primaryRole: PlayerRole;
    teams?: string[];
  };
  battingStats: {
    isEligible: boolean;
    rank?: number;
    compositeScore: number;
    overallStrikeRate: number;
    pressureStrikeRate: number;
    strikeRateImprovement: number;
    pressureAverage: number;
    pressureBallsFaced: number;
    pressureMatches: number;
    runs: number;
    dismissals: number;
    fours: number;
    sixes: number;
    byPressureCategory?: {
      LOW: { strikeRate: number; average: number };
      MEDIUM: { strikeRate: number; average: number };
      HIGH: { strikeRate: number; average: number };
    };
  } | null;
  bowlingStats: {
    isEligible: boolean;
    rank?: number;
    compositeScore: number;
    pressureWicketRate: number;
    wicketsPerSixBalls: number;
    pressureLegalBalls: number;
    pressureMatches: number;
    wickets: number;
    runsConceded: number;
    candidateEconomyPressure: number;
    candidateEconomyNormal: number;
    isProvisionalEconomy: boolean;
  } | null;
}

export interface IApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    version?: string;
    dataSource?: string;
    totalRecords?: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

