import { motion } from "framer-motion";

export default function SectionTitle({
  subtitle,
  title,
  description,
  light = false,
  center = true,
}) {
  const textClass = light ? "text-white" : "text-dark";
  const mutedClass = light ? "text-gray-300" : "text-gray-soft";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}
    >
      {subtitle && (
        <span className="inline-block text-gold font-semibold text-sm tracking-[0.2em] uppercase mb-3">
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight ${textClass}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${mutedClass}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
