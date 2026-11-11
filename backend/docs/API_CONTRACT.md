# Royal Scout Intelligence 2027 — API Contract (v2.0.0 - Fully Implemented)

> **Notice to Agent 1 (Frontend Developer)**:
> This document defines the official, fully implemented REST API specification for all frontend communication with the backend service. Agent 1 reads this contract to build client-side data hooks and pages. Agent 1 must never edit this file.

---

## Global Standards

- **Base URL**: `http://localhost:5000/api/v1` (Root health also accessible at `http://localhost:5000/health`)
- **Data Exchange Format**: `application/json`
- **CORS Allowed Origins**: `http://localhost:3000`, `http://127.0.0.1:3000`
- **Standard Envelope**:
```json
{
  "success": true,
  "status": 200,
  "data": {},
  "meta": {
    "timestamp": "2026-11-11T21:00:00.000Z",
    "version": "1.0.0",
    "dataSource": "Official Colab Pressure Intelligence Final Analytics"
  }
}
```
- **Standard Error Envelope**:
```json
{
  "success": false,
  "status": 400,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable explanation",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-11-11T21:00:00.000Z"
  }
}
```

---

## 1. System & Health Check

### 1.1 Service Health
- **HTTP Method**: `GET`
- **Endpoint**: `/health` (also `/api/v1/health`)
- **Status**: Implemented & Operational
- **Query Parameters**: None
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "message": "Royal Scout Intelligence 2027 Backend Service is operational",
  "data": {
    "status": "UP",
    "service": "royal-scout-intelligence-backend",
    "version": "1.0.0",
    "phase": "Phase 2 - Fully Integrated Analytical Backend",
    "environment": "development",
    "uptimeSeconds": 45,
    "database": {
      "status": "connected",
      "isConnected": true,
      "host": "localhost",
      "name": "royal_scout_intelligence_2027"
    },
    "analyticalDataBaseline": {
      "rawBallByBallDeliveries": 200999,
      "usableMatches": 837,
      "analyzedDeliveries": 193988,
      "eligibleBatters": 239,
      "eligibleBowlers": 195,
      "reconciliationDifference": 338,
      "dataIngestionStatus": "Colab analytical outputs ingested & synchronized"
    }
  }
}
```

---

## 2. Executive Dashboard

### 2.1 Get Executive Dashboard Summary
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/dashboard/summary`
- **Status**: Implemented & Operational
- **Query Parameters**: None
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "data": {
    "metrics": {
      "rawDeliveries": 200999,
      "usableMatches": 837,
      "analyzedDeliveries": 193988,
      "eligibleBatters": 239,
      "eligibleBowlers": 195,
      "reconciliationDifference": 338
    },
    "topRanked": {
      "topBatter": {
        "rank": 1,
        "playerId": "6288",
        "playerName": "Shubman Gill",
        "role": "BATTER",
        "compositeScore": 91.01,
        "pressureStrikeRate": 184.44,
        "pressureAverage": 41.5
      },
      "topBowler": {
        "rank": 1,
        "playerId": "1318",
        "playerName": "Andre Russell",
        "role": "ALL_ROUNDER",
        "compositeScore": 88.37,
        "pressureWickets": 46,
        "wicketsPerSixBalls": 0.525,
        "provisionalEconomy": 10.60
      }
    },
    "pressureDistribution": {
      "categorizedTotalDeliveries": 193650,
      "low": { "deliveries": 93346, "percentage": 48.2 },
      "medium": { "deliveries": 66546, "percentage": 34.4 },
      "high": { "deliveries": 33758, "percentage": 17.4 },
      "inningsBreakdown": [
        { "innings": 1, "pressure_level": "Low", "deliveries": 47606 },
        { "innings": 1, "pressure_level": "Medium", "deliveries": 36795 },
        { "innings": 1, "pressure_level": "High", "deliveries": 17653 },
        { "innings": 2, "pressure_level": "Low", "deliveries": 45740 },
        { "innings": 2, "pressure_level": "Medium", "deliveries": 29751 },
        { "innings": 2, "pressure_level": "High", "deliveries": 16105 }
      ]
    },
    "dataIntegrityNotice": {
      "description": "Analysis includes 338 documented delivery reconciliation variance between Colab state assignment and ball-by-ball sum.",
      "reconciliationDifferenceDeliveries": 338,
      "bowlingEconomyStatus": "Provisional - bowling economy pending complete resolution of extras calculations"
    }
  }
}
```

---

## 3. Player Rankings

### 3.1 Top 10 Batters
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/rankings/batters/top10`
- **Status**: Implemented & Operational
- **Query Parameters**: None
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "data": [
    {
      "rank": 1,
      "playerId": "6288",
      "playerName": "Shubman Gill",
      "role": "BATTER",
      "compositeScore": 91.01,
      "primaryMetric": "Pressure Strike Rate & Composite Score",
      "primaryMetricValue": 184.44,
      "sampleBalls": 630,
      "sampleMatches": 38,
      "runs": 1162,
      "strikeRatePressure": 184.44,
      "averagePressure": 41.5,
      "strikeRateNormal": 138.78,
      "strikeRateDifference": 45.67,
      "fours": 78,
      "sixes": 70
    },
    { "rank": 2, "playerId": "2756", "playerName": "Shashank Singh", "compositeScore": 90.59 },
    { "rank": 3, "playerId": "4260", "playerName": "Heinrich Klaasen", "compositeScore": 88.75 },
    { "rank": 4, "playerId": "4117", "playerName": "Ishan Kishan", "compositeScore": 88.37 },
    { "rank": 5, "playerId": "4853", "playerName": "Glenn Phillips", "compositeScore": 84.92 },
    { "rank": 6, "playerId": "4246", "playerName": "Nitish Rana", "compositeScore": 84.76 },
    { "rank": 7, "playerId": "4708", "playerName": "Rinku Singh", "compositeScore": 84.57 },
    { "rank": 8, "playerId": "8221", "playerName": "Nitish Reddy", "compositeScore": 84.18 },
    { "rank": 9, "playerId": "4369", "playerName": "Shai Hope", "compositeScore": 84.04 },
    { "rank": 10, "playerId": "1699", "playerName": "Suryakumar Yadav", "compositeScore": 83.68 }
  ]
}
```

### 3.2 Top 10 Bowlers
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/rankings/bowlers/top10`
- **Status**: Implemented & Operational
- **Query Parameters**: None
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "data": [
    {
      "rank": 1,
      "playerId": "1318",
      "playerName": "Andre Russell",
      "role": "ALL_ROUNDER",
      "compositeScore": 88.37,
      "primaryMetric": "Pressure Wicket Rate & Composite Score",
      "primaryMetricValue": 0.525,
      "sampleBalls": 526,
      "sampleMatches": 48,
      "runs": 929,
      "wickets": 46,
      "wicketsPerSixBalls": 0.525,
      "candidateEconomyPressure": 10.60,
      "candidateEconomyNormal": 10.55
    },
    { "rank": 2, "playerId": "6464", "playerName": "Arshdeep Singh", "compositeScore": 87.26 },
    { "rank": 3, "playerId": "4900", "playerName": "Wanindu Hasaranga", "compositeScore": 85.94 },
    { "rank": 4, "playerId": "7364", "playerName": "Haris Rauf", "compositeScore": 84.77 },
    { "rank": 5, "playerId": "6355", "playerName": "Shaheen Afridi", "compositeScore": 84.56 },
    { "rank": 6, "playerId": "2490", "playerName": "Mohammad Nawaz", "compositeScore": 83.67 },
    { "rank": 7, "playerId": "6256", "playerName": "Varun Chakravarthy", "compositeScore": 82.90 },
    { "rank": 8, "playerId": "4816", "playerName": "Khaleel Ahmed", "compositeScore": 82.09 },
    { "rank": 9, "playerId": "8661", "playerName": "Matheesha Pathirana", "compositeScore": 81.78 },
    { "rank": 10, "playerId": "829", "playerName": "Mitchell Starc", "compositeScore": 80.83 }
  ]
}
```

---

## 4. Player Explorer & Profiles

### 4.1 Search Players
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/players`
- **Status**: Implemented & Operational
- **Query Parameters**:
  - `q` (string, optional): Search by player name or ID
  - `role` (enum, optional): `ALL` | `BATTER` | `BOWLER` | `ALL_ROUNDER` | `WICKET_KEEPER_BATTER`
  - `eligibleOnly` (boolean, optional): `true` | `false`
  - `page` (number, optional, default: `1`)
  - `limit` (number, optional, default: `20`)
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "data": {
    "players": [
      {
        "playerId": "6288",
        "name": "Shubman Gill",
        "displayName": "Shubman Gill",
        "country": "India",
        "primaryRole": "BATTER",
        "battingStyle": "RIGHT_HAND",
        "bowlingStyle": "UNKNOWN",
        "isEligibleBatter": true,
        "isEligibleBowler": false,
        "rank": 1,
        "compositeScore": 91.01
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalRecords": 20,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

### 4.2 Individual Player Profile
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/players/:id`
- **Status**: Implemented & Operational
- **Parameters**: `id` (e.g. `6288` or `1318` or player name)
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "data": {
    "player": {
      "playerId": "6288",
      "name": "Shubman Gill",
      "country": "India",
      "primaryRole": "BATTER",
      "rank": 1,
      "compositeScore": 91.01
    },
    "battingStats": {
      "rank": 1,
      "isEligible": true,
      "compositeScore": 91.01,
      "runs": 1162,
      "ballsPressure": 630,
      "dismissals": 28,
      "matchesPressure": 38,
      "strikeRatePressure": 184.44,
      "averagePressure": 41.5,
      "strikeRateNormal": 138.78,
      "strikeRateImprovement": 45.67,
      "fours": 78,
      "sixes": 70
    },
    "bowlingStats": null
  }
}
```

---

## 5. Player Comparison Engine

### 5.1 Compare Two Players Head-to-Head
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/players/compare`
- **Status**: Implemented & Operational
- **Query Parameters**:
  - `player1` (string, required): e.g. `6288` (Shubman Gill)
  - `player2` (string, required): e.g. `2756` (Shashank Singh)
  - `metricType` (string, optional): `BATTER` | `BOWLER` | `AUTO`
- **Response Structure (200 OK)**:
```json
{
  "success": true,
  "status": 200,
  "data": {
    "comparisonType": "BATTER",
    "player1": {
      "player": { "playerId": "6288", "name": "Shubman Gill" },
      "battingStats": { "compositeScore": 91.01, "strikeRatePressure": 184.44, "averagePressure": 41.5 }
    },
    "player2": {
      "player": { "playerId": "2756", "name": "Shashank Singh" },
      "battingStats": { "compositeScore": 90.59, "strikeRatePressure": 168.99, "averagePressure": 42.5 }
    },
    "headToHeadEdge": {
      "higherCompositeScore": "Shubman Gill",
      "higherPressureStrikeRate": "Shubman Gill",
      "higherPressureAverage": "Shashank Singh",
      "greaterStrikeRateImprovement": "Shashank Singh",
      "largerPressureSampleSize": "Shubman Gill"
    }
  }
}
```

---

## 6. Batting & Bowling Stats Catalogs

### 6.1 Batting Statistics
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/stats/batters`
- **Status**: Implemented & Operational
- **Query Parameters**: `page`, `limit`, `sortBy`, `order`
- **Response Structure (200 OK)**: Returns list of batter records, pagination metadata.

### 6.2 Bowling Statistics
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/stats/bowlers`
- **Status**: Implemented & Operational
- **Query Parameters**: `page`, `limit`, `sortBy`, `order`
- **Response Structure (200 OK)**: Returns list of bowler records, pagination, and `provisionalEconomyNotice`.

---

## 7. Methodology & Evidence

### 7.1 Methodology
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/methodology`
- **Status**: Implemented & Operational
- **Response Structure (200 OK)**: Full scoring weights (40/25/20/15 for batters, 60/25/15 for bowlers), eligibility limits (60/10 for batters, 120/10 for bowlers), heuristics, and limitations.

### 7.2 Evidence & Reconciliation
- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/evidence`
- **Status**: Implemented & Operational
- **Response Structure (200 OK)**: Raw delivery count (200,999), 837 usable matches, 193,988 analyzed deliveries, 193,650 pressure distribution deliveries, and 338-delivery variance.
