import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import logo from "../Assets/grazo-logo.png";
import { whatsappLink, phoneNumber, email, location } from "../../data/navigation";
import { subscribeNewsletter } from "../../api";

const quickLinks = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Menu", href: "menu" },
  { label: "Gallery", path: "/gallery", isRoute: true },
  { label: "Contact", href: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [nlEmail, setNlEmail] = useState("");
  const [nlMsg, setNlMsg] = useState("");
  const [nlSending, setNlSending] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlSending(true);
    try {
      await subscribeNewsletter(nlEmail);
      setNlMsg("Subscribed successfully!");
      setNlEmail("");
    } catch {
      setNlMsg("Failed to subscribe. Try again.");
    } finally {
      setNlSending(false);
      setTimeout(() => setNlMsg(""), 4000);
    }
  };

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all">
                <img src={logo} alt="Grazo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold text-white block leading-tight">
                  Grazo
                </span>
                <span className="text-[0.5rem] tracking-[0.2em] text-gold font-medium uppercase block leading-tight">
                  Simply Crafted Flavours
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Indore's premier pure vegetarian catering brand — crafting luxury dining experiences for weddings, celebrations, and corporate events across Madhya Pradesh.
            </p>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="text-gold font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Stay inspired — receive updates on new menus, event highlights, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                disabled={nlSending}
                className="px-3 py-2.5 bg-gold text-dark rounded-lg font-semibold text-sm hover:bg-gold/90 transition-all disabled:opacity-60"
              >
                <HiMail className="w-4 h-4" />
              </button>
            </form>
            {nlMsg && (
              <p className="text-xs text-gold mt-2">{nlMsg}</p>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-gold font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.href}`}
                      className="text-gray-400 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-gold font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Our Services
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {["Wedding Catering", "Corporate Catering", "Live Counters", "Luxury Buffet", "Grazing Tables", "Private Parties", "Outdoor Catering"].map(
                (s) => (
                  <li key={s}>{s}</li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-gold font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  <FaPhone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  {phoneNumber}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  <FaEnvelope className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                {location}
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {year} Grazo. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
