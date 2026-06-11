"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);

  // Animate percentage counter from 0 to 100
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds loading duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        // Add a tiny delay at 100% for smooth visual transition
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  // SVG path for a luxury crown emblem
  const crownPath = "M 20 75 L 10 30 L 35 55 L 50 20 L 65 55 L 90 30 L 80 75 Z";
  const crownBase = "M 15 75 L 85 75";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0d0d] text-white overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } // Custom luxury ease-in-out curve
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,150,62,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl pointer-events-none" />

      {/* 3D concentric rotating rings */}
      <div 
        className="relative flex items-center justify-center w-72 h-72 pointer-events-none"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute border border-primary/20 w-56 h-56 rounded-none"
          animate={{ rotateX: 360, rotateY: 180 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute border border-primary/40 w-44 h-44 rounded-none"
          animate={{ rotateX: 180, rotateY: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute border border-primary/60 w-32 h-32 rounded-none"
          animate={{ rotateY: 360, rotateZ: 180 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Center core: Self-drawing logo */}
        <div className="absolute w-20 h-20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(184,150,62,0.4)]">
            {/* Draw main crown peaks */}
            <motion.path
              d={crownPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              initial={{ pathLength: 0, fill: "rgba(184, 150, 62, 0)" }}
              animate={{ 
                pathLength: 1,
                fill: progress > 80 ? "rgba(184, 150, 62, 0.05)" : "rgba(184, 150, 62, 0)"
              }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Draw base line */}
            <motion.path
              d={crownBase}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            />
            {/* Crown peak jewels */}
            {progress > 50 && (
              <>
                <motion.circle cx="10" cy="27" r="2.5" className="fill-primary" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                <motion.circle cx="50" cy="17" r="2.5" className="fill-primary" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                <motion.circle cx="90" cy="27" r="2.5" className="fill-primary" initial={{ scale: 0 }} animate={{ scale: 1 }} />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Brand & Loading Info */}
      <div className="mt-8 flex flex-col items-center gap-4 text-center z-10">
        <div className="space-y-1">
          <motion.h1 
            className="font-display text-2xl font-light tracking-[0.3em] text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            CROWN PRESTIGE
          </motion.h1>
          <motion.p 
            className="text-[9px] font-semibold tracking-[0.4em] text-primary uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Limousines · Est. 1999
          </motion.p>
        </div>

        {/* Loading status */}
        <div className="flex flex-col items-center gap-1.5 mt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/45 font-medium">
            System Initializing
          </span>
          <span className="text-sm font-sans font-extralight tracking-widest text-primary font-semibold">
            {progress.toString().padStart(3, "0")}%
          </span>
          {/* Progress bar line */}
          <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden mt-1">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeScreen;
