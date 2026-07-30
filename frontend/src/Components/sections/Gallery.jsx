import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight, HiPlay } from "react-icons/hi";
import SectionTitle from "../ui/SectionTitle";
import { getGallery } from "../../api";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    getGallery()
      .then(setGalleryImages)
      .catch(() => setGalleryImages([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(galleryImages.map((g) => g.category))];

  const filtered = filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  const next = useCallback(() => {
    setLightbox((prev) => {
      const idx = filtered.findIndex((f) => f.id === prev.id);
      return filtered[(idx + 1) % filtered.length];
    });
  }, [filtered]);

  const prev = useCallback(() => {
    setLightbox((prev) => {
      const idx = filtered.findIndex((f) => f.id === prev.id);
      return filtered[(idx - 1 + filtered.length) % filtered.length];
    });
  }, [filtered]);

  if (loading) return null;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="Gallery"
          title="Moments We've Made Beautiful"
          description="A glimpse into our world of elegant presentations, vibrant live counters, and celebrations that became memories."
        />

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                filter === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-dark/60 hover:text-primary border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl shadow-sm cursor-pointer"
                onClick={() => setLightbox(img)}
              >
                {img.type === "video" ? (
                  <>
                    <video
                      src={img.src}
                      className="w-full h-64 object-cover"
                      preload="metadata"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-dark/30">
                      <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-lg">
                        <HiPlay className="w-6 h-6 text-dark ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {img.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <HiX className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold transition-colors z-10"
              aria-label="Previous image"
            >
              <HiChevronLeft className="w-10 h-10" />
            </button>

            {lightbox.type === "video" ? (
              <motion.video
                key={lightbox.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={lightbox.src}
                className="max-w-full max-h-[85vh] rounded-lg"
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                key={lightbox.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold transition-colors z-10"
              aria-label="Next image"
            >
              <HiChevronRight className="w-10 h-10" />
            </button>

            <p className="absolute bottom-6 text-white/80 text-sm font-medium">
              {lightbox.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
