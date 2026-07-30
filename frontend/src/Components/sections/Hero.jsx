import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { whatsappLink } from "../../data/navigation";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-18 md:pt-22"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=80"
          alt="Luxury catering setup by Grazo"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/70" />
      </div>

      {/* Decorative Gold Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block mb-5 px-5 py-1.5 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase rounded-full font-medium">
            Premium Pure Vegetarian Catering — Indore
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white leading-[1.05] tracking-tight"
        >
          Where Every
          <br />
          <span className="text-gradient">Celebration</span> Finds Its Flavour
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
        >
          We craft luxury vegetarian dining experiences for weddings, haldi & sangeet
          celebrations, corporate events, and intimate gatherings. Every dish tells a story of tradition, taste, and elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("menu")}
            className="px-8 py-3.5 bg-gold hover:bg-gold/90 text-dark font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-gold/20 active:scale-95 text-sm md:text-base"
          >
            Explore Our Menu
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 border border-white/30 hover:border-gold/60 text-white hover:text-gold font-semibold rounded-full transition-all active:scale-95 text-sm md:text-base"
          >
            Book Now
          </a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 pt-8 border-t border-white/10 max-w-2xl mx-auto"
        >
          <div className="flex justify-center gap-8 sm:gap-12 text-center">
            {[
              { value: "250+", label: "Signature Dishes" },
              { value: "500+", label: "Events Catered" },
              { value: "Indore", label: "Proudly Based In" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-gold font-heading font-bold text-xl sm:text-2xl">
                  {s.value}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-gold transition-colors"
      >
        <HiChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}
