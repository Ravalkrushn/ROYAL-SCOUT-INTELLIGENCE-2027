import mongoose, { Document, Schema } from 'mongoose';
import { IMatchInfo } from '../types/index.js';

export interface IMatchInfoDocument extends IMatchInfo, Document {}

const MatchInfoSchema: Schema = new Schema(
  {
    matchId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    competition: {
      type: String,
      required: true,
      index: true
    },
    season: {
      type: String,
      required: true,
      index: true
    },
    date: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
    team1: {
      type: String,
      required: true
    },
    team2: {
      type: String,
      required: true
    },
    tossWinner: {
      type: String,
      required: true
    },
    tossDecision: {
      type: String,
      enum: ['bat', 'field'],
      required: true
    },
    winner: {
      type: String
    },
    winMargin: {
      type: String
    },
    isUsableDeliveryData: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const MatchInfoModel = mongoose.model<IMatchInfoDocument>('MatchInfo', MatchInfoSchema);

