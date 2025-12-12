"use client";

import React, { use } from "react";
import BookReader from "@/components/BookReader";
import NavBar from "@/components/NavBar";
import SpaceScene from "@/components/SpaceScene";
import Footer from "@/components/Footer";
import { stories } from "../../data";
import { notFound } from "next/navigation";

export default function BookPage({ params }) {
  // Unwrapping params using React.use() for Next.js 15+ compatibility or standard await if async
  // Since this is a client component ('use client'), we receive params as a promise in recent Next.js versions.
  // However, traditionally params was an object. In Next.js 15, it's a promise.
  // Ideally, we can wrap this in a safe generic way.

  // For 'use client' components in Next.js 15, params is a promise.
  const { id } = use(params);

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return notFound();
  }

  return (
    <div className="min-h-screen relative">
      <NavBar />
      <SpaceScene />
      <main className="relative z-10 flex items-start justify-center py-20 px-4">
        <div className="max-w-6xl w-full">
          <h1 className="text-3xl text-center text-white mb-8">{story.title} — Book</h1>
          {/* Note: In data.js I named it 'script'. BookReader expects 'storyText' */}
          <BookReader
            storyText={story.script}
            images={story.images || [story.image]}
            approxCharsPerPage={1100}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
