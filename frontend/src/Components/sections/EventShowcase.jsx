import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPhotograph } from "react-icons/hi";
import SectionTitle from "../ui/SectionTitle";
import { getEvents } from "../../api";

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23111827' width='800' height='600'/%3E%3Crect fill='%23d4af37' x='350' y='250' width='100' height='100' rx='8'/%3E%3Cpath fill='%23f8f5f0' d='M370 280h60v8H370zm0 20h60v8H370zm0-10h40v8H370z' opacity='0.5'/%3E%3Ctext x='400' y='430' font-family='serif' font-size='22' fill='%23d4af37' text-anchor='middle' letter-spacing='4'%3EGrazo%20Bites%3C/text%3E%3C/svg%3E";

export default function EventShowcase() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setList(data);
        if (data.length > 0) setActive(data[0]);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (imgRef.current) imgRef.current.src = active?.image || "";
  }, [active]);

  if (loading) return null;
  if (list.length === 0) return null;

  return (
    <section id="events" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="Events We Cater"
          title="Celebrate Every Moment With Grazo Bites"
          description="From the joy of a haldi ceremony to the grandeur of a wedding reception — every event receives our complete dedication and culinary artistry."
        />

        {/* Event Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {list.map((ev) => (
            <button
              key={ev.id}
              onClick={() => setActive(ev)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                active?.id === ev.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white text-dark/60 hover:text-primary border border-gray-200 hover:border-primary/30"
              }`}
            >
              {ev.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                ref={imgRef}
                src={active?.image || FALLBACK_IMG}
                alt={active?.title || "Event image"}
                loading="lazy"
                onError={(e) => { e.target.src = FALLBACK_IMG; }}
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {(!active?.image) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <HiPhotograph className="w-16 h-16 text-gold/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-gold font-semibold text-sm tracking-wider uppercase">
                  {active?.tagline}
                </span>
                <h3 className="text-3xl font-heading font-bold text-white mt-1">
                  {active?.title}
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-gold/10 rounded-full text-gold text-sm font-semibold">
                {active?.capacity}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {active?.description}
              </p>
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                Book This Event
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
