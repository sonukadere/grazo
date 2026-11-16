import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiDownload, HiChevronDown, HiSparkles } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { sampleEventMenus } from "../../data/eventMenus";
import { whatsappNumber } from "../../data/navigation";

export default function SampleMenus() {
  const [activeMenuId, setActiveMenuId] = useState(sampleEventMenus[0].id);
  const [openCourse, setOpenCourse] = useState(null);

  const activeMenu = sampleEventMenus.find((m) => m.id === activeMenuId) || sampleEventMenus[0];

  const handleDownloadMenu = () => {
    // Generate an elegant printable view of the selected menu
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download the menu.");
      return;
    }

    const coursesHtml = activeMenu.courses
      .map(
        (c) => `
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #5A1A1F; border-bottom: 1px solid #C9A24D; padding-bottom: 6px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
            ${c.course}
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${c.items
              .map(
                (item) => `
              <div style="margin-bottom: 8px;">
                <p style="font-weight: 600; font-size: 14px; color: #1C1C1C; margin: 0 0 2px 0;">${item.name}</p>
                <p style="font-size: 12px; color: #666; margin: 0;">${item.desc}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${activeMenu.name} - Grazo Bites Luxury Catering</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, sans-serif;
              color: #1C1C1C;
              background: #FAF7F2;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #C9A24D;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 32px;
              color: #5A1A1F;
              margin: 0 0 8px 0;
            }
            .tagline {
              font-size: 14px;
              color: #C9A24D;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-weight: 600;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #C9A24D;
              font-size: 12px;
              color: #777;
            }
            @media print {
              body { background: white; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Grazo Bites</h1>
            <p class="tagline">100% Pure Vegetarian Luxury Catering • Indore</p>
            <h2 style="font-size: 22px; margin-top: 16px; color: #1C1C1C;">${activeMenu.name}</h2>
            <p style="font-size: 13px; color: #555;">${activeMenu.tagline}</p>
          </div>
          ${coursesHtml}
          <div class="footer">
            <p><strong>Grazo Bites</strong> • Indore, Madhya Pradesh | Phone/WhatsApp: +91 62647 91823</p>
            <p>Custom dietary options including Jain, Vegan, and Gluten-Free available on request.</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const menuWhatsAppLink = `https://wa.me/${whatsappNumber}?text=Hi%20Grazo%20Bites,%20I%20would%20like%20to%20request%20the%20complete%20PDF%20menu%20for%20${encodeURIComponent(
    activeMenu.name
  )}.`;

  return (
    <section id="menus" className="py-20 md:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Curated Sample Menus"
          title="Designed for Your Specific Event"
          description="Every celebration is distinct. Browse our thoughtfully composed sample tasting menus by event type, or download a printable copy to discuss with your family."
        />

        {/* Event Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {sampleEventMenus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                setActiveMenuId(menu.id);
                setOpenCourse(null);
              }}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeMenuId === menu.id
                  ? "bg-[#5A1A1F] text-white shadow-md shadow-[#5A1A1F]/25 border border-[#5A1A1F]"
                  : "bg-white text-[#1C1C1C]/80 border border-[#C9A24D]/30 hover:border-[#C9A24D] hover:text-[#5A1A1F]"
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>

        {/* Selected Menu Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A24D]/25 shadow-lg max-w-5xl mx-auto">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-gray-100 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#C9A24D] border border-[#C9A24D]/40 mb-2.5">
                <HiSparkles className="w-3.5 h-3.5" />
                <span>100% Pure Vegetarian • Jain Options Available</span>
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1C1C1C]">
                {activeMenu.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E5E5E] mt-1">
                {activeMenu.tagline}
              </p>
            </div>

            {/* Action Buttons: Download Menu & WhatsApp */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadMenu}
                className="btn-primary text-xs sm:text-sm flex items-center gap-2 py-3 px-6"
                aria-label={`Download ${activeMenu.name} Menu`}
              >
                <HiDownload className="w-4 h-4" />
                <span>Download Menu</span>
              </button>

              <a
                href={menuWhatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs sm:text-sm flex items-center gap-2 py-3 px-6"
                aria-label="Request custom menu on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                <span>Customise on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Courses Accordion / List */}
          <div className="space-y-6">
            {activeMenu.courses.map((course, idx) => {
              const isOpen = openCourse === idx || openCourse === null;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 bg-[#FAF7F2]/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenCourse(openCourse === idx ? -1 : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C9A24D]" />
                      <h4 className="font-heading font-bold text-lg sm:text-xl text-[#5A1A1F]">
                        {course.course}
                      </h4>
                      <span className="text-xs text-[#5E5E5E] hidden sm:inline">
                        ({course.items.length} selections)
                      </span>
                    </div>
                    <HiChevronDown
                      className={`w-5 h-5 text-[#C9A24D] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs hover:border-[#C9A24D]/30 transition-colors"
                            >
                              <p className="font-semibold text-sm sm:text-base text-[#1C1C1C]">
                                {item.name}
                              </p>
                              <p className="text-xs sm:text-sm text-[#5E5E5E] mt-1 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5E5E5E] gap-3 text-center sm:text-left">
            <p>
              * All items are prepared with 100% pure vegetarian, farm-fresh ingredients. Jain, gluten-free, and vegan preparations available.
            </p>
            <span className="font-medium text-[#5A1A1F] whitespace-nowrap">
              Chef Curated • Indore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
