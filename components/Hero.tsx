import Image from "next/image";

export default function Hero(){
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


                {/* Central Single-Column Content Block — Perfectly fitted for viewport */}
                <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto">
                    <span className="font-cinematic  uppercase text-sm sm:text-base font-semibold text-[#F5F2ED]">
                    iamyounz
                    </span>
                </div>
                
            </section>
        </>
    )
}