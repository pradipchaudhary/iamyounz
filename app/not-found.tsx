import Link from 'next/link';
import { Film, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#EF4444] mb-6">
        <Film className="w-3.5 h-3.5" />
        <span className="font-sans font-medium uppercase tracking-widest">
          Episode Not Found
        </span>
      </div>

      <h1 className="text-6xl sm:text-8xl font-serif text-[#F5F2ED] tracking-tight mb-4">
        404
      </h1>

      <p className="font-kalam text-xl sm:text-2xl text-[#EF4444] mb-4">
        &ldquo;Sometimes the road takes an unexpected turn.&rdquo;
      </p>

      <p className="text-sm sm:text-base text-[#A6A29C] max-w-md mx-auto mb-8 font-light leading-relaxed">
        The story or page you are looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E50914] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#c60812] transition-colors shadow-lg shadow-[#E50914]/25"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
