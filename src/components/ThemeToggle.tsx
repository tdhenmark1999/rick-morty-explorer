'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentlyDark = document.documentElement.classList.contains('dark');
    
    let shouldBeDark: boolean;
    if (saved) {
      shouldBeDark = saved === 'dark';
    } else {
      shouldBeDark = systemPrefersDark;
    }
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark !== currentlyDark) {
      applyTheme(shouldBeDark);
    }
  }, []);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    
    if (dark) {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    const html = document.documentElement;
    
    if (newIsDark) {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
      html.setAttribute('data-theme', 'light');
    }
    
    localStorage.setItem(STORAGE_KEYS.THEME, newIsDark ? 'dark' : 'light');
    
    void html.offsetHeight;
  };

  if (!mounted) {
    return (
      <div className="p-2 w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}