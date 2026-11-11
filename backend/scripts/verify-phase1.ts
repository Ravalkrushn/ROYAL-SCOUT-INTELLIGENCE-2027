import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import { createApp } from '../src/app.js';
import { OFFICIAL_EVIDENCE_SUMMARY, OFFICIAL_METHODOLOGY_CONFIG } from '../src/data/constants.js';
import { OFFICIAL_TOP_10_BATTERS, OFFICIAL_TOP_10_BOWLERS } from '../src/data/rankings.js';
import { config } from '../src/config/index.js';

const runMockRequest = (app: any, method: 'GET' | 'POST', url: string): Promise<{ statusCode: number; body: any }> => {
  return new Promise((resolve) => {
    const req = httpMocks.createRequest({
      method,
      url,
      headers: { host: 'localhost:5000' }
    });

    const res = httpMocks.createResponse({
      eventEmitter: EventEmitter
    });

    res.on('end', () => {
      let parsedBody = null;
      try {
        parsedBody = res._getJSONData();
      } catch {
        parsedBody = res._getData();
      }
      resolve({ statusCode: res.statusCode, body: parsedBody });
    });

    app(req, res);
  });
};

async function verifyAll() {
  console.log('--- STARTING PHASE 1 VERIFICATION AUDIT ---');
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, desc: string) => {
    if (condition) {
      console.log(`[PASS] ${desc}`);
      passed++;
    } else {
      console.error(`[FAIL] ${desc}`);
      failed++;
    }
  };

  // 1. Environment & Config
  assert(config.port === 5000, 'Config: Port is configured to 5000');
  assert(config.apiPrefix === '/api/v1', 'Config: API prefix is /api/v1');

  // 2. Analytical Data Integrity & Baseline
  assert(OFFICIAL_EVIDENCE_SUMMARY.rawBallByBallDeliveries === 200999, 'Evidence: 200,999 raw ball-by-ball deliveries');
  assert(OFFICIAL_EVIDENCE_SUMMARY.usableMatches === 837, 'Evidence: 837 usable matches');
  assert(OFFICIAL_EVIDENCE_SUMMARY.analyzedDeliveries === 193988, 'Evidence: 193,988 analyzed deliveries');
  assert(OFFICIAL_EVIDENCE_SUMMARY.eligibleBattersCount === 239, 'Evidence: 239 eligible batters');
  assert(OFFICIAL_EVIDENCE_SUMMARY.eligibleBowlersCount === 195, 'Evidence: 195 eligible bowlers');
  assert(OFFICIAL_EVIDENCE_SUMMARY.reconciliationDifference === 338, 'Evidence: 338-delivery variance documented');

  // 3. Methodology & Scoring Weights
  assert(OFFICIAL_METHODOLOGY_CONFIG.batterScoringWeights.pressureStrikeRate === 0.40, 'Methodology: Batter Pressure Strike Rate weight 40%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.batterScoringWeights.strikeRateImprovement === 0.25, 'Methodology: Batter Strike Rate Improvement weight 25%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.batterScoringWeights.pressureAverage === 0.20, 'Methodology: Batter Pressure Average weight 20%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.batterScoringWeights.sampleReliability === 0.15, 'Methodology: Batter Sample Reliability weight 15%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.batterEligibilityCriteria.minPressureBalls === 60, 'Eligibility: Min 60 pressure balls for batters');
  assert(OFFICIAL_METHODOLOGY_CONFIG.batterEligibilityCriteria.minPressureMatches === 10, 'Eligibility: Min 10 pressure matches for batters');

  assert(OFFICIAL_METHODOLOGY_CONFIG.bowlerScoringWeights.pressureWicketRate === 0.60, 'Methodology: Bowler Pressure Wicket Rate weight 60%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.bowlerScoringWeights.pressureLegalBalls === 0.25, 'Methodology: Bowler Pressure Legal Balls weight 25%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.bowlerScoringWeights.pressureMatches === 0.15, 'Methodology: Bowler Pressure Matches weight 15%');
  assert(OFFICIAL_METHODOLOGY_CONFIG.bowlerEligibilityCriteria.minPressureLegalBalls === 120, 'Eligibility: Min 120 pressure legal balls for bowlers');
  assert(OFFICIAL_METHODOLOGY_CONFIG.bowlerEligibilityCriteria.minPressureMatches === 10, 'Eligibility: Min 10 pressure matches for bowlers');

  // 4. Player Rankings Integrity
  assert(OFFICIAL_TOP_10_BATTERS.length === 10, 'Rankings: 10 Batters present');
  assert(OFFICIAL_TOP_10_BATTERS[0].playerName === 'Shubman Gill', 'Rankings: Batter #1 is Shubman Gill');
  assert(OFFICIAL_TOP_10_BATTERS[1].playerName === 'Shashank Singh', 'Rankings: Batter #2 is Shashank Singh');
  assert(OFFICIAL_TOP_10_BATTERS[2].playerName === 'Heinrich Klaasen', 'Rankings: Batter #3 is Heinrich Klaasen');
  assert(OFFICIAL_TOP_10_BATTERS[9].playerName === 'Suryakumar Yadav', 'Rankings: Batter #10 is Suryakumar Yadav');

  assert(OFFICIAL_TOP_10_BOWLERS.length === 10, 'Rankings: 10 Bowlers present');
  assert(OFFICIAL_TOP_10_BOWLERS[0].playerName === 'Andre Russell', 'Rankings: Bowler #1 is Andre Russell');
  assert(OFFICIAL_TOP_10_BOWLERS[1].playerName === 'Arshdeep Singh', 'Rankings: Bowler #2 is Arshdeep Singh');
  assert(OFFICIAL_TOP_10_BOWLERS[2].playerName === 'Wanindu Hasaranga', 'Rankings: Bowler #3 is Wanindu Hasaranga');
  assert(OFFICIAL_TOP_10_BOWLERS[9].playerName === 'Mitchell Starc', 'Rankings: Bowler #10 is Mitchell Starc');

  // 5. Express App Route Handling
  const app = createApp();

  // Test /health
  const healthRes = await runMockRequest(app, 'GET', '/health');
  assert(healthRes.statusCode === 200, 'HTTP GET /health status 200');
  assert(healthRes.body?.data?.service === 'royal-scout-intelligence-backend', 'HTTP GET /health service name verified');
  assert(healthRes.body?.data?.status === 'UP', 'HTTP GET /health status UP');

  // Test /api/v1/methodology
  const methRes = await runMockRequest(app, 'GET', '/api/v1/methodology');
  assert(methRes.statusCode === 200, 'HTTP GET /api/v1/methodology status 200');
  assert(methRes.body?.data?.version === '2027.1.0', 'HTTP GET /api/v1/methodology version verified');

  // Test /api/v1/evidence
  const evidRes = await runMockRequest(app, 'GET', '/api/v1/evidence');
  assert(evidRes.statusCode === 200, 'HTTP GET /api/v1/evidence status 200');
  assert(evidRes.body?.data?.usableMatches === 837, 'HTTP GET /api/v1/evidence matches verified (837)');

  // Test /api/v1/rankings/batters/top10
  const batRankRes = await runMockRequest(app, 'GET', '/api/v1/rankings/batters/top10');
  assert(batRankRes.statusCode === 200, 'HTTP GET /api/v1/rankings/batters/top10 status 200');
  assert(batRankRes.body?.data?.[0]?.playerName === 'Shubman Gill', 'HTTP GET /api/v1/rankings/batters/top10 verified');

  // Test /api/v1/rankings/bowlers/top10
  const bowlRankRes = await runMockRequest(app, 'GET', '/api/v1/rankings/bowlers/top10');
  assert(bowlRankRes.statusCode === 200, 'HTTP GET /api/v1/rankings/bowlers/top10 status 200');
  assert(bowlRankRes.body?.data?.[0]?.playerName === 'Andre Russell', 'HTTP GET /api/v1/rankings/bowlers/top10 verified');

  // Test 404 handler
  const notFoundRes = await runMockRequest(app, 'GET', '/api/v1/non-existent');
  assert(notFoundRes.statusCode === 404, 'HTTP GET /api/v1/non-existent status 404');
  assert(notFoundRes.body?.error?.code === 'ROUTE_NOT_FOUND', 'HTTP 404 error code ROUTE_NOT_FOUND verified');

  console.log(`\n--- VERIFICATION AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

verifyAll().catch((err) => {
  console.error('Unexpected error in verification script:', err);
  process.exit(1);
});
