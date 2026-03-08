'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'dark' | 'light';

interface ThemeObj {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  border2: string;
  borderStrong: string;
  text: string;
  textSub: string;
  textMuted: string;
  accent: string;
  accentSub: string;
  accentBorder: string;
  blue: string;
  green: string;
  red: string;
  gold: string;
  goldSub: string;
  goldBorder: string;
  winnerBg: string;
  cardElite: string;
  navBg: string;
  connStroke: string;
  barTrack: string;
  isDark: boolean;
}

const DARK: ThemeObj = {
  bg:           '#0B0E14',
  surface:      '#141920',
  surface2:     '#1A2030',
  border:       'rgba(255,255,255,0.07)',
  border2:      'rgba(255,255,255,0.04)',
  borderStrong: 'rgba(255,255,255,0.12)',
  text:         '#F5F7FA',
  textSub:      '#B8C4D4',
  textMuted:    '#5A6480',
  accent:       '#FF8C42',
  accentSub:    'rgba(255,140,66,0.1)',
  accentBorder: 'rgba(255,140,66,0.25)',
  blue:         '#4AA3FF',
  green:        '#3DDC84',
  red:          '#FF4444',
  gold:         '#D4AF37',
  goldSub:      'rgba(212,175,55,0.08)',
  goldBorder:   'rgba(212,175,55,0.25)',
  winnerBg:     'rgba(74,163,255,0.05)',
  cardElite:    'rgba(212,175,55,0.04)',
  navBg:        'linear-gradient(90deg,#060d1f 0%,#0d1f3c 60%,#071428 100%)',
  connStroke:   'rgba(255,255,255,0.2)',
  barTrack:     '#1A2030',
  isDark:       true,
};

const LIGHT: ThemeObj = {
  bg:           '#EDF0F7',
  surface:      '#FFFFFF',
  surface2:     '#DDE3F0',
  border:       'rgba(15,30,80,0.11)',
  border2:      'rgba(15,30,80,0.06)',
  borderStrong: 'rgba(15,30,80,0.2)',
  text:         '#0C1525',
  textSub:      '#253D6B',
  textMuted:    '#5B6F99',
  accent:       '#C94E00',
  accentSub:    'rgba(201,78,0,0.07)',
  accentBorder: 'rgba(201,78,0,0.28)',
  blue:         '#1452A8',
  green:        '#1452A8',
  red:          '#A81C1C',
  gold:         '#7A5200',
  goldSub:      'rgba(122,82,0,0.07)',
  goldBorder:   'rgba(122,82,0,0.3)',
  winnerBg:     'rgba(20,82,168,0.05)',
  cardElite:    'rgba(122,82,0,0.05)',
  navBg:        '#FFFFFF',
  connStroke:   'rgba(15,30,80,0.2)',
  barTrack:     '#BEC9E2',
  isDark:       false,
};

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
  themeObj: ThemeObj;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  mounted: false,
  toggleTheme: () => {},
  themeObj: DARK,
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
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>(() => getStored());
  const [mounted, setMounted] = useState(false);

 useEffect(() => {
   const t = getStored();
    setTheme(t);
    setMounted(true);
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.backgroundColor = t === 'light' ? '#EDF0F7' : '#0B0E14';
  }, [pathname]);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.backgroundColor = next === 'light' ? '#EDF0F7' : '#0B0E14';
    try { localStorage.setItem('cfbp-theme', next); } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme, themeObj: theme === 'dark' ? DARK : LIGHT }}>
      {children}
    </ThemeContext.Provider>
  );
}