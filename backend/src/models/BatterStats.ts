import mongoose, { Document, Schema } from 'mongoose';
import { IBatterStats } from '../types/index.js';

export interface IBatterStatsDocument extends IBatterStats, Document {}

const PressureSubStatsSchema = new Schema(
  {
    ballsFaced: { type: Number, default: 0 },
    runsScored: { type: Number, default: 0 },
    dismissals: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    dotBallPercentage: { type: Number, default: 0 },
    boundaryPercentage: { type: Number, default: 0 }
  },
  { _id: false }
);

const BatterStatsSchema: Schema = new Schema(
  {
    playerId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    playerName: {
      type: String,
      required: true,
      index: true
    },
    matchesPlayed: { type: Number, default: 0 },
    totalBallsFaced: { type: Number, default: 0 },
    totalRuns: { type: Number, default: 0 },
    overallStrikeRate: { type: Number, default: 0 },
    overallAverage: { type: Number, default: 0 },

    // Pressure Specific Metrics
    pressureMatches: { type: Number, default: 0, index: true },
    pressureBallsFaced: { type: Number, default: 0, index: true },
    pressureRuns: { type: Number, default: 0 },
    pressureDismissals: { type: Number, default: 0 },
    pressureStrikeRate: { type: Number, default: 0 },
    pressureAverage: { type: Number, default: 0 },
    strikeRateImprovement: { type: Number, default: 0 },

    // Categorical Breakdowns (LOW, MEDIUM, HIGH)
    byPressureCategory: {
      LOW: { type: PressureSubStatsSchema, default: () => ({}) },
      MEDIUM: { type: PressureSubStatsSchema, default: () => ({}) },
      HIGH: { type: PressureSubStatsSchema, default: () => ({}) }
    },

    // Eligibility & Composite Scoring
    // Batter criteria: >= 60 pressure balls, >= 10 pressure matches
    isEligible: { type: Boolean, default: false, index: true },
    sampleReliabilityScore: { type: Number, default: 0 },
    compositeScore: { type: Number, default: 0, index: true },
    rank: { type: Number, index: true }
  },
  {
    timestamps: true
  }
);

export const BatterStatsModel = mongoose.model<IBatterStatsDocument>('BatterStats', BatterStatsSchema);

