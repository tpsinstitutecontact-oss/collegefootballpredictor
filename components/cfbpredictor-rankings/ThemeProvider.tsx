'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/* ── Full color token objects ── */
const DARK = {
  bg:           '#0B0E14',
  surface:      '#171C26',
  surface2:     '#1E2535',
  border:       'rgba(90,163,255,0.12)',
  border2:      'rgba(90,163,255,0.07)',
  borderStrong: 'rgba(90,163,255,0.18)',
  text:         '#F5F7FA',
  textSub:      '#C8D4E8',
  textMuted:    '#8A94A8',
  accent:       '#FF8C42',
  accentSub:    'rgba(255,140,66,0.08)',
  accentBorder: 'rgba(255,140,66,0.2)',
  blue:         '#4AA3FF',
  green:        '#3DDC84',
  red:          '#FF5A5A',
  gold:         '#D4AF37',
  goldSub:      'rgba(212,175,55,0.07)',
  goldBorder:   'rgba(212,175,55,0.22)',
  winnerBg:     'rgba(255,140,66,0.06)',
  cardElite:    'rgba(212,175,55,0.04)',
  navBg:        'rgba(11,14,20,0.92)',
  connStroke:   'rgba(90,163,255,0.25)',
  barTrack:     'rgba(255,255,255,0.08)',
  isDark:       true,
};

const LIGHT = {
  bg:           '#E8ECF4',       // cooler blue-grey, slightly deeper
  surface:      '#F4F6FB',       // soft cool white — subtle lift over bg
  surface2:     '#E1E6F0',       // cool-toned header/table bg
  border:       'rgba(55,75,120,0.12)',
  border2:      'rgba(55,75,120,0.07)',
  borderStrong: 'rgba(55,75,120,0.18)',
  text:         '#0D1321',       // near-black with blue undertone
  textSub:      '#1B2A47',       // dark slate
  textMuted:    '#4F5D78',       // stronger than before for contrast
  accent:       '#3D5FCC',       // deep indigo-blue accent
  accentSub:    'rgba(61,95,204,0.07)',
  accentBorder: 'rgba(61,95,204,0.2)',
  blue:         '#2A6FDB',       // clean medium blue for stats
  green:        '#1A8F56',       // cool emerald
  red:          '#C92D2D',       // cool crimson
  gold:         '#B5621A',       // burnt orange — March Madness energy
  goldSub:      'rgba(181,98,26,0.06)',
  goldBorder:   'rgba(181,98,26,0.2)',
  winnerBg:     'rgba(61,95,204,0.05)',   // cool blue tint for winners
  cardElite:    'rgba(181,98,26,0.04)',
  navBg:        'rgba(232,236,244,0.95)', // matches bg
  connStroke:   'rgba(55,75,120,0.22)',
  barTrack:     'rgba(55,75,120,0.1)',
  isDark:       false,
};

interface ThemeContextValue {
  theme:     Theme;
  mounted:   boolean;
  toggleTheme: () => void;
  themeObj:  typeof DARK;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:       'dark',
  mounted:     false,
  toggleTheme: () => {},
  themeObj:    DARK,
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getStored(): Theme {
  try {
    return localStorage.getItem('cfbp-theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme]   = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = getStored();
    setTheme(t);
    setMounted(true);
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.backgroundColor = t === 'light' ? '#E8ECF4' : '#0B0E14';
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.backgroundColor = next === 'light' ? '#E8ECF4' : '#0B0E14';
    try { localStorage.setItem('cfbp-theme', next); } catch {}
  }

  const themeObj = theme === 'light' ? LIGHT : DARK;

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme, themeObj }}>
      {children}
    </ThemeContext.Provider>
  );
}