import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const HeroSection = ({ targetRef }) => {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const descRef = useRef(null);
  const heroSectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const cardData = [
    {
      rotate: -5,
      y: 15,
      x: -410,
      url: "/img/herosection/English1.avif",
    },
    {
      rotate: -4,
      y: -20,
      x: -275,
      url: "/img/herosection/English2.avif",
    },
    { rotate: -2, y: 3, x: -140, url: "/img/herosection/English3.avif" },
    { rotate: 0, y: 0, x: 0, url: "/img/herosection/English4.avif" }, // Kartu Tengah (Center)
    { rotate: 2, y: -20, x: 140, url: "/img/herosection/English5.avif" },
    { rotate: 4, y: 8, x: 275, url: "/img/herosection/English6.avif" },
    { rotate: 5, y: 15, x: 410, url: "/img/herosection/English7.avif" },
  ];

  useGSAP(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const splitNormal = new SplitText(headingRef.current, { type: "words" });
      const splitDesc = new SplitText(descRef.current, { type: "words" });

      tl.from(splitNormal.words, {
        y: 100,
        opacity: 0,
        // rotation: "random(-80, 80)",
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
      })

        .from(
          cardsRef.current,
          {
            rotate: -50,

            y: 600,
            x: 0,
            opacity: 0,
            scale: 1,
            rotation: 0,
            duration: 1.8,
            ease: "expo",
          },
          "-=1.5",
        )
        .to(
          cardsRef.current,
          {
            y: (i) => cardData[i].y,
            x: (i) => {
              const isMobile = window.innerWidth < 768;
              const spreads = isMobile
                ? [-110, -75, -40, 0, 40, 75, 110]
                : [-410, -275, -140, 0, 140, 275, 410];
              return spreads[i];
            },
            rotation: (i) => cardData[i].rotate,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: { each: 0.05, from: "end" },
            ease: "expo",
          },
          "-=0.6",
        )
        .from(
          splitDesc.words,
          {
            y: 100,
            opacity: 0,
            // rotation: "random(-80, 80)",
            duration: 0.8,
            ease: "expo",
            stagger: 0.1,
          },
          "-=1.7",
        )
        .from(
          ".button-ref",
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "expo",
          },
          "-=1",
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          endTrigger: targetRef?.current || "#about-section",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(cardsRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "expo",
        })
        .to(cardsRef.current, {
          x: () => {
            const target = targetRef?.current;
            const container = cardsContainerRef?.current;
            if (!target || !container) return 0;

            const targetRect = target.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            return (
              targetRect.left +
              targetRect.width / 2 -
              (containerRect.left + containerRect.width / 2)
            );
          },
          y: () => {
            const target = targetRef?.current;
            const container = cardsContainerRef?.current;
            if (!target || !container) return 0;

            const targetRect = target.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            return (
              targetRect.top +
              targetRect.height / 2 -
              (containerRect.top + containerRect.height / 2)
            );
          },
          rotation: 0,
          scale: 1,
          opacity: (i) => (i === 0 || i === 1 || i === 2 ? 0 : 1),
          duration: 2,
          ease: "power1.inOut",
        })
        .to(cardsRef.current, {
          x: (i) => {
            const target = targetRef?.current;
            const container = cardsContainerRef?.current;
            if (!target || !container) return 0;

            const targetRect = target.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const deltaX =
              targetRect.left +
              targetRect.width / 2 -
              (containerRect.left + containerRect.width / 2);

            const isMobile = window.innerWidth < 768;
            const spreadX = isMobile ? 40 : 120;
            return deltaX + (i - 3) * spreadX;
          },
          y: (i) => {
            const target = targetRef?.current;
            const container = cardsContainerRef?.current;
            if (!target || !container) return 0;

            const targetRect = target.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const deltaY =
              targetRect.top +
              targetRect.height / 2 -
              (containerRect.top + containerRect.height / 2);

            const isMobile = window.innerWidth < 768;
            const spreadY = isMobile ? 30 : 60;
            return deltaY + (i - 3) * spreadY;
          },
          rotation: 0,
          scale: () => (window.innerWidth < 768 ? 1.4 : 1.2),
          duration: 2,
          ease: "back.out(0.3)",
        });
    });
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="hero-section"
      className="w-full  min-h-screen flex flex-col justify-end items-center gap-6 "
    >
      <div className="mb-8 z-10">
        <h1
          ref={headingRef}
          className="font-body text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-center leading-tight  font-medium text-gray-900 headline px-4 md:px-0"
        >
          Kuasai Bahasa{" "}
          <span className="text-blue-500 inline-block">Inggris</span>, Wujudkan
          Masa Depan{" "}
          <span className="text-blue-500 inline-block">Gemilang</span>
        </h1>
      </div>
      <div
        ref={cardsContainerRef}
        id="cards-container"
        className="relative w-full max-w-7xl h-[220px] md:h-[230px] flex justify-center items-center my-8 z-20"
      >
        {cardData.map((card, index) => (
          <img
            src={card.url || "#"}
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute   object-cover bg-center w-[120px] h-[170px] md:w-[170px] md:h-[200px]  rounded-2xl shadow-xl shadow-gray-300  "
            style={{ zIndex: index + 1 }}
          />
        ))}
      </div>
      <div className="flex flex-col  my-10 px-6 md:px-20 gap-6 md:gap-10 items-center ">
        <p
          ref={descRef}
          className="text-base md:text-xl text-center normal-text text-slate-600 "
        >
          Kami bantu tingkatkan rasa percaya diri dan kelancaran berbahasa
          Inggris Anda
        </p>
        <div className="flex flex-row gap-4 md:gap-12 container-cta">
          <button className="button-ref bg-gray-900 text-white px-6 md:px-12 py-3 md:py-2 text-sm md:text-base rounded-full whitespace-nowrap cta-btn">
            Hubungi Kami
          </button>
          <button className="button-ref border-2 border-gray-900 text-gray-900 px-6 md:px-8 py-3 md:py-2 text-sm md:text-base rounded-full whitespace-nowrap cta-btn">
            Program Kami
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
