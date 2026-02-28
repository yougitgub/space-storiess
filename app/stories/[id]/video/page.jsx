"use client";

import React, { use } from "react";
import NavBar from "@/components/NavBar";
import SpaceScene from "@/components/SpaceScene";
import Footer from "@/components/Footer";
import { stories } from "../../data";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoPage({ params }) {
    const { id } = use(params);
    const router = useRouter();

    const story = stories.find((s) => s.id === id);

    if (!story) {
        return notFound();
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020617]">
            <div className="fixed inset-0 z-0">
                <SpaceScene />
            </div>

            <NavBar />

            <main className="relative z-10 pt-32 pb-20 px-4 flex flex-col items-center">
                <div className="max-w-6xl w-full">
                    <motion.button
                        onClick={() => router.back()}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-blue-300 hover:text-white mb-8 transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Library</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-white/10 bg-black"
                    >
                        <iframe
                            className="w-full h-full"
                            src={`${story.videoLink}?autoplay=1&mute=1`}
                            title={`${story.title} Video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </motion.div>

                    <div className="mt-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-6 uppercase tracking-wider"
                        >
                            {story.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-blue-100/70 max-w-3xl mx-auto leading-relaxed"
                        >
                            {story.description}
                        </motion.p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}