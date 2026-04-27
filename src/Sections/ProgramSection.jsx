import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProgramMenu = [
  {
    id: 1,
    title: "Pemula",
  },
  {
    id: 2,
    title: "Menengah",
  },
  {
    id: 3,
    title: "Lanjutan",
  },
];

const ProgramMeta = [
  {
    id: 1,
    title: "English for Kids & Teens",
    slug: "kids-and-teens",
    description:
      "Belajar menyenangkan untuk membangun pondasi bahasa Inggris yang kuat sejak usia dini.",
    costInMonth: 200000,
    ageRange: "6 - 15 Tahun",
    features: [
      "Metode belajar interaktif & games",
      "Tutor yang ramah anak",
      "Fokus pada basic vocabulary & speaking",
    ],
    image: "/img/herosection/English1.avif",
    colorTheme: "orange", // Bisa digunakan untuk conditional rendering di Tailwind/CSS
    icon: "FiSmile", // Nama ikon dari library seperti react-icons
  },
  {
    id: 2,
    title: "General English for Adults",
    slug: "general-adults",
    description:
      "Lancar speaking dan komunikasi untuk meningkatkan rasa percaya diri di kampus maupun dunia kerja.",
    costInMonth: 350000, // Contoh penyesuaian harga untuk level di atasnya
    ageRange: "16+ Tahun (Mahasiswa & Umum)",
    features: [
      "Fokus pada conversation sehari-hari",
      "Pilihan jadwal yang fleksibel",
      "Materi relevan dengan dunia nyata",
    ],

    image: "/img/herosection/English2.avif",
    colorTheme: "teal",
    icon: "FiUsers",
  },
  {
    id: 3,
    title: "TOEFL / IELTS Preparation",
    slug: "toefl-ielts",
    description:
      "Persiapan matang dan intensif untuk mencapai target skor studi ke luar negeri atau karir.",
    costInMonth: 500000, // Harga khusus untuk program intensif
    ageRange: "Mahasiswa & Profesional",
    features: [
      "Simulasi tes (Try Out) berkala",
      "Strategi dan tips pengerjaan soal",
      "Evaluasi target skor secara personal",
    ],

    image: "/img/herosection/English3.avif",
    colorTheme: "navy",
    icon: "FiAward",
  },
];

const ProgramSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const titleRef = useRef([]);
  const descRef = useRef(null);
  const listRef = useRef([]);
  const btnRef = useRef([]);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const contImageRef = useRef(null);

  const currentProgram = ProgramMeta[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === ProgramMeta.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ProgramMeta.length - 1 : prev - 1));
  };

  useGSAP(
    () => {
      const splitTitle = new SplitText(titleRef.current, {
        type: "words",
        mask: "lines",
      });
      const splitDesc = new SplitText(descRef.current, {
        type: "lines",
        mask: "lines",
      });

      const splitList = new SplitText(listRef.current, {
        type: "lines",
        mask: "lines",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      tl.from(contImageRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.8,
        ease: "expo.out",
      })
        .from(
          splitTitle.words,
          {
            y: 100,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.7",
        )

        .from(
          splitDesc.lines,
          {
            y: 100,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .from(
          splitList.lines,
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .fromTo(
          btnRef.current,
          {
            y: 150,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "expo",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi masuk untuk konten teks
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      );
      // Animasi masuk untuk gambar
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      );
    });

    return () => ctx.revert(); // Membersihkan animasi saat komponen unmount atau index berubah
  }, [activeIndex]);

  return (
    <section
      id="program-section"
      ref={containerRef}
      className="w-full min-h-screen  flex items-center"
    >
      <div className="w-full flex flex-col mt-10 md:mt-0">
        <p
          ref={(el) => (titleRef.current[0] = el)}
          className="font-body font-light text-xl text-gray-500 tracking-wide mb-8"
        >
          PROGRAM KAMI
        </p>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Bagian Konten (Kiri) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div ref={contentRef} className="flex flex-col gap-6">
              <h1
                ref={(el) => (titleRef.current[1] = el)}
                className="text-4xl md:text-5xl lg:text-6xl font-body text-gray-900 leading-tight"
              >
                {currentProgram.title}
              </h1>
              <p
                ref={descRef}
                className="text-lg md:text-xl text-gray-600 font-body leading-relaxed max-w-lg"
              >
                {currentProgram.description}
              </p>

              <ul className="flex flex-col gap-4 mt-6">
                {currentProgram.features.map((feature, i) => (
                  <li
                    className="flex items-center gap-4 text-lg font-light font-body text-gray-700"
                    key={i}
                    ref={(el) => (listRef.current[i] = el)}
                  >
                    {/* <div className="w-2.5 h-2.5 rounded-full bg-gray-900 shrink-0"></div> */}
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 mt-4">
                <span
                  ref={(el) => (btnRef.current[0] = el)}
                  className="px-5 py-2.5 bg-gray-100 rounded-full text-sm font-body text-gray-700 border border-gray-200"
                >
                  {currentProgram.ageRange}
                </span>
                {/* <span className="px-5 py-2.5 bg-gray-100 rounded-full text-sm font-body text-gray-700 border border-gray-200">
                  Rp {currentProgram.costInMonth.toLocaleString("id-ID")} /
                  bulan
                </span> */}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mt-12 lg:mt-20">
              <button
                ref={(el) => (btnRef.current[1] = el)}
                className="px-8 py-3.5 bg-gray-900 text-white font-body font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg shadow-gray-900/20"
              >
                Selengkapnya
              </button>
              <div className="flex gap-4">
                <button
                  ref={(el) => (btnRef.current[2] = el)}
                  onClick={handlePrev}
                  className="w-14 h-14 flex items-center justify-center border border-gray-300 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                  aria-label="Program Sebelumnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  ref={(el) => (btnRef.current[3] = el)}
                  onClick={handleNext}
                  className="w-14 h-14 flex items-center justify-center border border-gray-300 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                  aria-label="Program Selanjutnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bagian Gambar (Kanan) */}
          <div
            ref={contImageRef}
            className="w-full lg:w-[40%] h-[450px] md:h-[550px] lg:h-[650px]  rounded-[2rem] overflow-hidden relative group shadow-xl"
          >
            <img
              ref={imageRef}
              src={currentProgram.image}
              alt={currentProgram.title}
              className="  w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay gradasi untuk mempercantik dan memberi kontras pada teks */}
            <div className="  absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-body font-semibold drop-shadow-md">
                {currentProgram.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
