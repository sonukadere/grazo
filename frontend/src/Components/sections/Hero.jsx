import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { whatsappLink } from "../../data/navigation";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1C1C1C] pt-24 pb-16"
    >
      {/* Background Image with Scroll Parallax & Dark Vignette Gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85&auto=format&fit=crop"
          alt="Luxury Pure Vegetarian Catering Setup by Grazo Bites in Indore"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center animate-subtle-zoom"
          loading="eager"
        />
        {/* Dark luxury gradient overlays for AA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/75 to-[#1C1C1C]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1C1C1C]/50 to-[#1C1C1C]/90" />
      </motion.div>

      {/* Decorative Gold Accent Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent z-10" />

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 md:py-16"
      >
        {/* "100% Pure Vegetarian" Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-[#1C1C1C]/80 border border-[#C9A24D]/60 shadow-lg backdrop-blur-md mb-6"
        >
          {/* Pure Vegetarian Green Dot Symbol */}
          <span className="w-3.5 h-3.5 border-2 border-emerald-500 rounded-sm flex items-center justify-center bg-transparent flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </span>
          <span className="text-[0.68rem] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#DFC688]">
            100% Pure Vegetarian Catering • Indore
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.14, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight leading-[1.12] text-balance mb-6"
        >
          Where Every <span className="text-gradient">Celebration</span>
          <br className="hidden sm:inline" /> Finds Its Flavour
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
          className="text-base sm:text-lg md:text-xl text-[#FAF7F2]/90 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          Grazo Bites crafts boutique pure vegetarian spreads, opulent artisanal grazing tables,
          and interactive live counters exclusively for small parties, house gatherings, birthdays, kitty parties, and intimate corporate events across Indore.
        </motion.p>

        {/* Two CTAs: "Get a Quote" and "WhatsApp Us" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto btn-primary text-sm sm:text-base px-9 py-4 uppercase tracking-wider font-semibold"
            aria-label="Request a customized quote for your event"
          >
            Get a Quote
          </motion.button>

          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto btn-secondary-light text-sm sm:text-base px-8 py-4 flex items-center justify-center gap-3 font-semibold"
            aria-label="Contact Grazo Bites directly on WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 text-emerald-400" />
            WhatsApp Us
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.button
        onClick={() => scrollTo("trust-bar")}
        aria-label="Scroll to details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.0 }, y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#C9A24D]/75 hover:text-[#C9A24D] transition-colors p-2 cursor-pointer"
      >
        <HiChevronDown className="w-7 h-7" />
      </motion.button>
    </section>
  );
}
