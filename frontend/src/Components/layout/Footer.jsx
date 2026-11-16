import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { navLinks, whatsappLink, phoneNumber, email, location, fssaiNumber } from "../../data/navigation";
import logo from "../assets/grazo-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-[#1C1C1C] text-white border-t border-[#C9A24D]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
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
              Indore&apos;s premier pure vegetarian luxury catering brand. Specialising in opulent royal wedding banquets, bespoke artisanal grazing tables, and high-energy interactive live stations across Central India.
            </p>

            {/* FSSAI Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-[#C9A24D]/30 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-gray-300">
                FSSAI Lic. No: <strong className="text-[#DFC688]">{fssaiNumber}</strong> [Placeholder]
              </span>
            </div>
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
                    onClick={() => scrollTo(link.href)}
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
                  href="https://www.instagram.com/grazo_indore/"
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
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {currentYear} Grazo Bites. All rights reserved. 100% Pure Vegetarian Luxury Catering.
          </p>
          <p className="text-gray-400">
            Crafted for weddings & grand celebrations across Indore, Madhya Pradesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
