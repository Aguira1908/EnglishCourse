import React from "react";

const FinalSection = () => {
  return (
    <section id="final-section" className="w-full h-[50vh] bg-gray-900 rounded-2xl text-white p-8 flex flex-col justify-evenly my-8 ">
      <div className="w-full h-fit flex text-center flex-col gap-8">
        <h1 className="text-7xl font-body">
          Siap untuk mengambil langkah pertama?
        </h1>
        <p className="text-xl font-body text-gray-300">
          Hubungi kami hari ini untuk mengetahui level bahasa Inggris Anda
          secara gratis.
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <button className="px-6 py-3 border-2 border-white rounded-full font-body text-lg ">
          Hubungi Kami
        </button>
      </div>
    </section>
  );
};

export default FinalSection;
