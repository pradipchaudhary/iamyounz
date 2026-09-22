import { ChannelInfo, Video, YOUTUBE_CHANNEL_ID, YOUTUBE_HANDLE } from './youtube';

const API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyCpn-Q1oItpB23OqKawnxzvz4fSuKU__Hw";
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || YOUTUBE_CHANNEL_ID;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let channelCache: CacheEntry<ChannelInfo> | null = null;
let videosCache: CacheEntry<Video[]> | null = null;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache for fast live updates

export function parseDuration(pt?: string): string {
  if (!pt) return "0:00";
  const matches = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return "0:00";
  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function parseDurationSeconds(pt?: string): number {
  if (!pt) return 0;
  const matches = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return 0;
  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toLocaleString();
}

export function formatViews(v?: string | number): string {
  const num = typeof v === 'number' ? v : parseInt(v || "0", 10);
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M views";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K views";
  return `${num} views`;
}

export function cleanTitle(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/#[\w-]+/g, "")
    .replace(/[\s\-_|•]+$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function detectCategory(title: string, desc: string): string {
  const text = `${title} ${desc}`.toLowerCase();
  if (
    text.includes("heartbreak") ||
    text.includes("breakup") ||
    text.includes("lose you") ||
    text.includes("losing") ||
    text.includes("letting go") ||
    text.includes("let them go") ||
    text.includes("left") ||
    text.includes("one side")
  ) {
    return "Heartbreak";
  }
  if (
    text.includes("love") ||
    text.includes("relationship") ||
    text.includes("chase love") ||
    text.includes("chasing") ||
    text.includes("partner")
  ) {
    return "Love";
  }
  if (
    text.includes("healing") ||
    text.includes("heal") ||
    text.includes("peace") ||
    text.includes("protect your peace") ||
    text.includes("pain") ||
    text.includes("mental health") ||
    text.includes("crying") ||
    text.includes("inner peace")
  ) {
    return "Healing";
  }
  if (
    text.includes("motivation") ||
    text.includes("mindset") ||
    text.includes("discipline") ||
    text.includes("hard work") ||
    text.includes("never give up") ||
    text.includes("start before") ||
    text.includes("waiting")
  ) {
    return "Motivation";
  }
  if (
    text.includes("success") ||
    text.includes("failure") ||
    text.includes("progress") ||
    text.includes("excuses") ||
    text.includes("win")
  ) {
    return "Success";
  }
  return "Life";
}

export function extractQuote(desc: string, title: string): string {
  if (!desc) return cleanTitle(title);
  const lines = desc
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l.length > 15 &&
        !l.startsWith("#") &&
        !l.startsWith("http") &&
        !l.toLowerCase().startsWith("drop a") &&
        !l.toLowerCase().startsWith("share this")
    );
  if (lines.length > 0) return lines[0];
  return cleanTitle(title);
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(diff) || diff < 0) return "Recently";
  if (diff < 3600) return "Just now";
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return days === 1 ? "Yesterday" : `${days} days ago`;
  }
  if (diff < 2592000) {
    const weeks = Math.floor(diff / 604800);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(diff / 31536000);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

/**
 * Fetch channel profile, statistics, and uploads playlist ID
 */
export async function fetchChannelInfo(forceRefresh = false): Promise<ChannelInfo> {
  const now = Date.now();
  if (!forceRefresh && channelCache && now - channelCache.timestamp < CACHE_TTL_MS) {
    return channelCache.data;
  }

  try {
    // Attempt with channel ID or handle
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    let res = await fetch(url, { next: { revalidate: 300 } });
    let data = await res.json();

    // If empty or error, fallback to forHandle
    if (!data.items || data.items.length === 0) {
      const handleUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forHandle=iamyounz&key=${API_KEY}`;
      res = await fetch(handleUrl, { next: { revalidate: 300 } });
      data = await res.json();
    }

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      const snippet = item.snippet;
      const stats = item.statistics;

      const subCount = parseInt(stats?.subscriberCount || "97", 10);
      const viewCount = parseInt(stats?.viewCount || "21004", 10);
      const vidCount = parseInt(stats?.videoCount || "52", 10);

      const channelInfo: ChannelInfo = {
        id: item.id,
        title: snippet.title || "iamyounz",
        description:
          snippet.description ||
          "Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.",
        customUrl: snippet.customUrl || YOUTUBE_HANDLE,
        avatarUrl:
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url ||
          "https://yt3.ggpht.com/Th1z9oKjVFY70am2obBDEIbVDT8P1J86OzlKtUtUUzmB0VPmDZk00D3G4emDG-McpHp0A4v1spg=s800-c-k-c0x00ffffff-no-rj",
        subscriberCount: subCount,
        subscriberCountFormatted: formatNumber(subCount),
        viewCount,
        viewCountFormatted: formatNumber(viewCount),
        videoCount: vidCount,
        videoCountFormatted: vidCount.toLocaleString(),
      };

      channelCache = { data: channelInfo, timestamp: now };
      return channelInfo;
    }
  } catch (err) {
    console.error("Error fetching channel info from YouTube API:", err);
  }

  // Fallback to cached channel info if available, or dynamic live channel fallback
  if (channelCache) return channelCache.data;

  return {
    id: CHANNEL_ID,
    title: "iamyounz",
    description: "Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.",
    customUrl: YOUTUBE_HANDLE,
    avatarUrl: "https://yt3.ggpht.com/KySysBqlzewvUsoi3_kspYYIm4V9NfacLa903LeQPQTUoG8RgbKaAZiVHScaPNSje7gdXKN44A=s800-c-k-c0x00ffffff-no-rj",
    subscriberCount: 102,
    subscriberCountFormatted: "102",
    viewCount: 23007,
    viewCountFormatted: "23K",
    videoCount: 56,
    videoCountFormatted: "56",
  };
}

/**
 * Fetch all uploads from the channel with detailed statistics and pagination support.
 * Retrieves all available videos from the uploads playlist across multiple pages.
 */
export async function fetchChannelVideos(forceRefresh = false): Promise<Video[]> {
  const now = Date.now();
  if (!forceRefresh && videosCache && now - videosCache.timestamp < CACHE_TTL_MS) {
    return videosCache.data;
  }

  try {
    const uploadsPlaylistId = `UU${CHANNEL_ID.replace(/^UC/, "")}`;
    const allVideoIds: string[] = [];
    let pageToken = "";
    let pagesFetched = 0;
    const MAX_PAGES = 3; // Up to 150 items, covers entire channel catalog

    // 1. Paginate through the channel's uploads playlist
    do {
      const pageQuery = pageToken ? `&pageToken=${pageToken}` : "";
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50${pageQuery}&key=${API_KEY}`;
      const pRes = await fetch(playlistUrl, {
        cache: forceRefresh ? 'no-store' : 'default',
        next: { revalidate: forceRefresh ? 0 : 60 }
      });
      const pData = await pRes.json();

      if (!pData.items || pData.items.length === 0) {
        break;
      }

      for (const item of pData.items) {
        const vidId = item.contentDetails?.videoId;
        if (vidId && !allVideoIds.includes(vidId)) {
          allVideoIds.push(vidId);
        }
      }

      pageToken = pData.nextPageToken || "";
      pagesFetched++;
    } while (pageToken && pagesFetched < MAX_PAGES);

    if (allVideoIds.length === 0) {
      if (videosCache) return videosCache.data;
      return [];
    }

    // 2. Fetch video details in batches of 50 (YouTube API limit per call)
    const BATCH_SIZE = 50;
    const batchPromises = [];

    for (let i = 0; i < allVideoIds.length; i += BATCH_SIZE) {
      const batchIds = allVideoIds.slice(i, i + BATCH_SIZE);
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${batchIds.join(",")}&key=${API_KEY}`;
      batchPromises.push(
        fetch(videosUrl, {
          cache: forceRefresh ? 'no-store' : 'default',
          next: { revalidate: forceRefresh ? 0 : 60 }
        })
          .then((res) => res.json())
          .then((data) => data.items || [])
          .catch((err) => {
            console.error("Error fetching video batch:", err);
            return [];
          })
      );
    }

    const batchResults = await Promise.all(batchPromises);
    const allVideoItems = batchResults.flat();

    if (allVideoItems.length > 0) {
      const formattedVideos: Video[] = allVideoItems.map((item: any) => {
        const id = item.id;
        const snippet = item.snippet || {};
        const stats = item.statistics || {};
        const content = item.contentDetails || {};

        const rawTitle = snippet.title || "";
        const cTitle = cleanTitle(rawTitle);
        const desc = snippet.description || "";
        const category = detectCategory(rawTitle, desc);
        const durationStr = parseDuration(content.duration);
        const durationSec = parseDurationSeconds(content.duration);
        const vCount = parseInt(stats.viewCount || "0", 10);
        const lCount = parseInt(stats.likeCount || "0", 10);
        const viewsStr = formatViews(vCount);
        const quote = extractQuote(desc, rawTitle);

        const thumbnail =
          snippet.thumbnails?.maxres?.url ||
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

        const publishedDate = snippet.publishedAt ? new Date(snippet.publishedAt) : null;
        const publishedAtStr = snippet.publishedAt ? formatTimeAgo(snippet.publishedAt) : "Recently";
        const publishedAtFormattedStr = publishedDate && !isNaN(publishedDate.getTime())
          ? publishedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Recently";

        return {
          id,
          title: cTitle,
          cleanTitle: cTitle,
          description: desc || "A cinematic story by iamyounz.",
          thumbnail,
          category,
          publishedAt: publishedAtStr,
          publishedAtFormatted: publishedAtFormattedStr,
          publishedAtRaw: snippet.publishedAt || "",
          duration: durationStr,
          durationSeconds: durationSec,
          views: viewsStr,
          viewCount: vCount,
          likeCount: lCount,
          quote,
          isShort: durationSec <= 60,
          tags: snippet.tags || [],
        };
      });

      // Sort by publication timestamp descending: freshest uploads appear first
      formattedVideos.sort((a, b) => {
        const timeA = a.publishedAtRaw ? new Date(a.publishedAtRaw).getTime() : 0;
        const timeB = b.publishedAtRaw ? new Date(b.publishedAtRaw).getTime() : 0;
        return timeB - timeA;
      });

      videosCache = { data: formattedVideos, timestamp: now };
      return formattedVideos;
    }
  } catch (err) {
    console.error("Error fetching videos from YouTube API:", err);
  }

  if (videosCache) return videosCache.data;
  return [];
}

export async function getChannelOverview(forceRefresh = false): Promise<{
  channel: ChannelInfo;
  videos: Video[];
  featuredVideo: Video;
  stats: {
    totalStories: number;
    subscribersFormatted: string;
    viewsFormatted: string;
    categoriesCount: Record<string, number>;
  };
}> {
  const [channel, videos] = await Promise.all([
    fetchChannelInfo(forceRefresh),
    fetchChannelVideos(forceRefresh),
  ]);

  // Featured video: pick top viewed video, or first video in channel
  const sortedByViews = [...videos].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  const featured = sortedByViews[0] || videos[0] || {
    id: "",
    title: "",
    cleanTitle: "",
    description: "",
    thumbnail: "",
    category: "Stories",
    publishedAt: "",
    publishedAtFormatted: "",
    duration: "0:00",
    views: "",
    viewCount: 0,
    likeCount: 0,
    quote: "",
  };

  const categoriesCount: Record<string, number> = {};
  videos.forEach((v) => {
    categoriesCount[v.category] = (categoriesCount[v.category] || 0) + 1;
  });

  return {
    channel,
    videos,
    featuredVideo: featured,
    stats: {
      totalStories: videos.length || channel.videoCount || 56,
      subscribersFormatted: channel.subscriberCountFormatted || "102",
      viewsFormatted: channel.viewCountFormatted || "23K",
      categoriesCount,
    },
  };
}
