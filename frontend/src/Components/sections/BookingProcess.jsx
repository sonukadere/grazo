import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { bookingSteps } from "../../data/menuData";

export default function BookingProcess() {
  return (
    <section id="booking" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="How It Works"
          title="Your Journey to a Perfect Celebration"
          description="A seamless, transparent process from your first conversation to the last delightful bite."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20 -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-16">
            {bookingSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gold text-white font-heading font-bold text-lg flex items-center justify-center shadow-lg z-10 relative">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gold/10 hover:shadow-md transition-shadow ${
                      isEven ? "lg:text-right lg:mr-8" : "lg:text-left lg:ml-8"
                    }`}
                  >
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
