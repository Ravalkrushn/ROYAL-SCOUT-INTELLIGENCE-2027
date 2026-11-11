import { IEvidenceSummary, IMethodologyConfig } from '../types/index.js';

export const OFFICIAL_EVIDENCE_SUMMARY: IEvidenceSummary = {
  rawBallByBallDeliveries: 200999,
  usableMatches: 837,
  analyzedDeliveries: 193988,
  eligibleBattersCount: 239,
  eligibleBowlersCount: 195,
  reconciliationDifference: 338
};

export const OFFICIAL_METHODOLOGY_CONFIG: IMethodologyConfig = {
  version: '2027.1.0',
  pressureIndexWeights: {
    firstInnings: {
      stagePressure: 0.55,
      wicketPressure: 0.45
    },
    secondInnings: {
      stagePressure: 0.35,
      wicketPressure: 0.25,
      rrrPressure: 0.40
    }
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

