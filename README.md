You are a Senior Technical Documentation Architect.

PROJECT:
ROYAL SCOUT INTELLIGENCE 2027

TASK:
Create the actual project documentation inside the EXISTING
root-level README.md.

IMPORTANT:
The README.md file already exists.

Do not create another README file.
Replace the existing prompt/instruction text with complete,
professional project documentation.

EXISTING PROJECT STRUCTURE:

ROYAL_SCOUT_INTELLIGENCE_2027/
│
├── 01_Research/
│   ├── GitHub_References/
│   ├── Previous_Participants/
│   ├── RR_Analytics/
│   └── Season_1/
│
├── 02_Data/
│   ├── External/
│   ├── Processed/
│   └── Raw/
│
├── 03_Notebooks/
├── 04_Models/
├── 05_Dashboard/
├── 06_Reports/
├── 07_References/
└── README.md

PRESERVE THIS STRUCTURE.

PROJECT OVERVIEW:

Royal Scout Intelligence 2027 is an interactive cricket scouting
and player intelligence platform developed for the SupeRR Selector
Season 2 challenge.

The objective is to identify reliable batters and bowlers under
pressure using IPL and T20I ball-by-ball data from 2022–2026.

EXISTING ANALYTICAL FOUNDATION:

The analytical work has been completed using Python and Google Colab.

It includes:

- Data preparation and competition filtering.
- Pre-delivery match-state calculation.
- Pressure Intelligence Model.
- Batter performance analysis.
- Bowler performance analysis.
- Player eligibility validation.
- Weighted composite scoring.
- Final Top 10 player rankings.
- Evidence and methodology documentation.

PROJECT DATA:

- Raw ball-by-ball records: 200,999.
- Selected matches with usable ball-by-ball data: 837.
- Analysed deliveries: 193,988.
- Eligible batters: 239.
- Eligible bowlers: 195.

BATTER SCORING:

- Pressure Strike Rate: 40%.
- Strike Rate Improvement: 25%.
- Pressure Average: 20%.
- Sample Reliability: 15%.

Batter eligibility:
- At least 60 pressure balls.
- At least 10 pressure matches.

BOWLER SCORING:

- Pressure Wicket Rate: 60%.
- Pressure Legal Balls: 25%.
- Pressure Matches: 15%.

Bowler eligibility:
- At least 120 pressure legal balls.
- At least 10 pressure matches.

PRESSURE MODEL:

First innings:
- Stage Pressure: 55%.
- Wicket Pressure: 45%.

Second innings:
- Stage Pressure: 35%.
- Wicket Pressure: 25%.
- RRR Pressure: 40%.

Pressure categories:
- Low
- Medium
- High

FINAL BATTER RANKINGS:

1. Shubman Gill
2. Shashank Singh
3. Heinrich Klaasen
4. Ishan Kishan
5. Glenn Phillips
6. Nitish Rana
7. Rinku Singh
8. Nitish Reddy
9. Shai Hope
10. Suryakumar Yadav

FINAL BOWLER RANKINGS:

1. Andre Russell
2. Arshdeep Singh
3. Wanindu Hasaranga
4. Haris Rauf
5. Shaheen Afridi
6. Mohammad Nawaz
7. Varun Chakravarthy
8. Khaleel Ahmed
9. Matheesha Pathirana
10. Mitchell Starc

APPLICATION OBJECTIVE:

Build a complete interactive scouting platform containing:

1. Landing Page
2. Executive Dashboard
3. Batting Intelligence
4. Bowling Intelligence
5. Player Explorer
6. Player Comparison
7. Individual Player Profile
8. Methodology & Evidence

TECHNOLOGY DIRECTION:

Frontend:
Next.js, TypeScript, Tailwind CSS, Recharts.

Backend:
Node.js, Express.js, TypeScript, MongoDB.

Analytics:
Python, Google Colab, existing CSV and Excel outputs.

DESIGN IDENTITY:

Premium Rajasthan Royals-inspired cricket analytics platform.

Pink: #E83E8C
Light Blue: #55B7E8
Dark Navy: #10172A
White: #FFFFFF

TWO-AGENT ARCHITECTURE:

Agent 1:
Frontend Development only.
Owns /frontend/**.

Agent 2:
Backend Development only.
Owns /backend/**.

Neither agent may edit the other agent's files.

Existing research, data, notebooks, models, dashboards and reports
must remain separate from application source code.

DEVELOPMENT PHASES:

Agent 1:
Phase 1 — Frontend Foundation.
Phase 2 — Complete Frontend Application.

Agent 2:
Phase 1 — Backend Foundation and Data Architecture.
Phase 2 — APIs, Data Integration and Backend Completion.

Phase 2 must continue from Phase 1 without restarting or
overwriting completed work.

DATA INTEGRITY:

Do not invent statistics, rankings, dataset fields or formulas.

Some bowling economy and extras calculations remain provisional.

The pressure-distribution evidence has a 338-delivery
reconciliation difference that must remain documented until
verified.

DOCUMENTATION SECTIONS:

1. Project Overview
2. Problem Statement
3. Project Objectives
4. Existing Analytical Foundation
5. Dataset Overview
6. Pressure Intelligence Methodology
7. Batter Scoring Methodology
8. Bowler Scoring Methodology
9. Final Player Rankings
10. Application Features
11. Technology Stack
12. Project Folder Structure
13. System Architecture
14. Agent Responsibilities
15. File Ownership Rules
16. Development Roadmap
17. Data Integrity and Limitations
18. Installation and Execution
19. Future Scope

IMPORTANT RULES:

- Inspect the existing project structure.
- Do not claim that planned application features are implemented.
- Do not invent files that do not exist.
- Do not modify any existing folders.
- Do not create unnecessary files.
- Do not modify original analytical data.
- Keep README professional and technically accurate.

YOUR TASK:
Update ONLY the existing root README.md with complete
project documentation.

Do not modify source code or create application files.