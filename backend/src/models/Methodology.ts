import mongoose, { Document, Schema } from 'mongoose';
import { IMethodologyConfig } from '../types/index.js';

export interface IMethodologyDocument extends IMethodologyConfig, Document {}

const MethodologySchema: Schema = new Schema(
  {
    version: {
      type: String,
      required: true,
      unique: true
    },
    pressureIndexWeights: {
      firstInnings: {
        stagePressure: { type: Number, required: true },
        wicketPressure: { type: Number, required: true }
      },
      secondInnings: {
        stagePressure: { type: Number, required: true },
        wicketPressure: { type: Number, required: true },
        rrrPressure: { type: Number, required: true }
      }
    },
    batterScoringWeights: {
      pressureStrikeRate: { type: Number, required: true },
      strikeRateImprovement: { type: Number, required: true },
      pressureAverage: { type: Number, required: true },
      sampleReliability: { type: Number, required: true }
    },
    batterEligibilityCriteria: {
      minPressureBalls: { type: Number, required: true },
      minPressureMatches: { type: Number, required: true }
    },
    bowlerScoringWeights: {
      pressureWicketRate: { type: Number, required: true },
      pressureLegalBalls: { type: Number, required: true },
      pressureMatches: { type: Number, required: true }
    },
    bowlerEligibilityCriteria: {
      minPressureLegalBalls: { type: Number, required: true },
      minPressureMatches: { type: Number, required: true }
    },
    knownLimitations: {
      reconciliationDifferenceDeliveries: { type: Number, required: true },
      bowlingEconomyStatus: { type: String, required: true },
      unresolvedExtrasStatus: { type: String, required: true }
    }
  },
  {
    timestamps: true
  }
);

export const MethodologyModel = mongoose.model<IMethodologyDocument>('Methodology', MethodologySchema);

