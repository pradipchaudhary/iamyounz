/**
 * Site-wide Constants & Navigation Configuration
 * Best practices for centralized configuration and brand constants.
 */

export const SITE_CONFIG = {
  name: 'iamyounz',
  title: 'iamyounz — Stories That Stay With You',
  description:
    'Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.',
  author: 'iamyounz',
  email: 'iamyounz@gmail.com',
  url: process.env.APP_URL || 'https://iamyounz.com',
  social: {
    youtube: 'https://www.youtube.com/@iamyounz',
    handle: '@iamyounz',
    channelId: 'UCClcgCFRss2L-FUker5-zww',
  },
} as const;

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Stories', href: '/stories' },
  { name: 'About', href: '/about' },
  { name: 'Archive', href: '/videos' },
] as const;

export const YOUTUBE_CHANNEL_URL = SITE_CONFIG.social.youtube;
export const YOUTUBE_HANDLE = SITE_CONFIG.social.handle;
export const YOUTUBE_CHANNEL_ID = SITE_CONFIG.social.channelId;
