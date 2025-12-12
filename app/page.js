"use client";

import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <NavBar />
        <SpaceScene />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6 tracking-tight">
              Stellar Minds Space
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Embark on an interactive journey through the cosmos. Explore stories, unlock mysteries, and witness the universe like never before.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/stories">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full text-xl font-bold border border-white/20 shadow-lg backdrop-blur-sm transition-all"
              >
                Start Your Adventure 🚀
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
