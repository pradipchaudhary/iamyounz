"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, ArrowRight, Clock, Eye, Calendar, Sparkles } from "lucide-react";
import { getYouTubeWatchUrl, getYouTubeShortsUrl } from "@/lib/youtube";
import { useYouTube } from "@/components/providers/YouTubeProvider";
import VideoModal from "./VideoModel";

export default function FeaturedStory() {
  const { featuredVideo, isLoading } = useYouTube();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const currentVideo = featuredVideo;

  console.log("Current Featured Video:", currentVideo);

  if (!currentVideo || !currentVideo.id) {
    if (isLoading) {
      return (
        <section className="py-20 sm:py-28 px-6 sm:px-8 bg-[#090909]">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-6 w-36 bg-white/10 rounded-full mb-4" />
            <div className="h-10 w-72 bg-white/10 rounded mb-8" />
            <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl bg-white/[0.03] border border-white/10" />
          </div>
        </section>
      );
    }
    return null;
  }

  const watchUrl = getYouTubeWatchUrl(currentVideo.id);

  const displayTitle =
    currentVideo.cleanTitle ||
    currentVideo.title
      .replace(/#[\w-]+/g, "")
      .replace(/[\s\-_|•]+$/, "")
      .replace(/\s{2,}/g, " ")
      .trim() ||
    currentVideo.title;

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 relative overflow-hidden">
      {/* Ambient background glow for the whole section */}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#EF4334] font-cinematic font-semibold">
              Editor&apos;s Selection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-kalam font-light text-[#F5F2ED] tracking-[-0.015em] leading-[1.08]">
            Featured Spotlight
          </h2>
          <p className="text-sm sm:text-base text-[#A6A29C] font-light mt-2.5 max-w-xl font-sans leading-relaxed">
            A handpicked emotional narrative that captures the essence of
            healing, resilience, and quiet growth.
          </p>
        </div>

        {/* Featured Card: Seamless Single Atmospheric Canvas (No Double Background) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden transition-all duration-500 group"
          id="featured-story-card"
        >
          {/* Card Content Grid: Direct and unified presentation */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 p-6 sm:p-10 lg:p-14">
            {/* Left Column: Vertical Short Video Display */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsVideoModalOpen(true);
                  }
                }}
                className="relative aspect-[9/16] w-[280px] sm:w-[280px] md:w-[380px] max-w-full rounded-2xl overflow-hidden border border-white/10 hover:border-[#EF4444]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 transform hover:scale-[1.02] select-none bg-black"
                role="button"
                tabIndex={0}
                aria-label={`Watch featured short: ${displayTitle}`}
              >
                {/* Short Video Thumbnail Image */}
                <Image
                  src={currentVideo.thumbnail}
                  alt={displayTitle}
                  fill
                  sizes="(max-width: 640px) 240px, 280px"
                  className="object-cover object-center filter brightness-[0.88] contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.78]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Overlaid Gradients */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 via-45% to-black/40 pointer-events-none" /> */}

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-cinematic font-normal uppercase tracking-wider text-[#F5F2ED] shadow-sm">
                    <span>ORIGINAL SHORT</span>
                  </span>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full  text-[10px] font-mono text-[#F5F2ED] shadow-sm">
                    <Clock className="w-2.5 h-2.5 text-[#efefef]" />
                    <span>{currentVideo.duration || "0:16"}</span>
                  </div>
                </div>

                {/* Center Frosted Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 transform scale-90 group-hover:scale-105 group-hover:bg-[#E50914] group-hover:border-[#E50914] shadow-2xl">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Card Prompt on hover */}
                <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                  <span className="text-[10px] uppercase font-cinematic tracking-widest text-white/10 group-hover:text-white transition-colors">
                    Click to Play
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Typography & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-cinematic uppercase tracking-[0.14em] text-[#EF4444]">
                  {currentVideo.category}
                </span>
                <span className="text-xs font-sans text-[#8C8882] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#77736D]" />
                  {currentVideo.publishedAtFormatted ||
                    currentVideo.publishedAt ||
                    "Recent"}
                </span>
                {currentVideo.views && (
                  <>
                    <span className="text-xs font-sans text-[#8C8882] flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#77736D]" />
                      {currentVideo.views}
                    </span>
                  </>
                )}
              </div>

              {/* Title in Cormorant Garamond Serif */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-kalam text-[#c9c9c9] font-light text-white tracking-tight leading-[1.15] mb-4 drop-shadow-md">
                {displayTitle}
              </h3>

              {/* Body Description */}
              <p className="text-sm sm:text-[15px] font-sans font-light text-[#959595] leading-relaxed mb-5">
                {currentVideo.description ||
                  "A cinematic short story created to help you reflect, heal, and find your way forward through the deeper seasons of life."}
              </p>

              {/* Poetic Literary Pull-Quote (No bulky box wrapper) */}
              {currentVideo.quote && (
                <div className="mb-6 pl-4 sm:pl-5 border-l-1 border-[#E50914]/20 py-1">
                  <p className="italic font-light text-base sm:text-xl text-[#959595] leading-relaxed">
                    &ldquo;{currentVideo.quote}&rdquo;
                  </p>
                  <span className="block mt-4 text-[10px] font-cinematic not-italic text-[#8C8780] tracking-[0.12em] uppercase">
                    &mdash; iamyounz &bull; Original Story
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-8">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F5F2ED] hover:bg-[#E50914] hover:text-white text-[#0B0B0B] font-cinematic font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-300 transform active:scale-95 shadow-lg cursor-pointer"
                  id="featured-story-watch-button"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Short</span>
                </button>

                <a
                  href={getYouTubeShortsUrl(currentVideo.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.08] text-[#D4D0C8] hover:text-white font-cinematic font-medium text-xs uppercase tracking-[0.16em] backdrop-blur-sm transition-all"
                >
                  <span>Open on Shorts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <VideoModal
        video={isVideoModalOpen ? currentVideo : null}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  );
}
