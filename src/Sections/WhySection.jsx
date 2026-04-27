import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const bentoMetaData = [
  {
    title: "30+ Tahun berdiri",
    desc: "Pengalaman mendidik",
    bento: "md:col-span-4",
  },
  {
    title: "10+ Cabang tersebar",
    desc: "Akses mudah di mana pun kamu berada",
    bento: "md:col-span-2",
  },
  {
    title: "1000+ Alumni sukses",
    desc: "Komunitas pembelajaran yang luas",
    bento: "md:col-span-3",
  },
  {
    title: "Tutor bersertifikat",
    desc: "Standar pengajaran internasional",
    bento: "md:col-span-3",
  },
];

const WhySection = () => {
  const containerRef = useRef(null);
  const whyTextRef = useRef(null);
  const bentoRef = useRef([]);
  useGSAP(
    () => {
      const split = new SplitText(whyTextRef.current, {
        type: "words",
        mask: "lines",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        split.words,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
      );

      tl.fromTo(
        bentoRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          stagger: 0.8,
          ease: "power3.inOut",
        },
        "-=1",
      );
    },
    { scope: containerRef },
  );

  return (
    <section id="why-section" ref={containerRef} className="  w-full my-20">
      <div className="w-full py-10">
        <h1
          ref={whyTextRef}
          className="font-body font-medium text-7xl text-gray-900 leading-relaxed "
        >
          Mengapa memilih{" "}
          <span className="text-blue-500 inline-block"> kami?</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 w-full">
        {/* Kotak 1 */}

        {bentoMetaData.map((data, i) => (
          <div
            key={i}
            ref={(el) => (bentoRef.current[i] = el)}
            className={` rounded-2xl border-2 border-gray-900   py-12 px-6 flex flex-col items-center justify-center text-center   ${data.bento}`}
          >
            <h1 className="text-2xl font-body font-bold text-gray-900">
              {data.title}
            </h1>
            <p className="text-lg font-body text-slate-600  ">{data.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
