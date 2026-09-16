"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";

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

                <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
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
                        <span className="text-2xl font-semibold text-[#F5F2ED]">
                        i'myounz
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
                        className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-2.5 rounded-full bg-[#E50914] hover:bg-[#c60812] text-white font-medium transition-all duration-300 shadow-md shadow-[#E50914]/25 transform hover:-translate-y-0.5 active:scale-95"
                        id="nav-cta-subscribe"
                        >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Subscribe</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                    
                </div>
            </header>
        </>
    )
}