"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useYouTube } from "../providers";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@iamyounz" },
  { label: "Instagram", href: "https://www.instagram.com/iamyounz" },
  { label: "TikTok", href: "https://www.tiktok.com/@iamyounz" },
  { label: "Facebook", href: "https://www.facebook.com/iamyounzofficial" },
];

export default function Footer() {
  const { channel } = useYouTube();
  console.log("channel: ", channel.avatarUrl);

  const avatarsrc = channel.avatarUrl || "/img/profile.png";

  return (
    <footer className="bg-[#0B0B0B] border-t border-white/[0.08] pt-16 sm:pt-20 pb-12 px-6 sm:px-8 text-[#A6A29C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#E50914]/60 flex-shrink-0 bg-[#161616]">
                <Image
                  src={avatarsrc}
                  alt="iamyounz"
                  fill
                  sizes="32px"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-kalam text-[#F5F2ED]">
                iamyounz
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
            </Link>

            <p className="text-sm font-light text-[#A6A29C] max-w-md leading-relaxed">
              Inspiring millions through emotional stories, life lessons, love,
              success, and motivation. New videos every day.
            </p>

            <p className="text-xs text-[#77736D] pt-2">
              Deep &bull; Emotional &bull; Cinematic &bull; Human &bull;
              Inspirational
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F2ED] font-sans font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F5F2ED] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.youtube.com/@iamyounz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F2ED] inline-flex items-center gap-1 transition-colors"
                >
                  <span>YouTube Channel</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EF4444]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F2ED] font-sans font-medium">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F5F2ED] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#77736D] group-hover:text-[#EF4444] transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77736D]">
          <p>&copy; 2026 iamyounz. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Stories that stay with you.</span>
            <span>&bull;</span>
            <span className="text-[#A6A29C]">New stories daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
