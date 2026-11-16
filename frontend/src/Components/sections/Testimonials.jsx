import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SectionTitle from "../ui/SectionTitle";
import { getTestimonials } from "../../api";

export default function Testimonials() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        setList(data);
        setCurrent(0);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (list.length === 0) return null;

  const next = () => setCurrent((p) => (p + 1) % list.length);
  const prev = () => setCurrent((p) => (p - 1 + list.length) % list.length);

  const t = list[current];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="Testimonials"
          title="Words From Our Families"
          description="Don't take our word for it — hear from the families and businesses who trusted Grazo Bites with their celebrations."
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Quote */}
              <svg
                className="w-10 h-10 mx-auto mb-6 text-gold/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-lg sm:text-xl text-dark/80 leading-relaxed italic mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-gold" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/20"
                />
                <div className="text-left">
                  <p className="font-heading font-bold text-dark">{t.name}</p>
                  <p className="text-gray-500 text-sm">
                    {t.event} &middot; {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gold flex items-center justify-center text-dark/50 hover:text-gold transition-all"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-gold w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gold flex items-center justify-center text-dark/50 hover:text-gold transition-all"
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
