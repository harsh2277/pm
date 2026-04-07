import React from "react";
import AuthSlider from "./AuthSlider";
import { ArrowRight } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full p-1 gap-1 bg-neutral-100 dark:bg-neutral-950">

      {/* Left Side: Visual Area (65%) */}
      <div className="hidden md:flex w-[65%]">
        <div className="relative w-full h-full rounded-[16px] overflow-hidden flex flex-col shadow-inner bg-gradient-to-b from-primary-500 to-primary-900">

          {/* Background elements */}
          <div className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, #ffffff 0%, transparent 50%), radial-gradient(circle at 0% 100%, #000000 0%, transparent 50%)' }}>
          </div>

          {/* Header (Logo & Back button) */}
          <div className="relative z-10 flex items-center justify-between p-8 text-white">
            <span className="font-extrabold text-2xl lg:text-3xl tracking-tighter">
              FlowTrack
            </span>
          </div>

          {/* Slider at the bottom */}
          <div className="relative z-10 mt-auto px-8 pb-12 text-white">
            <AuthSlider />
          </div>

        </div>
      </div>

      {/* Right Side: Form Area (35%) */}
      <div className="w-full md:w-[35%] flex">
        {children}
      </div>

    </div>
  );
}
