import mongoose, { Document, Schema } from 'mongoose';
import { ICompetition } from '../types/index.js';

export interface ICompetitionDocument extends ICompetition, Document {}

const CompetitionSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    startYear: {
      type: Number,
      required: true
    },
    endYear: {
      type: Number,
      required: true
    },
    totalMatches: {
      type: Number,
      default: 0
    },
    analyzedDeliveries: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const CompetitionModel = mongoose.model<ICompetitionDocument>('Competition', CompetitionSchema);

