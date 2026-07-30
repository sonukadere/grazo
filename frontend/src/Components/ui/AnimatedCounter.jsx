import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function AnimatedCounter({ end, suffix = "", duration = 2 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (val) => setDisplay(Math.floor(val)),
    });
    return () => controls.stop();
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <span className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gold">
        {display.toLocaleString()}{suffix}
      </span>
    </motion.div>
  );
}
