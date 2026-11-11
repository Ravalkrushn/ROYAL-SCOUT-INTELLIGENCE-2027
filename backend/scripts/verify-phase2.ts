import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import { createApp } from '../src/app.js';
import { DataImportService } from '../src/services/dataImportService.js';
import { OFFICIAL_EVIDENCE_SUMMARY, OFFICIAL_METHODOLOGY_CONFIG } from '../src/data/constants.js';
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

async function verifyPhase2() {
  console.log('--- STARTING PHASE 2 END-TO-END VERIFICATION AUDIT ---');
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

  // 1. Data Import Pipeline Execution
  const importSummary = await DataImportService.runImport();
  assert(importSummary.status === 'SUCCESS', 'Import Pipeline: Executed with status SUCCESS');
  assert(importSummary.recordsImported.batters === 10, 'Import Pipeline: 10 Top Batters imported');
  assert(importSummary.recordsImported.bowlers === 10, 'Import Pipeline: 10 Top Bowlers imported');
  assert(importSummary.recordsImported.playerProfiles >= 20, 'Import Pipeline: 20 Player profiles imported');
  assert(importSummary.sourceFilesInspected.length > 0, 'Import Pipeline: Source workbooks inspected');

  const app = createApp();

  // 2. Health Endpoint
  const healthRes = await runMockRequest(app, 'GET', '/health');
  assert(healthRes.statusCode === 200, 'GET /health status 200');
  assert(healthRes.body?.data?.service === 'royal-scout-intelligence-backend', 'GET /health service name verified');

  // 3. Executive Dashboard API
  const dashRes = await runMockRequest(app, 'GET', '/api/v1/dashboard/summary');
  assert(dashRes.statusCode === 200, 'GET /api/v1/dashboard/summary status 200');
  assert(dashRes.body?.data?.metrics?.rawDeliveries === 200999, 'Dashboard: Raw deliveries 200,999');
  assert(dashRes.body?.data?.metrics?.usableMatches === 837, 'Dashboard: Usable matches 837');
  assert(dashRes.body?.data?.metrics?.analyzedDeliveries === 193988, 'Dashboard: Analyzed deliveries 193,988');
  assert(dashRes.body?.data?.metrics?.eligibleBatters === 239, 'Dashboard: Eligible batters 239');
  assert(dashRes.body?.data?.metrics?.eligibleBowlers === 195, 'Dashboard: Eligible bowlers 195');
  assert(dashRes.body?.data?.metrics?.reconciliationDifference === 338, 'Dashboard: Reconciliation difference 338');
  assert(dashRes.body?.data?.topRanked?.topBatter?.playerName === 'Shubman Gill', 'Dashboard: Top batter is Shubman Gill');
  assert(dashRes.body?.data?.topRanked?.topBowler?.playerName === 'Andre Russell', 'Dashboard: Top bowler is Andre Russell');
  assert(dashRes.body?.data?.pressureDistribution?.categorizedTotalDeliveries === 193650, 'Dashboard: Categorized deliveries 193,650');

  // 4. Top 10 Batters API
  const batRankRes = await runMockRequest(app, 'GET', '/api/v1/rankings/batters/top10');
  assert(batRankRes.statusCode === 200, 'GET /api/v1/rankings/batters/top10 status 200');
  assert(batRankRes.body?.data?.length === 10, 'Rankings: 10 batters returned');
  assert(batRankRes.body?.data[0]?.playerName === 'Shubman Gill', 'Batters Rank 1: Shubman Gill');
  assert(batRankRes.body?.data[0]?.compositeScore === 91.01, 'Batters Rank 1: Composite score 91.01');
  assert(batRankRes.body?.data[0]?.strikeRatePressure === 184.44, 'Batters Rank 1: Pressure SR 184.44');
  assert(batRankRes.body?.data[1]?.playerName === 'Shashank Singh', 'Batters Rank 2: Shashank Singh');
  assert(batRankRes.body?.data[1]?.compositeScore === 90.59, 'Batters Rank 2: Composite score 90.59');
  assert(batRankRes.body?.data[2]?.playerName === 'Heinrich Klaasen', 'Batters Rank 3: Heinrich Klaasen');
  assert(batRankRes.body?.data[9]?.playerName === 'Suryakumar Yadav', 'Batters Rank 10: Suryakumar Yadav');
  assert(batRankRes.body?.data[9]?.compositeScore === 83.68, 'Batters Rank 10: Composite score 83.68');

  // 5. Top 10 Bowlers API
  const bowlRankRes = await runMockRequest(app, 'GET', '/api/v1/rankings/bowlers/top10');
  assert(bowlRankRes.statusCode === 200, 'GET /api/v1/rankings/bowlers/top10 status 200');
  assert(bowlRankRes.body?.data?.length === 10, 'Rankings: 10 bowlers returned');
  assert(bowlRankRes.body?.data[0]?.playerName === 'Andre Russell', 'Bowlers Rank 1: Andre Russell');
  assert(bowlRankRes.body?.data[0]?.compositeScore === 88.37, 'Bowlers Rank 1: Composite score 88.37');
  assert(bowlRankRes.body?.data[0]?.wicketsPerSixBalls === 0.525, 'Bowlers Rank 1: Wickets per 6 balls 0.525');
  assert(bowlRankRes.body?.data[1]?.playerName === 'Arshdeep Singh', 'Bowlers Rank 2: Arshdeep Singh');
  assert(bowlRankRes.body?.data[1]?.compositeScore === 87.26, 'Bowlers Rank 2: Composite score 87.26');
  assert(bowlRankRes.body?.data[2]?.playerName === 'Wanindu Hasaranga', 'Bowlers Rank 3: Wanindu Hasaranga');
  assert(bowlRankRes.body?.data[9]?.playerName === 'Mitchell Starc', 'Bowlers Rank 10: Mitchell Starc');
  assert(bowlRankRes.body?.data[9]?.compositeScore === 80.83, 'Bowlers Rank 10: Composite score 80.83');

  // 6. Player Search & Filtering API
  const searchRes = await runMockRequest(app, 'GET', '/api/v1/players?q=gill');
  assert(searchRes.statusCode === 200, 'GET /api/v1/players?q=gill status 200');
  assert(searchRes.body?.data?.players?.length >= 1, 'Player search found at least 1 record');
  assert(searchRes.body?.data?.players[0]?.name === 'Shubman Gill', 'Player search correctly matched Shubman Gill');

  const roleFilterRes = await runMockRequest(app, 'GET', '/api/v1/players?role=BATTER');
  assert(roleFilterRes.statusCode === 200, 'GET /api/v1/players?role=BATTER status 200');
  assert(roleFilterRes.body?.data?.players?.every((p: any) => p.primaryRole === 'BATTER'), 'Role filter strictly matches BATTER');

  // 7. Individual Player Profile API
  const profileRes = await runMockRequest(app, 'GET', '/api/v1/players/6288');
  assert(profileRes.statusCode === 200, 'GET /api/v1/players/6288 status 200');
  assert(profileRes.body?.data?.player?.name === 'Shubman Gill', 'Profile: Player name Shubman Gill');
  assert(profileRes.body?.data?.battingStats?.compositeScore === 91.01, 'Profile: Batting composite score 91.01');
  assert(profileRes.body?.data?.battingStats?.runs === 1162, 'Profile: Pressure runs 1162');
  assert(profileRes.body?.data?.battingStats?.ballsPressure === 630, 'Profile: Pressure balls 630');

  const bowlerProfileRes = await runMockRequest(app, 'GET', '/api/v1/players/1318');
  assert(bowlerProfileRes.statusCode === 200, 'GET /api/v1/players/1318 status 200');
  assert(bowlerProfileRes.body?.data?.player?.name === 'Andre Russell', 'Profile: Player name Andre Russell');
  assert(bowlerProfileRes.body?.data?.bowlingStats?.wickets === 46, 'Profile: Pressure wickets 46');
  assert(bowlerProfileRes.body?.data?.bowlingStats?.candidateEconomyPressure === 10.60, 'Profile: Provisional economy 10.60');

  // 8. Player Comparison API
  const compRes = await runMockRequest(app, 'GET', '/api/v1/players/compare?player1=6288&player2=2756');
  assert(compRes.statusCode === 200, 'GET /api/v1/players/compare status 200');
  assert(compRes.body?.data?.comparisonType === 'BATTER', 'Comparison type detected as BATTER');
  assert(compRes.body?.data?.player1?.player?.name === 'Shubman Gill', 'Compare: Player 1 Shubman Gill');
  assert(compRes.body?.data?.player2?.player?.name === 'Shashank Singh', 'Compare: Player 2 Shashank Singh');
  assert(compRes.body?.data?.headToHeadEdge?.higherCompositeScore === 'Shubman Gill', 'Compare: Higher composite score Shubman Gill');
  assert(compRes.body?.data?.headToHeadEdge?.greaterStrikeRateImprovement === 'Shashank Singh', 'Compare: Greater SR improvement Shashank Singh (+72.49)');

  // 9. Batting & Bowling Stats Catalogs
  const batStatsRes = await runMockRequest(app, 'GET', '/api/v1/stats/batters');
  assert(batStatsRes.statusCode === 200, 'GET /api/v1/stats/batters status 200');
  assert(batStatsRes.body?.data?.batters?.length === 10, 'Stats: 10 batters cataloged');

  const bowlStatsRes = await runMockRequest(app, 'GET', '/api/v1/stats/bowlers');
  assert(bowlStatsRes.statusCode === 200, 'GET /api/v1/stats/bowlers status 200');
  assert(bowlStatsRes.body?.data?.bowlers?.length === 10, 'Stats: 10 bowlers cataloged');
  assert(bowlStatsRes.body?.data?.provisionalEconomyNotice.includes('provisional'), 'Stats: Provisional economy notice present');

  // 10. Methodology & Evidence APIs
  const methRes = await runMockRequest(app, 'GET', '/api/v1/methodology');
  assert(methRes.statusCode === 200, 'GET /api/v1/methodology status 200');
  assert(methRes.body?.data?.config?.version === '2027.1.0', 'Methodology version verified');

  const evidRes = await runMockRequest(app, 'GET', '/api/v1/evidence');
  assert(evidRes.statusCode === 200, 'GET /api/v1/evidence status 200');
  assert(evidRes.body?.data?.summary?.usableMatches === 837, 'Evidence: Usable matches 837');
  assert(evidRes.body?.data?.reconciliationDetails?.differenceDeliveries === 338, 'Evidence: 338-delivery variance accounted for');

  // 11. Error Handling & 404
  const unknownPlayerRes = await runMockRequest(app, 'GET', '/api/v1/players/999999');
  assert(unknownPlayerRes.statusCode === 404, 'GET /api/v1/players/999999 returns 404');
  assert(unknownPlayerRes.body?.error?.code === 'PLAYER_NOT_FOUND', '404 error code PLAYER_NOT_FOUND verified');

  const unknownRouteRes = await runMockRequest(app, 'GET', '/api/v1/unknown');
  assert(unknownRouteRes.statusCode === 404, 'GET /api/v1/unknown returns 404');
  assert(unknownRouteRes.body?.error?.code === 'ROUTE_NOT_FOUND', '404 error code ROUTE_NOT_FOUND verified');

  console.log(`\n--- PHASE 2 VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

verifyPhase2().catch((err) => {
  console.error('Unexpected error in Phase 2 verification script:', err);
  process.exit(1);
});
