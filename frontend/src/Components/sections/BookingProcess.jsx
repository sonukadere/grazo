import { motion } from "framer-motion";
import { HiChatAlt2, HiSparkles, HiClipboardCheck, HiCheckCircle } from "react-icons/hi";
import SectionTitle from "../ui/SectionTitle";

const processSteps = [
  {
    step: "01",
    title: "Enquiry",
    subtitle: "Share Your Vision",
    description:
      "Reach out through our online quote form or direct WhatsApp with your event date, venue, guest count, and initial catering ideas.",
    icon: HiChatAlt2,
  },
  {
    step: "02",
    title: "Tasting",
    subtitle: "Sample the Flavours",
    description:
      "Join us for an exclusive curated food tasting session in Indore where you sample signature dishes, live counter concepts, and desserts.",
    icon: HiSparkles,
  },
  {
    step: "03",
    title: "Custom Menu",
    subtitle: "Crafted to Perfection",
    description:
      "Our chefs fine-tune a personalized 100% pure vegetarian menu tailored to your family's preferences, dietary needs (Jain/Vegan), and budget.",
    icon: HiClipboardCheck,
  },
  {
    step: "04",
    title: "Flawless Execution",
    subtitle: "Celebrate Without Worry",
    description:
      "On your big day, our uniformed service crew, live station chefs, and event managers coordinate every detail for a seamless luxury experience.",
    icon: HiCheckCircle,
  },
];

export default function BookingProcess() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
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
    <section id="process" className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="How It Works"
          title="From First Conversation to Flawless Celebration"
          description="A seamless, transparent 4-step journey ensuring your special occasion is celebrated with peace of mind and unmatched culinary flair."
        />

        {/* 4 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-12">
          {/* Decorative Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#C9A24D]/20 via-[#C9A24D] to-[#C9A24D]/20 -z-0" />

          {processSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative z-10 bg-white rounded-2xl p-7 border border-[#C9A24D]/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Step Circle & Icon */}
                <div className="w-16 h-16 rounded-full bg-[#5A1A1F] text-[#FAF7F2] ring-4 ring-[#FAF7F2] shadow-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#C9A24D] group-hover:text-[#1C1C1C] transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Step Number Tag */}
                <span className="text-[0.7rem] uppercase font-bold tracking-[0.2em] text-[#C9A24D] bg-[#FAF7F2] px-3 py-0.5 rounded-full border border-[#C9A24D]/30 mb-2">
                  Step {item.step}
                </span>

                <h3 className="font-heading font-bold text-xl text-[#1C1C1C] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#5A1A1F] mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#5E5E5E] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={scrollToContact}
            className="btn-primary text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5"
          >
            Start Your Enquiry Today
          </button>
        </div>
      </div>
    </section>
  );
}
