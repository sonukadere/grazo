import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight, HiPlay, HiArrowsExpand } from "react-icons/hi";
import SectionTitle from "../ui/SectionTitle";
import { getGallery } from "../../api";
import fallbackGrazingImg from "../Assets/grasing table full image.jpg";

export default function Gallery({ hideHeader = false }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    getGallery()
      .then((items) => {
        // Map images to curated categories
        const categorized = items.map((item, i) => {
          let category = "Events";
          if (item.type === "video") category = "Videos";
          else if (i % 3 === 0) category = "Grazing & Plating";
          else if (i % 3 === 1) category = "Live Counters";
          else category = "Private Parties";
          return {
            ...item,
            category,
            title: item.title === "Event Photography" ? `Grazo Bites Highlight #${i + 1}` : item.title,
          };
        });
        setGalleryImages(categorized);
      })
      .catch(() => setGalleryImages([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", "Grazing & Plating", "Live Counters", "Private Parties", "Videos"];

  const filtered =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const next = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      const idx = filtered.findIndex((f) => f.id === prev.id);
      return filtered[(idx + 1) % filtered.length];
    });
  }, [filtered]);

  const prev = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      const idx = filtered.findIndex((f) => f.id === prev.id);
      return filtered[(idx - 1 + filtered.length) % filtered.length];
    });
  }, [filtered]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, next, prev]);

  if (loading) return null;

  return (
    <section
      id="gallery"
      className={`${hideHeader ? "py-12 md:py-16" : "py-14 md:py-20 border-t border-[#C9A24D]/15"} bg-[#FAF7F2] relative`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <SectionTitle
            subtitle="Our Portfolio"
            title="Moments We Have Made Delicious"
            description="A visual journey through our luxurious grazing table setups, interactive live counters, and intimate private party spreads across Indore."
          />
        )}

        {/* Category Filter Pills with Sliding Active Pill */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 md:mb-12">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer ${
                  active
                    ? "text-white"
                    : "bg-white text-[#1C1C1C]/80 border border-[#C9A24D]/30 hover:border-[#C9A24D] hover:text-[#5A1A1F]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="galleryFilterPill"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#5A1A1F] shadow-md shadow-[#5A1A1F]/25"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.slice(0, 18).map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
              className="break-inside-avoid mb-6 group relative overflow-hidden rounded-2xl bg-white border border-[#C9A24D]/20 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setLightbox(img)}
            >
              {img.type === "video" ? (
                <div className="relative aspect-video sm:aspect-square bg-black">
                  <video
                    src={img.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#C9A24D] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <HiPlay className="w-6 h-6 text-[#1C1C1C] ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={img.src}
                    alt={img.title || "Grazo Bites Catering event highlight"}
                    loading="lazy"
                    width={600}
                    height={450}
                    onError={(e) => {
                      e.target.src = fallbackGrazingImg;
                    }}
                    className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-[#C9A24D]">
                  {img.category}
                </span>
                <p className="text-white font-medium text-sm sm:text-base leading-tight mt-1 flex items-center justify-between">
                  <span>{img.title}</span>
                  <HiArrowsExpand className="w-4 h-4 text-[#C9A24D]" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1C]/95 backdrop-blur-md p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-[#C9A24D] transition-colors p-2 z-10 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <HiX className="w-8 h-8" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#C9A24D] bg-black/40 hover:bg-black/70 p-3 rounded-full transition-all z-10 cursor-pointer"
              aria-label="Previous Image"
            >
              <HiChevronLeft className="w-8 h-8" />
            </button>

            {/* Media Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[82vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "video" ? (
                <video
                  key={lightbox.id}
                  src={lightbox.src}
                  className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  key={lightbox.id}
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              )}

              {/* Caption */}
              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-wider text-[#C9A24D] font-medium block">
                  {lightbox.category}
                </span>
                <p className="text-white text-sm sm:text-base font-medium mt-1">
                  {lightbox.title}
                </p>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#C9A24D] bg-black/40 hover:bg-black/70 p-3 rounded-full transition-all z-10 cursor-pointer"
              aria-label="Next Image"
            >
              <HiChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
