import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { GiRibbonMedal, GiPartyPopper, GiGlassCelebration } from "react-icons/gi";

export const trustMetrics = [
  {
    id: 1,
    icon: GiPartyPopper,
    target: 100,
    suffix: "+",
    value: "100+",
    label: "Events Catered",
    subtext: "Small Parties & Gatherings",
  },
  {
    id: 2,
    icon: GiRibbonMedal,
    target: 5,
    suffix: " Years",
    value: "5 Years",
    label: "Of Experience",
    subtext: "Culinary Excellence in MP",
  },
  {
    id: 3,
    icon: GiGlassCelebration,
    target: 10000,
    suffix: "+",
    value: "10,000+",
    label: "Guests Served",
    subtext: "Smiles & Memories Created",
  },
];

function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section id="trust-bar" className="relative z-20 bg-[#FFFDF9] border-y border-[#C9A24D]/25 py-8 md:py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          {trustMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#C9A24D]/20 shadow-sm hover:shadow-lg hover:border-[#C9A24D]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A24D]/15 text-[#C9A24D] group-hover:bg-[#5A1A1F] group-hover:text-[#DFC688] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-xl sm:text-2xl text-[#1C1C1C] leading-none mb-1">
                    <AnimatedCounter target={item.target} suffix={item.suffix} />
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
