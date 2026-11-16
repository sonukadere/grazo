import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="About Grazo Bites"
          title="Luxury Vegetarian Catering, Rooted in Indian Tradition"
          description="Grazo Bites was born from a passion for reimagining vegetarian cuisine. We believe plant-based dining deserves the same artistry, elegance, and soul as any fine dining experience — and we deliver exactly that."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80"
                  alt="Chef preparing gourmet dish"
                  loading="lazy"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80"
                  alt="Fresh gourmet ingredients"
                  loading="lazy"
                  className="w-full h-64 sm:h-72 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80"
                  alt="Elegant dining setup"
                  loading="lazy"
                  className="w-full h-64 sm:h-72 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540488341538-1e4a021f7ee7?w=500&q=80"
                  alt="Luxurious food presentation"
                  loading="lazy"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-heading font-bold text-dark mb-3 flex items-center gap-3">
                <span className="w-1 h-6 bg-gold rounded-full inline-block" />
                Our Story
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Grazo Bites began with a simple belief: vegetarian food deserves the
                same artistry and elegance as any fine dining experience. Our
                founders, deeply passionate about Indian culinary heritage and
                world-class hospitality, set out to create a catering brand that
                redefines what plant-based luxury means. Today, we are one of
                Indore&apos;s most celebrated catering partners, trusted by families
                and corporations alike.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
                  <h4 className="text-gold font-heading font-bold text-lg mb-2">
                    Our Mission
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To elevate Indian vegetarian catering into an art form —
                    delivering exquisite flavours, warm hospitality, and
                    unforgettable experiences at every celebration.
                  </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
                  <h4 className="text-gold font-heading font-bold text-lg mb-2">
                    Our Vision
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To be India&apos;s most cherished luxury vegetarian catering
                    brand — known for culinary innovation, heartfelt service,
                    and an uncompromising commitment to quality.
                  </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
