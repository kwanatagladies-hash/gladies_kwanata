/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, Music, Clock, ChevronRight } from 'lucide-react';
import { Article } from '../types';

interface AudioTabProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export default function AudioTab({ articles, onSelectArticle }: AudioTabProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article>(articles[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [progress, setProgress] = useState(0); // percentage 0 to 100
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get articles that have long-form text (all of them basically)
  const audioArticles = articles.filter(a => a.content && a.content.length > 0);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynth(window.speechSynthesis);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      stopProgressTimer();
    };
  }, []);

  // Sync state if speech synthesis was cancelled externally
  useEffect(() => {
    const checkState = setInterval(() => {
      if (speechSynth && !speechSynth.speaking && isPlaying) {
        setIsPlaying(false);
        setProgress(100);
        stopProgressTimer();
      }
    }, 1000);
    return () => clearInterval(checkState);
  }, [speechSynth, isPlaying]);

  const startProgressTimer = () => {
    stopProgressTimer();
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsPlaying(false);
          stopProgressTimer();
          return 100;
        }
        // Increment progress proportional to speed and article readTime
        const durationSec = selectedArticle.readTime * 60;
        const increment = (100 / durationSec) * playbackRate;
        return Math.min(p + increment, 100);
      });
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (!speechSynth) {
      alert("Text-to-speech not supported on this browser.");
      return;
    }

    if (isPlaying) {
      speechSynth.pause();
      setIsPlaying(false);
      stopProgressTimer();
    } else {
      if (speechSynth.paused && speechSynth.speaking) {
        speechSynth.resume();
        setIsPlaying(true);
        startProgressTimer();
      } else {
        speechSynth.cancel();
        
        // Construct the reading text
        const textToSpeak = `${selectedArticle.title}. Written by ${selectedArticle.author}. ${selectedArticle.content.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = playbackRate;
        
        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
          stopProgressTimer();
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          stopProgressTimer();
        };

        setCurrentUtterance(utterance);
        speechSynth.speak(utterance);
        setIsPlaying(true);
        setProgress(0);
        startProgressTimer();
      }
    }
  };

  const handleArticleSelect = (art: Article) => {
    if (speechSynth) {
      speechSynth.cancel();
    }
    setSelectedArticle(art);
    setIsPlaying(false);
    setProgress(0);
    stopProgressTimer();
  };

  const handleSkipForward = () => {
    setProgress(p => Math.min(p + 5, 100));
  };

  const handleSkipBackward = () => {
    setProgress(p => Math.max(p - 5, 0));
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (speechSynth) {
      // SpeechSynthesisUtterance rates can sometimes be updated live, but usually need restarting.
      // We will cancel and resume at new rate for consistency
      if (isPlaying) {
        speechSynth.cancel();
        const textToSpeak = `${selectedArticle.title}. ${selectedArticle.content.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = rate;
        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
          stopProgressTimer();
        };
        // Approximate resume position
        setCurrentUtterance(utterance);
        speechSynth.speak(utterance);
      }
    }
  };

  // Generate visual bars for the waveform
  const waveformBars = Array.from({ length: 45 }).map((_, i) => {
    // Generate height: static if paused, dancing if playing
    const height = isPlaying 
      ? Math.floor(Math.sin((i + Date.now() / 150)) * 24 + 32)
      : Math.floor(Math.sin(i * 0.5) * 12 + 20);
    return (
      <div 
        key={i} 
        className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#121212] dark:bg-gray-100' : 'bg-gray-300 dark:bg-zinc-700'}`} 
        style={{ height: `${Math.max(4, height)}px` }}
      />
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 text-[#121212] dark:text-[#f3f3f3] font-sans pb-24">
      
      {/* Title Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-zinc-800 pb-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight">NYT Audio Briefings</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1.5">
          Listen to high-quality narration of today's front page stories.
        </p>
      </div>

      {/* Main Large Audio Player */}
      <div className="w-full bg-gray-50 dark:bg-zinc-950/60 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 mb-10 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left Side: Photo or Visualizer */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 pb-6 md:pb-0 md:pr-8">
          {selectedArticle.imageUrl ? (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-md">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Music className="w-8 h-8 text-white/80 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center border border-gray-200 dark:border-zinc-800 shadow-inner">
              <Volume2 className="w-12 h-12 text-gray-400 dark:text-zinc-600 animate-pulse" />
            </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-2 py-1 rounded">
              {selectedArticle.section}
            </span>
            <div className="text-xs text-gray-500 mt-1.5 font-medium flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedArticle.readTime} minutes read</span>
            </div>
          </div>
        </div>

        {/* Right Side: Player Controls */}
        <div className="w-full md:w-3/5 flex flex-col justify-between self-stretch">
          <div>
            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-center md:text-left leading-tight">
              {selectedArticle.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1.5 text-center md:text-left">
              Written by <span className="font-semibold">{selectedArticle.author}</span>
            </p>
          </div>

          {/* Waveform Animation Area */}
          <div className="h-16 flex items-center justify-center gap-[3px] my-6 overflow-hidden select-none">
            {waveformBars}
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-6">
            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#121212] dark:bg-gray-100 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mt-2">
              <span>{Math.floor((progress / 100) * selectedArticle.readTime)}:00</span>
              <span>{selectedArticle.readTime}:00</span>
            </div>
          </div>

          {/* Controls button row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Rates */}
            <div className="flex gap-1.5 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-1 rounded-lg text-[10px] font-bold font-mono">
              {[0.75, 1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateChange(rate)}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    playbackRate === rate
                      ? 'bg-white dark:bg-zinc-800 text-[#121212] dark:text-[#f3f3f3] shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Standard Player buttons */}
            <div className="flex items-center gap-6">
              <button 
                onClick={handleSkipBackward}
                className="p-2 text-gray-600 dark:text-zinc-400 hover:text-[#121212] dark:hover:text-[#f3f3f3] transition-colors cursor-pointer"
                title="Rewind"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={handlePlayPause}
                className="w-12 h-12 rounded-full bg-[#121212] dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-[#121212] flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
                title={isPlaying ? "Pause" : "Play Narration"}
                id="audio-play-pause-btn"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button 
                onClick={handleSkipForward}
                className="p-2 text-gray-600 dark:text-zinc-400 hover:text-[#121212] dark:hover:text-[#f3f3f3] transition-colors cursor-pointer"
                title="Forward"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* View Article trigger */}
            <button
              onClick={() => onSelectArticle(selectedArticle)}
              className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-zinc-400 hover:text-[#121212] dark:hover:text-[#f3f3f3] flex items-center gap-1 cursor-pointer"
            >
              <span>Read Text</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* List of narrative-supported articles */}
      <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-4">
        Narrative Playlists
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audioArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => handleArticleSelect(art)}
            className={`p-4 border rounded-lg flex gap-4 cursor-pointer hover:border-gray-400 dark:hover:border-zinc-700 transition-all ${
              selectedArticle.id === art.id
                ? 'border-[#121212] dark:border-gray-100 bg-gray-50 dark:bg-zinc-950/40 shadow-sm'
                : 'border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/20'
            }`}
          >
            {art.imageUrl && (
              <img
                src={art.imageUrl}
                alt={art.title}
                referrerPolicy="no-referrer"
                className="w-16 h-16 object-cover rounded border border-gray-100 dark:border-zinc-900"
              />
            )}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400">
                  {art.section}
                </span>
                <h5 className="font-serif text-sm font-bold tracking-tight line-clamp-2 mt-0.5">
                  {art.title}
                </h5>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-zinc-500 font-sans mt-2">
                <span>By {art.author.replace('BY ', '')}</span>
                <span>•</span>
                <span>{art.readTime} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
