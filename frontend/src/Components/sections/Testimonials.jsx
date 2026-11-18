import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { RiDoubleQuotesL } from "react-icons/ri";
import SectionTitle from "../ui/SectionTitle";
import { getTestimonials } from "../../api";

export default function Testimonials() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        setList(data);
        setCurrent(0);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  // Autoplay carousel every 6 seconds unless paused
  useEffect(() => {
    if (list.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [list.length, isPaused]);

  if (loading || list.length === 0) return null;

  const next = () => setCurrent((p) => (p + 1) % list.length);
  const prev = () => setCurrent((p) => (p - 1 + list.length) % list.length);

  const t = list[current];

  return (
    <section
      id="testimonials"
      className="py-14 md:py-20 bg-[#FAF7F2] border-t border-[#C9A24D]/15 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Client Stories"
          title="Cherished Words From Our Host Families"
          description="Hear from the hosts, families, and teams who entrusted Grazo Bites with their intimate celebrations and small parties across Indore."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Card Presentation */}
          <div className="bg-white rounded-3xl px-6 py-10 sm:px-16 sm:py-12 md:px-20 md:py-14 border border-[#C9A24D]/25 shadow-xl relative">
            <RiDoubleQuotesL className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9A24D]/20 absolute top-6 left-6 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center relative z-10 min-h-[240px]"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1.5 mb-5 text-[#C9A24D]">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-base sm:text-lg md:text-xl text-[#1C1C1C] font-light leading-relaxed max-w-2xl mb-7 italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Client Meta (Name and Event Type) */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#C9A24D]/40 mb-3 bg-gray-100">
                    <img
                      src={t.image}
                      alt={t.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#1C1C1C]">
                    {t.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5A1A1F] font-semibold mt-0.5">
                    {t.event} • {t.location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 pointer-events-none">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full bg-white border border-[#C9A24D]/30 text-[#1C1C1C] hover:bg-[#5A1A1F] hover:text-white transition-all flex items-center justify-center shadow-md pointer-events-auto cursor-pointer"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full bg-white border border-[#C9A24D]/30 text-[#1C1C1C] hover:bg-[#5A1A1F] hover:text-white transition-all flex items-center justify-center shadow-md pointer-events-auto cursor-pointer"
                aria-label="Next testimonial"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Indicator Dots + Mobile Controls */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <button
              onClick={prev}
              className="sm:hidden w-9 h-9 rounded-full bg-white border border-[#C9A24D]/30 text-[#1C1C1C] hover:bg-[#5A1A1F] hover:text-white transition-all flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex justify-center gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    current === i ? "w-8 bg-[#5A1A1F]" : "w-2 bg-[#C9A24D]/40 hover:bg-[#C9A24D]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="sm:hidden w-9 h-9 rounded-full bg-white border border-[#C9A24D]/30 text-[#1C1C1C] hover:bg-[#5A1A1F] hover:text-white transition-all flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Next testimonial"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
