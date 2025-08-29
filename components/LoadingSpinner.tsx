import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-primary-300 font-semibold">جاري جلب أفضل الحلول لك...</p>
    </div>
  );
};