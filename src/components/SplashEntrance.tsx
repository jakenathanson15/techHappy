"use client";

import { useEffect, useState } from "react";

export function SplashEntrance() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState("00 // MOUNTING WIRE PROTOCOLS");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if splash was already shown in this session
    const seen = sessionStorage.getItem("techhappy_splash_seen");
    if (seen) {
      return;
    }

    setVisible(true);

    // Sequence stages
    const timers: NodeJS.Timeout[] = [];

    // Stage 1: Progress & log update
    timers.push(
      setTimeout(() => {
        setProgress(34);
        setStatusLog("01 // INGESTING 13 RESEARCH WIRES [MIT, NATURE, NASA, EFF]");
      }, 350)
    );

    // Stage 2: Progress & log update
    timers.push(
      setTimeout(() => {
        setProgress(78);
        setStatusLog("02 // VERIFYING 501(c)(3) CRYPTOGRAPHIC REGISTRY");
      }, 850)
    );

    // Stage 3: Ready
    timers.push(
      setTimeout(() => {
        setProgress(100);
        setStatusLog("03 // ALL SYSTEMS NOMINAL • CONSTRUCTIVE STREAM ONLINE");
      }, 1300)
    );

    // Stage 4: Fade out
    timers.push(
      setTimeout(() => {
        handleDismiss();
      }, 1800)
    );

    // Keydown listener for Esc or Space/Enter to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDismiss = () => {
    setIsFadingOut(true);
    sessionStorage.setItem("techhappy_splash_seen", "true");
    setTimeout(() => {
      setVisible(false);
    }, 450);
  };

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080c12] text-neutral-100 select-none cursor-pointer transition-all duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Background Architectural Grid */}
      <div className="wire-grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      {/* Crosshair accents in corners */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-neutral-600 tracking-widest hidden sm:block">
        + LOC: 42.3601° N, 71.0942° W
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-neutral-600 tracking-widest hidden sm:block">
        SYS_VER: 2026.1 // TH_ENG
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-neutral-600 tracking-widest hidden sm:block">
        WIRE: 13 PEER-REVIEWED SOURCES
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-neutral-500 tracking-wider">
        [ CLICK / ESC TO SKIP ↵ ]
      </div>

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated TH Eyes-Smile Emblem */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Subtle concentric calibration ring */}
          <div className="absolute h-28 w-28 rounded-full border border-neutral-800/80 animate-ping opacity-20 pointer-events-none" />
          <div className="absolute h-24 w-24 rounded-full border border-neutral-800 bg-[#0c1017]/80" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-12 w-12 text-neutral-100"
          >
            {/* Left Eye: Stylized 'T' */}
            <path
              d="M4.5 6.5H10.5"
              stroke="#f8fafc"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="splash-stroke-draw"
              style={{ strokeDasharray: 30, animationDelay: "100ms" }}
            />
            <path
              d="M7.5 6.5V12"
              stroke="#f8fafc"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="splash-stroke-draw"
              style={{ strokeDasharray: 30, animationDelay: "200ms" }}
            />

            {/* Right Eye: Stylized 'H' */}
            <path
              d="M14 6.5V12"
              stroke="#f8fafc"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="splash-stroke-draw"
              style={{ strokeDasharray: 30, animationDelay: "300ms" }}
            />
            <path
              d="M19.5 6.5V12"
              stroke="#f8fafc"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="splash-stroke-draw"
              style={{ strokeDasharray: 30, animationDelay: "350ms" }}
            />
            <path
              d="M14 9.25H19.5"
              stroke="#f8fafc"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="splash-stroke-draw"
              style={{ strokeDasharray: 30, animationDelay: "450ms" }}
            />

            {/* Smile Arc in Restrained Emerald */}
            <path
              d="M5 16C7.5 19.5 16.5 19.5 19 16"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="splash-stroke-draw"
              style={{ strokeDasharray: 40, animationDelay: "600ms" }}
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="mb-2">
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-neutral-100">
            tech<span className="text-emerald-400 italic">Happy</span>
          </span>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-6">
          Constructive Engineering Wire
        </div>

        {/* Telemetry Progress Bar */}
        <div className="w-48 sm:w-64 mb-3">
          <div className="h-1 w-full bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Live Status Log */}
        <div className="font-mono text-[10px] text-neutral-500 tracking-wider h-4">
          <span className="text-emerald-400 mr-1.5">&gt;</span>
          <span>{statusLog}</span>
        </div>
      </div>
    </div>
  );
}
