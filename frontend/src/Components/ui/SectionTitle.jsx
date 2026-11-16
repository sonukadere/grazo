import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-12 md:mb-16`}
    >
      {badge && (
        <span className="inline-block px-4 py-1 mb-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-maroon/10 text-maroon border border-maroon/20">
          {badge}
        </span>
      )}

      {subtitle && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} mb-3`}>
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold font-medium text-xs sm:text-sm tracking-[0.25em] uppercase">
            {subtitle}
          </span>
          <span className="w-8 h-px bg-gold" />
        </div>
      )}

      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight ${textClass}`}
      >
        {title}
      </h2>

      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${mutedClass} max-w-2xl ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
