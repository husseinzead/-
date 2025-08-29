import React from 'react';

type ActiveView = 'search' | 'summarizer';

interface TabsProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeView, setActiveView }) => {
  const commonClasses = "w-full text-center px-4 py-3 font-semibold rounded-t-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-400";
  const activeClasses = "bg-gray-800 text-primary-300";
  const inactiveClasses = "bg-gray-900 text-gray-500 hover:bg-gray-800/50 hover:text-gray-300";

  return (
    <div className="flex border-b border-gray-700">
      <button 
        onClick={() => setActiveView('search')}
        className={`${commonClasses} ${activeView === 'search' ? activeClasses : inactiveClasses}`}
        aria-pressed={activeView === 'search'}
      >
        بحث عن أعطال
      </button>
      <button 
        onClick={() => setActiveView('summarizer')}
        className={`${commonClasses} ${activeView === 'summarizer' ? activeClasses : inactiveClasses}`}
        aria-pressed={activeView === 'summarizer'}
      >
        تلخيص فيديو
      </button>
    </div>
  );
};
