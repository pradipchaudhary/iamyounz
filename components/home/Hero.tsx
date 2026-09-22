import {  ArrowUpRight, MoveDown,  } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChannelStatsCard from "../ChannelStatsCard";
import { YOUTUBE_CHANNEL_URL } from "@/constants/site";
import { useYouTube } from "../providers";

export default function Hero(){
    // useYouTubeData()
   const {stats, featuredVideo} = useYouTube()
   console.log('YouTube Data from Hero Component:', stats);

    return(
        <>
            <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#0B0B0B] pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-8">

                <Image
                    src="/img/hero.jpg"
                    alt="Emotional cinematic visual for iamyounz"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center
                    md:object-[center_35%]
                    lg:object-[center_30%]
                    xl:object-[center_15%] filter brightness-[0.42] contrast-[1.12]"
                    referrerPolicy="no-referrer"
                />

                {/* Ambient Golden Halo behind Title */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] bg-[#C9A46A]/10 rounded-full blur-[140px] pointer-events-none" />

                {/* Multi-stage Atmospheric Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 via-transparent to-[#0B0B0B]/90" />

                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

                {/* Top Spacer to balance vertical centering */}
                <div className="w-full flex-shrink-0 h-2" />


                {/* Central Single-Column Content Block — Perfectly fitted for viewport */}
                <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto">
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#121212]/10 backdrop-blur-xl mb-5 sm:mb-6 shadow-lg shadow-black/40 hover:border-[#E50914]/40 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                        <span className="text-[8px] sm:text-[10px] tracking-[0.16em] text-[#EF4444] uppercase font-cinematic font-semibold">
                            ORIGINAL CINEMA 
                        </span>
                    </div>

                    {/* Main Display Headline */}
                    <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-kalam font-light text-[#F5F2ED] tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-5 max-w-3xl">
                        Stories that touch the heart.
                        <br className="hidden sm:inline" />
                        <span className="font-normal block sm:inline sm:ml-2 bg-gradient-to-r from-[#F5F2ED] via-[#EF4444] to-[#E50914] bg-clip-text text-transparent">
                            Lessons that change the way you see life.
                        </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-[#A6A29C] font-light max-w-2xl leading-relaxed  font-sans px-2">
                        Inspiring millions through emotional stories, quiet reflections,
                        love, heartbreak, and resilience. New cinematic episodes released
                        every single day.
                    </p>
                    
                </div>

                {/* Primary Action Buttons */}
                <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto">
                    {/* Play Featured Story Modal Trigger */}
                    <div className="flex">

                         {/* Visit YouTube Channel */}
                        <a
                            href={YOUTUBE_CHANNEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-full border border-white/15 hover:border-[#E50914]/60 bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F2ED] font-medium text-xs tracking-widest uppercase backdrop-blur-md transition-all duration-300 shadow-lg"
                            id="hero-cta-youtube"
                            >
                            <span>YouTube Channel</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#EF4444] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>

                 {/* Integrated Channel Stats Strip — Modern Glass Dock */}
                 <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto">
                    <div className="flex divide-x divide-white/[0.1]">
                        <ChannelStatsCard stats={stats.subscribersFormatted || "100+"} title="Subscribers" />
                        <ChannelStatsCard stats={stats.viewsFormatted || "23K"} title="Views" />
                        <ChannelStatsCard stats={stats.totalStories ? `${stats.totalStories}+` : '50+'} title="Episodes" />
                    </div>
                 </div>
               
                {/* Minimal Bottom Scroll Indicator */}
                <div className="relative z-10 w-full flex items-center justify-center pt-12 text-[#77736D] opacity-70 hover:opacity-100 transition-opacity flex-shrink-0">
                    <Link href="#stories" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-sans hover:text-[#EF4444] transition-colors">
                        <MoveDown className="w-3 h-3 animate-bounce"  />
                    </Link>
                </div>

            </section>
        </>
    )
}