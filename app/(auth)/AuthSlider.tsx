"use client";

import React, { useState, useEffect } from "react";

const SLIDES = [
  {
    headline: "Track time effortlessly",
    subtext: "Understand your work with AI insights"
  },
  {
    headline: "No tracking. No spying.",
    subtext: "Built for trust and transparency"
  },
  {
    headline: "Work smarter, not longer",
    subtext: "Focus on what matters most"
  }
];

export default function AuthSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      className="relative w-full flex flex-col justify-center items-center text-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[80px] w-full max-w-sm mb-6">
        {SLIDES.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className="absolute top-0 left-0 w-full transition-all duration-700"
              style={{
                opacity: isActive ? 1 : 0,
                visibility: isActive ? "visible" : "hidden",
                transform: isActive ? "translateY(0)" : "translateY(20px)",
                transitionTimingFunction: "cubic-bezier(0.2,0.8,0.2,1)"
              }}
            >
              <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-2 text-white">
                {item.headline}
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                {item.subtext}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
              idx === currentIndex ? "w-8 bg-white" : "w-8 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
