import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import Gallery from "../Components/sections/Gallery";
import WhatsAppButton from "../Components/layout/WhatsAppButton";

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
