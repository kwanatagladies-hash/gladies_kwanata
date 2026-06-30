/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  author: string;
  location: string;
  text: string;
  date: string;
  likes: number;
  isNYTPick: boolean;
  isVerified: boolean;
}

export interface Article {
  id: string;
  title: string;
  abstract: string;
  content: string[];
  section: string; // "World" | "Opinion" | "Business" | "Technology" | "Science" | "Culture" | "Politics"
  author: string;
  date: string;
  imageUrl?: string;
  imageCaption?: string;
  type: 'lead' | 'secondary' | 'breaking' | 'latest' | 'opinion' | 'business';
  isBreaking?: boolean;
  timeAgo?: string;
  readTime: number; // in minutes
  quote?: string; // used for opinions
  marketSymbols?: string[]; // related stock symbols
  comments?: Comment[];
}

export interface StockTicker {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export interface LiveFeedItem {
  id: string;
  time: string;
  title: string;
  text: string;
  category: string;
}

export type ThemeType = 'light' | 'sepia' | 'dark';
export type TextSizeType = 'sm' | 'md' | 'lg' | 'xl';
