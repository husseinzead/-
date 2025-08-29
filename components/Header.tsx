import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-800 border-2 border-primary-400 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/20">
          <span className="text-3xl font-bold text-primary-400">HZ</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            دليل فني صيانة الموبايل
          </h1>
          <p className="text-sm text-primary-400">البحث المتقدم عن الأعطال</p>
        </div>
      </div>
       <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <div className="hidden sm:block text-right">
          <p className="text-gray-400 text-sm">بإدارة</p>
          <p className="font-semibold text-gray-200">حسين زياد</p>
        </div>
      </div>
    </header>
  );
};