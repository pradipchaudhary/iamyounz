'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Play, ArrowUpRight, Compass, Bell } from 'lucide-react';

export default function SubscribeCTA() {

  return (
    <section className="py-24 sm:py-36 px-6 sm:px-8 bg-[#0B0B0B] relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E50914]/[0.035] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#121212] backdrop-blur-md">
            <Bell className="w-3.5 h-3.5 text-[#EF4444]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#EF4444] font-cinematic font-semibold">
              Daily Broadcast • Every Day at 6:00 PM EST
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#F5F2ED] tracking-tight leading-[1.12]">
            Your next story is waiting.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#A6A29C] font-light max-w-xl mx-auto leading-relaxed">
            Join the growing community finding meaning, motivation, and emotion in stories that feel real. Subscribe and never miss a chapter.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-4">
            <a
              href={"https://youtube.com/iamyounz"}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E50914] hover:bg-[#c60812] text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#E50914]/25 transform hover:-translate-y-0.5"
              id="subscribe-cta-button"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Subscribe on YouTube</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <Link
              href="/stories"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.05] text-[#F5F2ED] text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-[#A6A29C]" />
              <span>Explore Stories</span>
            </Link>
          </div>

          {/* Gentle Reminder Note */}
          <p className="text-xs text-[#77736D] pt-4">
            Free on YouTube • Over {50} original stories released by { '@iamyounz'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
