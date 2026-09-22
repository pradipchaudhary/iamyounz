'use client';

import React, { createContext, useContext } from 'react';
import { useYouTubeData } from '@/hooks/use-youtube';
import type { YouTubeDataState } from '@/types';

const YouTubeContext = createContext<YouTubeDataState | null>(null);

export function YouTubeProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: Partial<YouTubeDataState>;
}) {
  const youtubeData = useYouTubeData(initialData);
  return (
    <YouTubeContext.Provider value={youtubeData}>
      {children}
    </YouTubeContext.Provider>
  );
}

export function useYouTube(): YouTubeDataState {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
}
