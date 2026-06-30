/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Compass, Sparkles, PlayCircle, Headphones, User, Menu, X, ArrowUpRight, ChevronRight, Home, Search } from 'lucide-react';
import { initialArticles, initialStocks } from './data';
import { Article, ThemeType, TextSizeType, StockTicker } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleView from './components/ArticleView';
import SectionsTab from './components/SectionsTab';
import ForYouTab from './components/ForYouTab';
import LiveTab from './components/LiveTab';
import AudioTab from './components/AudioTab';
import AccountTab from './components/AccountTab';

export default function App() {
  // Navigation & Content state
  const [activeTab, setActiveTab] = useState<'home' | 'sections' | 'foryou' | 'live' | 'audio' | 'account'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [stocks, setStocks] = useState<StockTicker[]>(initialStocks);

  // Layout preferences
  const [theme, setTheme] = useState<ThemeType>('light');
  const [textSize, setTextSize] = useState<TextSizeType>('md');

  // Search & Drawer state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // User Email from metadata (or generic default)
  const userEmail = "kwanatagladies@gmail.com";

  // Real-time stock ticker updates to simulate active business markets!
  useEffect(() => {
    const timer = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          // Soft random fluctuation
          const currentPrice = parseFloat(stock.price.replace(/,/g, ''));
          const percentChange = (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
          const delta = currentPrice * (percentChange / 100);
          const nextPrice = (currentPrice + delta).toFixed(2);
          
          const isPositive = percentChange >= 0;
          const nextChange = (isPositive ? '+' : '') + delta.toFixed(2);
          const nextPercent = (isPositive ? '+' : '') + percentChange.toFixed(2) + '%';
          
          return {
            ...stock,
            price: parseFloat(nextPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: nextChange,
            changePercent: nextPercent,
            isPositive
          };
        })
      );
    }, 8000); // Update stocks every 8 seconds

    return () => clearInterval(timer);
  }, []);

  // Sync state helpers
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleSelectArticle = (art: Article) => {
    setSelectedArticle(art);
    // Scroll to top of article viewport
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleResetBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Determine filtering of main page if search is active
  const displayedArticles = searchQuery
    ? articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.abstract.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : articles;

  // Extract core news pieces for Homepage visual layouts
  const leadArticle = displayedArticles.find(a => a.type === 'lead') || articles[0];
  const secondaryArticles = displayedArticles.filter(a => a.type === 'secondary');
  const breakingArticles = displayedArticles.filter(a => a.type === 'breaking');
  const latestArticles = displayedArticles.filter(a => a.type === 'latest');
  const opinionArticles = displayedArticles.filter(a => a.type === 'opinion');
  const mainBusinessArticle = displayedArticles.find(a => a.type === 'business') || articles[11];
  const extraBusinessArticles = displayedArticles.filter(a => a.type === 'business' && a.id !== mainBusinessArticle.id);

  // Theme styling mapper
  const getThemeClasses = () => {
    switch (theme) {
      case 'light': return 'bg-[#fcfcfc] text-[#121212] border-gray-200';
      case 'sepia': return 'bg-[#f4eccf] text-[#4f3824] border-[#d3c8a1]';
      case 'dark': return 'bg-[#121212] text-[#f3f3f3] border-zinc-800 dark';
    }
  };

  const getCardBg = () => {
    if (theme === 'dark') return 'bg-zinc-950/20 hover:bg-zinc-950/40 border-zinc-900';
    if (theme === 'sepia') return 'bg-[#eae0bc]/40 hover:bg-[#e1d5aa]/60 border-[#e1d5aa]';
    return 'bg-white hover:bg-gray-50/50 border-gray-100';
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''} ${getThemeClasses()} transition-colors duration-200 font-sans`}>
      
      {/* Drawer Overlay for section list */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          {/* Drawer Panel */}
          <div className="relative w-80 max-w-full bg-[#fcfcfc] dark:bg-zinc-950 text-[#121212] dark:text-[#f3f3f3] h-full flex flex-col p-6 shadow-2xl border-r border-gray-200 dark:border-zinc-800 animate-slide-in">
            <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200 dark:border-zinc-800">
              <h2 className="font-gothic text-xl" style={{ fontFamily: 'UnifrakturMaguntia, serif' }}>
                The New York Times
              </h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar flex-1 text-sm font-sans font-bold">
              <button
                onClick={() => { setActiveTab('home'); setSelectedArticle(null); setIsDrawerOpen(false); }}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 ${activeTab === 'home' && !selectedArticle ? 'bg-gray-100 dark:bg-zinc-900' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
              >
                <Home className="w-4 h-4" />
                <span>Homepage</span>
              </button>
              <button
                onClick={() => { setActiveTab('sections'); setSelectedArticle(null); setIsDrawerOpen(false); }}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 ${activeTab === 'sections' ? 'bg-gray-100 dark:bg-zinc-900' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
              >
                <Compass className="w-4 h-4" />
                <span>Browse Sections</span>
              </button>
              <button
                onClick={() => { setActiveTab('foryou'); setSelectedArticle(null); setIsDrawerOpen(false); }}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 ${activeTab === 'foryou' ? 'bg-gray-100 dark:bg-zinc-900' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>For You (Saved)</span>
              </button>
              <button
                onClick={() => { setActiveTab('live'); setSelectedArticle(null); setIsDrawerOpen(false); }}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 ${activeTab === 'live' ? 'bg-gray-100 dark:bg-zinc-900' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
              >
                <PlayCircle className="w-4 h-4" />
                <span>Live News Updates</span>
              </button>
              <button
                onClick={() => { setActiveTab('audio'); setSelectedArticle(null); setIsDrawerOpen(false); }}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 ${activeTab === 'audio' ? 'bg-gray-100 dark:bg-zinc-900' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
              >
                <Headphones className="w-4 h-4" />
                <span>Audio Narrator</span>
              </button>
              <button
                onClick={() => { setActiveTab('account'); setSelectedArticle(null); setIsDrawerOpen(false); }}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer flex items-center gap-2.5 ${activeTab === 'account' ? 'bg-gray-100 dark:bg-zinc-900' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/40'}`}
              >
                <User className="w-4 h-4" />
                <span>Settings & Profile</span>
              </button>
            </nav>

            <div className="pt-6 border-t border-gray-200 dark:border-zinc-800 text-[10px] text-gray-500 font-mono mt-auto">
              <div>SUBSCRIBER IDENTITY:</div>
              <div className="font-bold text-gray-700 dark:text-zinc-300 truncate">{userEmail}</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Component */}
      <Header
        onMenuToggle={() => setIsDrawerOpen(true)}
        onSearchOpen={() => setIsSearchOpen(!isSearchOpen)}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) {
            setActiveTab('home');
            setSelectedArticle(null);
          }
        }}
        userEmail={userEmail}
      />

      {/* Primary Workspace Scroll Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto pb-16">
        {selectedArticle ? (
          /* IMMERSIVE ARTICLE READING SCREEN */
          <ArticleView
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(selectedArticle.id)}
            theme={theme}
            textSize={textSize}
            userEmail={userEmail}
          />
        ) : (
          /* TAB ROUTING RENDERS */
          <>
            {activeTab === 'sections' && (
              <SectionsTab articles={articles} onSelectArticle={handleSelectArticle} />
            )}

            {activeTab === 'foryou' && (
              <ForYouTab
                articles={articles}
                bookmarkedIds={bookmarkedIds}
                onSelectArticle={handleSelectArticle}
                userEmail={userEmail}
              />
            )}

            {activeTab === 'live' && <LiveTab />}

            {activeTab === 'audio' && (
              <AudioTab articles={articles} onSelectArticle={handleSelectArticle} />
            )}

            {activeTab === 'account' && (
              <AccountTab
                theme={theme}
                onThemeChange={setTheme}
                textSize={textSize}
                onTextSizeChange={setTextSize}
                userEmail={userEmail}
                onResetBookmarks={handleResetBookmarks}
              />
            )}

            {/* --- HOME TAB (CLASSIC NYT HOME SCREEN MOCKUP) --- */}
            {activeTab === 'home' && (
              <div className="px-4 py-6 md:py-10 max-w-5xl mx-auto flex flex-col gap-8 transition-colors duration-200">
                
                {/* --- 1. LEAD ARTICLE HERO (matches top screen) --- */}
                <section className="flex flex-col gap-4 border-b border-gray-200 dark:border-zinc-800 pb-8" id="home-lead-section">
                  <div className="flex flex-col gap-2">
                    {/* Section Label */}
                    <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400 font-sans">
                      {leadArticle.section}
                    </span>
                    {/* Headline */}
                    <h2 
                      onClick={() => handleSelectArticle(leadArticle)}
                      className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#121212] dark:text-[#f3f3f3] hover:text-gray-700 dark:hover:text-zinc-300 transition-colors cursor-pointer leading-tight tracking-tight text-left"
                    >
                      {leadArticle.title}
                    </h2>
                    {/* Abstract */}
                    <p className="font-sans text-sm sm:text-base text-gray-700 dark:text-zinc-300 leading-relaxed text-left max-w-4xl mt-1.5">
                      {leadArticle.abstract}
                    </p>
                  </div>

                  {/* Hero Photo with hotlink support */}
                  {leadArticle.imageUrl && (
                    <div 
                      onClick={() => handleSelectArticle(leadArticle)}
                      className="w-full h-auto max-h-[440px] overflow-hidden rounded-md border border-gray-100 dark:border-zinc-900 shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                    >
                      <img
                        src={leadArticle.imageUrl}
                        alt={leadArticle.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-sans">
                    <span className="font-extrabold tracking-wider text-gray-700 dark:text-zinc-400">{leadArticle.author}</span>
                    <span>{leadArticle.date}</span>
                  </div>
                </section>

                {/* --- 2. SECONDARY STORIES (Inflation + Transit) --- */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-200 dark:border-zinc-800 pb-8" id="home-secondary-section">
                  {secondaryArticles.slice(0, 2).map((art, idx) => (
                    <div 
                      key={art.id} 
                      className={`flex flex-col gap-3 pr-0 md:pr-4 last:pr-0 ${idx === 0 ? 'md:border-r border-gray-200 dark:border-zinc-800' : ''}`}
                    >
                      <h3 
                        onClick={() => handleSelectArticle(art)}
                        className="font-serif text-xl sm:text-2xl font-bold hover:text-gray-700 dark:hover:text-zinc-300 cursor-pointer transition-colors leading-tight"
                      >
                        {art.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                        {art.abstract}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-mono">
                        <span>{art.author}</span>
                        <span>{art.readTime} min read</span>
                      </div>
                    </div>
                  ))}
                </section>

                {/* --- 3. BREAKING NEWS TICKER ROW (Starship + Senate) --- */}
                <section className="bg-red-50/20 dark:bg-red-950/5 border-l-4 border-red-600 p-4 rounded" id="home-breaking-section">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-600 font-sans">
                      Breaking News
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {breakingArticles.slice(0, 2).map((art, idx) => (
                      <div key={art.id} className={`flex flex-col gap-1 ${idx === 0 ? 'border-b border-gray-100 dark:border-zinc-900 pb-3' : ''}`}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[10px] font-black text-red-600 font-mono tracking-wider uppercase flex-shrink-0">
                            {art.timeAgo || 'LIVE'}
                          </span>
                          <h5 
                            onClick={() => handleSelectArticle(art)}
                            className="font-serif text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-zinc-300 transition-colors cursor-pointer leading-snug text-left"
                          >
                            {art.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* --- 4. LATEST NEWS LIST (Culture + Science, camera & jellyfish) --- */}
                <section className="border-b border-gray-200 dark:border-zinc-800 pb-8" id="home-latest-section">
                  <div className="border-b-2 border-[#121212] dark:border-zinc-800 pb-1.5 mb-5 flex justify-between items-baseline">
                    <h4 className="font-sans text-xs font-black uppercase tracking-widest text-[#121212] dark:text-[#f3f3f3]">
                      Latest News
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {latestArticles.slice(0, 2).map((art) => (
                      <div 
                        key={art.id}
                        onClick={() => handleSelectArticle(art)}
                        className={`p-4 border rounded-xl flex gap-4 cursor-pointer hover:border-gray-400 transition-all ${getCardBg()}`}
                      >
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400 font-sans">
                              {art.section}
                            </span>
                            <h5 className="font-serif text-sm sm:text-base font-bold leading-tight mt-1 line-clamp-2">
                              {art.title}
                            </h5>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-zinc-500 mt-2 line-clamp-1">
                            By {art.author.replace('BY ', '')}
                          </p>
                        </div>
                        {art.imageUrl && (
                          <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-lg flex-shrink-0 border border-gray-100 dark:border-zinc-900">
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => setActiveTab('sections')}
                      className="px-6 py-2 border border-gray-300 dark:border-zinc-700 rounded text-xs font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      View More
                    </button>
                  </div>
                </section>

                {/* --- 5. OPINION COLUMNS (Brooks, Dowd, Klein, Goldberg) --- */}
                <section className="border-b border-gray-200 dark:border-zinc-800 pb-8" id="home-opinion-section">
                  <div className="border-b-4 border-double border-gray-300 dark:border-zinc-800 pb-2 mb-6 text-center sm:text-left">
                    <h2 
                      className="font-serif text-3xl font-black italic tracking-tight"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Opinion
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {opinionArticles.slice(0, 4).map((art, idx) => (
                      <div 
                        key={art.id}
                        className={`flex flex-col justify-between pb-4 sm:pb-0 ${
                          idx !== 3 ? 'border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-zinc-800 pr-0 sm:pr-4' : ''
                        }`}
                      >
                        <div className="flex flex-col gap-1.5">
                          {/* Columnist Author Name */}
                          <span className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
                            {art.author}
                          </span>
                          <h4 
                            onClick={() => handleSelectArticle(art)}
                            className="font-serif text-base font-bold leading-tight hover:text-gray-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                          >
                            {art.title}
                          </h4>
                          <p className="font-serif text-xs text-gray-500 dark:text-zinc-400 italic mt-1 line-clamp-3">
                            "{art.abstract}"
                          </p>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-4 font-mono">
                          {art.readTime} min read
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* --- 6. BUSINESS SECTION (Market stock indices + Skyscrapers) --- */}
                <section className="pb-8" id="home-business-section">
                  <div className="border-b-2 border-[#121212] dark:border-zinc-800 pb-2 mb-6 flex justify-between items-baseline">
                    <h2 className="font-serif text-2xl font-black">Business</h2>
                    <span 
                      onClick={() => setActiveTab('sections')}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-sans"
                    >
                      <span>Market Data</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* ACTIVE FINANCIAL STOCK MARKET INDEX TICKER ROW */}
                  <div className="w-full bg-gray-100/50 dark:bg-zinc-950/30 border border-gray-200 dark:border-zinc-900 rounded-lg py-2.5 px-4 mb-6 flex items-center gap-6 overflow-x-auto no-scrollbar tracking-tight select-none">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex-shrink-0">
                      LIVE INDEXES:
                    </div>
                    {stocks.map((stock) => (
                      <div key={stock.symbol} className="flex items-center gap-2 text-xs flex-shrink-0">
                        <span className="font-sans font-extrabold text-[#121212] dark:text-white">{stock.symbol}</span>
                        <span className="font-mono font-medium">{stock.price}</span>
                        <span className={`font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          stock.isPositive 
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                            : 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                        }`}>
                          {stock.changePercent}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Large Business Showcase row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left: Large showcased Business Lead (Skyscrapers photo) */}
                    <div className="md:col-span-2 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 pb-6 md:pb-0 pr-0 md:pr-6">
                      {mainBusinessArticle.imageUrl && (
                        <div 
                          onClick={() => handleSelectArticle(mainBusinessArticle)}
                          className="w-full h-52 sm:h-64 overflow-hidden rounded-md border cursor-pointer hover:opacity-95 transition-opacity"
                        >
                          <img
                            src={mainBusinessArticle.imageUrl}
                            alt={mainBusinessArticle.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex flex-col gap-1.5">
                        <h3 
                          onClick={() => handleSelectArticle(mainBusinessArticle)}
                          className="font-serif text-xl sm:text-2xl font-bold leading-tight hover:text-gray-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                        >
                          {mainBusinessArticle.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                          {mainBusinessArticle.abstract}
                        </p>
                        <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-mono">
                          <span className="font-bold text-gray-600 dark:text-zinc-500 uppercase tracking-wide">{mainBusinessArticle.author}</span>
                          <span>{mainBusinessArticle.readTime} min read</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Business extra bullet lists */}
                    <div className="flex flex-col gap-4 justify-between">
                      {extraBusinessArticles.slice(0, 4).map((art, idx) => (
                        <div 
                          key={art.id} 
                          onClick={() => handleSelectArticle(art)}
                          className={`flex flex-col gap-1 group cursor-pointer pb-3 last:pb-0 ${
                            idx !== 3 ? 'border-b border-gray-100 dark:border-zinc-900/60' : ''
                          }`}
                        >
                          <h4 className="font-serif text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors leading-tight">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-sans line-clamp-1 mt-0.5">
                            {art.abstract}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* Classic Footer component */}
                <Footer onSectionClick={(secName) => {
                  // Direct sections routing inside footer links
                  const targetSec = ['World', 'Business', 'Opinion', 'Science', 'Culture'].find(
                    s => s.toLowerCase() === secName.toLowerCase() || secName.toLowerCase().includes(s.toLowerCase())
                  );
                  if (targetSec) {
                    setActiveTab('sections');
                  } else {
                    setActiveTab('home');
                  }
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} />

              </div>
            )}
          </>
        )}
      </main>

      {/* --- PREMIUM BOTTOM STICKY NAVIGATION BAR (Matches screenshot precisely!) --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fcfcfc]/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-gray-200 dark:border-zinc-800 shadow-lg py-2.5 px-4 flex justify-around items-center text-[10px] font-sans font-bold select-none transition-colors duration-200">
        
        {/* Sections button */}
        <button
          onClick={() => { setActiveTab('sections'); setSelectedArticle(null); }}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'sections' && !selectedArticle ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-gray-500 hover:text-[#121212] dark:hover:text-white'
          }`}
          id="nav-sections-tab"
        >
          <Compass className="w-[19px] h-[19px]" />
          <span>Sections</span>
        </button>

        {/* For You button */}
        <button
          onClick={() => { setActiveTab('foryou'); setSelectedArticle(null); }}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'foryou' && !selectedArticle ? 'text-amber-500 scale-105' : 'text-gray-500 hover:text-[#121212] dark:hover:text-white'
          }`}
          id="nav-foryou-tab"
        >
          <Sparkles className="w-[19px] h-[19px]" />
          <span>For You</span>
        </button>

        {/* Live button */}
        <button
          onClick={() => { setActiveTab('live'); setSelectedArticle(null); }}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'live' && !selectedArticle ? 'text-red-600 scale-105' : 'text-gray-500 hover:text-[#121212] dark:hover:text-white'
          }`}
          id="nav-live-tab"
        >
          <div className="relative">
            <PlayCircle className="w-[19px] h-[19px]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
          </div>
          <span>Live</span>
        </button>

        {/* Audio button */}
        <button
          onClick={() => { setActiveTab('audio'); setSelectedArticle(null); }}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'audio' && !selectedArticle ? 'text-purple-600 scale-105' : 'text-gray-500 hover:text-[#121212] dark:hover:text-white'
          }`}
          id="nav-audio-tab"
        >
          <Headphones className="w-[19px] h-[19px]" />
          <span>Audio</span>
        </button>

        {/* Account settings button */}
        <button
          onClick={() => { setActiveTab('account'); setSelectedArticle(null); }}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            activeTab === 'account' && !selectedArticle ? 'text-emerald-600 dark:text-emerald-400 scale-105' : 'text-gray-500 hover:text-[#121212] dark:hover:text-white'
          }`}
          id="nav-account-tab"
        >
          <User className="w-[19px] h-[19px]" />
          <span>Account</span>
        </button>
      </nav>

    </div>
  );
}
