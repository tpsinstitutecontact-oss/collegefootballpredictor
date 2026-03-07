# CFBPredictor Rankings Component

Drop-in Next.js component for the CFBPredictor.com power rankings table.

## Setup

### 1. Copy the folder into your project
```
your-next-app/
  components/
    cfbpredictor-rankings/   ← paste this whole folder here
```

### 2. Import and use
```tsx
// app/rankings/page.tsx  (or pages/rankings.tsx)
import PowerRankings from '@/components/cfbpredictor-rankings/components/PowerRankings';

export default function RankingsPage() {
  return (
    <main>
      <PowerRankings />
    </main>
  );
}
```

### 3. Import the CSS globally (if not already scoped)
In your `app/layout.tsx` or `pages/_app.tsx`:
```tsx
import '@/components/cfbpredictor-rankings/styles/rankings.css';
```

### 4. Google Fonts
Add to your `app/layout.tsx` `<head>`:
```tsx
import { Rajdhani, DM_Sans, DM_Mono } from 'next/font/google';
```
Or paste in `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
```

---

## Swapping in Real Data

All mock data lives in two places:

### Base team stats → `data/teams2025.ts`
Replace the `teams2025` array with your real 2025 final season data.
Each team needs: `rank, prev, name, mascot, conf, cfpi, aspi, oaspi, daspi, tpi, cfbc`

### Derived stats → `data/computeStats.ts`
- `computeDerivedStats()` — replace `Math.random()` calls with real feeds for:
  SOR, EPi+, advanced stat columns (srO, expO, etc.), talent inputs
- `generateProjections()` — replace with real 2026 projection model output

---

## File Structure
```
cfbpredictor-rankings/
  components/
    PowerRankings.tsx     ← main React component ('use client')
  data/
    teams2025.ts          ← 2025 base team data (replace with real)
    tabConfig.ts          ← tab/column definitions + tier config
    computeStats.ts       ← derived stat calculations
  styles/
    rankings.css          ← all styles (dark/light mode, table, badges)
  types/
    index.ts              ← TypeScript interfaces
  package.json
  README.md
```

---

## Tabs
| Tab | Sub-tabs | Dataset |
|-----|----------|---------|
| Way Too Early 2026 | — | 2026 projections |
| CFPi+ Power Index | — | 2025 final |
| EPi+ Efficiency Index | — | 2025 final |
| Advanced Stats | Offense / Defense | 2025 final |
| Talent Composite | TPi+ Composite / Raw Inputs | 2025 final |
| Strength of Record | — | 2025 final |
