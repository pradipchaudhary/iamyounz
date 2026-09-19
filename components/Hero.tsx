import { ArrowDown, ArrowUpRight, MoveDown, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero(){
    const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@iamyounz";
    return(
        <>
            <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#0B0B0B] pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-8">

                <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2000&auto=format&fit=crop"
                    alt="Emotional cinematic visual for iamyounz"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center filter brightness-[0.42] contrast-[1.12]"
                    referrerPolicy="no-referrer"
                />

                {/* Ambient Golden Halo behind Title */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] bg-[#C9A46A]/10 rounded-full blur-[140px] pointer-events-none" />

                {/* Multi-stage Atmospheric Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]/80" />

                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

                {/* Top Spacer to balance vertical centering */}
                <div className="w-full flex-shrink-0 h-2" />


                {/* Central Single-Column Content Block — Perfectly fitted for viewport */}
                <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto">
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#121212]/80 backdrop-blur-xl mb-5 sm:mb-6 shadow-lg shadow-black/40 hover:border-[#E50914]/40 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                        <span className="text-[8px] sm:text-[12px] tracking-[0.16em] text-[#EF4444] uppercase font-cinematic font-semibold">
                            ORIGINAL CINEMA 
                        </span>
                    </div>

                    {/* Main Display Headline */}
                    <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-kalam font-light text-[#F5F2ED] tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-5 max-w-3xl">
                        Stories that touch the heart.
                        <br className="hidden sm:inline" />
                        <span className="font-normal text-[#EE4444] block sm:inline sm:ml-2">
                        Lessons that change the way you see life.
                        </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-[#A6A29C] font-light max-w-2xl leading-relaxed mb-7 sm:mb-9 font-sans px-2">
                        Inspiring millions through emotional stories, quiet reflections,
                        love, heartbreak, and resilience. New cinematic episodes released
                        every single day.
                    </p>
                </div>

               

                {/* Integrated Channel Stats Strip — Centered Single-Row */}
                <div className="w-full max-w-xl rounded-2xl  backdrop-blur-sm  p-3.5 sm:p-4 grid grid-cols-3 divide-x divide-white/[0.08] text-center text-[#A6A29C] shadow-2xl">
                    <div className="flex flex-col items-center px-2 space-y-1.5">
                    <span className="font-serif text-lg sm:text-2xl text-[#F5F2ED] font-light">
                        {/* {stats.totalStories}+ */}
                        49+
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#77736D] mt-0.5 font-sans font-medium">
                        Episodes
                    </span>
                    </div>

                    <div className="flex flex-col items-center px-2 space-y-1.5">
                    <span className="font-serif text-lg sm:text-2xl text-[#F5F2ED] font-light">
                        {/* {stats.viewsFormatted} */}
                        22k
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#77736D] mt-0.5 font-sans font-medium">
                        Channel Views
                    </span>
                    </div>

                    <div className="flex flex-col items-center px-2 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-serif text-sm sm:text-2xl text-[#F5F2ED] font-light">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                        <span>6:00 PM</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#77736D] mt-0.5 font-sans font-medium">
                        Daily Release
                    </span>
                    </div>
                </div>


                {/* Minimal Bottom Scroll Indicator */}
                <div className="relative z-10 w-full flex items-center justify-center pt-3 text-[#77736D] opacity-70 hover:opacity-100 transition-opacity flex-shrink-0">
                    <Link href="#stories" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-sans hover:text-[#EF4444] transition-colors">
                        <MoveDown className="w-3 h-3 animate-bounce"  />
                    </Link>
                </div>

            </section>
        </>
    )
}