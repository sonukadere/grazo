import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import Gallery from "../Components/sections/Gallery";
import WhatsAppButton from "../Components/layout/WhatsAppButton";

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-[#FAF7F2] text-[#1C1C1C] min-h-screen flex flex-col font-body selection:bg-[#C9A24D] selection:text-[#1C1C1C]">
      <Navbar />

      {/* Dedicated Gallery Page Header */}
      <section className="relative bg-[#1C1C1C] text-white pt-28 pb-14 md:pt-32 md:pb-16 border-b border-[#C9A24D]/25 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,77,0.14),_transparent_65%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#DFC688] hover:text-white transition-colors px-4 py-1.5 rounded-full bg-white/5 border border-[#C9A24D]/30"
            >
              <HiArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#C9A24D]/70 rounded-full" />
              <span className="text-[#C9A24D] font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase">
                Our Portfolio
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#C9A24D]/70 rounded-full" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Moments We Have Made <span className="text-gradient">Delicious</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore our curated grazing tables, interactive live counters, and bespoke pure vegetarian small-party spreads crafted across Indore.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow bg-[#FAF7F2]">
        <Gallery hideHeader />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
