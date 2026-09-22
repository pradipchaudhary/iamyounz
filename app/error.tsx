'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-[#EF4444] mb-6">
        <AlertCircle className="w-3.5 h-3.5" />
        <span className="font-sans font-medium uppercase tracking-widest">
          Playback Interrupted
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F2ED] tracking-tight mb-4">
        Something unexpected occurred
      </h1>

      <p className="font-kalam text-lg sm:text-xl text-[#EF4444] mb-6">
        &ldquo;Every pause is just a breath before the next scene.&rdquo;
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E50914] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#c60812] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] text-[#F5F2ED] text-xs uppercase tracking-widest font-medium hover:bg-white/[0.1] transition-colors border border-white/10"
        >
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
