import { TabDef } from '../types';

export const TABS: Record<string, TabDef> = {
  wte2026: {
    title: 'Way Too Early <b>2026</b> CFPi+ Power Index Projections',
    defaultSort: 'cfpi',
    tierKey: 'cfpi',
    dataset: 'teams2027',
    cols: [
      { key: 'cfpi',  label: 'CFPi+',  tip: 'Projected Overall Power Index for 2026. Early projection based on returning talent, portal activity, recruiting class, and 2025 performance signals.' },
      { key: 'aspi',  label: 'ASPi+',  tip: 'Projected Advanced Stats Index for 2026.' },
      { key: 'oaspi', label: 'oASPi+', tip: 'Projected Offensive Advanced Stats Index for 2026.' },
      { key: 'daspi', label: 'dASPi+', tip: 'Projected Defensive Advanced Stats Index for 2026. Lower = better.' },
      { key: 'tpi',   label: 'TPi+',   tip: 'Talent & Production Index — primary driver of early projections.' },
      { key: 'cfbc',  label: 'CFBc+',  tip: 'Composite Index baseline from 2025 final standings, adjusted for projected roster changes.' },
    ],
  },
  'cfpi': {
    title: '<b>CFPi+</b> Power Index — 2025 Final Results',
    defaultSort: 'cfpi',
    tierKey: 'cfpi',
    dataset: 'teams2025',
    cols: [
      { key: 'cfpi',  label: 'CFPi+',  tip: 'Overall Power Index. Proprietary composite combining adjusted efficiency, SOS, and schedule signals.' },
      { key: 'aspi',  label: 'ASPi+',  tip: 'Overall Advanced Stats Index. oASPi+ minus dASPi+.' },
      { key: 'oaspi', label: 'oASPi+', tip: 'Offensive Advanced Stats Index. Higher = better.' },
      { key: 'daspi', label: 'dASPi+', tip: 'Defensive Advanced Stats Index. Lower = better.' },
      { key: 'tpi',   label: 'TPi+',   tip: 'Talent & Production Index.' },
      { key: 'cfbc',  label: 'CFBc+',  tip: 'Composite Index — ESPN FPI, SP+, SRS, KellyFord.' },
    ],
  },
  epi: {
    title: '2025 Season <b>EPi+</b> Efficiency Power Index',
    defaultSort: 'epi',
    tierKey: 'epi',
    cols: [
      { key: 'epi',   label: 'EPi+',   tip: 'Efficiency Power Index. Power rating derived purely from opponent-adjusted advanced stats.' },
      { key: 'oaspi', label: 'oASPi+', tip: 'Offensive Advanced Stats Index.' },
      { key: 'daspi', label: 'dASPi+', tip: 'Defensive Advanced Stats Index. Lower = better.' },
      { key: 'cfpi',  label: 'CFPi+',  tip: 'Overall Power Index — shown for comparison.' },
    ],
  },
  'adv-off': {
    title: '2025 Season Opponent-Adjusted <b>Offensive</b> Advanced Stats',
    defaultSort: 'oaspi',
    tierKey: 'oaspi',
    cols: [
      { key: 'oaspi',  label: 'oASPi+', tip: 'Offensive Advanced Stats Index composite.' },
      { key: 'srO',    label: 'SR-O',   tip: 'Offensive Success Rate — % of plays gaining expected yardage, adj. for opponent.' },
      { key: 'expO',   label: 'Exp-O',  tip: 'Offensive Explosiveness — big play frequency and magnitude, adj. for opponent.' },
      { key: 'repaO',  label: 'rEPA-O', tip: 'Run EPA (Offense) — avg expected points added per rush, opponent-adjusted.' },
      { key: 'pepaO',  label: 'pEPA-O', tip: 'Pass EPA (Offense) — avg expected points added per pass, opponent-adjusted.' },
      { key: 'hvocO',  label: 'Hvoc-O', tip: 'Havoc Absorbed — TFLs, sacks, turnovers suffered by offense, adj. for opponent.' },
    ],
  },
  'adv-def': {
    title: '2025 Season Opponent-Adjusted <b>Defensive</b> Advanced Stats',
    defaultSort: 'daspi',
    tierKey: 'daspi',
    cols: [
      { key: 'daspi',  label: 'dASPi+', tip: 'Defensive Advanced Stats Index composite. Lower = better.' },
      { key: 'srD',    label: 'SR-D',   tip: 'Defensive Success Rate Allowed. Lower = better.' },
      { key: 'expD',   label: 'Exp-D',  tip: 'Explosiveness Allowed. Lower = better.' },
      { key: 'hvocD',  label: 'Hvoc-D', tip: 'Defensive Havoc Rate. Higher = more disruptive.' },
      { key: 'repaD',  label: 'rEPA-D', tip: 'Run EPA Allowed. Lower = better.' },
      { key: 'pepaD',  label: 'pEPA-D', tip: 'Pass EPA Allowed. Lower = better.' },
    ],
  },
  'talent-composite': {
    title: '2025 Season <b>TPi+</b> Talent Composite',
    defaultSort: 'tpi',
    tierKey: 'tpi',
    cols: [
      { key: 'tpi',      label: 'TPi+',    tip: 'Talent & Production Index. Gaussian-weighted composite of all talent inputs.' },
      { key: 'recComp',  label: 'Rec',     tip: 'High School Recruiting Composite — weighted avg of 247, Rivals, ESPN.' },
      { key: 'portComp', label: 'Portal',  tip: 'Transfer Portal Composite — weighted avg of 247 and Rivals.' },
      { key: 'rpr',      label: 'RPR',     tip: 'Returning Production Rating — internal metric for returning production.' },
      { key: 'vgOvr',    label: 'VG-OVR', tip: 'Video Game Overall Rating — crowd-sourced proxy for roster talent.' },
      { key: 'cfpi',     label: 'CFPi+',  tip: 'Overall Power Index — for context on how talent projects to power.' },
    ],
  },
  'talent-inputs': {
    title: '2025 Season <b>Talent</b> — Raw Input Sources',
    defaultSort: 'tpi',
    tierKey: 'tpi',
    cols: [
      { key: 'recComp',  label: 'Rec',     tip: 'High School Recruiting Composite — 247, Rivals, ESPN averaged.' },
      { key: 'portComp', label: 'Portal',  tip: 'Transfer Portal Composite — 247 and Rivals averaged.' },
      { key: 'rpr',      label: 'RPR',     tip: 'Returning Production Rating.' },
      { key: 'vgOvr',    label: 'VG-OVR', tip: 'Video Game Overall Rating.' },
      { key: 'vgOff',    label: 'VG-O',   tip: 'Video Game Offensive Rating.' },
      { key: 'vgDef',    label: 'VG-D',   tip: 'Video Game Defensive Rating.' },
    ],
  },
  sor: {
    title: '2025 Season <b>Strength of Record</b> Index',
    defaultSort: 'sor',
    tierKey: 'sor',
    cols: [
      { key: 'sor',    label: 'SOR',    tip: 'Strength of Record — CFP-style resume ranking.' },
      { key: 'record', label: 'RECORD', tip: 'Win-Loss record for the 2025 season (conf record in parens).', isText: true },
      { key: 'cfprk',  label: 'CFP RK', tip: 'Simulated CFP Committee ranking based on SOR model.' },
    ],
  },
};

// Rank-based tier system — divider appears AFTER last team in each tier
export const TIER_ENDS = [
  { at:   5, label: 'ELITE'         },
  { at:  15, label: 'CONTENDER'     },
  { at:  30, label: 'STRONG'        },
  { at:  50, label: 'ABOVE AVERAGE' },
  { at:  90, label: 'AVERAGE'       },
  { at: 110, label: 'BELOW AVERAGE' },
  // 111–136 = CUPCAKE (no divider needed — remainder)
];

// Tabs that show tier dividers
export const TIER_TABS = new Set(['wte2026', 'cfpi']);

// Tabs that are "parent" tabs with sub-tabs
export const PARENT_TABS: Record<string, { subTabGroup: string; default: string }> = {
  adv:    { subTabGroup: 'adv',    default: 'adv-off'           },
  talent: { subTabGroup: 'talent', default: 'talent-composite'  },
};
