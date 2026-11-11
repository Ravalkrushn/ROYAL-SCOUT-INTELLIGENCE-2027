import { Request, Response } from 'express';
import { getDatabaseState } from '../config/database.js';
import { config } from '../config/index.js';
import { OFFICIAL_EVIDENCE_SUMMARY } from '../data/constants.js';

export const getHealth = (req: Request, res: Response): void => {
  const dbState = getDatabaseState();
  const uptimeSeconds = Math.floor(process.uptime());

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Royal Scout Intelligence 2027 Backend Service is operational',
    data: {
      status: 'UP',
      service: 'royal-scout-intelligence-backend',
      version: '1.0.0',
      phase: 'Phase 1 - Backend Foundation & Data Architecture',
      environment: config.env,
      uptimeSeconds,
      database: {
        status: dbState.status,
        isConnected: dbState.isConnected,
        host: dbState.host || null,
        name: dbState.name || null
      },
      analyticalDataBaseline: {
        rawBallByBallDeliveries: OFFICIAL_EVIDENCE_SUMMARY.rawBallByBallDeliveries,
        usableMatches: OFFICIAL_EVIDENCE_SUMMARY.usableMatches,
        analyzedDeliveries: OFFICIAL_EVIDENCE_SUMMARY.analyzedDeliveries,
        eligibleBatters: OFFICIAL_EVIDENCE_SUMMARY.eligibleBattersCount,
        eligibleBowlers: OFFICIAL_EVIDENCE_SUMMARY.eligibleBowlersCount,
        reconciliationDifference: OFFICIAL_EVIDENCE_SUMMARY.reconciliationDifference,
        dataIngestionStatus: 'Ready for Colab analytical output ingestion in Phase 2'
      }
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      dataSource: 'Colab Analytical Foundation 2022-2026'
    }
  });
};

