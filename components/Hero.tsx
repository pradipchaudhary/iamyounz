import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";

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
                            ORIGINAL CINEMA • DAILY AT 6:00 PM EST
                        </span>
                    </div>

                    {/* Main Display Headline */}
                    <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-kalam font-light text-[#F5F2ED] tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-5 max-w-3xl">
                        Stories that touch the heart.
                        <br className="hidden sm:inline" />
                        <span className="font-normal text-[#E8E4DC] block sm:inline sm:ml-2">
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

                {/* Primary Action Button */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-7 sm:mb-9">
                    {/* Play Latest Story Model Trigger */}
                    <button
                    type="button"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E50914] hover:bg-[#c60812] text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl shadow-[#E50914]/25 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                    <Play className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" />
                    <span>Watch Latest Episode</span>
                    </button>

                    {/* Visit YouTube Channel */}
                    <a
                        href={YOUTUBE_CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-white/15 hover:border-[#E50914]/60 bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F2ED] font-medium text-xs tracking-widest uppercase backdrop-blur-md transition-all duration-300"
                        id="hero-cta-youtube"
                    >
                    <span>YouTube Channel</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#EF4444] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                </div>
            </section>
        </>
    )
}