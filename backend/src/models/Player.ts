import mongoose, { Document, Schema } from 'mongoose';
import { IPlayer } from '../types/index.js';

export interface IPlayerDocument extends IPlayer, Document {}

const PlayerSchema: Schema = new Schema(
  {
    playerId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    displayName: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    primaryRole: {
      type: String,
      required: true,
      enum: ['BATTER', 'BOWLER', 'ALL_ROUNDER', 'WICKET_KEEPER_BATTER'],
      index: true
    },
    battingStyle: {
      type: String,
      enum: ['RIGHT_HAND', 'LEFT_HAND', 'UNKNOWN'],
      default: 'UNKNOWN'
    },
    bowlingStyle: {
      type: String,
      enum: [
        'RIGHT_ARM_FAST',
        'LEFT_ARM_FAST',
        'RIGHT_ARM_MEDIUM',
        'LEFT_ARM_MEDIUM',
        'RIGHT_ARM_SPIN',
        'LEFT_ARM_SPIN',
        'UNKNOWN'
      ],
      default: 'UNKNOWN'
    },
    isEligibleBatter: {
      type: Boolean,
      default: false,
      index: true
    },
    isEligibleBowler: {
      type: Boolean,
      default: false,
      index: true
    },
    teams: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const PlayerModel = mongoose.model<IPlayerDocument>('Player', PlayerSchema);

