"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import {
  Video,
  getYouTubeWatchUrl,
  getYouTubeShortsUrl,
  YOUTUBE_CHANNEL_URL,
} from "@/lib/youtube";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const watchUrl = getYouTubeWatchUrl(video.id);
  const isShort = Boolean(
    video.isShort ||
    (video.durationSeconds && video.durationSeconds <= 65) ||
    (video.duration &&
      video.duration.startsWith("0:") &&
      parseInt(video.duration.split(":")[0] || "0") === 0),
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0B0B0B]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full ${
            isShort ? "max-w-xl" : "max-w-4xl"
          } bg-[#181818] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#181818] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E50914]" />
              <span className="text-xs uppercase tracking-widest text-[#A6A29C] font-sans font-medium">
                {video.category} &bull; {isShort ? "YouTube Short" : "Video"}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#A6A29C] hover:text-[#F5F2ED] hover:bg-white/[0.06] rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cinematic Video Player Frame */}
          <div
            className={`bg-black flex items-center justify-center flex-shrink-0 ${isShort ? "py-5 px-6" : ""}`}
          >
            <div
              className={`relative ${
                isShort
                  ? "aspect-[9/16] w-full max-w-[300px] sm:max-w-[340px] max-h-[64vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                  : "aspect-video w-full"
              }`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Modal Details with Professional Typography */}
          <div className="p-6 sm:p-7 space-y-4 bg-[#121212] overflow-y-auto">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F5F2ED] tracking-tight mb-2">
                  {video.cleanTitle || video.title}
                </h3>
                <p className="text-sm font-sans font-normal text-[#A6A29C] leading-relaxed max-w-2xl">
                  {video.description}
                </p>
                {video.quote && (
                  <blockquote className="mt-4 pl-4 border-l-2 border-[#E50914] font-serif italic font-light text-base sm:text-lg text-[#F5F2ED] leading-relaxed">
                    &ldquo;{video.quote}&rdquo;
                  </blockquote>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col gap-2.5 flex-shrink-0">
                <a
                  href={isShort ? getYouTubeShortsUrl(video.id) : watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F5F2ED] text-[#0B0B0B] text-xs uppercase tracking-wider font-cinematic font-semibold hover:bg-[#E50914] hover:text-white transition-colors shadow-md"
                >
                  <span>{isShort ? "Watch on Shorts" : "Open in YouTube"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-[#A6A29C] hover:text-[#F5F2ED] hover:border-white/30 text-xs uppercase tracking-wider font-cinematic font-medium transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
