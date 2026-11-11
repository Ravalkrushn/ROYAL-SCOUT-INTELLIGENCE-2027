# Royal Scout Intelligence 2027 — Analytical Data Inventory

## 1. Inspection Overview & Status

- **Inspection Date**: November 2026
- **Inspector**: Agent 2 (Senior Backend Developer)
- **Status**: **Inspected & Documented from Available Colab Output Archives**
- **Inspection Sources**:
  - `ROYAL_SCOUT_FINAL/` & `ROYAL_SCOUT_FINAL.zip`
  - `ROYAL_SCOUT_PHASE_13/` & `ROYAL_SCOUT_PHASE_13.zip`
  - Workspace folders: `01_Research/`, `02_Data/`, `03_Notebooks/`, `04_Models/`, `05_Dashboard/`, `06_Reports/`, `07_References/`

### Direct Inspection Findings
The Colab analytical archive and unzipped directories (`ROYAL_SCOUT_FINAL/` and `ROYAL_SCOUT_PHASE_13/`) are available in the workspace. All original files remain strictly **read-only**. Below is the exhaustive audit of every verified file.

---

## 2. Actual Analytical Files Inventory

### 2.1 Final Top 10 Batters (`ROYAL_SCOUT_FINAL/Final_Top10_Batters.csv` & `ROYAL_SCOUT_PHASE_13/Final_Top10_Batters.csv`)
- **Actual File Name**: `Final_Top10_Batters.csv`
- **File Type**: CSV (`text/csv`)
- **Record Count**: 10 records (Top 10 Batters)
- **Duplicate Records**: 0
- **Missing Values**: 0
- **Available Columns & Inferred Data Types**:
  1. `rank` (Integer): Official rank (1 to 10)
  2. `striker_id` (Integer): Unique batter identifier (e.g. `6288` for Shubman Gill)
  3. `striker_name` (String): Player full name
  4. `pressure_group` (String): Always `Pressure` (denoting Medium + High pressure states)
  5. `runs` (Integer): Total runs scored under pressure
  6. `balls_pressure` (Integer): Deliveries faced under pressure (Threshold $\ge 60$)
  7. `dismissals` (Integer): Number of times dismissed under pressure
  8. `matches_pressure` (Integer): Matches played under pressure (Threshold $\ge 10$)
  9. `fours` (Integer): Fours scored under pressure
  10. `sixes` (Integer): Sixes scored under pressure
  11. `strike_rate_pressure` (Float): Pressure strike rate ($(\text{runs} / \text{balls}) \times 100$)
  12. `average_pressure` (Float): Pressure average ($\text{runs} / \text{dismissals}$)
  13. `strike_rate_normal` (Float): Strike rate under low pressure
  14. `average_normal` (Float): Average under low pressure
  15. `balls_normal` (Float): Balls faced under low pressure
  16. `matches_normal` (Float): Matches played under low pressure
  17. `sr_difference` (Float): Pressure SR minus Normal SR (SR improvement)
  18. `eligible` (Boolean): Eligibility flag (`True` for all top 10)
  19. `score_sr` (Float): Percentile score for Pressure Strike Rate (40% weight)
  20. `score_improvement` (Float): Percentile score for Strike Rate Improvement (25% weight)
  21. `score_average` (Float): Percentile score for Pressure Average (20% weight)
  22. `score_reliability` (Float): Percentile score for Sample Reliability (15% weight)
  23. `final_score` (Float): Weighted composite score (e.g. `91.01` for Shubman Gill)
- **Data Quality Observations**: Clean dataset with zero nulls. The 10 players strictly match the project rankings.

### 2.2 Final Top 10 Bowlers (`ROYAL_SCOUT_FINAL/Final_Top10_Bowlers.csv` & `ROYAL_SCOUT_PHASE_13/Final_Top10_Bowlers.csv`)
- **Actual File Name**: `Final_Top10_Bowlers.csv`
- **File Type**: CSV (`text/csv`)
- **Record Count**: 10 records (Top 10 Bowlers)
- **Duplicate Records**: 0
- **Missing Values**: 0
- **Available Columns & Inferred Data Types**:
  1. `rank` (Integer): Official rank (1 to 10)
  2. `bowler_id` (Integer): Unique bowler identifier (e.g. `1318` for Andre Russell)
  3. `bowler_name` (String): Player full name
  4. `pressure_group` (String): Always `Pressure`
  5. `runs` (Integer): Runs conceded under pressure
  6. `legal_balls_pressure` (Integer): Legal balls bowled under pressure (Threshold $\ge 120$)
  7. `wickets` (Integer): Wickets taken under pressure
  8. `matches_pressure` (Integer): Matches bowled under pressure (Threshold $\ge 10$)
  9. `wickets_per_6_balls` (Float): Wickets per 6 legal balls
  10. `candidate_economy_pressure` (Float): Pressure economy rate (**Provisional**)
  11. `candidate_economy_normal` (Float): Normal economy rate (**Provisional**)
  12. `legal_balls_normal` (Float): Legal balls bowled under low pressure
  13. `matches_normal` (Float): Matches bowled under low pressure
  14. `economy_improvement` (Float): Difference between normal and pressure economy
  15. `eligible` (Boolean): Eligibility flag (`True` for all top 10)
  16. `score_wicket_rate` (Float): Percentile score for Pressure Wicket Rate (60% weight)
  17. `score_balls` (Float): Percentile score for Pressure Legal Balls (25% weight)
  18. `score_matches` (Float): Percentile score for Pressure Matches (15% weight)
  19. `final_score` (Float): Weighted composite score (e.g. `88.37` for Andre Russell)
- **Data Quality Observations**: Clean dataset. Economy rate is marked provisional as documented in methodology.

### 2.3 Dataset Overview (`ROYAL_SCOUT_PHASE_13/Dataset_Overview.csv`)
- **Actual File Name**: `Dataset_Overview.csv`
- **File Type**: CSV
- **Record Count**: 7 rows
- **Available Columns**: `Metric` (String), `Value` (String/Integer)
- **Exact Values**:
  - `Selected Matches`: 837
  - `Selected Ball-by-Ball Records`: 193,988
  - `Eligible Batters`: 239
  - `Eligible Bowlers`: 195
  - `Final Top 10 Batters`: 10
  - `Final Top 10 Bowlers`: 10
  - `Pressure Levels`: "Low, Medium, High"

### 2.4 Pressure Distribution (`ROYAL_SCOUT_PHASE_13/Pressure_Distribution.csv`)
- **Actual File Name**: `Pressure_Distribution.csv`
- **File Type**: CSV
- **Record Count**: 6 rows
- **Available Columns**: `innings` (Integer), `pressure_level` (String), `deliveries` (Integer)
- **Values Breakdown**:
  | Innings | Pressure Level | Deliveries |
  |---|---|---|
  | 1 | Low | 47,606 |
  | 1 | Medium | 36,795 |
  | 1 | High | 17,653 |
  | 2 | Low | 45,740 |
  | 2 | Medium | 29,751 |
  | 2 | High | 16,105 |
  | **Sum** | | **193,650** |
- **Data Quality Observations**: Sums to 193,650 deliveries. Exactly 338 deliveries variance compared to the 193,988 analyzed deliveries. This confirms the documented 338 reconciliation difference.

### 2.5 Scoring Weights (`ROYAL_SCOUT_PHASE_13/Scoring_Weights.csv`)
- **Actual File Name**: `Scoring_Weights.csv`
- **Record Count**: 7 rows
- **Columns**: `Role` (String), `Metric` (String), `Weight` (Integer)
- **Values**:
  - Batter, Pressure Strike Rate: 40%
  - Batter, Strike Rate Improvement: 25%
  - Batter, Pressure Average: 20%
  - Batter, Sample Reliability: 15%
  - Bowler, Pressure Wicket Rate: 60%
  - Bowler, Pressure Legal Balls: 25%
  - Bowler, Pressure Matches: 15%

### 2.6 Methodology (`ROYAL_SCOUT_PHASE_13/Methodology.csv`)
- **Actual File Name**: `Methodology.csv`
- **Record Count**: 9 rows
- **Columns**: `Component` (String), `Method` (String)
- **Details**:
  - Batter Pressure Strike Rate: `Runs / Balls × 100`
  - Batter Strike Rate Improvement: `Pressure SR - Normal SR`
  - Batter Pressure Average: `Runs / Dismissals`
  - Batter Sample Reliability: `60% pressure balls + 40% pressure matches percentile`
  - Bowler Pressure Wicket Rate: `Wickets per 6 legal balls`
  - Bowler Sample Reliability: `Pressure balls and matches percentile`
  - Pressure Group: `Medium + High = Pressure; Low = Normal`
  - Batter Eligibility: `Minimum 60 pressure balls and 10 matches`
  - Bowler Eligibility: `Minimum 120 pressure legal balls and 10 matches`

### 2.7 Limitations and Assumptions (`ROYAL_SCOUT_PHASE_13/Limitations_Assumptions.csv`)
- **Actual File Name**: `Limitations_Assumptions.csv`
- **Record Count**: 9 rows
- **Columns**: `Area` (String), `Assumption_or_Limitation` (String)
- **Summary**:
  1. Competition Scope: Selected IPL and T20I competitions from 2022 onward.
  2. Scheduled Overs: 120 scheduled balls default; shortened innings without reliable revised overs may be imperfectly represented.
  3. D/L Matches: Excluded from chase pressure calculations if lacking reliable revised targets.
  4. Bowling Economy: Provisional due to unresolved extras.
  5. Extras: `extras_2_runs` interpretation unresolved; not added to official totals.
  6. Wicket Classification: Bowler-credited dismissal types only.
  7. Pressure Thresholds: Heuristics: Low < 35, Medium 35–65, High $\ge 65$.
  8. Composite Score: Percentile-based scoring choices.
  9. Format Comparison: Combined IPL and T20I performances.

### 2.8 Excel Workbooks
- **Actual File Names**:
  - `ROYAL_SCOUT_FINAL/Royal_Scout_Final_Rankings.xlsx`
  - `ROYAL_SCOUT_PHASE_13/Royal_Scout_Methodology_and_Evidence.xlsx`
- **File Type**: Microsoft Excel OpenXML (`.xlsx`)
- **Contents**: Formatted multi-tab analytical summaries corresponding to the CSV datasets above.

---

## 3. Data Integrity Summary
- All 10 Batters and 10 Bowlers verified with exact composite scores and player IDs.
- Total analyzed deliveries: 193,988.
- 338-delivery variance strictly accounted for (193,988 analyzed vs 193,650 categorized in pressure distribution).
- Datasets are clean, structured, and ready for ingestion into MongoDB collections in Phase 2.
