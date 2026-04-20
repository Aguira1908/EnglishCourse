import React from "react";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col ">
      {/* Header */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12  ">
        <Outlet />
      </main>
      {/* FOoter */}
    </div>
  );
};

export default GlobalLayout;
