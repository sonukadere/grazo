import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import SectionTitle from "../ui/SectionTitle";
import { getCategories, getAllMenu } from "../../api";

export default function PremiumMenu() {
  const [categories, setCategories] = useState([]);
  const [itemsByCat, setItemsByCat] = useState({});
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([getCategories(), getAllMenu()])
      .then(([cats, menuItems]) => {
        setCategories(cats);
        const grouped = {};
        cats.forEach((c) => {
          grouped[c._id] = menuItems
            .filter((m) => m.category === c._id)
            .map((m) => ({ name: m.name, description: m.description }));
        });
        setItemsByCat(grouped);
        if (cats.length > 0) setActive(cats[0]);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const activeCat = active;
  const activeItems = activeCat ? itemsByCat[activeCat._id] || [] : [];

  if (loading) return null;

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="Our Menu"
          title="A Culinary Journey Through India & Beyond"
          description="Explore our carefully curated menu categories — each dish crafted with passion, precision, and the finest vegetarian ingredients sourced from across the country."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCat?._id === cat._id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white text-dark/60 hover:text-primary border border-gray-200 hover:border-primary/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Description */}
            <p className="text-center text-gray-500 italic max-w-2xl mx-auto mb-10 leading-relaxed">
                {activeCat?.description}
            </p>

            {/* Items Grid — Classic Restaurant Menu Layout */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
              {activeItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.4 }}
                  className="group py-4 border-b border-dashed border-gray-200 md:even:border-none cursor-pointer"
                  onClick={() => setSelected(item)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gold font-mono font-semibold mt-0.5 min-w-[1.8rem] select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-heading font-semibold text-dark group-hover:text-gold transition-colors leading-snug">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <HiX className="w-4 h-4" />
              </button>
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-dark mb-2">
                {selected.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {selected.description}
              </p>
              <button
                onClick={() => {
                  setSelected(null);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-95"
              >
                Inquire About This Dish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
