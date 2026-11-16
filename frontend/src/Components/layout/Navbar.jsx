import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks } from "../../data/navigation";
import logo from "../Assets/grazo-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...navLinks.map((l) => l.href)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (id) => {
      setIsOpen(false);
      if (location.pathname !== "/") {
        window.location.href = `/#${id}`;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    [location.pathname]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1C1C1C]/95 backdrop-blur-md border-b border-[#C9A24D]/20 shadow-[0_4px_30px_rgba(0,0,0,0.35)] py-3"
          : "bg-gradient-to-b from-[#1C1C1C]/80 via-[#1C1C1C]/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group min-w-0"
            aria-label="Grazo Bites Homepage"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-[#C9A24D]/60 group-hover:ring-[#C9A24D] shadow-md shadow-[#C9A24D]/20 flex-shrink-0 transition-all duration-300">
              <img
                src={logo}
                alt="Grazo Bites Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl md:text-2xl text-white tracking-wide leading-tight group-hover:text-[#C9A24D] transition-colors">
                Grazo Bites
              </span>
              <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.25em] font-medium uppercase text-[#C9A24D] leading-tight">
                Luxury Vegetarian Catering • Indore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#C9A24D]"
                      : "text-white/85 hover:text-[#C9A24D]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#C9A24D] rounded-full"
                    />
                  )}
                </button>
              );
            })}

            {/* "Get a Quote" Primary CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="ml-5 btn-primary text-xs sm:text-sm tracking-wider uppercase"
              aria-label="Request a Catering Quote"
            >
              Get a Quote
            </button>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:text-[#C9A24D] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D]"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#1C1C1C] border-l border-[#C9A24D]/20 z-50 lg:hidden shadow-2xl flex flex-col p-6 pt-24"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24D] font-semibold mb-2">
                  Navigation
                </span>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-[#C9A24D]/15 text-[#C9A24D] font-semibold"
                          : "text-white/80 hover:text-[#C9A24D] hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full btn-primary text-center justify-center uppercase tracking-wider text-xs"
                >
                  Get a Quote
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
