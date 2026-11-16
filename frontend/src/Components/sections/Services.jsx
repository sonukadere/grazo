import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { servicesData } from "../../data/services";
import { HiArrowRight } from "react-icons/hi";

export default function Services() {
  const scrollToContact = (eventType) => {
    const el = document.getElementById("contact");
    if (el) {
      const select = document.querySelector('select[name="eventType"]');
      if (select) {
        select.value = eventType;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
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
    <section id="services" className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#C9A24D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#5A1A1F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="Our Catering Services"
          title="Curated Celebrations for Every Milestone"
          description="From lavish royal wedding banquets to high-energy sangeet live stations and corporate summits in Indore — every event is tailored with authentic taste and luxury presentation."
        />

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#C9A24D]/20 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Card Image Container with Hover Zoom */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-[#1C1C1C]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Event Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FAF7F2]/90 backdrop-blur-md text-[#5A1A1F] border border-[#C9A24D]/40 shadow-sm">
                    {service.tag}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-[#C9A24D] uppercase tracking-wider block mb-1">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1C1C1C] mb-3 group-hover:text-[#5A1A1F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#5E5E5E] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Action Link */}
                <button
                  onClick={() => scrollToContact(service.title)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#5A1A1F] group-hover:text-[#C9A24D] transition-colors cursor-pointer pt-4 border-t border-gray-100"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span>Book for this event</span>
                  <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
