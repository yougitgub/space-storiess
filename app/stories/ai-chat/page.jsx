"use client";

import React, { useEffect, useRef, useState } from "react";
import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: "system", content: "You are a helpful assistant about the site's stories." },
    { id: 2, role: "assistant", content: "Greetings, traveler! I am the ship's AI. Keep me updated with the story context, and I can answer any questions you have about the cosmos." },
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context,
        }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || "API error");
      }

      const data = await resp.json();
      const aiText = data?.reply || "(no response)";
      const assistantMsg = { id: Date.now() + 1, role: "assistant", content: aiText };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { id: Date.now() + 2, role: "assistant", content: "Sorry, I couldn't reach the AI service." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      sendMessage();
    }
  }

  return (
    <div className="relative min-h-screen text-gray-200">
      <SpaceScene />
      <NavBar />

      <main className="relative z-10 container mx-auto px-4 py-36 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl glass rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                Stellar AI Assistant <Sparkles size={18} className="text-yellow-400 animate-pulse" />
              </h1>
              <p className="text-sm text-blue-200/60">Powered by the ship's mainframe. Ask me anything!</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Sidebar Context Panel */}
            <div className="w-full md:w-1/3 border-r border-white/10 bg-black/20 p-4 flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-300/80 mb-1 flex items-center gap-2">
                <MessageSquare size={14} /> Story Context
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Paste the story text here so I can deduce facts from it..."
                className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all placeholder:text-gray-600 font-mono"
              />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/20">
              <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={listRef}>
                <AnimatePresence>
                  {messages.filter(m => m.role !== 'system').map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {m.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0 mt-1">
                          <Bot size={16} className="text-blue-200" />
                        </div>
                      )}

                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${m.role === 'user'
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50 rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                        }`}>
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      </div>

                      {m.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400/30 flex items-center justify-center shrink-0 mt-1">
                          <User size={16} className="text-purple-200" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-blue-200" />
                    </div>
                    <div className="bg-white/5 border border-white/10 text-gray-400 p-4 rounded-2xl rounded-tl-none text-sm italic flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
                <div className="relative flex items-end gap-2 bg-black/30 border border-white/10 rounded-xl p-2 focus-within:border-blue-500/50 transition-colors">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-none text-white placeholder:text-gray-500 focus:outline-none p-2 max-h-32 resize-none"
                    rows={1}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                  >
                    <motion.div
                      animate={loading ? { rotate: 360 } : {}}
                      transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                    >
                      {loading ? <Sparkles size={20} /> : <Send size={20} />}
                    </motion.div>
                  </motion.button>
                </div>
                <div className="text-xs text-center text-gray-500 mt-2">
                  Press Ctrl + Enter to send
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}
