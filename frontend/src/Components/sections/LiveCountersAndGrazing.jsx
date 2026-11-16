import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { HiSparkles } from "react-icons/hi";

// Showcase data for Grazo Bites' signature grazing & live stations
const showcaseItems = [
  {
    id: 1,
    category: "grazing",
    title: "Grand Artisanal Grazing Tables",
    subtitle: "A Feast for the Senses",
    description:
      "A lavish tablescape of imported & artisanal cheeses, housemade hummus, smoked avocado papdi, exotic seasonal fruits, honeycomb, sourdough, and crackers.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&auto=format&fit=crop",
    features: ["Assorted Artisanal Cheeses", "5+ Housemade Dips", "Exotic Fruit Platters"],
  },
  {
    id: 2,
    category: "live",
    title: "Interactive Live Pasta & Risotto Station",
    subtitle: "Italian Culinary Theatre",
    description:
      "Handmade pastas tossed fresh before your guests in aged parmesan wheels with truffle emulsions, sundried tomatoes, and fresh herbs.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80&auto=format&fit=crop",
    features: ["Parmesan Wheel Tossing", "Handcrafted Ravioli", "Truffle & Herb Emulsions"],
  },
  {
    id: 3,
    category: "live",
    title: "Gourmet Chaat & Street Food Bar",
    subtitle: "Desi Flavours Reimagined",
    description:
      "Crisp pani puri shots with infused flavoured waters, smoked sweet potato chaat, jhalmuri, and progressive street specialities made to order.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop",
    features: ["Pani Puri Shot Bar", "Smoked Avocado Papdi", "Live Jodhpuri Mirchi Vada"],
  },
  {
    id: 4,
    category: "grazing",
    title: "Cheese & Charcuterie-Style Boards",
    subtitle: "Pure Vegetarian Artistry",
    description:
      "Curated cheese boards with Red Cheddar, Gouda, Emmental, dried figs, spiced nuts, and bespoke crackers paired with artisan condiments.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80&auto=format&fit=crop",
    features: ["Imported Cheeses", "Spiced Dried Fruits", "Artisanal Breads & Crackers"],
  },
  {
    id: 5,
    category: "live",
    title: "Steamed Dim Sum & Asian Wok Counter",
    subtitle: "Pan-Asian Delicacies",
    description:
      "Delicate crystal dim sums, steamed edamame dumplings, and live wok-tossed noodles crafted with farm-fresh organic produce.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80&auto=format&fit=crop",
    features: ["Crystal Dumplings", "Steamed Bao Buns", "House Chili Oils & Dips"],
  },
  {
    id: 6,
    category: "grazing",
    title: "Decadent Dessert & Fusion Sweet Spread",
    subtitle: "The Grand Finale",
    description:
      "Mini gulab jamun cheesecakes, rasmalai tres leches, eggless tiramisu, and Belgian chocolate fountains with seasonal dipping bites.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80&auto=format&fit=crop",
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
    <section id="grazing-counters" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#C9A24D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Signature Experiences"
          title="Live Counters & Bespoke Grazing Tables"
          description="Where culinary theatre meets opulent presentation. Our grazing tables transform event venues into visual spectacles, while interactive live stations engage your guests with fresh, made-to-order delicacies."
        />

        {/* Filter Pills */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { id: "all", label: "All Signatures" },
            { id: "grazing", label: "Artisanal Grazing Tables" },
            { id: "live", label: "Interactive Live Counters" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-[#5A1A1F] text-white shadow-md shadow-[#5A1A1F]/20"
                  : "bg-white text-[#1C1C1C]/75 border border-[#C9A24D]/30 hover:border-[#C9A24D] hover:text-[#5A1A1F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Showcase Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#C9A24D]/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
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
        </div>
      </div>
    </section>
  );
}
