import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { navLinks, whatsappLink } from "../../data/navigation";
import logo from "../Assets/grazo-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.filter((l) => !l.isRoute).map((l) => l.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (id) => {
      setIsOpen(false);
      if (location.pathname !== "/") {
        window.location.href = "/#" + id;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [location.pathname]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
          : "bg-dark/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16 md:h-18" : "h-18 md:h-22"
          }`}
        >
          {/* Logo + Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group min-w-0"
            aria-label="Grazo Bites Home"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-gold/40 group-hover:ring-gold shadow-lg shadow-gold/10 flex-shrink-0 transition-all duration-300">
              <img
                src={logo}
                alt="Grazo Bites Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold leading-tight transition-all duration-500 ${
                  scrolled
                    ? "text-lg md:text-xl text-white"
                    : "text-xl md:text-2xl text-white"
                }`}
              >
                Grazo Bites
              </span>
              <span
                className={`text-[0.5rem] md:text-[0.55rem] tracking-[0.25em] font-medium uppercase leading-tight transition-all duration-500 ${
                  scrolled ? "text-gold/90" : "text-gold"
                }`}
              >
                Luxury Vegetarian Catering
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? location.pathname === link.path
                : activeSection === link.href;
              return link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-gold"
                      : "text-white/80 hover:text-gold"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full"
                    />
                  )}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-gold"
                      : "text-white/80 hover:text-gold"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full"
                    />
                  )}
                </button>
              );
            })}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="ml-4 flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-dark font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30 active:scale-95"
            >
              <FaWhatsapp className="w-4 h-4" />
              Book Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2 rounded-lg transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <HiX className="w-6 h-6 text-white" />
            ) : (
              <HiMenu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-dark/95 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col pt-22 px-6 gap-1">
                <span className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4 font-medium">
                  Navigation
                </span>
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3.5 text-base font-medium text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className="px-4 py-3.5 text-base font-medium text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all text-left"
                    >
                      {link.label}
                    </button>
                  )
                )}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-gold hover:bg-gold/90 text-dark font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
