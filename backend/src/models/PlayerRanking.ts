import mongoose, { Document, Schema } from 'mongoose';
import { IPlayerRankingItem } from '../types/index.js';

export interface IPlayerRankingDocument extends IPlayerRankingItem, Document {
  category: 'BATTER' | 'BOWLER';
}

const PlayerRankingSchema: Schema = new Schema(
  {
    rank: {
      type: Number,
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      enum: ['BATTER', 'BOWLER'],
      index: true
    },
    playerId: {
      type: String,
      required: true,
      index: true
    },
    playerName: {
      type: String,
      required: true,
      index: true
    },
    role: {
      type: String,
      required: true
    },
    compositeScore: {
      type: Number,
      required: true
    },
    primaryMetric: {
      type: String,
      required: true
    },
    primaryMetricValue: {
      type: Number,
      default: 0
    },
    sampleBalls: {
      type: Number,
      default: 0
    },
    sampleMatches: {
      type: Number,
      default: 0
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Compound unique index for rank within a category
PlayerRankingSchema.index({ category: 1, rank: 1 }, { unique: true });

export const PlayerRankingModel = mongoose.model<IPlayerRankingDocument>('PlayerRanking', PlayerRankingSchema);

