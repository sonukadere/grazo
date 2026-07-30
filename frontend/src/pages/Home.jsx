import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import WhatsAppButton from "../components/layout/WhatsAppButton";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import PremiumMenu from "../components/sections/PremiumMenu";
import EventShowcase from "../components/sections/EventShowcase";
import Gallery from "../components/sections/Gallery";
import WhyChoose from "../components/sections/WhyChoose";
import Statistics from "../components/sections/Statistics";
import BookingProcess from "../components/sections/BookingProcess";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import Instagram from "../components/sections/Instagram";
import Contact from "../components/sections/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Statistics />
        <PremiumMenu />
        <EventShowcase />
        <Gallery />
        <WhyChoose />
        <BookingProcess />
        <Testimonials />
        <FAQ />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
