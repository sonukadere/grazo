import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="About Grazo Bites"
          title="Elevating Vegetarian Catering into an Art Form"
          description="Born in Indore from a reverence for pure vegetarian culinary traditions and modern gastronomy. We believe plant-based dining deserves the highest standard of elegance, innovation, and soulful flavor."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-10">
          {/* Visual Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl shadow-sm border border-[#C9A24D]/20">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80"
                  alt="Master chef crafting gourmet vegetarian dish"
                  width={500}
                  height={350}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-sm border border-[#C9A24D]/20">
                <img
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80"
                  alt="Fresh organic ingredients and microgreens"
                  width={500}
                  height={450}
                  loading="lazy"
                  className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="overflow-hidden rounded-2xl shadow-sm border border-[#C9A24D]/20">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80"
                  alt="Luxury dining and banquet table setting in Indore"
                  width={500}
                  height={450}
                  loading="lazy"
                  className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-sm border border-[#C9A24D]/20">
                <img
                  src="https://images.unsplash.com/photo-1540488341538-1e4a021f7ee7?w=500&q=80"
                  alt="Artisanal dessert presentation"
                  width={500}
                  height={350}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="p-7 sm:p-9 bg-white rounded-3xl shadow-sm border border-[#C9A24D]/20">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1C1C1C] mb-3 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#C9A24D] rounded-full inline-block" />
                Our Heritage & Ethos
              </h3>
              <p className="text-[#5E5E5E] leading-relaxed text-sm sm:text-base">
                Grazo Bites began with a simple belief: pure vegetarian dining should never compromise on artistry, sophistication, or depth of flavor. Grounded in Indore&apos;s celebrated food culture and driven by modern culinary innovation, we create bespoke feasts that honor traditional heritage while surprising the most discerning palates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#C9A24D]/15">
                <h4 className="text-[#5A1A1F] font-heading font-bold text-lg mb-2">
                  100% Pure Vegetarian
                </h4>
                <p className="text-[#5E5E5E] text-xs sm:text-sm leading-relaxed">
                  Strictly vegetarian kitchen facilities with dedicated Jain, vegan, and sattvic preparation protocols available for every sacred ritual.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#C9A24D]/15">
                <h4 className="text-[#C9A24D] font-heading font-bold text-lg mb-2">
                  Bespoke Hospitality
                </h4>
                <p className="text-[#5E5E5E] text-xs sm:text-sm leading-relaxed">
                  Every banquet is managed by experienced culinary directors and gracious, uniformed service staff to ensure effortless hosting for your family.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
