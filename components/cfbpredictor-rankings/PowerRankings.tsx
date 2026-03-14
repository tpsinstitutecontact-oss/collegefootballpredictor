'use client';

import React, { useState, useMemo } from 'react';
import { Team, ColDef } from '../types';
import { TABS, TIER_ENDS, TIER_TABS } from '../data/tabConfig';
import { computeDerivedStats, generateProjections } from '../data/computeStats';
import { teams2025 } from '../data/teams2025';
import NavBar from './NavBar';
import { getTeamByNameOrSlug } from '@/data/teams';  // we'll define this below

const CONF_CLASS: Record<string, string> = {
  'SEC': 'conf-SEC',
  'Big Ten': 'conf-Big10',
  'Big 12': 'conf-Big12',
  'ACC': 'conf-ACC',
  'Independent': 'conf-Ind',     // updated from 'Ind'
  'Mountain West': 'conf-MWC',
  'American Athletic': 'conf-AAC',
  'Sun Belt': 'conf-SBC',
  'Conference USA': 'conf-CUSA',
  'Mid-American': 'conf-MAC',
  // add more as needed from your real conferences
};

const CONF_SHORT: Record<string, string> = {
  'Big Ten': 'B10',
  'Big 12': 'B12',
  'Independent': 'IND',
  'Mountain West': 'MWC',
  'American Athletic': 'AAC',
  'Sun Belt': 'SBC',
  'Conference USA': 'CUSA',
  'Mid-American': 'MAC',
  // etc.
};

function fmtVal(val: number | null | undefined, key: string): string {
  if (val == null) return '—';
  if (key === 'srO' || key === 'srD') return `${val.toFixed(1)}%`;
  if (key === 'vgOvr' || key === 'vgOff' || key === 'vgDef') return String(val);
  if (['recComp', 'portComp', 'rpr'].includes(key)) return val.toFixed(1);
  return val >= 0 ? `+${val.toFixed(1)}` : val.toFixed(1);
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
}

function RankChange({ team }: { team: Team & { prev: number; rank: number } }) {
  const diff = team.prev - team.rank;
  if (diff > 0) return <span className="rank-change up">▲{diff}</span>;
  if (diff < 0) return <span className="rank-change down">▼{Math.abs(diff)}</span>;
  return <span className="rank-change same">—</span>;
}

function MetricCell({ col, team }: { col: ColDef; team: any }) {
  const val = team[col.key];
  if (col.isText) {
    return (
      <td>
        <span className="metric-val" style={{ textAlign: 'left', fontSize: 12 }}>
          {team.recordDisplay ?? val}
        </span>
      </td>
    );
  }
  if (col.key === 'cfprk') {
    return (
      <td className="num">
        <span className="metric-val" style={{ color: val && val <= 12 ? 'var(--gold)' : 'var(--metric-text)' }}>
          {val ? `#${val}` : 'NR'}
        </span>
      </td>
    );
  }
  return (
    <td className="num">
      <span className="metric-val">{fmtVal(val, col.key)}</span>
    </td>
  );
}

export default function PowerRankings() {
  const [activeTab, setActiveTab] = useState<string>('wte2026');
  const [activeAdvSub, setActiveAdvSub] = useState('adv-off');
  const [activeTalentSub, setActiveTalentSub] = useState('talent-composite');
  const [sortKey, setSortKey] = useState('cfpi');
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [search, setSearch] = useState('');
  const [confFilter, setConfFilter] = useState('');
  const [showTop25, setShowTop25] = useState(true);

  // Enrich teams with shared metadata (logos, real names, colors, conf, etc.)
  const enrichedTeams = useMemo(() => {
    return teams2025.map(t => {
      const meta = getTeamByNameOrSlug(t.name);  // assuming your data has t.name
      return meta ? { ...t, ...meta } : t; // merge — meta overrides if conflict
    });
  }, []);

  const { data2025, data2026 } = useMemo(() => {
    const d25 = computeDerivedStats([...enrichedTeams]);
    const d26 = generateProjections(d25);
    return { data2025: d25, data2026: d26 };
  }, [enrichedTeams]);

  function getDataset(tabId: string) {
    return tabId === 'wte2026' ? data2026 : data2025;
  }

  const tab = TABS[activeTab];
  const data = getDataset(activeTab);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      let av = (a as any)[sortKey] ?? -9999;
      let bv = (b as any)[sortKey] ?? -9999;
      if (typeof av === 'string') return sortDir * av.localeCompare(bv);
      return sortDir * (av - bv);
    });
  }, [data, sortKey, sortDir]);

  const tierBoundaries = useMemo(() => {
    const b: Record<number, string> = {};
    if (!TIER_TABS.has(activeTab) || sortKey !== tab?.tierKey || sortDir !== -1) return b;
    sorted.forEach((_, i) => {
      const tier = TIER_ENDS.find(t => t.at === i + 1);
      if (tier) b[i] = tier.label;
    });
    return b;
  }, [sorted, activeTab, sortKey, sortDir, tab]);

  const filtered = useMemo(() => {
    let result = sorted.filter(t =>
      (!search || t.name?.toLowerCase().includes(search.toLowerCase())) &&
      (!confFilter || t.conf === confFilter)
    );
    if (showTop25) {
      result = result.slice(0, 25);
    }
    return result;
  }, [sorted, search, confFilter, showTop25]);

  function handleSort(key: string) {
    const col = tab?.cols.find((c: ColDef) => c.key === key);
    const defaultDir: 1 | -1 = (key === 'name' || key === 'conf' || key === 'record') ? 1 : col?.lowerBetter ? 1 : -1;
    if (sortKey === key) {
      setSortDir(d => (d === 1 ? -1 : 1));
    } else {
      setSortKey(key);
      setSortDir(defaultDir);
    }
  }

  function handleTabClick(tabId: string) {
    const resolvedId = tabId === 'adv' ? activeAdvSub : tabId === 'talent' ? activeTalentSub : tabId;
    setActiveTab(resolvedId);
    setSortKey(TABS[resolvedId]?.defaultSort ?? 'cfpi');
    setSortDir(-1);
  }

  function handleSubTabClick(subTabId: string) {
    setActiveTab(subTabId);
    if (subTabId.startsWith('adv-')) setActiveAdvSub(subTabId);
    if (subTabId.startsWith('talent-')) setActiveTalentSub(subTabId);
    setSortKey(TABS[subTabId]?.defaultSort ?? 'cfpi');
    setSortDir(-1);
  }

  const mainTabId = activeTab.startsWith('adv-') ? 'adv' : activeTab.startsWith('talent-') ? 'talent' : activeTab;
  const colCount = 3 + (tab?.cols.length ?? 0);

  return (
    <>
      <NavBar active="rankings" />

      <div className="hero-split">
        {/* LEFT 2/3: CFPi+ */}
        <div className="hero-main">
          <div>
            <div className="hero-eyebrow">Pre-Spring 2026 · Updated March 2026</div>
            <h1 className="hero-title">
              <span className="line1">CFB Predictor Power</span>
              <span className="line2">Rankings Index</span>
            </h1>
            <p className="hero-desc">
              The CFPi+ is a proprietary composite metric combining 2025 final performance,
              adjusted efficiency, strength of schedule, and early 2026 projection signals.
              Predictive, forward-looking, data-driven.
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat-val">136</span><span className="hero-stat-label">FBS Teams</span></div>
            <div className="hero-stat"><span className="hero-stat-val">CFPi+</span><span className="hero-stat-label">Metric</span></div>
            <div className="hero-stat"><span className="hero-stat-val">'26</span><span className="hero-stat-label">Projection</span></div>
          </div>
        </div>

        {/* RIGHT 1/3: March Madness (placeholder) */}
        <a href="/march-madness" className="hero-mm">
          <div className="mm-blue-glow" />
          <div className="mm-top">
            <div className="mm-badge">SOON</div>
            <div className="mm-title">
              <span className="mm-line1">March</span>
              <span className="mm-line2">Madness</span>
            </div>
            <p className="mm-desc">
              Bracket predictions powered by the <strong className="mm-accent">CMBKi+</strong> model.
              Pick your champion before tip-off.
            </p>
          </div>
          <div className="mm-bottom">
            <button className="mm-cta">
              <span>COMING SOON</span>
              <span>→</span>
            </button>
          </div>
        </a>
      </div>

      <div className="section-tabs">
        {[
          { id: 'cfpi',    label: 'CFPi+ Power Index' },
          { id: 'epi',     label: 'EPi+ Efficiency Index' },
          { id: 'adv',     label: 'Advanced Stats' },
          { id: 'talent',  label: 'Talent Composite' },
          { id: 'wte2026', label: 'Way Too Early 2026', badge: 'SOON' },
          // { id: 'sor',     label: 'Strength of Record' },
        ].map(({ id, label, badge }) => (
          <div
            key={id}
            className={`tab ${mainTabId === id ? 'active' : ''}`}
            onClick={() => handleTabClick(id)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {label}
            {badge && (
              <span
                style={{
                  fontSize: '10px',
                  color: '#6C5DD3',
                  background: 'rgba(108,93,211,0.12)',
                  border: '1px solid rgba(108,93,211,0.18)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {mainTabId === 'adv' && (
        <div className="sub-tabs">
          {[{ id: 'adv-off', label: 'Offense' }, { id: 'adv-def', label: 'Defense' }].map(({ id, label }) => (
            <div
              key={id}
              className={`sub-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => handleSubTabClick(id)}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      {mainTabId === 'talent' && (
        <div className="sub-tabs">
          {[{ id: 'talent-composite', label: 'TPi+ Composite' }, { id: 'talent-inputs', label: 'Raw Inputs' }].map(({ id, label }) => (
            <div
              key={id}
              className={`sub-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => handleSubTabClick(id)}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      <main className="main">
        <div className="table-header">
          <div>
            <div className="table-title" dangerouslySetInnerHTML={{ __html: tab?.title ?? '' }} />
            <div className="color-legend" />
          </div>
          <div className="table-controls">
            <div className="data-note">2025 Final Results + Early 2026 Projections</div>
            <input
              className="search-box"
              type="text"
              placeholder="Search team…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="conf-filter" value={confFilter} onChange={e => setConfFilter(e.target.value)}>
              <option value="">All Conferences</option>
              {Object.keys(CONF_CLASS).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rankings-wrap">
          <div className="table-scroll">
            <table id="rankingsTable">
              <thead>
                <tr>
                  <th style={{ width: 90 }} onClick={() => handleSort('rank')}>
                    <div className="th-inner">RK <span className="sort-arrow">▼</span></div>
                  </th>
                  <th onClick={() => handleSort('name')}>
                    <div className="th-inner">TEAM <span className="sort-arrow">▼</span></div>
                  </th>
                  <th onClick={() => handleSort('conf')}>
                    <div className="th-inner">CONF <span className="sort-arrow">▼</span></div>
                  </th>
                  {tab?.cols.map((col: ColDef) => (
                    <th
                      key={col.key}
                      className={`num ${sortKey === col.key ? (sortDir === 1 ? 'sorted sort-asc' : 'sorted sort-desc') : ''}`}
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="th-inner">
                        <span className="th-tip">
                          {col.label}
                          <i className="tip-icon">i</i>
                          <span className="tip-box">
                            <span className="tip-name">{col.label}</span>{col.tip}
                          </span>
                        </span>
                        <span className="sort-arrow">▼</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((team) => {
                  const origIdx = sorted.indexOf(team);
                  const tierLabel = tierBoundaries[origIdx];

                  // Use team properties
                  const displayName = team.name || 'Unknown';
                  const displayConf = team.conf || '—';
                  const logoUrl = team.logos?.[0];
                  const bgColor = team.primaryColor || '#333';

                  return (
                    <React.Fragment key={`${team.rank}-${displayName}`}>
                      <tr data-conf={displayConf} data-name={displayName.toLowerCase()}>
                        <td>
                          <div className="rank-cell">
                            <span className="rank-num">{team.rank}</span>
                            <RankChange team={team as any} />
                          </div>
                        </td>
                        <td>
                          <div className="team-cell">
                            <div
                              className="team-logo"
                              style={logoUrl ? {} : { backgroundColor: bgColor, color: '#fff' }}
                            >
                              {logoUrl ? (
                                <img
                                  src={logoUrl}
                                  alt={`${displayName} logo`}
                                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              ) : (
                                initials(displayName)
                              )}
                            </div>
                            <div>
                              <div className="team-name" style={{ color: bgColor || 'inherit' }}>
                                {displayName}
                              </div>
                              <div className="team-mascot">{team.mascot || ''}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`conf-badge ${CONF_CLASS[displayConf] ?? 'conf-Ind'}`}>
                            {CONF_SHORT[displayConf] ?? displayConf.slice(0, 4)}
                          </span>
                        </td>
                        {tab?.cols.map((col: ColDef) => (
                          <MetricCell key={col.key} col={col} team={team} />
                        ))}
                      </tr>
                      {/* Tier labels commented out */}
                      {/* 
                      {tierLabel && (
                        <tr>
                          <td colSpan={colCount} style={{ padding: 0 }}>
                            <span className="tier-label">{tierLabel}</span>
                          </td>
                        </tr>
                      )}
                      */}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ paddingTop: '20px', paddingLeft: '0px' }}>
          <button
            onClick={() => setShowTop25(!showTop25)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: `1px solid ${showTop25 ? 'var(--blue)' : 'var(--border)'}`,
              background: showTop25 ? 'rgba(74,163,255,0.1)' : 'transparent',
              color: showTop25 ? 'var(--blue)' : 'var(--text)',
              fontFamily: 'var(--font-dm-mono), DM Mono, monospace',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!showTop25) {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--blue)';
                (e.target as HTMLButtonElement).style.color = 'var(--blue)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showTop25) {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--border)';
                (e.target as HTMLButtonElement).style.color = 'var(--text)';
              }
            }}
          >
            {showTop25 ? 'VIEW ALL 136 TEAMS' : 'VIEW TOP 25'}
          </button>
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">CFBPredictor<span>.com</span></div>
          <p className="footer-disclaimer">
            CFPi+ Power Rankings are designed to be predictive, forward-looking, data-based indexes for analyzing potential outcomes of college football games and do not indicate how "deserving" a particular team is. These are not official CFP rankings. The index represents the model's expected point differential above or below the average FBS team on a neutral field.
          </p>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="/methodology">Methodology</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}