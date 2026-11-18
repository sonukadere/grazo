import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { HiSparkles } from "react-icons/hi";
import grazingTableImg from "../Assets/grasing table full image.jpg";
import cheeseBoardImg from "../Assets/cheese-board-5.jpg";
import dimsumCounterImg from "../curated/dimsum-asian-counter.jpg";
import fusionDessertImg from "../curated/fusion-dessert-spread.jpg";
import sevTamatarLasagnaImg from "../curated/sev-tamatar-lasagna.jpg";
import mexicanBurritoBowlImg from "../curated/mexican-burrito-bowl.jpg";
import avocadoPapdiChaatImg from "../curated/avocado-papdi-chaat.jpg";
import paneerTikkaTacosImg from "../curated/paneer-tikka-tacos.jpg";
import thechaPestoCrostiniImg from "../curated/thecha-pesto-crostini.jpg";

// Showcase data for Grazo Bites' signature grazing & live stations
const showcaseItems = [
  {
    id: 1,
    category: "grazing",
    title: "Grand Artisanal Grazing Tables",
    subtitle: "A Feast for the Senses",
    description:
      "A lavish tablescape of imported & artisanal cheeses, housemade hummus, smoked avocado papdi, exotic seasonal fruits, honeycomb, sourdough, and crackers.",
    image: grazingTableImg,
    features: ["Assorted Artisanal Cheeses", "5+ Housemade Dips", "Exotic Fruit Platters"],
  },
  {
    id: 2,
    category: "live",
    title: "Sev Tamatar Lasagna",
    subtitle: "Signature Indori-Italian Fusion",
    description:
      "Our show-stopping Indore twist on classic Italian lasagna — tender pasta sheets layered with spiced tamatar gravy, molten mozzarella, and crisp golden Ratlami sev.",
    image: sevTamatarLasagnaImg,
    features: ["Spiced Tamatar Béchamel", "Baked Live & Bubbling", "Crispy Ratlami Sev Finish"],
  },
  {
    id: 3,
    category: "live",
    title: "Mexican Burrito Bowl",
    subtitle: "Build-Your-Own Live Bar",
    description:
      "Freshly assembled pure vegetarian burrito bowls with herbed cilantro-lime rice, seasoned black beans, charred corn salsa, guacamole, sour cream, and crisp tortilla strips.",
    image: mexicanBurritoBowlImg,
    features: ["Fresh House Guacamole", "Charred Corn & Pico Salsa", "Customisable Toppings Bar"],
  },
  {
    id: 4,
    category: "live",
    title: "Avocado Papdi Chaat",
    subtitle: "Progressive Desi Chaat",
    description:
      "Crisp golden papdis crowned with creamy whipped avocado, spiced potato-chickpea medley, chilled yogurt swirls, mint-tamarind glazes, pomegranate rubies, and nylon sev.",
    image: avocadoPapdiChaatImg,
    features: ["Creamy Hass Avocado", "House Mint & Tamarind Glaze", "Plated Fresh to Order"],
  },
  {
    id: 5,
    category: "live",
    title: "Paneer Tikka Tacos",
    subtitle: "Tandoor Meets Street Tacos",
    description:
      "Warm mini soft tacos stuffed with smoky chargrilled tandoori paneer tikka, crunchy purple cabbage slaw, pickled pink onions, and zesty mint-coriander crema.",
    image: paneerTikkaTacosImg,
    features: ["Smoky Chargrilled Paneer", "Mint-Coriander Crema", "Pickled Onions & Slaw"],
  },
  {
    id: 6,
    category: "live",
    title: "Thecha Pesto Crostini",
    subtitle: "Bold Artisanal Tapas",
    description:
      "Toasted artisan sourdough crostini layered with velvety whipped cheese and vibrant green chili-peanut thecha basil pesto, finished with heirloom tomatoes and microgreens.",
    image: thechaPestoCrostiniImg,
    features: ["Roasted Peanut Thecha Pesto", "Crisp Artisan Sourdough", "Whipped Herb Cream Cheese"],
  },
  {
    id: 7,
    category: "grazing",
    title: "Cheese & Charcuterie-Style Boards",
    subtitle: "Pure Vegetarian Artistry",
    description:
      "Curated cheese boards with Red Cheddar, Gouda, Emmental, dried figs, spiced nuts, and bespoke crackers paired with artisan condiments.",
    image: cheeseBoardImg,
    features: ["Imported Cheeses", "Spiced Dried Fruits", "Artisanal Breads & Crackers"],
  },
  {
    id: 8,
    category: "live",
    title: "Steamed Dim Sum & Asian Wok Counter",
    subtitle: "Pan-Asian Delicacies",
    description:
      "Delicate crystal vegetable dim sums, fluffy steamed bao buns, and live wok-tossed noodles crafted to order with crisp seasonal vegetables and house chili oils.",
    image: dimsumCounterImg,
    features: ["Crystal Veg Dumplings", "Steamed Bao Buns", "House Chili Oils & Wok Noodles"],
  },
  {
    id: 9,
    category: "grazing",
    title: "Decadent Dessert & Fusion Sweet Spread",
    subtitle: "The Grand Finale",
    description:
      "Mini gulab jamun cheesecakes, rasmalai tres leches, eggless tiramisu, and Belgian chocolate fountains with seasonal dipping bites.",
    image: fusionDessertImg,
    features: ["Rasmalai Tres Leches", "Gulab Jamun Cheesecake", "Live Fondue Station"],
  },
];

export default function LiveCountersAndGrazing() {
  const [filter, setFilter] = useState("all");

  const filteredItems =
    filter === "all"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === filter);

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
    <section id="grazing-counters" className="py-14 md:py-20 bg-[#FFFDF9] border-t border-[#C9A24D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Signature Experiences"
          title="Live Counters & Bespoke Grazing Tables"
          description="Where culinary theatre meets opulent presentation. Our grazing tables transform event venues into visual spectacles, while interactive live stations engage your guests with fresh, made-to-order delicacies."
        />

        {/* Filter Pills with Sliding Active Indicator */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10 md:mb-12">
          {[
            { id: "all", label: "All Signatures" },
            { id: "grazing", label: "Artisanal Grazing Tables" },
            { id: "live", label: "Interactive Live Counters" },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  active
                    ? "text-white"
                    : "bg-[#FAF7F2] text-[#1C1C1C]/75 border border-[#C9A24D]/30 hover:border-[#C9A24D] hover:text-[#5A1A1F]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="grazingFilterPill"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#5A1A1F] shadow-md shadow-[#5A1A1F]/25"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 6 Showcase Grid Cards with Smooth Layout Morphing */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#C9A24D]/25 hover:border-[#C9A24D]/55 shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col group"
              >
              {/* Image with Tag */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/75 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#5A1A1F] text-[#FAF7F2] shadow-sm">
                  {item.category === "grazing" ? "Grazing Table" : "Live Station"}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-[#C9A24D] uppercase tracking-wider block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#1C1C1C] mb-2.5 group-hover:text-[#5A1A1F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E5E5E] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-6">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-[#1C1C1C]/80">
                        <HiSparkles className="w-3.5 h-3.5 text-[#C9A24D] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToContact}
                  className="w-full btn-secondary text-xs uppercase tracking-wider font-semibold py-2.5"
                >
                  Book This Experience
                </button>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
