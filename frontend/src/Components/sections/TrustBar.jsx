import { motion } from "framer-motion";
import { GiRibbonMedal, GiPartyPopper, GiGlassCelebration } from "react-icons/gi";
import { HiShieldCheck } from "react-icons/hi";
import { fssaiNumber } from "../../data/navigation";

// PLACEHOLDERS: Edit values and labels below as needed for your business
export const trustMetrics = [
  {
    id: 1,
    icon: GiPartyPopper,
    value: "500+",
    label: "Events Catered",
    subtext: "Weddings & Celebrations", // [Placeholder]
  },
  {
    id: 2,
    icon: GiRibbonMedal,
    value: "10+",
    label: "Years of Experience",
    subtext: "Culinary Excellence in MP", // [Placeholder]
  },
  {
    id: 3,
    icon: GiGlassCelebration,
    value: "50,000+",
    label: "Guests Served",
    subtext: "Smiles & Memories Created", // [Placeholder]
  },
  {
    id: 4,
    icon: HiShieldCheck,
    value: "FSSAI Licensed",
    label: "100% Certified Hygiene",
    subtext: `Lic: ${fssaiNumber}`, // [Placeholder]
  },
];

export default function TrustBar() {
  return (
    <section id="trust-bar" className="relative z-20 bg-[#FAF7F2] border-y border-[#C9A24D]/25 py-8 md:py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/70 border border-[#C9A24D]/15 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A24D]/15 text-[#C9A24D] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-xl sm:text-2xl text-[#1C1C1C] leading-none mb-1">
                    {item.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#5A1A1F] leading-tight truncate">
                    {item.label}
                  </p>
                  <p className="text-[0.7rem] sm:text-xs text-[#5E5E5E] leading-tight mt-0.5 truncate">
                    {item.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
