import { YOUTUBE_CHANNEL_URL, YOUTUBE_HANDLE, YOUTUBE_CHANNEL_ID } from '@/constants/site';
import type { ChannelInfo, Video, YouTubeStats, YouTubeDataState } from '@/types';

export { YOUTUBE_CHANNEL_URL, YOUTUBE_HANDLE, YOUTUBE_CHANNEL_ID };
export type { ChannelInfo, Video, YouTubeStats, YouTubeDataState };

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeShortsUrl(videoId: string): string {
  return `https://www.youtube.com/shorts/${videoId}`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

export function getYouTubeSubscribeUrl(handle: string = YOUTUBE_HANDLE): string {
  return `https://www.youtube.com/${handle}?sub_confirmation=1`;
}
