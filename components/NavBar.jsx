"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass fixed inset-x-0 top-6 mx-auto w-[92%] max-w-5xl z-50 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-lg text-white px-6 py-3 flex items-center justify-between">
      {/* الشعار */}
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold tracking-tight">Space Stories</div>
        <span className="hidden sm:inline-block text-xs text-white/60">
          — journal of the cosmos
        </span>
      </div>

      {/* روابط الديسكتوب */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/"
          className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition"
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition"
        >
          Stories
        </Link>
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-full right-0 mt-3 w-56 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl flex flex-col p-3 md:hidden"
          >
            <Link
              href="/"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/20 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/20 transition"
              onClick={() => setIsOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/20 transition"
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
