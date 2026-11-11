/**
 * Royal Scout Intelligence 2027
 * Core Type Definitions & Interfaces
 */

export type MatchStage = 'POWERPLAY' | 'MIDDLE' | 'DEATH';

export type PressureCategory = 'LOW' | 'MEDIUM' | 'HIGH';

export type InningsNumber = 1 | 2;

export type PlayerRole = 'BATTER' | 'BOWLER' | 'ALL_ROUNDER' | 'WICKET_KEEPER_BATTER';

export type BowlingStyle = 
  | 'RIGHT_ARM_FAST'
  | 'LEFT_ARM_FAST'
  | 'RIGHT_ARM_MEDIUM'
  | 'LEFT_ARM_MEDIUM'
  | 'RIGHT_ARM_SPIN'
  | 'LEFT_ARM_SPIN'
  | 'UNKNOWN';

export type BattingStyle = 'RIGHT_HAND' | 'LEFT_HAND' | 'UNKNOWN';

export interface ICompetition {
  code: string; // e.g. 'IPL', 'T20I'
  name: string;
  startYear: number;
  endYear: number;
  totalMatches: number;
  analyzedDeliveries: number;
}

export interface IMatchInfo {
  matchId: string;
  competition: string;
  season: string;
  date: string;
  venue: string;
  team1: string;
  team2: string;
  tossWinner: string;
  tossDecision: 'bat' | 'field';
  winner?: string;
  winMargin?: string;
  isUsableDeliveryData: boolean;
}

export interface IPlayer {
  playerId: string;
  name: string;
  displayName: string;
  country: string;
  primaryRole: PlayerRole;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  isEligibleBatter: boolean;
  isEligibleBowler: boolean;
  teams: string[];
}

export interface IBatterPressureStats {
  ballsFaced: number;
  runsScored: number;
  dismissals: number;
  strikeRate: number;
  average: number;
  dotBallPercentage: number;
  boundaryPercentage: number;
}

export interface IBatterStats {
  playerId: string;
  playerName: string;
  matchesPlayed: number;
  totalBallsFaced: number;
  totalRuns: number;
  overallStrikeRate: number;
  overallAverage: number;
  
  // Pressure Specific Metrics
  pressureMatches: number;
  pressureBallsFaced: number;
  pressureRuns: number;
  pressureDismissals: number;
  pressureStrikeRate: number;
  pressureAverage: number;
  strikeRateImprovement: number; // pressureStrikeRate - overallStrikeRate
  
  // Categorical Breakdowns
  byPressureCategory: Record<PressureCategory, IBatterPressureStats>;
  
  // Eligibility & Scoring
  isEligible: boolean; // >= 60 pressure balls & >= 10 pressure matches
  sampleReliabilityScore: number;
  compositeScore: number;
  rank?: number;
}

export interface IBowlerPressureStats {
  legalBalls: number;
  runsConceded: number;
  wickets: number;
  dotBalls: number;
  economyRate: number; // Note: Provisional bowling economy
  wicketRate: number; // Balls per wicket or wickets per ball
  dotBallPercentage: number;
}

export interface IBowlerStats {
  playerId: string;
  playerName: string;
  matchesPlayed: number;
  totalLegalBalls: number;
  totalRunsConceded: number;
  totalWickets: number;
  overallEconomy: number;
  
  // Pressure Specific Metrics
  pressureMatches: number;
  pressureLegalBalls: number;
  pressureRunsConceded: number;
  pressureWickets: number;
  pressureWicketRate: number; // Wickets per pressure ball or balls per wicket
  pressureDotBallPercentage: number;
  provisionalEconomyRate: number; // Provisional metric pending unresolved extras
  
  // Categorical Breakdowns
  byPressureCategory: Record<PressureCategory, IBowlerPressureStats>;
  
  // Eligibility & Scoring
  isEligible: boolean; // >= 120 pressure legal balls & >= 10 pressure matches
  sampleReliabilityScore: number;
  compositeScore: number;
  rank?: number;
}

export interface IPlayerRankingItem {
  rank: number;
  playerId: string;
  playerName: string;
  role: PlayerRole;
  compositeScore: number;
  primaryMetric: string;
  primaryMetricValue: number;
  sampleBalls: number;
  sampleMatches: number;
  notes?: string;
}

export interface IMethodologyConfig {
  version: string;
  pressureIndexWeights: {
    firstInnings: {
      stagePressure: number; // 0.55
      wicketPressure: number; // 0.45
    };
    secondInnings: {
      stagePressure: number; // 0.35
      wicketPressure: number; // 0.25
      rrrPressure: number; // 0.40
    };
  };
  batterScoringWeights: {
    pressureStrikeRate: number; // 0.40
    strikeRateImprovement: number; // 0.25
    pressureAverage: number; // 0.20
    sampleReliability: number; // 0.15
  };
  batterEligibilityCriteria: {
    minPressureBalls: number; // 60
    minPressureMatches: number; // 10
  };
  bowlerScoringWeights: {
    pressureWicketRate: number; // 0.60
    pressureLegalBalls: number; // 0.25
    pressureMatches: number; // 0.15
  };
  bowlerEligibilityCriteria: {
    minPressureLegalBalls: number; // 120
    minPressureMatches: number; // 10
  };
  knownLimitations: {
    reconciliationDifferenceDeliveries: number; // 338
    bowlingEconomyStatus: string; // 'Provisional'
    unresolvedExtrasStatus: string; // 'Unresolved extras calculations'
  };
}

export interface IEvidenceSummary {
  rawBallByBallDeliveries: number; // 200,999
  usableMatches: number; // 837
  analyzedDeliveries: number; // 193,988
  eligibleBattersCount: number; // 239
  eligibleBowlersCount: number; // 195
  reconciliationDifference: number; // 338
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
  meta?: {
    timestamp: string;
    version: string;
    dataSource: string;
    totalRecords?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

