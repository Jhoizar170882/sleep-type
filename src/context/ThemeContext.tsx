import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getLocalHour(): number {
  return new Date().getHours();
}

function resolveAutoTheme(): ResolvedTheme {
  const hour = getLocalHour();
  if (hour >= 6 && hour < 18) return 'light';

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(resolved: ResolvedTheme) {
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const STORAGE_KEY = 'sleep-quiz-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored;
    return 'auto';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light') return 'light';
    if (stored === 'dark') return 'dark';
    return resolveAutoTheme();
  });

  const updateResolved = useCallback((mode: ThemeMode) => {
    let resolved: ResolvedTheme;
    if (mode === 'light') resolved = 'light';
    else if (mode === 'dark') resolved = 'dark';
    else resolved = resolveAutoTheme();
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, mode);
    setThemeState(mode);
    updateResolved(mode);
  }, [updateResolved]);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (theme !== 'auto') return;
    const interval = setInterval(() => {
      updateResolved('auto');
    }, 60_000);
    return () => clearInterval(interval);
  }, [theme, updateResolved]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
