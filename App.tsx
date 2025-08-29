

import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { WelcomeSplash } from './components/WelcomeSplash';
import { SkeletonLoader } from './components/SkeletonLoader';
import { SummaryDisplay } from './components/SummaryDisplay';
import { SearchHistory } from './components/SearchHistory';
import { Tabs } from './components/Tabs';
import { VideoSummarizer } from './components/VideoSummarizer';
import { searchMobileIssues } from './services/geminiService';
import type { CategorizedResults, GroundingChunk } from './types';

type ActiveView = 'search' | 'summarizer';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('search');
  const [summary, setSummary] = useState<string | null>(null);
  const [results, setResults] = useState<CategorizedResults | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('searchHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse search history from localStorage", e);
      setHistory([]);
    }
  }, []);

  const categorizeResults = (chunks: GroundingChunk[]): CategorizedResults => {
    const youtubeResults: GroundingChunk[] = [];
    const webResults: GroundingChunk[] = [];

    chunks.forEach(chunk => {
      if (chunk.web && chunk.web.uri) {
        if (chunk.web.uri.includes('youtube.com') || chunk.web.uri.includes('youtu.be')) {
          youtubeResults.push(chunk);
        } else {
          webResults.push(chunk);
        }
      }
    });
    
    return { youtubeResults, webResults };
  };

  const handleSearch = useCallback(async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setError("الرجاء إدخال عطل للبحث عنه.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResults(null);
    setSummary(null);

    try {
      const { summary: newSummary, groundingChunks } = await searchMobileIssues(trimmedQuery);
      
      setSummary(newSummary);

      if (groundingChunks && groundingChunks.length > 0) {
        const categorized = categorizeResults(groundingChunks);
        setResults(categorized);
      } else {
        setResults({ youtubeResults: [], webResults: [] });
      }

      // Update history
      const updatedHistory = [trimmedQuery, ...history.filter(h => h !== trimmedQuery)].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <Tabs activeView={activeView} setActiveView={setActiveView} />

          {activeView === 'search' && (
            <div className="mt-8">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              <SearchHistory 
                history={history}
                onHistoryClick={handleSearch}
                onClear={clearHistory}
                isLoading={isLoading}
              />
              <div className="mt-12">
                {isLoading && <SkeletonLoader />}
                {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
                {!isLoading && !error && (
                  <>
                    {summary && <SummaryDisplay summary={summary} />}
                    {results ? <ResultsDisplay results={results} /> : <WelcomeSplash />}
                  </>
                )}
              </div>
            </div>
          )}

          {activeView === 'summarizer' && <VideoSummarizer />}

        </main>
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>بإدارة حسين زياد &copy; 2024</p>
        </footer>
      </div>
    </div>
  );
}

export default App;