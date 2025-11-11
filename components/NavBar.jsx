"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [mobileStoriesOpen, setMobileStoriesOpen] = useState(false);

  return (
    <nav className="glass fixed inset-x-0 top-6 mx-auto w-[92%] max-w-5xl z-50 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-lg text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold tracking-tight">Space Stories</div>
        <span className="hidden sm:inline-block text-xs text-white/60">
          — journal of the cosmos
        </span>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/"
          className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition"
        >
          Home
        </Link>

        {/* Stories dropdown - desktop */}
        <div
          className="relative"
          onMouseEnter={() => setIsStoriesOpen(true)}
          onMouseLeave={() => setIsStoriesOpen(false)}
        >
          <button
            aria-expanded={isStoriesOpen}
            onClick={() => setIsStoriesOpen((s) => !s)}
            className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition"
          >
            Stories
            <ChevronDown size={14} />
          </button>

          <AnimatePresence>
            {isStoriesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.14 }}
                className="absolute right-0 mt-2 w-44 rounded-lg bg-white/6 backdrop-blur-md border border-white/10 shadow-lg p-2 z-50"
              >
                <Link
                  href="/stories/book"
                  className="block text-sm px-3 py-2 rounded hover:bg-white/8 transition"
                  onClick={() => setIsStoriesOpen(false)}
                >
                  📘 Book
                </Link>
                <Link
                  href="/stories/video"
                  className="block text-sm px-3 py-2 rounded hover:bg-white/8 transition"
                  onClick={() => setIsStoriesOpen(false)}
                >
                  🎬 Video
                </Link>
                <Link
                  href="/stories/ai-chat"
                  className="block text-sm px-3 py-2 rounded hover:bg-white/8 transition"
                  onClick={() => setIsStoriesOpen(false)}
                >
                  🤖 Ask AI
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/about"
          className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition"
        >
          About Us
        </Link>
      </div>

   
      <div className="md:hidden ">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full right-0 mt-3 w-64 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-xl flex flex-col p-3 md:hidden"
          >
            <Link
              href="/"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/8 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div className="mt-1">
              <button
                onClick={() => setMobileStoriesOpen((s) => !s)}
                className="w-full flex items-center justify-between text-sm font-medium px-3 py-2 rounded-md hover:bg-white/8 transition"
              >
                <span>Stories</span>
                <ChevronDown size={14} className={`transform ${mobileStoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileStoriesOpen && (
                <div className="mt-1 ml-3 flex flex-col gap-1">
                  <Link href="/stories/book" className="text-sm px-3 py-2 rounded-md hover:bg-white/8 transition" onClick={() => setIsOpen(false)}>📘 Book</Link>
                  <Link href="/stories/video" className="text-sm px-3 py-2 rounded-md hover:bg-white/8 transition" onClick={() => setIsOpen(false)}>🎬 Video</Link>
                  <Link href="/stories/ai-chat" className="text-sm px-3 py-2 rounded-md hover:bg-white/8 transition" onClick={() => setIsOpen(false)}>🤖 Ask AI</Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="mt-2 text-sm font-medium px-3 py-2 rounded-md hover:bg-white/8 transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
