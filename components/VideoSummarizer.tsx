import React, { useState } from 'react';
import { summarizeVideo } from '../services/geminiService';
import type { VideoSummary, VideoDetails } from '../types';
import { VideoSummarySkeleton } from './VideoSummarySkeleton';

// Icons for the summary sections
const ToolsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const StepsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

const isValidYoutubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.*)?$/;
    return youtubeRegex.test(url);
};


export const VideoSummarizer: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [summary, setSummary] = useState<VideoSummary | null>(null);
    const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidYoutubeUrl(videoUrl)) {
            setError('الرجاء إدخال رابط يوتيوب صحيح.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSummary(null);
        setVideoDetails(null);

        try {
            // Fetch video details from oEmbed endpoint
            const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
            const detailsResponse = await fetch(oEmbedUrl);
            if (!detailsResponse.ok) {
                 throw new Error('لا يمكن الوصول إلى الفيديو. قد يكون خاصًا أو تم حذفه.');
            }
            const details: VideoDetails = await detailsResponse.json();
            setVideoDetails(details);
            
            // Now, get the summary from Gemini
            const summaryData = await summarizeVideo(videoUrl);
            setSummary(summaryData);

        } catch (err: any) {
            setError(err.message || 'حدث خطأ غير متوقع.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 bg-gray-800 p-6 rounded-b-lg">
            <p className="text-center text-gray-400 mb-4">
                ضع رابط فيديو من يوتيوب للحصول على ملخص منظم لخطوات الإصلاح والأدوات المطلوبة.
            </p>
            <form onSubmit={handleSummarize} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-grow bg-gray-900 border-2 border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors duration-300 text-left"
                    dir="ltr"
                    disabled={isLoading}
                    aria-label="رابط فيديو يوتيوب"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
                >
                    {isLoading ? 'جاري التحليل...' : 'تلخيص'}
                </button>
            </form>
            
            <div className="mt-8">
                {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
                
                {videoDetails && (
                     <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-900/50 rounded-lg mb-8">
                        <img src={videoDetails.thumbnail_url} alt="صورة مصغرة للفيديو" className="w-full sm:w-48 rounded-md aspect-video object-cover" />
                        <div>
                            <h3 className="text-lg font-bold text-white">{videoDetails.title}</h3>
                            <p className="text-sm text-gray-400">{videoDetails.author_name}</p>
                        </div>
                    </div>
                )}

                {isLoading && <VideoSummarySkeleton />}

                {summary && !isLoading && (
                    <div className="space-y-8">
                        {summary.tools && summary.tools.length > 0 && (
                             <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <ToolsIcon />
                                    <h2 className="text-xl font-bold text-white">الأدوات المطلوبة</h2>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-gray-300 pl-9">
                                    {summary.tools.map((tool, index) => <li key={index}>{tool}</li>)}
                                </ul>
                            </section>
                        )}
                        {summary.steps && summary.steps.length > 0 && (
                             <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <StepsIcon />
                                    <h2 className="text-xl font-bold text-white">خطوات الإصلاح</h2>
                                </div>
                                <ol className="list-decimal list-inside space-y-3 text-gray-300 pl-9">
                                    {summary.steps.map((step, index) => <li key={index}>{step}</li>)}
                                </ol>
                            </section>
                        )}
                         {summary.warnings && summary.warnings.length > 0 && (
                             <section className="bg-yellow-900/30 border border-yellow-500/50 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <WarningIcon />
                                    <h2 className="text-xl font-bold text-yellow-300">نصائح وتحذيرات هامة</h2>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-yellow-200 pl-9">
                                    {summary.warnings.map((warning, index) => <li key={index}>{warning}</li>)}
                                </ul>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
