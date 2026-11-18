import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { navLinks, whatsappLink, phoneNumber, email, location, instagramUrl } from "../../data/navigation";
import logo from "../Assets/grazo-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const scrollTo = (id) => {
    if (routerLocation.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
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

  const handleLinkClick = (link) => {
    if (link.route) {
      navigate(link.route);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    scrollTo(link.href);
  };

  return (
    <footer className="bg-[#1C1C1C] text-white border-t border-[#C9A24D]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#C9A24D]/50 group-hover:ring-[#C9A24D] transition-all flex-shrink-0">
                <img
                  src={logo}
                  alt="Grazo Bites"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-white tracking-wide block leading-none">
                  Grazo Bites
                </span>
                <span className="text-[0.6rem] tracking-[0.25em] font-semibold text-[#C9A24D] uppercase mt-1 block">
                  Luxury Vegetarian Catering • Indore
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Indore&apos;s premier boutique pure vegetarian catering brand for small parties. Specialising in house parties, birthdays, kitty parties, bespoke artisanal grazing tables, and interactive live counters.
            </p>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C9A24D] rounded-full inline-block" />
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-300 hover:text-[#C9A24D] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-[#C9A24D] hover:underline font-semibold cursor-pointer"
                >
                  Get a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C9A24D] rounded-full inline-block" />
              Connect With Us
            </h4>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-[#C9A24D] flex-shrink-0" />
                <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="hover:text-[#C9A24D] transition-colors">
                  {phoneNumber}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-[#C9A24D] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#C9A24D] transition-colors">
                  {email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-[#C9A24D] flex-shrink-0 mt-1" />
                <span>{location}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Follow Our Catering Journey
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#5A1A1F] text-white hover:text-[#C9A24D] flex items-center justify-center transition-all border border-white/10 hover:border-[#C9A24D]/40"
                  aria-label="Grazo Bites Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#5A1A1F] text-white hover:text-[#C9A24D] flex items-center justify-center transition-all border border-white/10 hover:border-[#C9A24D]/40"
                  aria-label="Grazo Bites Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-emerald-600/30 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-all border border-emerald-500/30"
                  aria-label="Chat on WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <p>
            &copy; {currentYear} Grazo Bites. All rights reserved. 100% Pure Vegetarian Luxury Catering.
          </p>
          <p className="text-gray-400">
            Crafted for small parties & intimate celebrations across Indore, Madhya Pradesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
