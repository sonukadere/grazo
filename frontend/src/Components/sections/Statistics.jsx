import { useEffect, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import AnimatedCounter from "../ui/AnimatedCounter";
import { getStats } from "../../api";

export default function Statistics() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStats()
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return null;
  return (
    <section className="py-20 md:py-24 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          subtitle="Our Impact"
          title="Grazo Bites in Numbers"
          description="Our journey is measured in smiles served, celebrations elevated, and standards set."
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {list.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-gray-300 text-sm mt-2 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
