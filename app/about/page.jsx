"use client";
import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";



const team = [
  {
    name: "Mohammed Gamal",
    role: "Team Leader",
    skills: ["React", "Next.js", "TailwindCSS"],
  },
  {
    name: "Abdallah Medhat",
    role: "Video Editor",
    skills: ["Creative Writing", "Science Communication"],
  },
  {
    name: "Yousef Hussein",
    role: "Content Writer",
    skills: ["Creative Writing", "Science Communication"],
  },
  {
    name: "Amira Subry",
    role: "Reaserch",
    skills: ["Creative Writing", "Science Communication"],
  },
  {
    name: "Norhan Rady",
    role: "Presentation",
    skills: ["Creative Writing", "Science Communication"],
  },
  {
    name: "Khalil Abdelrahman",
    role: "Front-End Developer",
    skills: ["Creative Writing", "Science Communication"],
  },
  
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen  text-gray-200 mt-25">
    <SpaceScene />
      <NavBar />

    
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-400">
          About Us
        </h1>

       
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

     
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-300 mb-8 text-center">
            👨‍🚀 Meet Our Team
          </h2>

        
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  {member.name[0]}
                </div>
                <h3 className="text-xl font-semibold text-center text-blue-200">
                  {member.name}
                </h3>
                <p className="text-center text-gray-300">{member.role}</p>
               
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
