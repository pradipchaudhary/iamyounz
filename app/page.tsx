import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0B] text-[#F5F2ED] selection:bg-[#E50914] selection:text-white">
      {/* navbar */}
      <main className="flex-glow">
        <Hero />
      </main>
    </div>
  );
}
