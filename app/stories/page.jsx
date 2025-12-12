"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Play, Star } from "lucide-react";
import NavBar from "@/components/NavBar";
import SpaceScene from "@/components/SpaceScene";
import { stories } from "./data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function StoriesGallery() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white">
      <div className="fixed inset-0 z-0">
        <SpaceScene />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] mb-4">
              Cosmic Library
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto font-light">
              Explore the wonders of the universe through our collection of interactive stories.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {stories.map((story) => (
              <motion.div
                key={story.id}
                variants={cardVariants}
                className="group relative h-[500px] w-full [perspective:1000px]"
              >
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-white/20 hover:-translate-y-2">
                  {/* Image Section */}
                  <div className="h-1/2 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur border border-white/20 text-white flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        {story.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="h-1/2 p-6 flex flex-col justify-between relative bg-gradient-to-b from-transparent to-black/40">
                    <div>
                      <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                        {story.title}
                      </h2>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {story.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">

                      <div className="flex gap-3">
                        <Link
                          href={`/stories/${story.id}/book`}
                          className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                        >
                          <BookOpen size={18} />
                          <span>Read Book</span>
                        </Link>
                        <Link
                          href={`/stories/${story.id}/video`}
                          className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/25 active:scale-95"
                        >
                          <Play size={18} />
                          <span>Watch Video</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
