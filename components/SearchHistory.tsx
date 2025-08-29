import React from 'react';

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (query: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onHistoryClick, onClear, isLoading }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-400">سجل البحث</h3>
        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-primary-400 transition-colors"
          aria-label="مسح سجل البحث"
        >
          مسح السجل
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onHistoryClick(item)}
            disabled={isLoading}
            className="bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 text-sm px-3 py-1 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};