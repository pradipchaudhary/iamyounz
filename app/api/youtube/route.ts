import { NextRequest, NextResponse } from 'next/server';
import { getChannelOverview } from '@/lib/youtube-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    const sort = searchParams.get('sort') || 'latest';

    const overview = await getChannelOverview(forceRefresh);

    let filteredVideos = [...overview.videos];

    if (category && category.toLowerCase() !== 'all') {
      filteredVideos = filteredVideos.filter(
        (v) => v.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (sort === 'popular') {
      filteredVideos.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sort === 'oldest') {
      filteredVideos.reverse();
    }

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        filteredVideos = filteredVideos.slice(0, limit);
      }
    }

    return NextResponse.json({
      success: true,
      channel: overview.channel,
      featuredVideo: overview.featuredVideo,
      videos: filteredVideos,
      totalCount: overview.videos.length,
      filteredCount: filteredVideos.length,
      stats: overview.stats,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error in /api/youtube:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch YouTube channel data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
