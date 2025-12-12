"use client";

import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const team = [
  { name: "Mohammed Gamal", role: "Team Leader", initial: "M" },
  { name: "Abdallah Medhat", role: "Video Editor", initial: "A" },
  { name: "Yousef Hussein", role: "Content Writer", initial: "Y" },
  { name: "Amira Subry", role: "Research", initial: "A" },
  { name: "Norhan Rady", role: "Presentation", initial: "N" },
  { name: "Khalil Abdelrahman", role: "Front-End Developer", initial: "K" },
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen text-gray-200">
      <SpaceScene />
      <NavBar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300 drop-shadow-lg"
        >
          About Us
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2 mb-16"
        >
          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <span>🛰️</span> About the Competition
            </h2>
            <p className="leading-relaxed text-blue-100/80">
              Stellar Minds Space started as part of an international challenge to
              explain <strong>Space Weather</strong> in a fun and creative way. The
              competition invites participants to write and illustrate children’s
              stories that explain what space weather is, and how it affects people
              on Earth—from farmers and pilots to astronauts and scientists.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <span>🌌</span> About Stellar Minds Space
            </h2>
            <p className="leading-relaxed text-blue-100/80">
              This platform is our digital home for <strong>space stories</strong>.
              Here, you will find creative tales inspired by the Sun, our solar
              system, and the wonders of space weather. We designed this website to
              be a place where children and students can learn through storytelling,
              illustrations, and imagination.
            </p>
          </section>
        </motion.div>

        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-10 text-white"
          >
            👨‍🚀 Meet Our Team
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl flex flex-col items-center text-center transition-colors hover:bg-white/10"
              >
                <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white/10">
                  {member.initial}
                </div>
                <h3 className="text-xl font-bold text-blue-100 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-blue-300 uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
