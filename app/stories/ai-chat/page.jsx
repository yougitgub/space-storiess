"use client";

import React, { useEffect, useRef, useState } from "react";
import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: "system", content: "You are a helpful assistant about the site's stories." },
    { id: 2, role: "assistant", content: "Ask me anything about the story — paste a story in the context area if you'd like me to use it." },
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // scroll to bottom on new messages
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
    <>
    <NavBar></NavBar>
        <SpaceScene/>
    <div className="ai-chat-page mt-30 z-50" style={{padding:24,display:'flex',flexDirection:'column',gap:18,alignItems:'center'}}>
      <style jsx>{`
        .chat-shell{width:100%;max-width:980px;background:linear-gradient(180deg, rgba(8,10,20,0.7), rgba(6,8,18,0.6));border-radius:12px;padding:18px;border:1px solid rgba(255,255,255,0.04);box-shadow:0 10px 30px rgba(2,6,23,0.6)}
        .header{display:flex;align-items:center;gap:12px;margin-bottom:8px}
        .title{font-weight:700;color:#dff3ff}
        .subtitle{color:rgba(223,243,255,0.6);font-size:0.95rem}
        .context{margin:12px 0;display:flex;flex-direction:column;gap:8px}
        .context textarea{width:100%;min-height:80px;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);padding:10px;color:#e7f2ff}
        .messages{height:420px;overflow:auto;padding:12px;border-radius:8px;background:linear-gradient(180deg, rgba(0,0,0,0.06), rgba(255,255,255,0.01));display:flex;flex-direction:column;gap:10px}
        .msg{max-width:78%;padding:12px;border-radius:10px;line-height:1.5}
        .msg.user{align-self:flex-end;background:linear-gradient(180deg, rgba(3,102,214,0.15), rgba(3,102,214,0.08));border:1px solid rgba(3,102,214,0.2);color:#dff3ff}
        .msg.assistant{align-self:flex-start;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.04);color:#e7f2ff}
        .composer{display:flex;gap:8px;margin-top:12px}
        .composer textarea{flex:1;min-height:56px;border-radius:10px;padding:10px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:#e7f2ff}
        .send{background:linear-gradient(90deg,#3b82f6,#06b6d4);border:none;padding:10px 16px;border-radius:10px;color:white;cursor:pointer}
        .send[disabled]{opacity:0.5;cursor:default}
        `}</style>

      <div className="chat-shell">
        <div className="header">
          <div>
            <div className="title">Story AI Chat</div>
            <div className="subtitle">Ask anything about the story. Paste a story into the context area to give the assistant the full text.</div>
          </div>
        </div>

        <div className="context">
          <label style={{color:'rgba(223,243,255,0.7)'}}>Story context (optional)</label>
          <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Paste the story here so the assistant can reference it when answering." />
        </div>

        <div className="messages" ref={listRef}>
          {messages.map((m) => (
              <div key={m.id} className={`msg ${m.role === 'user' ? 'user' : 'assistant'}`}>
              <div style={{whiteSpace:'pre-wrap'}}>{m.content}</div>
            </div>
          ))}
          {loading && <div className="msg assistant">Thinking...</div>}
        </div>

        <div className="composer">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Type your question and press Ctrl+Enter to send" />
          <button className="send" onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
        </div>
      </div>
    </div>
          </>
  );
}
