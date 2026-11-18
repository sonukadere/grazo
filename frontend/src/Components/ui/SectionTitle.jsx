import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function SectionTitle({
  subtitle,
  title,
  description,
  light = false,
  center = true,
  badge = null,
}) {
  const textClass = light ? "text-white" : "text-charcoal";
  const mutedClass = light ? "text-gray-300" : "text-charcoal-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className={`max-w-6xl ${center ? "mx-auto text-center" : ""} mb-10 md:mb-12`}
    >
      {badge && (
        <span className="inline-block px-4 py-1 mb-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-maroon/10 text-maroon border border-maroon/20">
          {badge}
        </span>
      )}

      {subtitle && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} mb-3`}>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="w-8 sm:w-10 h-[1.5px] bg-[#C9A24D]/70 rounded-full origin-right"
          />
          <span className="text-[#A98332] font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase">
            {subtitle}
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="w-8 sm:w-10 h-[1.5px] bg-[#C9A24D]/70 rounded-full origin-left"
          />
        </div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:whitespace-nowrap font-heading font-bold leading-[1.2] text-balance ${textClass}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
          className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed ${mutedClass} max-w-2xl text-pretty ${center ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
