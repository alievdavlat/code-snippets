"use client";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/TopBar";
import React, { ReactNode } from "react";

const Noteslayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-4 h-screen">
      <Sidebar />
      <div className="flex flex-col max-md:w-full w-[85%] p-5">
        <TopBar />
       {children}
      </div>
    </div>
  );
};

export default Noteslayout;
