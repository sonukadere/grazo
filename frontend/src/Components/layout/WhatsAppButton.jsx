import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../data/navigation";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden sm:block bg-[#1C1C1C] text-white text-xs font-semibold py-2 px-3.5 rounded-xl border border-[#C9A24D]/40 shadow-xl whitespace-nowrap"
          >
            Chat with our Catering Team
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Pulse Ring */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Direct WhatsApp Enquiry for Grazo Bites Catering"
      >
        {/* Subtle breathing ripple */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 animate-ping pointer-events-none" />

        <FaWhatsapp className="w-7 h-7 relative z-10" />

        {/* Live Notification Indicator Badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5A1A1F] text-[#FAF7F2] border-2 border-white rounded-full text-[10px] font-bold flex items-center justify-center z-10">
          1
        </span>
      </motion.a>
    </div>
  );
}
