
import React from 'react';
import { SunMoon, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <SunMoon className="h-5 w-5 text-yellow-200" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
