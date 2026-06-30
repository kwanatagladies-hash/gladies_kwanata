/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Activity, Bell, Search, RefreshCw, Radio } from 'lucide-react';
import { LiveFeedItem } from '../types';
import { sampleLiveFeed } from '../data';

export default function LiveTab() {
  const [liveItems, setLiveItems] = useState<LiveFeedItem[]>(sampleLiveFeed);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [pulse, setPulse] = useState<boolean>(true);

  // Simple live pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Periodic simulated feed updates
  useEffect(() => {
    if (!isSimulating) return;

    const simulatedUpdates = [
      {
        id: "l6",
        time: "10:55 AM ET",
        title: "Pledges Mount in Loss & Damage Pipeline",
        text: "Germany and France have stepped forward with supplementary pledges of $80M and $75M respectively. Civil groups argue it represents a drop in the ocean, but financial markets greet the swift pledges favorably.",
        category: "World"
      },
      {
        id: "l7",
        time: "11:10 AM ET",
        title: "Starship Flight Telemetry Released",
        text: "SpaceX's engineering department has published initial flight analysis graphs. Flight velocity peaked at Mach 4.1. Structurally, the booster and tiles sustained virtually zero heat abrasion.",
        category: "Science"
      },
      {
        id: "l8",
        time: "11:25 AM ET",
        title: "Treasury Rates Fall Following Fed Remarks",
        text: "10-year Treasury yields dip to 4.12%, matching 5-month lows. Federal Reserve President repeats stance that interest rate cuts remain 'data-dependent' but notes softening pressures.",
        category: "Business"
      },
      {
        id: "l9",
        time: "11:40 AM ET",
        title: "Bipartisan Tech bill heads to the House",
        text: "Speaker of the House announces preliminary hearings on the antitrust bill will begin early next week. Anticipation of swift approval sends small-cap SaaS shares up 2.4%.",
        category: "Business"
      }
    ];

    let index = 0;
    const updateInterval = setInterval(() => {
      if (index < simulatedUpdates.length) {
        const nextItem = simulatedUpdates[index];
        // Check if item already exists to prevent duplicate adding
        setLiveItems(prev => {
          if (prev.some(item => item.id === nextItem.id)) return prev;
          return [nextItem, ...prev];
        });
        index++;
      } else {
        clearInterval(updateInterval);
      }
    }, 12000); // Add a new update every 12 seconds

    return () => clearInterval(updateInterval);
  }, [isSimulating]);

  // Handle reload/manual refresh simulation
  const handleManualRefresh = () => {
    setLiveItems(sampleLiveFeed);
    setIsSimulating(true);
  };

  const categories = ['All', 'World', 'Science', 'Business'];

  const filteredItems = liveItems.filter(item => {
    const matchesCategory = filter === 'All' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.text.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 text-[#121212] dark:text-[#f3f3f3] font-sans pb-24">
      
      {/* Header with Live Pulse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-5 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3.5 w-3.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 ${pulse ? 'scale-110' : ''}`}></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
            </span>
            <h2 className="font-sans text-xs font-black uppercase tracking-widest text-red-600">
              Live Breaking Coverage
            </h2>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight mt-1">
            Global Summit & Starship Flight
          </h1>
        </div>

        {/* Action controllers */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
              isSimulating 
                ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900' 
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-500 border-transparent'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isSimulating ? 'animate-pulse' : ''}`} />
            <span>{isSimulating ? 'Auto Updates On' : 'Auto Updates Off'}</span>
          </button>
          
          <button
            onClick={handleManualRefresh}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full transition-colors cursor-pointer"
            title="Reset Live Feed"
          >
            <RefreshCw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-8">
        
        {/* Category Pill Filters */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? 'bg-[#121212] dark:bg-gray-100 text-white dark:text-[#121212] shadow-sm font-bold'
                  : 'bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inline Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search live reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-100 dark:bg-zinc-900 border-none rounded-full outline-none text-[#121212] dark:text-[#f3f3f3]"
          />
        </div>
      </div>

      {/* Live Timeline list */}
      <div className="relative border-l-2 border-gray-200 dark:border-zinc-800 pl-6 sm:pl-8 space-y-10 py-2">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            No live updates found matching the criteria.
          </div>
        ) : (
          filteredItems.map((item, idx) => (
            <div key={item.id} className="relative group" id={`live-item-${item.id}`}>
              
              {/* Timeline marker node */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 bg-white dark:bg-[#121212] flex items-center justify-center p-1 rounded-full z-10">
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  idx === 0 
                    ? 'bg-red-600 border-red-600 animate-pulse scale-110 shadow-[0_0_8px_rgba(220,38,38,0.5)]' 
                    : 'bg-gray-200 dark:bg-zinc-700 border-gray-300 dark:border-zinc-800 group-hover:border-gray-500'
                }`} />
              </div>

              {/* Live Card Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 font-sans">
                <span className="text-xs font-extrabold text-red-600 font-mono tracking-tight bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded self-start">
                  {item.time}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                  {item.category}
                </span>
              </div>

              {/* Title & Body */}
              <h3 className="font-serif text-lg font-bold tracking-tight text-[#121212] dark:text-[#f3f3f3] group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-gray-700 dark:text-zinc-300 leading-relaxed mt-2.5">
                {item.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
