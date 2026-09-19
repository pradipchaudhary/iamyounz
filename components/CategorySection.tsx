'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';


export default function CategorySection() {
  return (
    <section id="stories" className="py-24 sm:py-32 px-6 sm:px-8 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/[0.08] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#EF4444] font-sans font-medium mb-3 block">
              Curated Themes
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-kalam text-[#F5F2ED] tracking-tight">
              Stories for Every Season of Life
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A6A29C] max-w-md font-light">
            Every feeling has a home here. Find the words, memories, and wisdom you need for the season you are moving through.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-8">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
            >
              <Link
                href={`/stories?category=${cat.slug}`}
                className="group relative block h-[480px] sm:h-[420px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#121212] transition-all duration-500 hover:border-[#E50914]/40 shadow-lg hover:shadow-2xl hover:shadow-black/60"
                id={`category-card-${cat.slug}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center filter brightness-[0.55] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.45]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Dark Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/55 to-black/20 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-sans font-medium">
                      {cat.count} Stories
                    </span>
                    <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#F5F2ED] transition-all duration-300 group-hover:bg-[#E50914] group-hover:text-white group-hover:border-[#E50914] shadow-md">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom Information */}
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#EF4444] font-sans font-medium block">
                      Theme Collection
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F2ED] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {cat.name}
                    </h3>
                    <p className="text-[13px] text-[#A6A29C] font-light leading-relaxed line-clamp-2">
                      {cat.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
