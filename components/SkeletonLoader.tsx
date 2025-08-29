import React from 'react';

const YouTubeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.885 3.428 0 5.483 0 12s.885 8.572 4.385 8.816c3.6.245 11.626.246 15.23 0C23.115 20.572 24 18.517 24 12s-.885-8.572-4.385-8.816zM9.5 16.5v-9l7 4.5-7 4.5z" />
    </svg>
);

const WebIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.512 5.73 6.512 5.73s0 .001 0 .001a7.002 7.002 0 016.156 0s0 0 0-.001c.001 0 .001 0 .001-.001a6.012 6.012 0 011.912 2.706c.181.52.292 1.061.292 1.624s-.111 1.104-.292 1.624a6.012 6.012 0 01-1.912 2.706s-.001 0-.001.001a7.002 7.002 0 01-6.156 0c-.001 0-.001 0-.001-.001a6.012 6.012 0 01-1.912-2.706A6.978 6.978 0 014 9.651s.111-1.104.292-1.624z" clipRule="evenodd" />
    </svg>
);


const SkeletonCard: React.FC = () => (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-700 rounded w-full"></div>
    </div>
);

export const SkeletonLoader: React.FC = () => {
    return (
        <div className="space-y-12 animate-pulse">
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <YouTubeIcon />
                    <div className="h-6 bg-gray-700 rounded w-48"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </section>
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <WebIcon />
                    <div className="h-6 bg-gray-700 rounded w-56"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </section>
        </div>
    );
};