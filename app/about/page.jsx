"use client";

import NavBar from "@/components/NavBar";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen mt-20 text-gray-200 overflow-hidden">
        <NavBar></NavBar>
     

      {/* المحتوى */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-400">
          About Us
        </h1>

        {/* عن المسابقة */}
        <section className="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            🛰️ About the Competition
          </h2>
          <p className="leading-relaxed">
            Stellar Minds Space started as part of an international challenge to
            explain <strong>Space Weather</strong> in a fun and creative way. The
            competition invites participants to write and illustrate children’s
            stories that explain what space weather is, and how it affects people
            on Earth—from farmers and pilots to astronauts and scientists.
          </p>
        </section>

        {/* عن الموقع */}
        <section className="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            🌌 About Stellar Minds Space
          </h2>
          <p className="leading-relaxed">
            This platform is our digital home for <strong>space stories</strong>.
            Here, you will find creative tales inspired by the Sun, our solar
            system, and the wonders of space weather. We designed this website to
            be a place where children and students can learn through storytelling,
            illustrations, and imagination.
          </p>
        </section>

        {/* عن الفريق */}
        <section className="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            👨‍🚀 About the Team
          </h2>
          <p className="leading-relaxed">
            We are a group of passionate students and creators who love both{" "}
            <strong>science and storytelling</strong>. Our team combines knowledge
            of astronomy, design, and programming to bring these stories to life.
            Together, we believe in the power of stories to inspire curiosity and
            creativity.
          </p>
        </section>
      </div>

      {/* ستايل النجوم */}
      <style jsx>{`
        .stars {
          width: 100%;
          height: 100%;
          background: transparent url("https://www.script-tutorials.com/demos/360/images/stars.png")
            repeat top center;
          animation: moveStars 200s linear infinite;
        }

        @keyframes moveStars {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -10000px 5000px;
          }
        }
      `}</style>
    </div>
  );
}
