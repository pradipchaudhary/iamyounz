import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 min-h-screen">
        {/* About Hero Section */}
        <section className="px-6 sm:px-8 max-w-5xl mx-auto mb-20 sm:mb-28">
          <span className="text-xs uppercase tracking-[0.25em] text-[#EF4444] font-sans font-medium mb-4 block">
            About{" "}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-kalam font-light text-[#F5F2ED] tracking-tight leading-[1.15] mb-8">
            Why iamyounz exists.
          </h1>
          <p className="text-lg sm:text-xl text-[#A6A29C] font-light leading-relaxed max-w-3xl mb-12">
            <span className="">iamyounz</span> is a storytelling space built
            around the emotions, struggles, dreams, and lessons that make us
            human.
          </p>
        </section>
      </main>
    </div>
  );
}
