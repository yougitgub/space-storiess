import { auroraScript } from "./scripts";
import { bigBangScript } from "./scripts";
import { nebulaScript } from "./scripts";
import { silentShadowsScript } from "./scripts";

export const stories = [
    {
        id: "1",
        title: "Aurora Nights",
        script: auroraScript,
        videoLink: "https://www.youtube.com/embed/qQ2qawPIwNM",
        difficulty: "Easy",
        description: "A winter tale from northern Norway. discover the secrets of the Northern Lights and the message sent from the Sun itself.",
        image: "https://final-project-repo-zeta.vercel.app/1.jpg",
        images: ["https://final-project-repo-zeta.vercel.app/1.jpg"],
        duration: "10 min read"
    },
    {
        id: "2",
        title: "Big Bang",
        script: bigBangScript,
        videoLink: "https://www.youtube.com/embed/qqKgZJ96_5w",
        difficulty: "Easy",
        description: "A tale of the Big Bang and the secrets of the universe.",
        image: "https://final-project-repo-zeta.vercel.app/1.jpg",
        images: ["https://final-project-repo-zeta.vercel.app/1.jpg"],
        duration: "20 min read"
    },
    {
        id: "3",
        title: "Nebula",
        script: nebulaScript,
        videoLink: "https://www.youtube.com/embed/FAV0JdyYK6g",
        difficulty: "Easy",
        description: "A little story about the nebula and the secrets of the universe.",
        image: "https://final-project-repo-zeta.vercel.app/1.jpg",
        images: ["https://final-project-repo-zeta.vercel.app/1.jpg"],
        duration: "20 min read"
    },
    {
        id: "4",
        title: "Silent Shadows",
        script: silentShadowsScript,
        videoLink: "https://www.youtube.com/embed/mF-fGrqjfzc",
        difficulty: "Easy",
        description: "A story about the dark matter and the secrets of the universe.",
        image: "https://final-project-repo-zeta.vercel.app/1.jpg",
        images: ["https://final-project-repo-zeta.vercel.app/1.jpg"],
        duration: "20 min read"
    }
];
