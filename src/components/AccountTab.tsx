/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Shield, Sparkles, Sun, Moon, Type, RefreshCw, CheckCircle, Award, Volume2 } from 'lucide-react';
import { ThemeType, TextSizeType } from '../types';

interface AccountTabProps {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  textSize: TextSizeType;
  onTextSizeChange: (size: TextSizeType) => void;
  userEmail: string;
  onResetBookmarks: () => void;
}

export default function AccountTab({
  theme,
  onThemeChange,
  textSize,
  onTextSizeChange,
  userEmail,
  onResetBookmarks,
}: AccountTabProps) {
  // WORDLE STATES
  const SECRET_WORDS = ["TIMES", "WORLD", "CLIME", "SPACE", "TRANS", "MEDIA"];
  const [secretWord, setSecretWord] = useState("TIMES");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [stats, setStats] = useState({ played: 0, won: 0 });

  useEffect(() => {
    // Pick a random secret word
    const randomWord = SECRET_WORDS[Math.floor(Math.random() * SECRET_WORDS.length)];
    setSecretWord(randomWord);
  }, []);

  // Keyboard helper
  const handleKeyClick = (key: string) => {
    if (gameStatus !== 'PLAYING') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        showMessage("Word must be 5 letters");
        return;
      }

      const nextGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(nextGuesses);
      setCurrentGuess("");

      if (currentGuess.toUpperCase() === secretWord) {
        setGameStatus('WON');
        setStats(s => ({ played: s.played + 1, won: s.won + 1 }));
        showMessage("Genius! You solved today's Wordle.");
      } else if (nextGuesses.length >= 6) {
        setGameStatus('LOST');
        setStats(s => ({ played: s.played + 1, won: s.won }));
        showMessage(`Game Over! The word was: ${secretWord}`);
      }
    } else if (key === 'BACK') {
      setCurrentGuess(curr => curr.slice(0, -1));
    } else if (/^[A-Z]$/i.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(curr => curr + key.toUpperCase());
      }
    }
  };

  const showMessage = (msg: string) => {
    setGameMessage(msg);
    setTimeout(() => {
      setGameMessage(null);
    }, 4000);
  };

  const resetGame = () => {
    const randomWord = SECRET_WORDS[Math.floor(Math.random() * SECRET_WORDS.length)];
    setSecretWord(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus('PLAYING');
    setGameMessage(null);
  };

  // Check letter correctness
  const getLetterStatus = (letter: string, index: number, guess: string) => {
    const cleanLetter = letter.toUpperCase();
    const cleanSecret = secretWord.toUpperCase();

    if (cleanSecret[index] === cleanLetter) {
      return 'bg-emerald-600 border-emerald-600 text-white'; // Correct place
    }
    if (cleanSecret.includes(cleanLetter)) {
      return 'bg-yellow-500 border-yellow-500 text-white'; // Present elsewhere
    }
    return 'bg-gray-400 dark:bg-zinc-700 border-gray-400 dark:border-zinc-700 text-white'; // Incorrect
  };

  // Keyboard color states
  const getKeyboardKeyColor = (key: string) => {
    let bestColor = 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border-gray-200 dark:border-zinc-700';
    
    for (const guess of guesses) {
      const idx = guess.indexOf(key);
      if (idx !== -1) {
        if (secretWord[idx] === key) {
          return 'bg-emerald-600 text-white border-emerald-600'; // Green is absolute
        }
        if (secretWord.includes(key)) {
          bestColor = 'bg-yellow-500 text-white border-yellow-500';
        } else if (bestColor.includes('bg-gray-100')) {
          bestColor = 'bg-gray-300 dark:bg-zinc-700 text-gray-500 border-zinc-600';
        }
      }
    }
    return bestColor;
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 text-[#121212] dark:text-[#f3f3f3] font-sans pb-24">
      
      {/* Account Masthead Info */}
      <div className="border-b border-gray-200 dark:border-zinc-800 pb-6 mb-8">
        <h2 className="font-serif text-3xl font-bold tracking-tight">Your Member Account</h2>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
          Manage digital subscriptions, visual preferences, and mini-games.
        </p>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/40 rounded-lg flex items-center gap-3.5">
            <Award className="w-8 h-8 text-amber-500" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Membership Tier</div>
              <div className="text-sm font-bold text-gray-800 dark:text-zinc-200">Premium All-Access</div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/40 rounded-lg flex items-center gap-3.5">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Subscriber Identity</div>
              <div className="text-sm font-bold text-gray-800 dark:text-zinc-200 line-clamp-1">{userEmail}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Settings Block */}
      <section className="mb-10">
        <h3 className="font-serif text-xl font-bold border-b border-gray-100 dark:border-zinc-900 pb-2 mb-4">Reading Preferences</h3>
        
        {/* Theme Settings */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
            Visual Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', name: 'Classic Light', icon: Sun, style: 'bg-[#fcfcfc] border-gray-200 text-[#121212]' },
              { id: 'sepia', name: 'Sepia Reader', icon: BookCircleIcon, style: 'bg-[#f4eccf] border-[#e1d5aa] text-[#4f3824]' },
              { id: 'dark', name: 'Midnight Dark', icon: Moon, style: 'bg-[#121212] border-zinc-800 text-gray-300' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id as ThemeType)}
                className={`p-3.5 border rounded-lg flex flex-col items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer shadow-sm ${t.style} ${
                  theme === t.id ? 'ring-2 ring-blue-500 scale-102 border-transparent' : 'hover:opacity-80'
                }`}
              >
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Size settings */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
            Typography Scale
          </label>
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-900 rounded-lg">
            {[
              { id: 'sm', label: 'A-', title: 'Small' },
              { id: 'md', label: 'A', title: 'Default' },
              { id: 'lg', label: 'A+', title: 'Large' },
              { id: 'xl', label: 'A++', title: 'Extra Large' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => onTextSizeChange(size.id as TextSizeType)}
                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  textSize === size.id
                    ? 'bg-white dark:bg-zinc-800 text-[#121212] dark:text-[#f3f3f3] shadow-sm'
                    : 'text-gray-500 hover:text-[#121212]'
                }`}
                title={size.title}
              >
                {size.label} ({size.title})
              </button>
            ))}
          </div>
        </div>

        {/* Reset utilities */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (confirm("Reset all saved bookmarks?")) {
                onResetBookmarks();
                alert("Bookmarks successfully reset.");
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Local Bookmarks</span>
          </button>
        </div>
      </section>

      {/* --- PLAYABLE NYT WORDLE GAME --- */}
      <section className="border-t border-gray-200 dark:border-zinc-800 pt-10" id="wordle-game-area">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-900 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#121212] dark:bg-zinc-800 flex items-center justify-center rounded text-white font-serif font-black text-xs select-none">
              W
            </span>
            <h3 className="font-serif text-xl font-bold tracking-tight">The Mini Wordle</h3>
          </div>
          <div className="text-[11px] font-mono font-semibold text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-900 px-2.5 py-1 rounded">
            Stats: {stats.won}/{stats.played} Wins
          </div>
        </div>

        {/* Wordle Message Banner */}
        {gameMessage && (
          <div className="mb-4 text-center text-xs font-bold bg-zinc-900 dark:bg-zinc-800 text-white p-2 rounded shadow-md animate-pulse">
            {gameMessage}
          </div>
        )}

        {/* Wordle Grid */}
        <div className="grid grid-rows-6 gap-1.5 max-w-[250px] mx-auto mb-6">
          {Array.from({ length: 6 }).map((_, rowIndex) => {
            const guess = guesses[rowIndex];
            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  let char = "";
                  let statusClass = "bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-800 text-[#121212] dark:text-white";

                  if (guess) {
                    char = guess[colIndex] || "";
                    statusClass = getLetterStatus(char, colIndex, guess);
                  } else if (rowIndex === guesses.length) {
                    char = currentGuess[colIndex] || "";
                    if (char) {
                      statusClass = "bg-white dark:bg-zinc-900 border-gray-500 dark:border-zinc-500 text-[#121212] dark:text-white scale-102";
                    }
                  }

                  return (
                    <div
                      key={colIndex}
                      className={`w-11 h-11 border-2 flex items-center justify-center text-sm font-extrabold rounded select-none uppercase tracking-wide transition-all duration-300 ${statusClass}`}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Wordle Keyboard */}
        <div className="space-y-1.5 max-w-lg mx-auto select-none mb-6">
          {keyboardRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1.5">
              {row.map((key) => {
                const colorClass = getKeyboardKeyColor(key);
                const isSpecial = key === 'ENTER' || key === 'BACK';
                return (
                  <button
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    className={`py-3 rounded text-[11px] font-extrabold uppercase transition-all flex items-center justify-center cursor-pointer ${colorClass} ${
                      isSpecial ? 'px-2.5 sm:px-4 flex-grow max-w-[80px]' : 'w-7 sm:w-9'
                    }`}
                  >
                    {key === 'BACK' ? 'Del' : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Game Completed Panel */}
        {gameStatus !== 'PLAYING' && (
          <div className="text-center mt-4">
            <button
              onClick={resetGame}
              className="px-6 py-2.5 bg-[#121212] dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shadow-md"
              id="wordle-play-again-btn"
            >
              Play Again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// Stub for missing icon/component in React scope
function BookCircleIcon() {
  return <Type className="w-5 h-5" />;
}
