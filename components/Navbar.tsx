"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Play, X } from "lucide-react";


const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Stories', href: '/stories' },
  { name: 'Archive', href: '/videos' },
  { name: 'About', href: '/about' },
];

export default function Navbar(){
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() =>{
        const handleScroll = () =>{
            if(window.scrollY > 20){
                setIsScrolled(true);
            }else{
                setIsScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[])

     // Close mobile menu on route change
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setIsMobileMenuOpen(false);
    }

    return(
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/60'
                    : 'bg-gradient-to-b from-[#0B0B0B]/90 via-[#0B0B0B]/40 to-transparent py-5 sm:py-6'
                }`}>

                <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
                    {/* Brand Logo with Avatar Image */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 focus:outline-none"
                        id="nav-brand-logo"
                    >
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-1 ring-white/20 shadow-md flex-shrink-0 bg-[#161616]">
                        <Image
                            src="/img/profile.png"
                            alt={'iamyounz'}
                            fill
                            sizes="40px"
                            className="object-cover object-center"
                            referrerPolicy="no-referrer"
                        />
                        </div>
                        <span className="text-2xl font-kalam font-normal text-[#F5F2ED]">
                        immyounz
                        </span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                        {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm tracking-wide transition-colors duration-300 relative py-1 ${
                                isActive
                                ? 'text-[#F5F2ED] font-medium'
                                : 'text-[#A6A29C] hover:text-[#F5F2ED]'
                            }`}
                            id={`nav-link-${link.name.toLowerCase()}`}
                            >
                            {link.name}
                            {isActive && (
                                <motion.span
                                layoutId="activeNavIndicator"
                                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E50914]"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                            </Link>
                        );
                        })}
                    </nav>

                    {/* Right Action — Clean Subscribe CTA (Stories counter removed) */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://www.youtube.com/@iamyounz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                            group relative inline-flex items-center gap-2
                            overflow-hidden rounded-full
                            border border-white/10
                            bg-transparent
                            px-5 py-2.5
                            text-xs font-medium uppercase tracking-widest
                            text-white
                            transition-all duration-500
                            hover:-translate-y-0.5
                            hover:border-[#E50914]
                            hover:shadow-lg hover:shadow-[#E50914]/30
                            active:scale-95
                            "
                            id="nav-cta-subscribe"
                        >
                            {/* Animated red background */}
                            <span
                            className="
                                absolute inset-0 origin-left
                                scale-x-0
                                bg-[#E50914]
                                transition-transform duration-500
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                                group-hover:scale-x-100
                            "
                            />

                            {/* Content */}
                            <span className="relative z-10 flex items-center gap-2">
                            <Play
                                className="
                                h-4 w-4
                                transition-transform duration-300
                                group-hover:scale-110
                                "
                            />

                            <span>Subscribe</span>

                            <ArrowUpRight
                                className="
                                h-3.5 w-3.5
                                transition-all duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                                "
                            />
                            </span>
                        </a>
                        </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-[#F5F2ED] hover:text-[#EF4444] transition-colors focus:outline-none"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        id="nav-mobile-toggle"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-2xl md:hidden pt-24 px-8 flex flex-col justify-between pb-12"
                >
                    <div className="flex flex-col gap-6 pt-4">
                    {/* Brand in Mobile Drawer */}
                    {/* <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08]">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#E50914]/60 flex-shrink-0 bg-[#161616]">
                        <Image
                            src={avatarSrc}
                            alt={channel.title || 'iamyounz'}
                            fill
                            sizes="40px"
                            className="object-cover object-center"
                            referrerPolicy="no-referrer"
                        />
                        </div>
                        <span className="font-cinematic tracking-[0.24em] uppercase text-sm font-semibold text-[#F5F2ED]">
                        iamyounz
                        </span>
                    </div> */}

                    <span className="text-[11px] uppercase tracking-widest text-[#77736D]">
                        Navigation
                    </span>
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-2xl font-serif tracking-wide py-1 flex items-center justify-between ${
                            isActive ? 'text-[#EF4444]' : 'text-[#F5F2ED]'
                            }`}
                        >
                            <span>{link.name}</span>
                            {isActive && <span className="w-2 h-2 rounded-full bg-[#E50914]" />}
                        </Link>
                        );
                    })}
                    </div>

                    <div className="flex flex-col gap-4 pt-8 border-t border-white/[0.08]">
                    <a
                        href="https://www.youtube.com/@iamyounz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#E50914] text-white font-medium text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-lg shadow-[#E50914]/25"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Subscribe on YouTube</span>
                    </a>

                    <p className="text-center text-xs text-[#77736D] mt-1">
                        Inspiring millions through emotional stories.
                    </p>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}