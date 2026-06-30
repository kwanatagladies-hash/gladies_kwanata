/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { ArrowLeft, Bookmark, Volume2, VolumeX, MessageSquare, Share2, ThumbsUp, Check, AlertCircle } from 'lucide-react';
import { Article, Comment, ThemeType, TextSizeType } from '../types';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  theme: ThemeType;
  textSize: TextSizeType;
  userEmail: string;
}

export default function ArticleView({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  theme,
  textSize,
  userEmail,
}: ArticleViewProps) {
  const [comments, setComments] = useState<Comment[]>(article.comments || []);
  const [activeFilter, setActiveFilter] = useState<'all' | 'picks' | 'verified'>('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [commenterLoc, setCommenterLoc] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynth(window.speechSynthesis);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Handle Share click
  const handleShare = () => {
    const url = `${window.location.origin}/article/${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Article link copied to clipboard!');
    }).catch(() => {
      showToast('Failed to copy link.');
    });
  };

  // Text-to-speech toggling
  const handleToggleSpeech = () => {
    if (!speechSynth) {
      showToast('Text-to-speech is not supported on this device.');
      return;
    }

    if (isSpeaking) {
      speechSynth.cancel();
      setIsSpeaking(false);
      showToast('Audio paused');
    } else {
      speechSynth.cancel(); // Stop any ongoing speech first
      const fullTextToRead = `${article.title}. Written by ${article.author}. Published on ${article.date}. ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(fullTextToRead);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      setSpeechUtterance(utterance);
      speechSynth.speak(utterance);
      setIsSpeaking(true);
      showToast('Now playing audio storytelling');
    }
  };

  // Add Comment
  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      setFormError('Comment text cannot be empty');
      return;
    }

    const nameToUse = commenterName.trim() || userEmail.split('@')[0] || 'Subscriber';
    const locToUse = commenterLoc.trim() || 'New York, NY';

    const newComment: Comment = {
      id: `custom-${Date.now()}`,
      author: nameToUse,
      location: locToUse,
      text: newCommentText.trim(),
      date: 'Just now',
      likes: 0,
      isNYTPick: false,
      isVerified: true, // Since the user is logged in
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setCommenterName('');
    setCommenterLoc('');
    setFormError(null);
    showToast('Your comment was posted successfully');
  };

  // Recommend (Like) Comment
  const handleRecommendComment = (id: string) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
    showToast('Recommended this comment');
  };

  // Filter Comments
  const filteredComments = comments.filter(c => {
    if (activeFilter === 'picks') return c.isNYTPick;
    if (activeFilter === 'verified') return c.isVerified;
    return true;
  });

  // Typography size classes mapping
  const getTitleSizeClass = () => {
    switch (textSize) {
      case 'sm': return 'text-2xl sm:text-3xl';
      case 'md': return 'text-3xl sm:text-4xl md:text-5xl';
      case 'lg': return 'text-4xl sm:text-5xl md:text-6xl';
      case 'xl': return 'text-5xl sm:text-6xl md:text-7xl';
    }
  };

  const getBodySizeClass = () => {
    switch (textSize) {
      case 'sm': return 'text-sm sm:text-base leading-relaxed';
      case 'md': return 'text-base sm:text-lg leading-relaxed';
      case 'lg': return 'text-lg sm:text-xl md:text-2xl leading-relaxed';
      case 'xl': return 'text-xl sm:text-2xl md:text-3xl leading-relaxed';
    }
  };

  return (
    <article className="w-full min-h-screen bg-[#fcfcfc] dark:bg-[#121212] pb-24 transition-colors duration-200 text-[#121212] dark:text-[#f3f3f3]">
      {/* Article Floating Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#fcfcfc]/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-gray-600 dark:text-zinc-400 hover:text-[#121212] dark:hover:text-[#f3f3f3] transition-colors cursor-pointer py-1 pr-3"
            id="article-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>

          {/* Section Indicator */}
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#121212] dark:text-[#f3f3f3]">
            {article.section}
          </span>

          {/* Floating Actions */}
          <div className="flex items-center gap-1">
            {/* Listen button */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer ${
                isSpeaking ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20' : 'text-gray-600 dark:text-zinc-400'
              }`}
              title={isSpeaking ? "Pause article reading" : "Read article aloud"}
              id="article-listen-btn"
            >
              {isSpeaking ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer ${
                isBookmarked ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-zinc-400'
              }`}
              title="Bookmark article"
              id="article-bookmark-btn"
            >
              <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 dark:text-zinc-400 hover:text-[#121212] dark:hover:text-[#f3f3f3] rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Share article link"
              id="article-share-btn"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto px-4 pt-8 md:pt-12">
        
        {/* Article Metadata */}
        <div className="flex flex-col gap-3 pb-6 border-b border-gray-200 dark:border-zinc-800 mb-8">
          
          {/* Section Tag */}
          <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
            {article.section}
          </div>

          {/* Headline */}
          <h1
            className={`font-serif font-black tracking-tight text-[#121212] dark:text-[#f3f3f3] leading-tight ${getTitleSizeClass()}`}
            id="article-headline"
          >
            {article.title}
          </h1>

          {/* Abstract */}
          <p className="font-serif text-lg md:text-xl text-gray-700 dark:text-zinc-300 italic leading-relaxed font-light mt-1">
            {article.abstract}
          </p>

          {/* Author Byline & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-600 dark:text-zinc-400 font-sans mt-3">
            <div className="font-semibold uppercase tracking-wide">
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>{article.readTime} min read</span>
              </span>
            </div>
          </div>
        </div>

        {/* Large Image (if available) */}
        {article.imageUrl && (
          <div className="w-full mb-8">
            <img
              src={article.imageUrl}
              alt={article.imageCaption || article.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[480px] object-cover border border-gray-100 dark:border-zinc-900"
              id="article-img"
            />
            {article.imageCaption && (
              <p className="text-xs text-gray-500 dark:text-zinc-500 font-sans mt-2.5 leading-relaxed italic">
                {article.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Text Body */}
        <div
          className={`font-serif text-gray-800 dark:text-zinc-200 space-y-6 ${getBodySizeClass()}`}
          id="article-body-content"
        >
          {article.content.map((para, idx) => {
            if (idx === 0) {
              // Apply dropcap to the very first letter of the first paragraph
              return (
                <p key={idx} className="nyt-dropcap leading-relaxed text-justify first-line:tracking-wide">
                  {para}
                </p>
              );
            }
            return (
              <p key={idx} className="leading-relaxed text-justify">
                {para}
              </p>
            );
          })}
        </div>

        {/* Opinion Quote Highlight (if available) */}
        {article.quote && (
          <div className="my-10 p-6 border-l-4 border-[#121212] dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 font-serif text-xl md:text-2xl text-gray-700 dark:text-zinc-300 italic leading-relaxed">
            "{article.quote}"
          </div>
        )}

        {/* End of article marker */}
        <div className="flex items-center justify-center gap-2 my-12">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
          <span className="w-3 h-3 border border-gray-400 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
        </div>

        {/* --- COMMENTS SECTION --- */}
        <section className="w-full mt-16 pt-10 border-t border-gray-300 dark:border-zinc-800" id="comments-section">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-gray-500" />
              <span>Comments ({comments.length})</span>
            </h3>
            <span className="text-xs font-sans text-gray-500">Verified Subscriber Area</span>
          </div>

          {/* Add a Comment Form */}
          <form onSubmit={handleAddComment} className="mb-10 bg-gray-50 dark:bg-zinc-950/40 border border-gray-200 dark:border-zinc-800 p-4 sm:p-5 rounded-lg">
            <h4 className="font-sans text-sm font-bold text-gray-700 dark:text-zinc-300 mb-4">
              Join the Conversation
            </h4>
            
            {formError && (
              <div className="mb-4 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/10 p-2.5 rounded">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                  Display Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-full p-2.5 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded outline-none focus:border-gray-400 dark:focus:border-zinc-700 text-[#121212] dark:text-[#f3f3f3]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Seattle, WA"
                  value={commenterLoc}
                  onChange={(e) => setCommenterLoc(e.target.value)}
                  className="w-full p-2.5 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded outline-none focus:border-gray-400 dark:focus:border-zinc-700 text-[#121212] dark:text-[#f3f3f3]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                Your Comment
              </label>
              <textarea
                rows={3}
                placeholder="Share your perspective respectfully. NYT readers value thoughtful analysis..."
                value={newCommentText}
                onChange={(e) => {
                  setNewCommentText(e.target.value);
                  if (formError) setFormError(null);
                }}
                maxLength={1000}
                className="w-full p-3 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded outline-none focus:border-gray-400 dark:focus:border-zinc-700 text-[#121212] dark:text-[#f3f3f3] resize-none h-24"
              />
              <div className="flex justify-end text-[10px] text-gray-400 mt-1">
                {newCommentText.length}/1000 characters
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[11px] text-gray-500 dark:text-zinc-500 font-sans">
                Posting as: <span className="font-semibold text-gray-700 dark:text-zinc-300">{commenterName.trim() || userEmail.split('@')[0]}</span>
              </div>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold tracking-wider uppercase bg-[#121212] dark:bg-zinc-800 hover:bg-gray-800 dark:hover:bg-zinc-700 text-white dark:text-gray-100 rounded transition-colors cursor-pointer"
                id="comment-submit-btn"
              >
                Submit Comment
              </button>
            </div>
          </form>

          {/* Comment Filters */}
          <div className="flex border-b border-gray-200 dark:border-zinc-800 mb-6 gap-6 text-xs font-sans font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'border-[#121212] dark:border-[#f3f3f3] text-[#121212] dark:text-[#f3f3f3]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
              }`}
            >
              All Comments ({comments.length})
            </button>
            <button
              onClick={() => setActiveFilter('picks')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeFilter === 'picks'
                  ? 'border-[#121212] dark:border-[#f3f3f3] text-[#121212] dark:text-[#f3f3f3]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
              }`}
            >
              NYT Picks ({comments.filter(c => c.isNYTPick).length})
            </button>
            <button
              onClick={() => setActiveFilter('verified')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeFilter === 'verified'
                  ? 'border-[#121212] dark:border-[#f3f3f3] text-[#121212] dark:text-[#f3f3f3]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
              }`}
            >
              Verified Subscriber ({comments.filter(c => c.isVerified).length})
            </button>
          </div>

          {/* Comments Feed List */}
          <div className="space-y-6">
            {filteredComments.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-500 dark:text-zinc-500">
                No comments found under this filter.
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="pb-6 border-b border-gray-100 dark:border-zinc-900/60 flex flex-col gap-2 last:border-0"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-gray-800 dark:text-zinc-200">
                          {comment.author}
                        </span>
                        {comment.isVerified && (
                          <span className="text-[9px] font-semibold bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Verified
                          </span>
                        )}
                        {comment.isNYTPick && (
                          <span className="text-[9px] font-semibold bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            NYT Pick
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
                        {comment.location} • {comment.date}
                      </span>
                    </div>

                    {/* Recommend / Like button */}
                    <button
                      onClick={() => handleRecommendComment(comment.id)}
                      className="flex items-center gap-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-sans font-medium transition-colors border border-gray-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-full hover:bg-emerald-50/10 cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.likes} Recommend</span>
                    </button>
                  </div>

                  <p className="font-sans text-sm text-gray-700 dark:text-zinc-300 leading-relaxed pl-1">
                    {comment.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Interactive Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#121212] dark:bg-zinc-800 text-white dark:text-gray-100 text-xs font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in border border-zinc-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </article>
  );
}
