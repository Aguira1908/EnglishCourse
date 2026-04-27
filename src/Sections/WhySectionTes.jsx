import React, { useRef, useMemo, useState } from "react"; // Tambahkan useState
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  History,
  MapPin,
  GraduationCap,
  Award,
  MessagesSquare,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whyMetaData = [
  {
    title: "30+ Tahun berdiri",
    desc: "Pengalaman mendidik lintas generasi dengan kurikulum teruji.",
    icon: <History size={24} className="text-blue-500 font-light " />,
  },
  {
    title: "10+ Cabang tersebar",
    desc: "Akses mudah di mana pun kamu berada di Medan.",
    icon: <MapPin size={24} className="text-blue-500 font-light" />,
  },
  {
    title: "1000+ Alumni sukses",
    desc: "Komunitas pembelajar yang luas dan suportif.",
    icon: <GraduationCap size={24} className="text-blue-500 font-light" />,
  },
  {
    title: "Tutor bersertifikat",
    desc: "Standar pengajaran internasional dan profesional.",
    icon: <Award size={24} className="text-blue-500 font-light" />,
  },
  {
    title: "Metode Interaktif",
    desc: "Belajar 80% praktik speaking yang menyenangkan.",
    icon: <MessagesSquare size={24} className="text-blue-500 font-light" />,
  },
];

const WhySectionTes = () => {
  const CENTER = 50;
  const RADIUS = 38;

  const [activeIndex, setActiveIndex] = useState(null);

  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const polygonRef = useRef(null);

  const points = useMemo(() => {
    return whyMetaData
      .map((_, i) => {
        const angle = (i / whyMetaData.length) * Math.PI * 2 - Math.PI / 2;
        const x = CENTER + RADIUS * Math.cos(angle);
        const y = CENTER + RADIUS * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  }, []);

  useGSAP(
    () => {
      if (!polygonRef.current) return;
      const pathLength = polygonRef.current.getTotalLength();

      gsap.set(polygonRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".title-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      const drawDuration = 1.4;

      tl.to(
        polygonRef.current,
        { strokeDashoffset: 0, duration: drawDuration, ease: "none" },
        "-=0.5",
      );
      tl.from(
        ".icon-animate-scale",
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: drawDuration / whyMetaData.length,
          ease: "back.out(1.5)",
        },
        "<",
      );

      const wheelTween = gsap.to(wheelRef.current, {
        rotation: 360,
        duration: 100,
        ease: "none",
        repeat: -1,
      });
      const iconsTween = gsap.to(".icon-wrapper", {
        rotation: -360,
        duration: 100,
        ease: "none",
        repeat: -1,
      });

      let timeoutId;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 100);
          const targetTimeScale = 1 + velocity;
          gsap.to([wheelTween, iconsTween], {
            timeScale: targetTimeScale,
            duration: 0.1,
            overwrite: true,
          });

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            gsap.to([wheelTween, iconsTween], { timeScale: 1, duration: 0.5 });
          }, 50);
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center overflow-hidden px-4"
    >
      {/* Header */}
      <div className="relative w-full py-10  text-center z-10">
        <div className="overflow-hidden inline-block pb-4">
          <h1 className="title-text font-body text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight">
            Mengapa memilih <span className="text-blue-500">kami?</span>
          </h1>
        </div>
      </div>

      {/* Area Wheel */}
      <div className="relative w-full max-w-[600px] aspect-square flex  items-center justify-center">
        <div
          ref={wheelRef}
          className="relative w-full h-full flex items-center justify-center"
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute w-full h-full overflow-visible"
          >
            <polygon
              ref={polygonRef}
              points={points}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>

          {whyMetaData.map((item, i) => {
            const angle =
              (i / whyMetaData.length) * (Math.PI * 2) - Math.PI / 2;
            const x = CENTER + RADIUS * Math.cos(angle);
            const y = CENTER + RADIUS * Math.sin(angle);

            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                className="absolute z-10"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="icon-animate-scale group">
                  <div className="icon-wrapper relative flex items-center justify-center origin-center">
                    {/* Lingkaran Ikon Utama */}
                    <div
                      onClick={() => setActiveIndex(isActive ? null : i)} // Toggle buka/tutup
                      className="w-12 h-12 md:w-16 md:h-16 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
                    >
                      <div className="scale-75 md:scale-100 text-blue-500">
                        {item.icon}
                      </div>
                    </div>

                    {/* Pop-up / Tooltip */}
                    <div
                      className={`
                        absolute bottom-16 md:bottom-20 pointer-events-none transition-all duration-300 transform w-48 md:w-72 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-gray-100 text-center z-20
                        /* Logika state untuk klik di Mobile */
                        ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        /* Logika hover murni untuk Desktop (md: up) */
                        md:group-hover:opacity-100 md:group-hover:translate-y-0
                      `}
                    >
                      <h3 className="font-body font-semibold text-sm md:text-xl text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-md font-body text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay transparan untuk menutup popup saat area kosong di-klik (Opsional tapi disarankan UX) */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-0 hidden md:hidden"
          onClick={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
};

export default WhySectionTes;
