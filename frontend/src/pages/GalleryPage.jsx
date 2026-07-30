import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Gallery from "../components/sections/Gallery";
import WhatsAppButton from "../components/layout/WhatsAppButton";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-18 md:pt-22">
        <Gallery />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
