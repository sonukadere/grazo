import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import WhatsAppButton from "../Components/layout/WhatsAppButton";

import Hero from "../Components/sections/Hero";
import TrustBar from "../Components/sections/TrustBar";
import Services from "../Components/sections/Services";
import LiveCountersAndGrazing from "../Components/sections/LiveCountersAndGrazing";
import SampleMenus from "../Components/sections/SampleMenus";
import Gallery from "../Components/sections/Gallery";
import Testimonials from "../Components/sections/Testimonials";
import BookingProcess from "../Components/sections/BookingProcess";
import About from "../Components/sections/About";
import Contact from "../Components/sections/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
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
      }, 100);
    }
  }, [location]);

  return (
    <div className="bg-[#FAF7F2] text-[#1C1C1C] min-h-screen flex flex-col font-body selection:bg-[#C9A24D] selection:text-[#1C1C1C]">
      {/* 1. Sticky Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Trust Bar */}
        <TrustBar />

        {/* 4. Services (Wedding, Haldi, Mehendi, Sangeet, Corporate, Celebrations) */}
        <Services />

        {/* 5. Live Counters and Grazing Tables Showcase */}
        <LiveCountersAndGrazing />

        {/* 6. Sample Menus (Tabbed by event type with Download Menu button) */}
        <SampleMenus />

        {/* 7. Gallery (Masonry grid with lightbox) */}
        <Gallery />

        {/* 8. Testimonials (Carousel/cards with name & event type) */}
        <Testimonials />

        {/* 9. Process (4 Steps: Enquiry → Tasting → Custom Menu → Flawless Execution) */}
        <BookingProcess />

        {/* About Section */}
        <About />

        {/* 10. Contact (Quote form, Google Maps embed, address, phone, email) */}
        <Contact />
      </main>

      {/* 11. Footer (Logo, quick links, social icons, FSSAI number, copyright) */}
      <Footer />

      {/* Floating WhatsApp CTA Button */}
      <WhatsAppButton />
    </div>
  );
}
