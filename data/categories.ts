export type Category = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  count: number;
};

export const CATEGORIES: Category[] = [
  {
    id: "cat-love",
    slug: "love",
    name: "Love",
    shortDescription: "Stories about connection, love, relationships, and memories that stay.",
    fullDescription: "Exploring the fragile beauty of genuine human intimacy, quiet devotion, and what it truly means to hold someone close in a fast-paced world.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
    count: 24,
  },
  {
    id: "cat-heartbreak",
    slug: "heartbreak",
    name: "Heartbreak",
    shortDescription: "Stories about loss, separation, and learning to gently let go.",
    fullDescription: "Facing the grief of growing apart, unsaid words, goodbye rituals, and the quiet dignity of surviving an ended chapter.",
    image: "https://images.unsplash.com/photo-1612490689624-dc01325cc885?q=80&w=1170&auto=format&fit=crop",
    count: 19,
  },
  {
    id: "cat-life",
    slug: "life",
    name: "Life",
    shortDescription: "Truths, lessons, struggles, and the quiet realities of life.",
    fullDescription: "Honest reflections on time slipping away, solitude, finding peace within chaos, and learning how to navigate the weight of ordinary days.",
    image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=1200&auto=format&fit=crop",
    count: 38,
  },
  {
    id: "cat-motivation",
    slug: "motivation",
    name: "Motivation",
    shortDescription: "Stories about discipline, courage, growth, and persistence.",
    fullDescription: "Rekindling the internal flame when the room is dark. Uncompromising commitment to showing up even when no one is watching.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    count: 31,
  },
  {
    id: "cat-success",
    slug: "success",
    name: "Success",
    shortDescription: "Mindset, ambition, failure, resilience, and achieving your goals.",
    fullDescription: "Redefining what winning looks like. The solitary cost of ambition, navigating rock bottom, and building an unshakable core.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    count: 22,
  },
  {
    id: "cat-healing",
    slug: "healing",
    name: "Healing",
    shortDescription: "Emotional healing, self-respect, acceptance, and moving forward.",
    fullDescription: "Reclaiming your peace after the storm. The gentle art of self-forgiveness, setting boundaries, and slowly breathing freely again.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop",
    count: 27,
  },
];
