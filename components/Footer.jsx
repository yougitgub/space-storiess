"use client";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full mt-20 bg-[#0a1730] text-gray-300 border-t border-white/10">
     
      

    
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
    
        <div>
          <h2 className="text-xl font-bold text-blue-300">Space Stories</h2>
          <p className="mt-2 text-sm text-gray-400">
            Inspiring the next generation through cosmic tales and space weather
            adventures.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-lg font-semibold text-blue-200">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-blue-300 transition text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-blue-300 transition text-sm"
              >
                Stories
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-300 transition text-sm"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold text-blue-200">Follow Us</h3>
          <div className="mt-3 flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-400/20 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-400/20 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-400/20 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

     
      <div className="relative z-10 border-t border-white/10 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Space Stories. All rights reserved.
      </div>

   
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
    </footer>
  );
}
