import mongoose, { Document, Schema } from 'mongoose';
import { IBowlerStats } from '../types/index.js';

export interface IBowlerStatsDocument extends IBowlerStats, Document {}

const BowlerPressureSubStatsSchema = new Schema(
  {
    legalBalls: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    dotBalls: { type: Number, default: 0 },
    economyRate: { type: Number, default: 0 }, // Provisional
    wicketRate: { type: Number, default: 0 },
    dotBallPercentage: { type: Number, default: 0 }
  },
  { _id: false }
);

const BowlerStatsSchema: Schema = new Schema(
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
    totalLegalBalls: { type: Number, default: 0 },
    totalRunsConceded: { type: Number, default: 0 },
    totalWickets: { type: Number, default: 0 },
    overallEconomy: { type: Number, default: 0 },

    // Pressure Specific Metrics
    pressureMatches: { type: Number, default: 0, index: true },
    pressureLegalBalls: { type: Number, default: 0, index: true },
    pressureRunsConceded: { type: Number, default: 0 },
    pressureWickets: { type: Number, default: 0 },
    pressureWicketRate: { type: Number, default: 0 },
    pressureDotBallPercentage: { type: Number, default: 0 },
    provisionalEconomyRate: { type: Number, default: 0 },

    // Categorical Breakdowns
    byPressureCategory: {
      LOW: { type: BowlerPressureSubStatsSchema, default: () => ({}) },
      MEDIUM: { type: BowlerPressureSubStatsSchema, default: () => ({}) },
      HIGH: { type: BowlerPressureSubStatsSchema, default: () => ({}) }
    },

    // Eligibility & Composite Scoring
    // Bowler criteria: >= 120 pressure legal balls, >= 10 pressure matches
    isEligible: { type: Boolean, default: false, index: true },
    sampleReliabilityScore: { type: Number, default: 0 },
    compositeScore: { type: Number, default: 0, index: true },
    rank: { type: Number, index: true }
  },
  {
    timestamps: true
  }
);

export const BowlerStatsModel = mongoose.model<IBowlerStatsDocument>('BowlerStats', BowlerStatsSchema);

