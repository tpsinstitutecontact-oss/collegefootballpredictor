import { Team } from '../types';

/**
 * computeDerivedStats()
 * Takes the base teams array (rank, cfpi, aspi, oaspi, daspi, tpi, cfbc)
 * and computes all derived columns needed for EPi+, Advanced Stats,
 * Talent, and SOR tabs.
 *
 * Replace the Math.random() calls here with real data feeds when available.
 */
export function computeDerivedStats(teams: Team[]): Team[] {
  return teams.map((t, i) => {
    // ── SOR ──
    const sor = parseFloat((t.cfpi * 0.85 + (Math.random() * 6 - 3)).toFixed(1));

    // ── Record ──
    const wins   = Math.min(14, Math.max(0, Math.round(9 + t.cfpi / 6 + (Math.random() * 2 - 1))));
    const losses = 14 - wins;
    const confW  = Math.max(0, Math.round(wins * 0.55));
    const confL  = Math.max(0, Math.round(losses * 0.55));

    // ── CFP Rank ──
    const cfprk = i < 25 ? i + 1 : null;

    // ── EPi+ ──
    const epi = parseFloat((t.aspi * 0.85 + (Math.random() * 2 - 1)).toFixed(1));

    // ── Offensive stats (higher = better) ──
    const srO   = parseFloat((50   + (t.oaspi - 30) * 0.45  + (Math.random() * 4   - 2   )).toFixed(1));
    const expO  = parseFloat((1.10 + (t.oaspi - 30) * 0.014 + (Math.random() * 0.1 - 0.05)).toFixed(2));
    const repaO = parseFloat((      (t.oaspi - 30)  * 0.032 + (Math.random() * 0.2 - 0.1 )).toFixed(2));
    const pepaO = parseFloat((      (t.oaspi - 30)  * 0.042 + (Math.random() * 0.3 - 0.15)).toFixed(2));
    const hvocO = parseFloat((0.13 - (t.oaspi - 30) * 0.0018 + (Math.random() * 0.02 - 0.01)).toFixed(3));

    // ── Defensive stats (raw — lower = better except hvocD) ──
    const srD   = parseFloat((25   + t.daspi * 0.55  + (Math.random() * 4    - 2   )).toFixed(1));
    const expD  = parseFloat((0.85 + t.daspi * 0.011 + (Math.random() * 0.08 - 0.04)).toFixed(2));
    const hvocD = parseFloat((0.08 + (25 - t.daspi)  * 0.002 + (Math.random() * 0.02 - 0.01)).toFixed(3));
    const repaD = parseFloat((      (t.daspi - 25)   * 0.028 + (Math.random() * 0.2 - 0.1 )).toFixed(2));
    const pepaD = parseFloat((      (t.daspi - 25)   * 0.038 + (Math.random() * 0.3 - 0.15)).toFixed(2));

    // ── Talent inputs ──
    const talentBase = 70 + t.tpi * 0.35;
    const rec247  = parseFloat(Math.min(99, Math.max(60, talentBase + (Math.random() * 6 - 3))).toFixed(1));
    const recRiv  = parseFloat(Math.min(99, Math.max(60, talentBase + (Math.random() * 6 - 3))).toFixed(1));
    const recESPN = parseFloat(Math.min(99, Math.max(60, talentBase + (Math.random() * 6 - 3))).toFixed(1));
    const port247 = parseFloat(Math.min(95, Math.max(50, talentBase - 5 + (Math.random() * 8 - 4))).toFixed(1));
    const portRiv = parseFloat(Math.min(95, Math.max(50, talentBase - 5 + (Math.random() * 8 - 4))).toFixed(1));
    const rpr     = parseFloat(Math.min(100, Math.max(20, 60 + t.tpi * 0.2 + (Math.random() * 16 - 8))).toFixed(1));
    const vgOvr   = Math.min(99, Math.max(62, Math.round(talentBase * 0.95 + (Math.random() * 4 - 2))));
    const vgOff   = Math.min(99, Math.max(60, Math.round(talentBase * 0.93 + (Math.random() * 5 - 2.5))));
    const vgDef   = Math.min(99, Math.max(60, Math.round(talentBase * 0.93 + (Math.random() * 5 - 2.5))));
    const recComp  = parseFloat(((rec247 + recRiv + recESPN) / 3).toFixed(1));
    const portComp = parseFloat(((port247 + portRiv) / 2).toFixed(1));

    return {
      ...t,
      sor, cfprk,
      record: `${wins}-${losses}`,
      recordDisplay: `${wins}-${losses} (${confW}-${confL})`,
      epi,
      srO, expO, repaO, pepaO, hvocO,
      srD, expD, hvocD, repaD, pepaD,
      rec247, recRiv, recESPN, port247, portRiv,
      rpr, vgOvr, vgOff, vgDef, recComp, portComp,
    };
  });
}

/**
 * generateProjections()
 * Takes 2025 final data and generates Way Too Early 2026 projections.
 * prev = 2025 final rank so change arrows show projected movement.
 */
export function generateProjections(teams: Team[]): Team[] {
  return teams
    .map(t => ({
      ...t,
      prev:  t.rank,
      cfpi:  parseFloat((t.cfpi  + (Math.random() * 6 - 3)).toFixed(1)),
      aspi:  parseFloat((t.aspi  + (Math.random() * 5 - 2.5)).toFixed(1)),
      oaspi: parseFloat((t.oaspi + (Math.random() * 4 - 2)).toFixed(1)),
      daspi: Math.max(3, parseFloat((t.daspi + (Math.random() * 4 - 2)).toFixed(1))),
      cfbc:  parseFloat((t.cfbc  + (Math.random() * 4 - 2)).toFixed(1)),
    }))
    .sort((a, b) => b.cfpi - a.cfpi)
    .map((t, i) => ({ ...t, rank: i + 1 }));
}
