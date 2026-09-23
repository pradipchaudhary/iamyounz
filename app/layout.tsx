import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam } from "next/font/google";
import "@/styles/globals.css";
import { YouTubeProvider } from "@/components/providers";
import { getChannelOverview } from "@/lib";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  title: "iamyounz — Stories That Stay With You",
  description:
    "Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.",
  keywords: [
    "iamyounz",
    "emotional stories",
    "life lessons",
    "motivation",
    "cinematic storytelling",
    "love and heartbreak",
    "personal growth",
    "deep thoughts",
  ],
  authors: [{ name: "iamyounz" }],
  creator: "iamyounz",
  publisher: "iamyounz",
  metadataBase: new URL(process.env.APP_URL || "https://iamyounz.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "iamyounz — Stories That Stay With You",
    description:
      "Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.",
    url: "/",
    siteName: "iamyounz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "iamyounz — Stories That Stay With You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iamyounz — Stories That Stay With You",
    description:
      "Inspiring millions through emotional stories, life lessons, love, success, and motivation. New videos every day.",
    creator: "@iamyounz",
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let initialData = undefined;
  try {
    const overview = await getChannelOverview(true);
    initialData = {
      channel: overview.channel,
      videos: overview.videos,
      featuredVideo: overview.featuredVideo,
      stats: overview.stats,
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Failed to pre-fetch YouTube data in RootLayout:", err);
  }
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} h-full antialiased`}
    >
      <body
        className="bg-[#0B0B0B] text-[#F5F2ED] antialiased min-h-screen selection:bg-[#E50914] selection:text-white"
        suppressHydrationWarning
      >
        <YouTubeProvider initialData={initialData}>{children}</YouTubeProvider>
      </body>
    </html>
  );
}
