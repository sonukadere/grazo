import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const instaPosts = [
  { id: 1, src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80", alt: "Gourmet food presentation" },
  { id: 2, src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", alt: "Artisan pizza" },
  { id: 3, src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", alt: "Breakfast spread" },
  { id: 4, src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80", alt: "Salad bowl" },
  { id: 5, src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", alt: "Cake decoration" },
  { id: 6, src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80", alt: "Dessert plating" },
];

export default function Instagram() {
  return (
    <section id="instagram" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          subtitle="Follow Us"
          title="@GrazoCatering"
          description="Follow us on Instagram for behind-the-scenes glimpses, wedding highlights, and daily inspiration from our kitchen."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/grazo_indore/"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-xl aspect-square shadow-sm"
            >
              <img
                src={post.src}
                alt={post.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/grazo_indore/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95"
          >
            <FaInstagram className="w-5 h-5" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
