'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function BrandStatement() {
  return (
    <section className="relative py-24 sm:py-36 px-6 sm:px-8 bg-[#0B0B0B] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E50914]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Subtle Tag */}
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#E50914]/60" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#EF4444] font-cinematic font-semibold">
              The Philosophy
            </span>
          </div>

          {/* Editorial Oversized Statement */}
          <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#F5F2ED] leading-[1.2] sm:leading-[1.18] tracking-tight">
            Sometimes a story isn&apos;t just something you hear.{' '}
            <span className="italic font-kalam text-[#EF4444] font-normal block sm:inline mt-2 sm:mt-0">
              It&apos;s something you recognize.
            </span>
          </blockquote>

          {/* Supporting Editorial Paragraph */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-4 text-[11px] tracking-[0.22em] text-[#77736D] uppercase font-cinematic font-medium">
              Human Stories &bull; Raw Emotion
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-[#A6A29C] font-light leading-relaxed max-w-2xl">
                <strong className="font-kalam  text-[#EF4444]">iamyounz</strong>  was created as a sanctuary for the quiet truths we rarely speak aloud. Through intimate cinematic narratives on love, heartbreak, ambition, failure, resilience, and personal healing, each piece is crafted to make you pause, breathe, feel deeply, and remember that you are never walking through this life alone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
