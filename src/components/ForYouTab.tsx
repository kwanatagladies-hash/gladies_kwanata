/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bookmark, Search, BookOpen, Star, Sparkles, ChevronRight, History } from 'lucide-react';
import { useState } from 'react';
import { Article } from '../types';

interface ForYouTabProps {
  articles: Article[];
  bookmarkedIds: string[];
  onSelectArticle: (article: Article) => void;
  userEmail: string;
}

export default function ForYouTab({
  articles,
  bookmarkedIds,
  onSelectArticle,
  userEmail,
}: ForYouTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const bookmarkedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  // Exclude bookmarked articles from the "Recommended" list to show something fresh
  const recommendedArticles = articles
    .filter(a => !bookmarkedIds.includes(a.id))
    .slice(0, 3);

  // Search filter
  const searchResults = searchQuery
    ? articles.filter(
        a =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.section.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 text-[#121212] dark:text-[#f3f3f3] font-sans pb-24">
      
      {/* Dynamic Subscriber Card Banner */}
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 mb-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#121212] dark:bg-zinc-800 flex items-center justify-center text-white font-gothic text-xl select-none" style={{ fontFamily: 'UnifrakturMaguntia, serif' }}>
            T
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Premium Digital Member</span>
            </div>
            <h3 className="font-serif text-lg font-bold tracking-tight mt-0.5">
              Welcome, {userEmail.split('@')[0]}
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-mono">
              SUBSCRIBER: {userEmail}
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Daily Streak</span>
          <div className="font-serif text-2xl font-black text-[#121212] dark:text-[#f3f3f3]">
            12 Days
          </div>
        </div>
      </div>

      {/* Global search within this tab */}
      <div className="relative w-full mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search all archives (World, Business, Science, opinion...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg outline-none text-sm text-[#121212] dark:text-[#f3f3f3] shadow-inner focus:border-gray-400 dark:focus:border-zinc-700"
          id="foryou-search-input"
        />
      </div>

      {/* SEARCH RESULTS OR STATIC CONTENT */}
      {searchQuery ? (
        <section className="mb-8">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b pb-2">
            Search Results ({searchResults.length})
          </h4>
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No archives matched your search query. Try another term.
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-4 border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/20 rounded-lg cursor-pointer hover:border-gray-400 transition-all flex justify-between gap-4 items-center"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                      {art.section}
                    </span>
                    <h5 className="font-serif text-sm font-bold tracking-tight line-clamp-2 mt-0.5">
                      {art.title}
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 line-clamp-2 mt-1">
                      {art.abstract}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* BOOKMARKS LIST */}
          <section className="mb-10" id="bookmarks-section">
            <div className="flex items-center gap-1.5 border-b border-gray-200 dark:border-zinc-800 pb-3 mb-4">
              <Bookmark className="w-5 h-5 text-yellow-600" fill="currentColor" />
              <h4 className="font-serif text-xl font-bold tracking-tight">Your Saved Articles ({bookmarkedArticles.length})</h4>
            </div>

            {bookmarkedArticles.length === 0 ? (
              <div className="py-12 px-4 border border-dashed border-gray-200 dark:border-zinc-800 rounded-lg text-center flex flex-col items-center justify-center gap-3">
                <BookOpen className="w-10 h-10 text-gray-300 dark:text-zinc-700" />
                <div>
                  <h5 className="font-sans text-sm font-bold text-gray-700 dark:text-zinc-300">Your Reading List is Empty</h5>
                  <p className="text-xs text-gray-400 max-w-sm mt-1 leading-relaxed">
                    Bookmark articles across the homepage or audio briefings to read or listen to them offline at any time.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarkedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="p-4 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 rounded-lg cursor-pointer hover:shadow-sm hover:border-gray-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400">
                        {art.section}
                      </span>
                      <h5 className="font-serif text-sm font-bold tracking-tight line-clamp-2 mt-0.5 text-gray-900 dark:text-gray-100">
                        {art.title}
                      </h5>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-500 line-clamp-3 mt-1.5 leading-relaxed">
                        {art.abstract}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-4 pt-3 border-t border-gray-100 dark:border-zinc-900">
                      <span>{art.readTime} min read</span>
                      <span className="hover:underline flex items-center gap-1">
                        Read Text <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* DYNAMIC RECOMMENDATIONS */}
          <section className="mb-10" id="recommendations-section">
            <div className="flex items-center gap-1.5 border-b border-gray-200 dark:border-zinc-800 pb-3 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h4 className="font-serif text-xl font-bold tracking-tight">Curated Recommendations</h4>
            </div>

            <div className="space-y-4">
              {recommendedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-4 border border-gray-100 dark:border-zinc-900/60 bg-white dark:bg-zinc-950/10 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-zinc-700 transition-all flex gap-4 items-center"
                >
                  {art.imageUrl && (
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  )}
                  <div className="flex-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-zinc-500">
                      {art.section}
                    </span>
                    <h5 className="font-serif text-sm font-bold tracking-tight line-clamp-2 mt-0.5 text-gray-900 dark:text-gray-100">
                      {art.title}
                    </h5>
                    <p className="text-[11px] text-gray-400 dark:text-zinc-500 line-clamp-1 mt-0.5">
                      {art.abstract}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </section>

          {/* RECENT HISTORIC ARCHIVES */}
          <section className="mb-4">
            <div className="flex items-center gap-1.5 border-b border-gray-200 dark:border-zinc-800 pb-3 mb-4">
              <History className="w-5 h-5 text-gray-500" />
              <h4 className="font-serif text-xl font-bold tracking-tight">Reading History</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed italic">
              Your reading logs are safely persisted locally on your device. Click on stories above to populate your reading milestones.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
