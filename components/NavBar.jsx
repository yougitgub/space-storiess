"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, BookOpen, Sparkles, Library, Users, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Stories", href: "/stories", icon: BookOpen },
    { name: "Ask AI", href: "/stories/ai-chat", icon: Sparkles, special: true },
    { name: "Resources", href: "/resources", icon: Library },
    { name: "About Us", href: "/about", icon: Users },
  ];

  const variants = {
    hover: { y: -2, scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-x-0 top-6 mx-auto w-[95%] max-w-5xl z-50 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-gray-200 px-6  py-3 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all">
            <Rocket size={20} className="text-white fill-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">Stellar Minds</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">Explorer Edition</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link key={link.name} href={link.href}>
                <motion.div
                  className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300
                      ${isActive ? "text-white bg-white/10 shadow-inner" : "text-gray-400 hover:text-white hover:bg-white/5"}
                      ${link.special ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-200 hover:from-blue-500/30 hover:to-purple-500/30" : ""}
                    `}
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants}
                >
                  <Icon size={16} className={link.special ? "text-blue-400" : (isActive ? "text-white" : "text-gray-500")} />
                  <span>{link.name}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/5 rounded-full z-[-1]"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-white/10 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 z-40 w-64 rounded-2xl bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-4 md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    <Icon size={18} className={isActive ? "text-blue-400" : ""} />
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
