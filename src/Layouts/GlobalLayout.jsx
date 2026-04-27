import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

gsap.registerPlugin(ScrollTrigger);

const GlobalLayout = () => {
  const location = useLocation();
  const lenisRef = useRef();

  // Sinkronisasi Lenis dengan GSAP Ticker agar animasi ScrollTrigger GSAP lebih smooth
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // Menangani refresh atau perpindahan halaman
  useEffect(() => {
    // Mencegah browser mengingat posisi scroll sebelumnya
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Cegah ScrollTrigger dari merekam histori posisi scroll yang lama
    if (ScrollTrigger.clearScrollMemory) {
      ScrollTrigger.clearScrollMemory("manual");
    }

    // Menggunakan setTimeout untuk memastikan DOM sudah dirender sepenuhnya dan Lenis sudah siap
    const resetScroll = () => {
      window.scrollTo(0, 0);
      if (lenisRef.current && lenisRef.current.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      }
      // PENTING: Beri tahu GSAP ScrollTrigger untuk menghitung ulang semua posisi trigger
      // karena kita baru saja memaksa scroll pindah secara instan ke (0, 0)
      ScrollTrigger.refresh();
    };

    // Eksekusi segera
    resetScroll();

    // Fallback eksekusi setelah render cycle (untuk menimpa behavior browser/Lenis yang mungkin asinkron)
    const timeoutId = setTimeout(resetScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{ lerp: 0.08, smoothWheel: true }}
    >
      {/* Container Utama */}
      <div className="relative min-h-screen flex flex-col ">
        {/* LAPISAN TEKSTUR GAMBAR */}
        <div
          className="absolute inset-0  pointer-events-none opacity-30"
          style={{
            backgroundImage: "url('/img/texture/texture.jpg')", // Pastikan path benar
            backgroundRepeat: "repeat",
            backgroundSize: "600px", // Sesuaikan besar serat kertas
            mixBlendMode: "multiply", // Ini yang menyatukan gambar dengan warna di bawahnya
          }}
        ></div>

        {/* KONTEN WEBSITE */}
        <div className="relative z-10 flex flex-col flex-1 w-full">
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
};

export default GlobalLayout;
