# Frontend Phase 1 Documentation — Royal Scout Intelligence 2027

## 1. Phase 1 Overview
Phase 1 established the foundation for the **Royal Scout Intelligence 2027** platform (Rajasthan Royals SupeRR Selector Season 2 Challenge). It configured the Next.js App Router application shell, TypeScript types, Tailwind CSS design system with Rajasthan Royals brand tokens, and core scaffolding for all modules.

## 2. Technology Stack & Dependencies
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with Rajasthan Royals Design Tokens
- **Visualizations**: Recharts 2.15
- **Iconography**: Lucide React
- **React**: React 19

## 3. Brand Identity & Design System Tokens
- **RR Pink**: `#E83E8C` (Hover: `#D62575`)
- **RR Blue**: `#55B7E8` (Hover: `#3AA5DE`)
- **RR Dark Navy**: `#10172A`
- **Background / Surfaces**: `#0B0F19`, `#151E32`, `#1E2E4A`
- **Text**: `#FFFFFF`, `#F8FAFC`, `#94A3B8`
- **Gold Accent**: `#F59E0B`
- **Emerald Accent**: `#10B981`

## 4. Frontend Architecture & Folder Structure
```
frontend/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── batting/page.tsx
│   │   ├── bowling/page.tsx
│   │   ├── players/page.tsx
│   │   ├── comparison/page.tsx
│   │   ├── player/[id]/page.tsx
│   │   └── methodology/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── AppShell.tsx
│   │   └── common/
│   │       ├── KpiCard.tsx
│   │       ├── PlayerCard.tsx
│   │       ├── RankingTable.tsx
│   │       ├── ChartContainer.tsx
│   │       ├── SearchInput.tsx
│   │       ├── DropdownFilter.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── LoadingState.tsx
│   │       ├── EmptyState.tsx
│   │       └── ErrorState.tsx
│   ├── data/
│   │   └── official-analytics.ts
│   ├── lib/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── package.json
└── tsconfig.json
```

## 5. Phase 1 Verification & Transition
- Scaffolding initialized and validated.
- Routing paths prepared for Phase 2 API integration.
- Design tokens and typography configured without external font fetching dependencies.

