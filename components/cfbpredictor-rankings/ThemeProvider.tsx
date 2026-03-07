'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  mounted: false,
  toggleTheme: () => {},
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
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // On first mount AND every route change — read real value from localStorage
  useEffect(() => {
    const t = getStored();
    setTheme(t);
    setMounted(true);
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.backgroundColor = t === 'light' ? '#F0F3F8' : '#0B0E14';
  }, [pathname]);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.backgroundColor = next === 'light' ? '#F0F3F8' : '#0B0E14';
    try { localStorage.setItem('cfbp-theme', next); } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}