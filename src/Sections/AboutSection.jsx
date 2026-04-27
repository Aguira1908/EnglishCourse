import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutSection = ({ targetRef }) => {
  const containerAbout = useRef(null);
  const abtTitleRef = useRef(null);
  const aboutRef = useRef(null);
  const btnRef = useRef();

  useGSAP(
    () => {
      const splitTitle = new SplitText(abtTitleRef.current, {
        type: "words",
      });
      const splitDesc = new SplitText(aboutRef.current, {
        type: "lines",
        // mask: "lines",
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerAbout.current,
          start: "top 70%",
        },
      });

      tl.from(
        splitTitle.words,

        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
        },
      )
        .from(
          splitDesc.lines,
          {
            y: 100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "expo.out",
          },
          "-=0.9",
        )
        .from(
          btnRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.7",
        );
    },
    { scope: containerAbout },
  );

  return (
    <section
      ref={containerAbout}
      id="about-section"
      className="w-full flex justify-center items-center my-10 md:my-20 py-10 md:py-20 min-h-screen"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row px-6 md:px-12 items-center">
        {/* Kolom Teks */}
        <div className="w-full md:w-[50%] flex flex-col py-6 md:py-12 gap-6 md:gap-12 z-10">
          <h1
            ref={abtTitleRef}
            className="text-4xl sm:text-5xl lg:text-7xl text-gray-900 font-medium leading-tight text-left"
          >
            Bahasa <span className="text-blue-500 inline-block">Inggris</span>.
            Tanpa <span className="text-blue-500 inline-block">Batasan</span>
          </h1>
          <p
            ref={aboutRef}
            className="text-base md:text-xl text-slate-600 leading-relaxed text-center md:text-left"
          >
            Rasakan pengalaman belajar bahasa Inggris interaktif yang dirancang
            untuk membangun rasa percaya diri dan memberdayakan Anda untuk
            berkomunikasi dengan lancar. Baik Anda membutuhkan kelas dasar untuk
            anak-anak, percakapan untuk profesional, atau persiapan ujian
            akademis, kami menawarkan program pembelajaran untuk segala usia dan
            tujuan. Selama lebih dari 30 tahun, ribuan siswa telah membuktikan
            keberhasilannya bersama kami.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              ref={btnRef}
              className="px-8 py-3  bg-gray-900 w-fit text-white rounded-full text-base md:text-lg font-body hover:bg-gray-800 transition-colors"
            >
              Selengkapnya
            </button>
          </div>
        </div>

        {/* Kolom Target untuk Kartu */}
        <div
          ref={targetRef}
          id="cards-target"
          className="w-full md:w-[50%] min-h-[300px] md:min-h-[400px] flex justify-center items-center relative mt-12 md:mt-0"
        >
          {/* Kartu dari HeroSection akan mendarat di sini */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
