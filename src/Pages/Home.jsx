import React, { useRef } from "react";
import HeroSection from "../Sections/HeroSection";
import WhySection from "../Sections/WhySection";
import ProgramSection from "../Sections/ProgramSection";
import AboutSection from "../Sections/AboutSection";
import WhereSection from "../Sections/WhereSection";
import TestiSection from "../Sections/TestiSection";
import FinalSection from "../Sections/FinalSection";
import WhySectionTes from "../Sections/WhySectionTes";

const Home = () => {
  const targetRef = useRef(null);

  return (
    <>
      <HeroSection targetRef={targetRef} />
      <AboutSection targetRef={targetRef} />
      {/* <WhySection /> */}
      <WhySectionTes />
      <ProgramSection />
      <WhereSection />
      <TestiSection />
      <FinalSection />
    </>
  );
};

export default Home;
