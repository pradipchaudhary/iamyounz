import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QuoteSection from "@/components/QuoteSection";
import SubscribeCTA from "@/components/SubscribeCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0B] text-[#F5F2ED] selection:bg-[#E50914] selection:text-white">
      {/* navbar */}
      <Navbar />
      <main className="flex-glow">
        <Hero />
        <QuoteSection />
        <SubscribeCTA />
      </main>
      {/* Footer  */}
      <Footer />
    </div>
  );
}
