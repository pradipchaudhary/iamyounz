/**
 * Centralized TypeScript Type Definitions
 * Best practices for application domain models and API contracts.
 */

export interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  avatarUrl: string;
  subscriberCount: number;
  subscriberCountFormatted: string;
  viewCount: number;
  viewCountFormatted: string;
  videoCount: number;
  videoCountFormatted: string;
}

export interface Video {
  id: string;
  title: string;
  cleanTitle?: string;
  description: string;
  thumbnail: string;
  category: string;
  publishedAt: string;
  publishedAtFormatted?: string;
  publishedAtRaw?: string;
  duration?: string;
  durationSeconds?: number;
  views?: string;
  viewCount?: number;
  likeCount?: number;
  quote?: string;
  isShort?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  count?: number;
}

export interface YouTubeStats {
  totalStories: number;
  subscribersFormatted: string;
  viewsFormatted: string;
  categoriesCount: Record<string, number>;
}

export interface YouTubeDataState {
  channel: ChannelInfo;
  videos: Video[];
  featuredVideo: Video;
  stats: YouTubeStats;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: (forceRefresh?: boolean) => Promise<void>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
