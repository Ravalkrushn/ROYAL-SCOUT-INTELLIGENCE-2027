import mongoose, { Document, Schema } from 'mongoose';
import { IEvidenceSummary } from '../types/index.js';

export interface IEvidenceDocument extends IEvidenceSummary, Document {
  reportDate: Date;
  status: string;
}

const EvidenceSchema: Schema = new Schema(
  {
    rawBallByBallDeliveries: {
      type: Number,
      required: true,
      default: 200999
    },
    usableMatches: {
      type: Number,
      required: true,
      default: 837
    },
    analyzedDeliveries: {
      type: Number,
      required: true,
      default: 193988
    },
    eligibleBattersCount: {
      type: Number,
      required: true,
      default: 239
    },
    eligibleBowlersCount: {
      type: Number,
      required: true,
      default: 195
    },
    reconciliationDifference: {
      type: Number,
      required: true,
      default: 338
    },
    reportDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'Verified Baseline from Colab Processing'
    }
  },
  {
    timestamps: true
  }
);

export const EvidenceModel = mongoose.model<IEvidenceDocument>('Evidence', EvidenceSchema);

