import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const themes = [
  { name: 'cyan', color: 'bg-cyan-500' },
  { name: 'emerald', color: 'bg-emerald-500' },
  { name: 'purple', color: 'bg-purple-500' },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-full">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name as any)}
          className={`w-6 h-6 rounded-full ${t.color} transition-transform duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
          aria-label={`Switch to ${t.name} theme`}
        >
          {theme === t.name && <div className="w-full h-full rounded-full ring-2 ring-white ring-offset-2 ring-offset-gray-800"></div>}
        </button>
      ))}
    </div>
  );
};
