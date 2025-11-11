"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function BookReader({ storyText = "", images = ["/file.svg"] }) {
  const containerRef = useRef(null);
  const leftPageRef = useRef(null);
  const measureRef = useRef(null);

  const [pages, setPages] = useState([""]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev'
  const [pageSize, setPageSize] = useState({ width: 520, height: 560 });
  const FLIP_DURATION = 1100; // ms – slightly longer for realism

  const paginate = () => {
    const el = measureRef.current;
    const leftEl = leftPageRef.current;
    if (!el || !leftEl) return;
    const style = window.getComputedStyle(leftEl);
    const paddingTop = parseFloat(style.paddingTop || 28);
    const paddingBottom = parseFloat(style.paddingBottom || 28);
    const paddingLeft = parseFloat(style.paddingLeft || 28);
    const paddingRight = parseFloat(style.paddingRight || 28);
    const width = Math.max(200, leftEl.clientWidth - paddingLeft - paddingRight);
    const height = Math.max(180, leftEl.clientHeight - paddingTop - paddingBottom);
    setPageSize({ width, height });

    if (!storyText) {
      setPages([""]);
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
    const onResize = () => paginate();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => setPageIndex((p) => Math.min(p + 1, total - 1)), FLIP_DURATION / 2);
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, FLIP_DURATION);
  }

  function handlePrevFlip() {
    if (isFlipping || pageIndex <= 0) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => setPageIndex((p) => Math.max(p - 1, 0)), FLIP_DURATION / 2);
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, FLIP_DURATION);
  }

  const rightImage = images[pageIndex % images.length] || images[0];
  const nextRightImage = images[(pageIndex + 1) % images.length] || rightImage;
  const prevLeftText = pages[Math.max(0, pageIndex - 1)] || pages[0] || "";

  return (
    <div ref={containerRef} className="book-reader-container">
      <style jsx>{`
        .book-reader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 24px;
        }
        .book {
          display: flex;
          gap: 18px;
          perspective: 1600px;
        }
        .page {
          width: 520px;
          min-height: 560px;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          box-shadow: 0 10px 40px rgba(2, 6, 23, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .page-content {
          font-family: Georgia, "Times New Roman", serif;
          color: #e7f2ff;
          line-height: 1.7;
          font-size: 1rem;
          padding: 28px;
        }
        .page img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* --- REALISTIC FLIP --- */
        .flip-page {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: left center;
          backface-visibility: hidden;
          transition: transform ${FLIP_DURATION}ms cubic-bezier(0.45, 0.02, 0.55, 0.95),
            box-shadow ${FLIP_DURATION}ms ease;
          box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
        }

        .page.right .flip-page {
          transform-origin: left center;
        }
        .page.left .flip-page {
          transform-origin: right center;
        }

        .page.right.flip-next .flip-page {
          animation: flipNext ${FLIP_DURATION}ms forwards ease-in-out;
        }
        .page.left.flip-prev .flip-page {
          animation: flipPrev ${FLIP_DURATION}ms forwards ease-in-out;
        }

        @keyframes flipNext {
          0% {
            transform: rotateY(0deg);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
          30% {
            box-shadow: -40px 0 80px rgba(0, 0, 0, 0.4);
          }
          50% {
            transform: rotateY(-90deg);
            box-shadow: -60px 0 100px rgba(0, 0, 0, 0.5);
          }
          70% {
            box-shadow: -20px 0 40px rgba(0, 0, 0, 0.3);
          }
          100% {
            transform: rotateY(-180deg);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        @keyframes flipPrev {
          0% {
            transform: rotateY(0deg);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
          30% {
            box-shadow: 40px 0 80px rgba(0, 0, 0, 0.4);
          }
          50% {
            transform: rotateY(90deg);
            box-shadow: 60px 0 100px rgba(0, 0, 0, 0.5);
          }
          70% {
            box-shadow: 20px 0 40px rgba(0, 0, 0, 0.3);
          }
          100% {
            transform: rotateY(180deg);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #dff3ff;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .page-meta {
          color: rgba(223, 243, 255, 0.8);
          font-size: 0.9rem;
        }

        @media (max-width: 1180px) {
          .book {
            flex-direction: column;
          }
          .page {
            width: 92vw;
            min-height: 420px;
          }
        }
      `}</style>

      <div
        ref={measureRef}
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          width: pageSize.width + "px",
          padding: 28,
          visibility: "hidden",
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1.7,
          fontSize: "1rem",
          whiteSpace: "normal",
        }}
      />

      <div className="book" role="region" aria-label="Book viewer">
        {/* LEFT PAGE */}
        <div
          ref={leftPageRef}
          className={`page left ${isFlipping && flipDirection === "prev" ? "flip-prev" : ""}`}
        >
          <div className="flip-page">
            <div
              className="page-content"
              dangerouslySetInnerHTML={{
                __html: pages[pageIndex]?.replace(/\n/g, "<br/>") || "",
              }}
            />
          </div>
        </div>

        {/* RIGHT PAGE */}
        <div
          className={`page right ${isFlipping && flipDirection === "next" ? "flip-next" : ""}`}
        >
          <div className="flip-page">
            <img src={rightImage} alt="Illustration" />
          </div>
        </div>
      </div>

      <div className="controls">
        <button
          className="btn"
          onClick={handlePrevFlip}
          disabled={pageIndex === 0 || isFlipping}
        >
          ← Prev
        </button>
        <div className="page-meta">
          Page {pageIndex + 1} / {total}
        </div>
        <button
          className="btn"
          onClick={handleNextFlip}
          disabled={pageIndex === total - 1 || isFlipping}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
