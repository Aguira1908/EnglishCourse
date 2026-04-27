import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const KutipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-10 h-10  text-blue-500 shrink-0" // Ubah ukuran (w, h) dan warna (text-...) di sini
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Mahasiswa",
    text: "Pembelajarannya sangat terstruktur dan mudah dipahami. Sangat direkomendasikan untuk pemula yang ingin cepat mahir bahasa Inggris!",
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Karyawan Swasta",
    text: "Materi yang disampaikan sangat relevan dengan kebutuhan industri saat ini. Tutornya juga sangat suportif dan asyik.",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    role: "Software Engineer",
    text: "Saya butuh skor TOEFL tinggi untuk karir, dan kursus ini memberikan trik-trik yang sangat *daging*. Latihan kasus nyatanya sangat membantu.",
  },
  {
    id: 4,
    name: "Rina Kumala",
    role: "UI/UX Designer",
    text: "Penyampaian materi sangat interaktif, tidak membosankan sama sekali. Kelas *speaking*-nya benar-benar melatih kepercayaan diri.",
  },
  {
    id: 5,
    name: "Dinda Larasati",
    role: "Pelajar SMA",
    text: "Berkat kelas intensif di sini, nilai ujian bahasa Inggris saya naik drastis. Fasilitas dan modulnya sangat lengkap dan *up-to-date*.",
  },
  {
    id: 6,
    name: "Hendra Gunawan",
    role: "Pekerja Lepas",
    text: "Awalnya saya ragu karena sudah lama tidak belajar grammar, tapi metode pengajarannya membuat segalanya jadi masuk akal dan mudah diingat.",
  },
  {
    id: 7,
    name: "Maya Sari",
    role: "Ibu Rumah Tangga",
    text: "Jadwalnya fleksibel! Saya tetap bisa menemani anak belajar di rumah sambil mengasah kemampuan bahasa Inggris saya sendiri.",
  },
  {
    id: 8,
    name: "Kevin Sanjaya",
    role: "Business Owner",
    text: "Sangat membantu untuk keperluan negosiasi dengan klien luar negeri. Kosakata bisnis yang diajarkan sangat praktikal dan langsung bisa dipakai.",
  },
];

// const TestiSection = () => {
//   const containerTitleRef = useRef(null);
//   const containerRef = useRef(null);
//   const textTitleRef = useRef(null);
//   const cardRef = useRef([]);

//   const [curentIndex, setCurrentIndex] = useState(0);
//   const cardsPerPage = 4;

//   const displayedTestimonials = testimonials.slice(
//     curentIndex,
//     curentIndex + cardsPerPage,
//   );

//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     setCurrentIndex((prevIndex) => {
//   //       if (prevIndex + cardsPerPage >= testimonials.length) {
//   //         return 0;
//   //       }

//   //       return prevIndex + cardsPerPage;
//   //     });
//   //   }, 5000);
//   //   return () => clearInterval(timer);
//   // }, []);

//   const { contextSafe } = useGSAP(
//     () => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 60%",
//         },
//       });

//       const splitTitle = new SplitText(textTitleRef.current, "words");

//       tl.fromTo(
//         splitTitle.words,
//         {
//           y: 500,
//           opacity: 0,
//         },
//         {
//           y: 450,
//           opacity: 1,
//           duration: 1,
//           stagger: 0.3,
//           ease: "power3.out",
//         },
//       )
//         .to(
//           splitTitle.words,
//           {
//             y: 0,
//             duration: 1.4,
//             ease: "power3.out",
//           },
//           "-=0.7",
//         )
//         .from(
//           cardRef.current,
//           {
//             y: 150,
//             opacity: 0,
//             duration: 0.8,
//             stagger: 0.2,
//             ease: "power3.out",
//           },
//           "-=0.9",
//         );
//     },
//     { scope: containerRef },
//   );

//   const animateTextChange = contextSafe(() => {
//     gsap.to(".testi-content", {
//       opacity: 0,
//       y: -15,
//       duration: 0.4,
//       stagger: 0.1,
//       onComplete: () => {
//         setCurrentIndex((prevIndex) => {
//           if (prevIndex + cardsPerPage >= testimonials.length) return 0;

//           return prevIndex + cardsPerPage;
//         });

//         gsap.fromTo(
//           ".testi-content",
//           { opacity: 0, y: 15 },
//           { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
//         );
//       },
//     });
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       animateTextChange();
//     }, 5000); // Ganti teks setiap 5 detik
//     return () => clearInterval(timer);
//   }, [animateTextChange]); // Masukkan fungsi ke dependency array

//   const leftColItems = displayedTestimonials.filter(
//     (_, index) => index % 2 === 0,
//   );
//   const rightColItems = displayedTestimonials.filter(
//     (_, index) => index % 2 !== 0,
//   );
//   return (
//     <section ref={containerRef} className="w-full min-h-screen py-14 ">
//       <div
//         ref={containerTitleRef}
//         className="w-full flex justify-center items-center"
//       >
//         <h1 ref={textTitleRef} className="text-7xl font-body ">
//           Apa kata <span className=" text-blue-500 inline-block ">mereka</span>?
//         </h1>
//       </div>
//       {/* Testimonial Layout Container */}
//       <div className="max-w-5xl mx-auto px-6 mt-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
//           {/* Kolom Kiri */}
//           <div className="flex flex-col gap-8">
//             {leftColItems.map((item, index) => (
//               <div
//                 ref={(el) => (cardRef.current[index * 2] = el)}
//                 key={item.id}
//                 // HAPUS min-h, GUNAKAN h-[320px] untuk ukuran fiks
//                 className="border border-slate-500 shadow-xl p-8 rounded-2xl h-[320px] flex flex-col justify-between"
//               >
//                 {/* Bungkus ini dengan class "testi-content" agar bisa dianimasikan terpisah dari kotak card */}
//                 <div className="testi-content flex flex-col h-full justify-between">
//                   <KutipIcon />
//                   {/* Gunakan line-clamp-4 untuk berjaga-jaga jika teksnya kepanjangan agar tidak luber */}
//                   <p className="text-gray-500 text-lg leading-relaxed font-body line-clamp-4 mt-4">
//                     "{item.text}"
//                   </p>
//                   <div className="mt-auto pt-6">
//                     <h4 className="font-semibold font-body text-xl text-gray-900">
//                       {item.name}
//                     </h4>
//                     <p className="text-gray-500 font-body text-sm">
//                       {item.role}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Kolom Kanan (Diberi margin-top agar posisinya turun/staggered seperti di gambar) */}
//           <div className="flex flex-col gap-8 md:mt-24">
//             {rightColItems.map((item, index) => (
//               <div
//                 key={item.id}
//                 ref={(el) => (cardRef.current[index * 2 + 1] = el)}
//                 className="border border-slate-500 shadow-xl p-8 rounded-2xl h-[320px] flex flex-col justify-between"
//               >
//                 <div className="testi-content flex flex-col h-full justify-between">
//                   <KutipIcon />
//                   <p className="text-gray-500 text-lg leading-relaxed font-body line-clamp-4 mt-4">
//                     "{item.text}"
//                   </p>
//                   <div className="mt-auto pt-6">
//                     <h4 className="font-semibold font-body text-xl text-gray-900">
//                       {item.name}
//                     </h4>
//                     <p className="text-gray-500 font-body text-sm">
//                       {item.role}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const TestiSection = () => {
  const containerTitleRef = useRef(null);
  const containerRef = useRef(null);
  const textTitleRef = useRef(null);
  const cardRef = useRef([]);
  const btnRef = useRef(null);

  // Tambahkan useRef ini untuk mendeteksi apakah ini render pertama kali
  const isFirstRender = useRef(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;

  const displayedTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerPage,
  );

  // 1. Animasi saat PERTAMA KALI Scroll ke Section ini
  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      const splitTitle = new SplitText(textTitleRef.current, "words");

      tl.fromTo(
        splitTitle.words,
        { y: 500, opacity: 0 },
        { y: 450, opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out" },
      )
        .to(
          splitTitle.words,
          { y: 0, duration: 1.4, ease: "power3.out" },
          "-=0.7",
        )
        .from(
          cardRef.current,
          {
            y: 150,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.9",
        )
        .from(
          btnRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  // 2. Animasi Masuk (Fade In) KHUSUS saat isi Teks Berubah
  useGSAP(
    () => {
      // Kita lewati animasi ini pada render pertama kali (karena sudah di-handle ScrollTrigger di atas)
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // Animasi dari bawah (y: 20) ke posisi normal (y: 0)
      gsap.fromTo(
        ".testi-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );
    },
    // Dependency array: Hook ini hanya dijalankan ketika `currentIndex` berubah
    { dependencies: [currentIndex], scope: containerRef },
  );

  // 3. Fungsi Animasi Keluar (Fade Out) sebelum teks diganti
  const animateTextChange = contextSafe(() => {
    // Animasi bergerak ke atas (y: -20)
    gsap.to(".testi-content", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.1,
      onComplete: () => {
        // HANYA update state di sini. Bagian "Masuk" (Fade In) akan otomatis
        // diambil alih oleh useGSAP ke-2 di atas setelah React merender ulang.
        setCurrentIndex((prevIndex) => {
          if (prevIndex + cardsPerPage >= testimonials.length) return 0;
          return prevIndex + cardsPerPage;
        });
      },
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      animateTextChange();
    }, 5000);
    return () => clearInterval(timer);
  }, [animateTextChange]);

  const leftColItems = displayedTestimonials.filter(
    (_, index) => index % 2 === 0,
  );
  const rightColItems = displayedTestimonials.filter(
    (_, index) => index % 2 !== 0,
  );

  return (
    <section id="testi-section" ref={containerRef} className="w-full min-h-screen py-14 mt-13 ">
      <div
        ref={containerTitleRef}
        className="w-full flex justify-center items-center px-6"
      >
        <h1
          ref={textTitleRef}
          className="text-4xl sm:text-5xl lg:text-7xl font-body text-center"
        >
          Apa kata <span className="text-blue-500 inline-block">mereka</span>?
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-8">
            {leftColItems.map((item, index) => (
              <div
                ref={(el) => (cardRef.current[index * 2] = el)}
                // PENTING: Ubah key={item.id} menjadi key={index}
                // Ini mencegah React menghapus div saat data berubah
                key={`left-${index}`}
                className="border border-slate-500 shadow-xl p-8 rounded-2xl h-[320px] flex flex-col justify-between"
              >
                <div className="testi-content flex flex-col h-full justify-between">
                  <KutipIcon />
                  <p className="text-gray-500 text-lg leading-relaxed font-body line-clamp-4 mt-4">
                    "{item.text}"
                  </p>
                  <div className="mt-auto pt-6">
                    <h4 className="font-semibold font-body text-xl text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 font-body text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kolom Kanan */}
          <div className="flex flex-col gap-8 md:mt-24">
            {rightColItems.map((item, index) => (
              <div
                ref={(el) => (cardRef.current[index * 2 + 1] = el)}
                // PENTING: Ubah key={item.id} menjadi key={index}
                key={`right-${index}`}
                className="border border-slate-500 shadow-xl p-8 rounded-2xl h-[320px] flex flex-col justify-between"
              >
                <div className="testi-content flex flex-col h-full justify-between">
                  <KutipIcon />
                  <p className="text-gray-500 text-lg leading-relaxed font-body line-clamp-4 mt-4">
                    "{item.text}"
                  </p>
                  <div className="mt-auto pt-6">
                    <h4 className="font-semibold font-body text-xl text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 font-body text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center py-10">
        <button
          ref={btnRef}
          className="px-8 py-3.5 bg-gray-900 text-white font-body font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg shadow-gray-900/20"
        >
          Selengkapnya
        </button>
      </div>
    </section>
  );
};
export default TestiSection;
