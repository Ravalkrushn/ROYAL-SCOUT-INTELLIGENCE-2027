import request from 'supertest';
import { createApp } from '../src/app.js';
import { config } from '../src/config/index.js';
import { OFFICIAL_EVIDENCE_SUMMARY, OFFICIAL_METHODOLOGY_CONFIG } from '../src/data/constants.js';
import { OFFICIAL_TOP_10_BATTERS, OFFICIAL_TOP_10_BOWLERS } from '../src/data/rankings.js';

describe('Royal Scout Intelligence 2027 — Phase 1 Backend Verification', () => {
  const app = createApp();

  describe('GET /health', () => {
    it('should return 200 OK and healthy service status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('UP');
      expect(response.body.data.service).toBe('royal-scout-intelligence-backend');
      expect(response.body.data.analyticalDataBaseline.rawBallByBallDeliveries).toBe(200999);
      expect(response.body.data.analyticalDataBaseline.usableMatches).toBe(837);
      expect(response.body.data.analyticalDataBaseline.analyzedDeliveries).toBe(193988);
      expect(response.body.data.analyticalDataBaseline.eligibleBatters).toBe(239);
      expect(response.body.data.analyticalDataBaseline.eligibleBowlers).toBe(195);
      expect(response.body.data.analyticalDataBaseline.reconciliationDifference).toBe(338);
    });
  });

  describe('GET /api/v1/health', () => {
    it('should return 200 OK via api prefix route', async () => {
      const response = await request(app).get(`${config.apiPrefix}/health`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.service).toBe('royal-scout-intelligence-backend');
    });
  });

  describe('GET /api/v1/methodology', () => {
    it('should return verified methodology weights and criteria', async () => {
      const response = await request(app).get(`${config.apiPrefix}/methodology`);
      expect(response.status).toBe(200);
      expect(response.body.data.batterScoringWeights.pressureStrikeRate).toBe(0.40);
      expect(response.body.data.batterScoringWeights.strikeRateImprovement).toBe(0.25);
      expect(response.body.data.batterScoringWeights.pressureAverage).toBe(0.20);
      expect(response.body.data.batterScoringWeights.sampleReliability).toBe(0.15);

      expect(response.body.data.bowlerScoringWeights.pressureWicketRate).toBe(0.60);
      expect(response.body.data.bowlerScoringWeights.pressureLegalBalls).toBe(0.25);
      expect(response.body.data.bowlerScoringWeights.pressureMatches).toBe(0.15);

      expect(response.body.data.knownLimitations.reconciliationDifferenceDeliveries).toBe(338);
    });
  });

  describe('GET /api/v1/evidence', () => {
    it('should return official baseline evidence counts', async () => {
      const response = await request(app).get(`${config.apiPrefix}/evidence`);
      expect(response.status).toBe(200);
      expect(response.body.data.rawBallByBallDeliveries).toBe(200999);
      expect(response.body.data.usableMatches).toBe(837);
      expect(response.body.data.analyzedDeliveries).toBe(193988);
      expect(response.body.data.reconciliationDifference).toBe(338);
    });
  });

  describe('GET /api/v1/rankings/batters/top10', () => {
    it('should return top 10 batters matching the official Colab output rankings', async () => {
      const response = await request(app).get(`${config.apiPrefix}/rankings/batters/top10`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(10);
      expect(response.body.data[0].playerName).toBe('Shubman Gill');
      expect(response.body.data[1].playerName).toBe('Shashank Singh');
      expect(response.body.data[2].playerName).toBe('Heinrich Klaasen');
      expect(response.body.data[9].playerName).toBe('Suryakumar Yadav');
    });
  });

  describe('GET /api/v1/rankings/bowlers/top10', () => {
    it('should return top 10 bowlers matching the official Colab output rankings', async () => {
      const response = await request(app).get(`${config.apiPrefix}/rankings/bowlers/top10`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(10);
      expect(response.body.data[0].playerName).toBe('Andre Russell');
      expect(response.body.data[1].playerName).toBe('Arshdeep Singh');
      expect(response.body.data[2].playerName).toBe('Wanindu Hasaranga');
      expect(response.body.data[9].playerName).toBe('Mitchell Starc');
    });
  });

  describe('404 Not Found Middleware', () => {
    it('should return structured 404 error for unknown routes', async () => {
      const response = await request(app).get('/api/v1/non-existent-endpoint');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('ROUTE_NOT_FOUND');
    });
  });
});

