'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChannelInfo, Video } from '@/lib/youtube';

export interface YouTubeDataState {
  channel: ChannelInfo;
  videos: Video[];
  featuredVideo: Video;
  stats: {
    totalStories: number;
    subscribersFormatted: string;
    viewsFormatted: string;
    categoriesCount: Record<string, number>;
  };
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: (forceRefresh?: boolean) => Promise<void>;
}

const DEFAULT_CHANNEL: ChannelInfo = {
  id: "UCClcgCFRss2L-FUker5-zww",
  title: "iamyounz",
  description: "Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.",
  customUrl: "@iamyounz",
  avatarUrl: "https://yt3.ggpht.com/KySysBqlzewvUsoi3_kspYYIm4V9NfacLa903LeQPQTUoG8RgbKaAZiVHScaPNSje7gdXKN44A=s800-c-k-c0x00ffffff-no-rj",
  subscriberCount: 102,
  subscriberCountFormatted: "102",
  viewCount: 23007,
  viewCountFormatted: "23K",
  videoCount: 56,
  videoCountFormatted: "56",
};

const DEFAULT_FEATURED: Video = {
  id: "8kVTMXzir3Q",
  title: "The Ghost of Who You Used to Be 🥀💔✨",
  cleanTitle: "The Ghost of Who You Used to Be 🥀💔✨",
  description: "A story by iamyounz.",
  thumbnail: "https://i.ytimg.com/vi/8kVTMXzir3Q/maxresdefault.jpg",
  category: "Healing",
  publishedAt: "Recently",
  publishedAtFormatted: "Recent",
  duration: "0:25",
  views: "Watch",
};

export function useYouTubeData(initialData?: Partial<YouTubeDataState>): YouTubeDataState {
  const [channel, setChannel] = useState<ChannelInfo>(() => initialData?.channel || DEFAULT_CHANNEL);
  const [videos, setVideos] = useState<Video[]>(() => initialData?.videos || []);
  const [featuredVideo, setFeaturedVideo] = useState<Video>(() => initialData?.featuredVideo || DEFAULT_FEATURED);
  const [stats, setStats] = useState(() => initialData?.stats || {
    totalStories: initialData?.videos?.length || 56,
    subscribersFormatted: initialData?.channel?.subscriberCountFormatted || "102",
    viewsFormatted: initialData?.channel?.viewCountFormatted || "23K",
    categoriesCount: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(!initialData?.videos || initialData.videos.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(() => initialData?.lastUpdated || null);

  const applyData = useCallback((data: any) => {
    if (data.channel) setChannel(data.channel);
    if (data.videos && data.videos.length > 0) {
      setVideos(data.videos);
      if (!data.featuredVideo && data.videos[0]) {
        setFeaturedVideo(data.videos[0]);
      }
    }
    if (data.featuredVideo) setFeaturedVideo(data.featuredVideo);
    if (data.stats) setStats(data.stats);
    const updated = data.lastUpdated || new Date().toISOString();
    setLastUpdated(updated);
  }, []);

  const refetch = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);
      const url = `/api/youtube${forceRefresh ? '?refresh=true' : ''}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch YouTube data: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.success) {
        applyData(data);
      } else {
        throw new Error(data.message || 'Failed to fetch YouTube data');
      }
    } catch (err) {
      console.error('Error fetching YouTube API data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [applyData]);

  useEffect(() => {
    let ignore = false;

    async function initialLoad() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/youtube?refresh=true');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        if (!ignore && data.success) {
          applyData(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching YouTube API data:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    initialLoad();

    return () => {
      ignore = true;
    };
  }, [applyData]);

  return {
    channel,
    videos,
    featuredVideo,
    stats,
    isLoading,
    error,
    lastUpdated,
    refetch,
  };
}
