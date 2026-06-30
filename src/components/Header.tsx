/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, Bell, Search, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearchOpen: () => void;
  isSearchOpen: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  userEmail?: string;
}

export default function Header({
  onMenuToggle,
  onSearchOpen,
  isSearchOpen,
  searchQuery,
  onSearchChange,
  userEmail,
}: HeaderProps) {
  // Format current date: "Monday, June 29, 2026" or similar
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // Standard local time representation
    return new Date('2026-06-29T18:41:20-07:00').toLocaleDateString('en-US', options);
  };

  return (
    <header className="w-full bg-[#fcfcfc] dark:bg-[#121212] text-[#121212] dark:text-[#f3f3f3] transition-colors duration-200">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
        <button
          onClick={onMenuToggle}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
          aria-label="Toggle menu"
          id="header-menu-btn"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Masthead Title */}
        <div className="flex-1 flex justify-center">
          <h1 
            className="font-gothic text-3xl sm:text-4xl md:text-5xl text-[#121212] dark:text-[#f3f3f3] text-center select-none cursor-pointer tracking-tight"
            style={{ fontFamily: 'UnifrakturMaguntia, serif' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            id="header-logo"
          >
            The New York Times
          </h1>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onSearchOpen}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
            aria-label="Search articles"
            id="header-search-btn"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors relative cursor-pointer"
            aria-label="Notifications"
            id="header-notifications-btn"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Search Input Bar (Expands below header) */}
      {isSearchOpen && (
        <div className="w-full bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 transition-all duration-300">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for articles, opinions, and business news..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-base text-[#121212] dark:text-[#f3f3f3] font-sans placeholder-gray-400"
              autoFocus
              id="header-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 text-gray-400 hover:text-[#121212] dark:hover:text-[#f3f3f3]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Classic NYT Date Bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 text-xs text-gray-600 dark:text-zinc-400 font-sans border-double-bottom border-gray-300 dark:border-zinc-800 flex justify-between items-center tracking-tight select-none">
        <div className="font-semibold text-[11px] sm:text-xs">
          {formatDate()}
        </div>
        <div className="hidden sm:block font-serif italic text-gray-500 dark:text-zinc-500 text-[11px]">
          Today’s Paper
        </div>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium">
          <span>Sunny 72°F</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="hidden md:inline text-gray-400 font-light">|</span>
          <span className="hidden md:inline font-mono text-[10px]">EDITION: US/GLOBAL</span>
        </div>
      </div>
    </header>
  );
}
