/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Globe, Briefcase, Landmark, Flame, Laptop, Database, Compass, Eye, ChevronRight, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface SectionsTabProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export default function SectionsTab({ articles, onSelectArticle }: SectionsTabProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sectionMeta = [
    { name: 'World', icon: Globe, desc: 'International affairs, global treaties, and foreign reports.', color: 'text-blue-600 border-blue-200 bg-blue-50/10' },
    { name: 'Business', icon: Briefcase, desc: 'Markets, economic shifts, inflation data, and tech startups.', color: 'text-emerald-600 border-emerald-200 bg-emerald-50/10' },
    { name: 'Politics', icon: Landmark, desc: 'Federal legislation, senate votes, and bipartisan policies.', color: 'text-purple-600 border-purple-200 bg-purple-50/10' },
    { name: 'Opinion', icon: Flame, desc: 'Critical columns, social connections, and editorial analysis.', color: 'text-orange-600 border-orange-200 bg-orange-50/10' },
    { name: 'Science', icon: Database, desc: 'Deep-sea discoveries, SpaceX spaceflights, and biology.', color: 'text-cyan-600 border-cyan-200 bg-cyan-50/10' },
    { name: 'Culture', icon: Eye, desc: 'Analog revivals, vintage photography, arts, and fashion trends.', color: 'text-pink-600 border-pink-200 bg-pink-50/10' },
  ];

  // Articles filtered by active section
  const sectionArticles = activeSection
    ? articles.filter(a => a.section.toLowerCase() === activeSection.toLowerCase())
    : [];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 text-[#121212] dark:text-[#f3f3f3] font-sans pb-24">
      
      {/* Dynamic Back button when inside a specific section list */}
      {activeSection ? (
        <div>
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#121212] dark:hover:text-[#f3f3f3] transition-colors mb-6 cursor-pointer"
            id="sections-back-btn"
          >
            <Compass className="w-4 h-4" />
            <span>All Sections</span>
          </button>
          
          <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-6">
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight">{activeSection} Archives</h2>
            <p className="text-xs text-gray-500 mt-1">
              Showing all verified {activeSection.toLowerCase()} publications.
            </p>
          </div>

          <div className="space-y-4">
            {sectionArticles.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-400">
                No articles published in this section yet.
              </div>
            ) : (
              sectionArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-4 border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/20 rounded-lg cursor-pointer hover:border-gray-400 transition-all flex gap-4 items-center"
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
                    <h3 className="font-serif text-base font-bold tracking-tight line-clamp-2 text-gray-900 dark:text-gray-100">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {art.abstract}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2 font-mono">
                      <span>{art.author}</span>
                      <span>•</span>
                      <span>{art.readTime} min read</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Main sections grid */}
          <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight">Browse Sections</h2>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Navigate today's publications categorized by global topics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectionMeta.map((section) => {
              const IconComp = section.icon;
              const count = articles.filter(a => a.section.toLowerCase() === section.name.toLowerCase()).length;
              
              return (
                <div
                  key={section.name}
                  onClick={() => setActiveSection(section.name)}
                  className="p-5 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 rounded-xl cursor-pointer hover:border-gray-400 dark:hover:border-zinc-700 hover:shadow-sm transition-all flex items-start gap-4"
                  id={`section-card-${section.name}`}
                >
                  <div className={`p-3 rounded-lg border ${section.color} flex-shrink-0`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-sans text-base font-bold text-gray-900 dark:text-gray-100">
                        {section.name}
                      </h3>
                      <span className="text-[10px] font-mono font-bold bg-gray-100 dark:bg-zinc-900 text-gray-500 px-2 py-0.5 rounded-full">
                        {count} {count === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1.5 leading-relaxed">
                      {section.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Games Banner (NYT Mini Games style!) */}
          <div className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-indigo-600 text-white rounded-lg font-serif font-black text-lg select-none">
                W
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  Play the NYT Mini Wordle
                </h4>
                <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80 mt-1 leading-relaxed">
                  Challenge yourself with a daily 5-letter word puzzle! Included free inside Account.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 dark:border-indigo-950/40">
              Interactive
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
