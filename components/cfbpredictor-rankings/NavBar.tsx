'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

type ActivePage = 'rankings' | 'march-madness' | 'methodology' | 'contact';

export default function NavBar({ active }: { active: ActivePage }) {
  const { theme, mounted, toggleTheme } = useTheme();

  function cls(page: ActivePage) {
    return active === page ? 'nav-link active' : 'nav-link';
  }

  const isLight   = mounted && theme === 'light';
  const isLoading = !mounted;

  return (
    <nav className="nav-dark">
      <Link href="/" className="nav-logo">
        <div className="nav-logo-icon">CFB</div>
        <span className="nav-logo-text">CFBPredictor<span>.com</span></span>
      </Link>

      <ul className="nav-links">
        <li className="nav-item">
          <Link href="/" className={cls('rankings')}>CFB Power Rankings</Link>
        </li>
        <li className="nav-item">
          <Link href="/march-madness" className={cls('march-madness')}>
            March Madness <span className="nav-badge nav-badge-orange">SOON</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/methodology" className={cls('methodology')}>Methodology</Link>
        </li>
        <li className="nav-item">
          <Link href="/contact" className={cls('contact')}>Contact</Link>
        </li>
      </ul>

      <button
        className={`toggle-pill ${isLoading ? 'tp-loading' : isLight ? 'tp-light' : 'tp-dark'}`}
        onClick={mounted ? toggleTheme : undefined}
        disabled={isLoading}
        aria-label="Toggle theme"
      >
        <div className="tp-track">
          <div className="tp-thumb" />
        </div>
        <span className="tp-label">
          {isLoading ? 'Loading' : isLight ? 'Light Mode' : 'Dark Mode'}
        </span>
        <span className="tp-icon">
          {isLoading ? '' : isLight ? '☀️' : '🌙'}
        </span>
      </button>
    </nav>
  );
}