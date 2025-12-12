"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function BookReader({ storyText = "", images = ["/file.svg"] }) {
  const containerRef = useRef(null);
  const leftPageRef = useRef(null);
  const measureRef = useRef(null);
  const audioRef = useRef(null);

  const [pages, setPages] = useState([""]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev'
  const [pageSize, setPageSize] = useState({ width: 520, height: 560 });

  const FLIP_DURATION = 1.2; // Seconds for Framer Motion

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2024/09/26/11/49/page-turning-249567_1280.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log("Audio play failed", e));
    }
  };

  const paginate = () => {
    const el = measureRef.current;
    if (!el) return;

    // Default size if leftPageRef not ready
    const width = 520;
    const height = 560;

    // If we have ref, verify size, but for SSR/initial render use defaults to avoid jitter
    // We can rely on fixed size for the book container style

    if (!storyText) {
      setPages(["Start your journey..."]);
      setPageIndex(0);
      return;
    }

    const tokens = storyText.split(/(\s+)/).filter(Boolean);
    const out = [];
    let i = 0;
    while (i < tokens.length) {
      let low = i + 1;
      let high = tokens.length;
      let fit = i + 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        el.innerHTML = tokens.slice(i, mid).join("");
        if (el.scrollHeight <= height + 1) {
          fit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      if (fit === i) fit = i + 1;
      out.push(tokens.slice(i, fit).join(""));
      i = fit;
    }

    setPages(out.map((p) => p.trim()));
    setPageIndex((pi) => Math.min(pi, Math.max(0, out.length - 1)));
  };

  useLayoutEffect(() => {
    paginate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyText]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") handleNextFlip();
      if (e.key === "ArrowLeft") handlePrevFlip();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pages, isFlipping]);

  const total = pages.length || 1;

  function handleNextFlip() {
    if (isFlipping || pageIndex >= total - 1) return;
    playFlipSound();
    setFlipDirection("next");
    setIsFlipping(true);
    // Framer motion onAnimationComplete will handle state update.
  }

  function handlePrevFlip() {
    if (isFlipping || pageIndex <= 0) return;
    playFlipSound();
    setFlipDirection("prev");
    setIsFlipping(true);
  }

  const onFlipComplete = () => {
    if (flipDirection === "next") {
      setPageIndex((p) => Math.min(p + 1, total - 1));
    } else {
      setPageIndex((p) => Math.max(p - 1, 0));
    }
    setIsFlipping(false);
    setFlipDirection(null);
  };

  // --- CONTENT HELPERS ---
  const getText = (idx) => pages[idx] || "";
  const formatText = (txt) => txt.replace(/\n/g, "<br/>");
  const getImage = (idx) => images[idx % images.length] || images[0];

  // Logic matches the CSS version but adapted for React renders
  let baseLeftContent = getText(pageIndex);
  let baseRightContent = getImage(pageIndex);
  let flipperFront = null;
  let flipperBack = null;

  // Animation Values
  let initialRotation = 0;
  let targetRotation = 0;

  if (isFlipping) {
    if (flipDirection === "next") {
      baseLeftContent = getText(pageIndex); // Stays until covered
      baseRightContent = getImage(pageIndex + 1); // Revealed

      flipperFront = getImage(pageIndex); // Lifting
      flipperBack = getText(pageIndex + 1); // Landing

      initialRotation = 0;
      targetRotation = -180;
    } else {
      baseLeftContent = getText(pageIndex - 1); // Revealed
      baseRightContent = getImage(pageIndex); // Stays until covered

      flipperFront = getImage(pageIndex - 1); // Landing
      flipperBack = getText(pageIndex); // Lifting

      initialRotation = -180;
      targetRotation = 0;
    }
  }

  return (
    <div ref={containerRef} className="book-reader-container w-full flex flex-col items-center">
      <style jsx global>{`
        .perspective-container {
          perspective: 2000px;
        }

        /* Page/Card Styles */
        .book-page-layer {
          width: 50%;
          height: 100%;
          position: absolute;
          top: 0;
          overflow: hidden;
          background: linear-gradient(to right, #1e293b, #0f172a);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        .page-left {
            left: 0;
            border-radius: 12px 0 0 12px;
            transform-origin: right top;
        }
        .page-right {
            right: 0;
            border-radius: 0 12px 12px 0;
            transform-origin: left top;
        }

        /* Text Content Style */
        .page-text-content {
          padding: 2rem;
          font-family: var(--font-serif), serif;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #e2e8f0;
          height: 100%;
          overflow-y: auto;
        }
        /* Custom Scrollbar for text */
        .page-text-content::-webkit-scrollbar { width: 6px; }
        .page-text-content::-webkit-scrollbar-thumb { background: #475569; border-radius:3px;}

        /* Image Content Style */
        .page-image-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Flipper Face Styles */
        .flipper-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden; /* Critical for 3D */
          -webkit-backface-visibility: hidden;
          border-radius: 0 12px 12px 0; /* Front shape */
          overflow: hidden;
          background: #0f172a;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .flipper-front {
          /* Default 0 deg */
          z-index: 2;
        }
        .flipper-back {
          transform: rotateY(180deg);
          border-radius: 12px 0 0 12px; /* Back shape (becomes left page) */
          z-index: 1;
        }
      `}</style>

      {/* Hidden Measure Div */}
      <div ref={measureRef} style={{ position: "absolute", visibility: "hidden", width: "500px", padding: "2rem", fontFamily: "Georgia, serif", fontSize: "1.05rem", lineHeight: 1.8 }} />

      {/* Book Container */}
      <div className="relative w-full max-w-5xl aspect-[3/2] perspective-container flex items-center justify-center my-8">
        <div className="relative w-full h-full shadow-2xl skew-x-0 transition-transform duration-500">

          {/* STATIC LEFT PAGE (Underneath) */}
          <div className="book-page-layer page-left z-0">
            <div className="page-text-content" dangerouslySetInnerHTML={{ __html: formatText(baseLeftContent) }} />
          </div>

          {/* STATIC RIGHT PAGE (Underneath) */}
          <div className="book-page-layer page-right z-0">
            <div className="relative w-full h-full bg-black">
              <Image
                src={baseRightContent}
                alt="Right Page"
                fill
                className="page-image-content object-cover shadow-inner"
                priority
              />
            </div>
          </div>

          {/* FLIPPER OVERLAY (Animated via Framer Motion) */}
          {isFlipping && (
            <motion.div
              initial={{ rotateY: initialRotation }}
              animate={{ rotateY: targetRotation }}
              transition={{ duration: FLIP_DURATION, ease: [0.645, 0.045, 0.355, 1] }}
              onAnimationComplete={onFlipComplete}
              style={{
                position: 'absolute',
                top: 0,
                right: 0, // Anchored to the right page (spine is left)
                width: '50%',
                height: '100%',
                transformOrigin: 'left center', // Rotate around spine
                transformStyle: 'preserve-3d',
                zIndex: 50,
              }}
            >
              {/* Front Face (Visible at 0deg - Right side) */}
              <div className="flipper-face flipper-front">
                {/* FRONT is always IMAGE content based on our logic */}
                <div className="relative w-full h-full bg-black">
                  <Image
                    src={flipperFront}
                    alt="Flip Front"
                    fill
                    className="page-image-content object-cover  shadow-inner"
                  />
                </div>
              </div>

              {/* Back Face (Visible at -180deg - Left side) */}
              <div className="flipper-face flipper-back">
                {/* BACK is always TEXT content based on our logic */}
                <div className="page-text-content" dangerouslySetInnerHTML={{ __html: formatText(flipperBack) }} />
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4 z-50">
        <motion.button
          whileHover="hover"
          className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 backdrop-blur-sm"
          onClick={handlePrevFlip}
          disabled={pageIndex === 0 || isFlipping}
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </motion.button>

        <div className="text-white/80 font-mono text-sm flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
          <BookOpen size={16} className="text-blue-300" />
          Spread {pageIndex + 1} / {total}
        </div>

        <motion.button
          whileHover="hover"
          className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 backdrop-blur-sm"
          onClick={handleNextFlip}
          disabled={pageIndex === total - 1 || isFlipping}
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
