import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { name: "Home", href: "#hero-section" },
  { name: "About", href: "#about-section" },
  { name: "Why Us", href: "#why-section" },
  { name: "Program", href: "#program-section" },
  { name: "Branch", href: "#where-section" },
  { name: "Testimonial", href: "#testi-section" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef([]);
  const headerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
    ).from(
      textRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.6",
    );
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 -translate-x-1/2 w-full  z-50  bg-white/20 backdrop-blur-md  "
    >
      <div className="px-6 md:px-8 py-4 flex items-center justify-evenly">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={(e) => handleScroll(e, "#hero-section")}
        >
          <h1
            ref={(el) => (textRef.current[0] = el)}
            className="font-body font-bold text-xl text-gray-900"
          >
            EnglishCourse
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              ref={(el) => (textRef.current[index + 1] = el)}
              key={index}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-gray-800 hover:text-blue-600 font-body font-medium transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col items-center gap-4 px-6 pt-2">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-gray-800 hover:text-blue-600 font-body font-medium transition-colors duration-300 w-full text-center py-2 border-b border-white/20"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
