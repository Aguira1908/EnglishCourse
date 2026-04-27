import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const branches = [
  {
    id: 1,
    name: "Medan Sunggal",
    address:
      "Jl. Gagak Hitam Ringroad No. 15, Medan Sunggal, Kota Medan, Sumatera Utara 20122",
    contact: "0812-3456-7890",
    mapEmbed:
      "https://maps.google.com/maps?q=Ringroad%20City%20Walks%20Medan&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 2,
    name: "Medan Johor",
    address:
      "Jl. Karya Wisata No. 88, Pangkalan Masyhur, Medan Johor, Kota Medan, Sumatera Utara 20144",
    contact: "0812-9876-5432",
    mapEmbed:
      "https://maps.google.com/maps?q=J-City%20Medan%20Johor&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 3,
    name: "Medan Timur",
    address:
      "Jl. Gunung Krakatau No. 120, Glugur Darat I, Medan Timur, Kota Medan, Sumatera Utara 20238",
    contact: "0821-1122-3344",
    mapEmbed:
      "https://maps.google.com/maps?q=Jalan%20Gunung%20Krakatau%20Medan&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];

const MapPinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`w-8 text-blue-400 ${className}`}
  >
    <path
      className="map-pin-path"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      className="map-pin-path"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 shrink-0 text-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-4 h-4 shrink-0 text-black mt-0.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
    />
  </svg>
);

const WhereSection = () => {
  const [activeBranch, setActiveBranch] = useState(branches[0]);
  const containerRef = useRef(null);
  const locationRef = useRef([]);
  const titleRef = useRef(null);
  // const iconRef = useRef([]);
  const cardRef = useRef([]);
  const mapRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      const splitNormal = new SplitText(titleRef.current, "words");
      const textLocation = new SplitText(locationRef.current, "words");

      tl.from(splitNormal.words, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      })
        .from(
          cardRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".map-pin-path",
          {
            duration: 0.8,
            drawSVG: 0,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1",
        )
        .from(
          textLocation.words,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          mapRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.7",
        );
    },
    { scope: containerRef },
  );

  const handleViewMap = (branch) => {
    if (activeBranch.id === branch.id) return;

    // Animate map fade to update
    gsap.to(mapRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveBranch(branch);
        gsap.to(mapRef.current, {
          opacity: 1, // Keep it faded as in design
          duration: 0.5,
          delay: 0.2,
        });
      },
    });
  };

  return (
    <section
      id="where-section"
      ref={containerRef}
      className="w-full mt-10 min-h-screen flex flex-col justify-evenly py-20 md:py-10 gap-10 md:gap-16"
    >
      <div className="w-full flex justify-center px-6">
        <h1
          ref={titleRef}
          className="anim-title text-4xl sm:text-5xl lg:text-7xl text-gray-900 font-body text-center"
        >
          Temukan Kami di{" "}
          <span className="text-blue-500 inline-block">Sekitar</span> Anda
        </h1>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-8 px-6 md:px-12 my-10 md:my-0">
        {branches.map((data) => (
          <button
            ref={(el) => (cardRef.current[data.id] = el)}
            onClick={() => handleViewMap(data)}
            className="group relative shadow-xl shadow-gray-200 border-2 border-gray-900 w-full lg:w-1/3  h-[240px] md:h-[200px]  lg:h-[220px] rounded-xl text-gray-900 font-body cursor-pointer bg-white overflow-hidden"
            key={data.id}
          >
            {/* Title & Icon: 
          - Mobile & Tablet (default & md): Langsung di kiri atas
          - Desktop (lg:): Berada di tengah awal
          - Desktop Hover (lg:group-hover:): Geser ke kiri atas 
      */}
            <div
              className="absolute flex gap-4 items-center w-max origin-top-left transition-all duration-500 ease-in-out 
        top-8 left-8 text-2xl translate-x-0 translate-y-0 scale-90 
        lg:top-1/2 lg:left-1/2 lg:text-3xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:scale-100 
        lg:group-hover:top-8 lg:group-hover:left-8 lg:group-hover:text-2xl lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:scale-90"
            >
              <MapPinIcon />
              <h1
                ref={(el) => (locationRef.current[data.id] = el)}
                className="font-semibold"
              >
                {data.name}
              </h1>
            </div>

            {/* Alamat & Kontak: 
          - Mobile & Tablet: Langsung muncul penuh
          - Desktop (lg:): Transparan dan turun ke bawah
          - Desktop Hover (lg:group-hover:): Muncul dan naik ke posisi asli 
      */}
            <div
              className="absolute text-start top-20 left-8 right-8 flex flex-col gap-3 transition-all duration-500 ease-out 
        opacity-100 translate-y-0 
        lg:opacity-0 lg:translate-y-6 lg:delay-100 
        lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
            >
              <p className="font-body text-slate-500">{data.address}</p>
              <p className="font-body text-slate-500">{data.contact}</p>
            </div>
          </button>
        ))}
      </div>
      {/* <div className="w-full flex justify-between gap-8">
        {branches.map((data) => (
          <div
            className="shadow-xl shadow-gray-200 border-2 border-gray-900 w-90 h-fit p-8 rounded-xl text-gray-900 font-body flex flex-col gap-3"
            key={data.id}
          >
            <div className="w-full flex gap-4 items-center">
              <MapPinIcon />
              <h1 className="text-2xl font-semibold">{data.name}</h1>
            </div>
            <p className="font-body  text-slate-500">{data.address}</p>
            <p className="font-body  text-slate-500">{data.contact}</p>
          </div>
        ))}
      </div> */}
      <div className="px-6 md:px-12 pb-10 md:pb-0">
        <iframe
          ref={mapRef}
          src={activeBranch.mapEmbed}
          loading="lazy"
          frameBorder="0"
          className="w-full min-h-[300px] md:min-h-[450px] rounded-xl shadow-xl"
        ></iframe>
      </div>
    </section>
  );
};

export default WhereSection;
