export interface Team {
  rank: number;
  prev: number;
  name: string;
  mascot: string;
  conf: string;
  cfpi: number;
  aspi: number;
  oaspi: number;
  daspi: number;
  tpi: number;
  cfbc: number;
  // Computed at runtime by computeDerivedStats()
  sor?: number;
  epi?: number;
  record?: string;
  recordDisplay?: string;
  cfprk?: number | null;
  srO?: number; expO?: number; repaO?: number; pepaO?: number; hvocO?: number;
  srD?: number; expD?: number; hvocD?: number; repaD?: number; pepaD?: number;
  rec247?: number; recRiv?: number; recESPN?: number;
  port247?: number; portRiv?: number;
  rpr?: number;
  vgOvr?: number; vgOff?: number; vgDef?: number;
  recComp?: number; portComp?: number;
}

export interface ColDef {
  key: string;
  label: string;
  tip: string;
  isText?: boolean;
  lowerBetter?: boolean;
}

export interface TabDef {
  title: string;
  defaultSort: string;
  tierKey: string;
  dataset?: string;
  cols: ColDef[];
}

export type TabId =
  | 'wte2026'
  | 'cfpi'
  | 'epi'
  | 'adv-off'
  | 'adv-def'
  | 'talent-composite'
  | 'talent-inputs'
  | 'sor';
