'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function QuoteSection() {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#0B0B0B] overflow-hidden border-t border-b border-white/[0.06] flex items-center justify-center">
      {/* Dark Cinematic Backdrop */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2000&auto=format&fit=crop"
          alt="Atmospheric moody background"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0B0B0B]/85" />
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Subtle Accent Mark */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
          </div>

          {/* Emotional Quote */}
          <blockquote className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-kalam font-light text-[#F5F2ED] leading-[1.25] tracking-tight">
            &ldquo;Some stories don&apos;t change your life.
            <br />
            <span className="italic font-normal text-[#EF4444] block sm:inline mt-2 sm:mt-0">
              They change the way you see it.
            </span>&rdquo;
          </blockquote>

          {/* Attribution */}
          <p className="text-xs sm:text-sm uppercase text-[#EF4444] font-cinematic">
            &mdash; iamyounz
          </p>
        </motion.div>
      </div>
    </section>
  );
}
