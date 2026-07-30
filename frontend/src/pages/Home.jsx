import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/layout/Navbar";
import WhatsAppButton from "../Components/layout/WhatsAppButton";
import Footer from "../Components/layout/Footer";
import Hero from "../Components/sections/Hero";
import About from "../Components/sections/About";
import Services from "../Components/sections/Services";
import PremiumMenu from "../Components/sections/PremiumMenu";
import EventShowcase from "../Components/sections/EventShowcase";
import Gallery from "../Components/sections/Gallery";
import WhyChoose from "../Components/sections/WhyChoose";
import Statistics from "../Components/sections/Statistics";
import BookingProcess from "../Components/sections/BookingProcess";
import Testimonials from "../Components/sections/Testimonials";
import FAQ from "../Components/sections/FAQ";
import Instagram from "../Components/sections/Instagram";
import Contact from "../Components/sections/Contact";

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
