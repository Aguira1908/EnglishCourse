import React, { Suspense, useRef } from "react";
import HeroSection from "../Sections/HeroSection";
import AboutSection from "../Sections/AboutSection";

// Section di bawah fold di-lazy load —
// browser hanya mengunduh chunk ini saat komponen mendekati viewport
const WhySectionTes = React.lazy(() => import("../Sections/WhySectionTes"));
const ProgramSection = React.lazy(() => import("../Sections/ProgramSection"));
const WhereSection = React.lazy(() => import("../Sections/WhereSection"));
const TestiSection = React.lazy(() => import("../Sections/TestiSection"));
const FinalSection = React.lazy(() => import("../Sections/FinalSection"));

// Fallback ringan saat chunk section sedang dimuat
const SectionFallback = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" />
  </div>
);

const Home = () => {
  const targetRef = useRef(null);

  return (
    <>
      {/* Hero & About dimuat langsung (above the fold) */}
      <HeroSection targetRef={targetRef} />
      <AboutSection targetRef={targetRef} />

      {/* Section bawah fold dimuat secara lazy */}
      <Suspense fallback={<SectionFallback />}>
        <WhySectionTes />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProgramSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhereSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestiSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FinalSection />
      </Suspense>
    </>
  );
};

export default Home;
