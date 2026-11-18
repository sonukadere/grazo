import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import ScrollProgress from "./Components/ui/ScrollProgress";

const Home = lazy(() => import("./pages/Home"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
            <div className="w-10 h-10 border-3 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
