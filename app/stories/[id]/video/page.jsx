"use client";

import React, { use } from "react";
import NavBar from "@/components/NavBar";
import { stories } from "../../data";
import { notFound } from "next/navigation";

export default function VideoPage({ params }) {
    const { id } = use(params);

    const story = stories.find((s) => s.id === id);

    if (!story) {
        return notFound();
    }

    return (
        <>
            <NavBar />
            <div className="w-full h-screen">
                <iframe
                    className="w-full h-full"
                    src={story.videoLink}
                    title={`${story.title} Video`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}