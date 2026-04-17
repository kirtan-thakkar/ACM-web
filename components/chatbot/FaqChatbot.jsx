"use client";

import { useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "motion/react";
import faqs from "@/data/faqs.json";
import { Send, Mic, SquareSquare, Volume2 } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";

function getMessageText(message) {
  if (typeof message?.content === "string") return message.content;
  if (Array.isArray(message?.parts)) {
    return message.parts.filter(p => p?.type === "text").map(p => p.text).join("\n");
  }
  return "";
}

function TypingDots() {
  return (
    <div className="flex gap-1.5 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl">
      {[0, 0.2, 0.4].map((delay) => (
        <motion.span 
          key={delay}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay }}
          className="h-1.5 w-1.5 rounded-full bg-blue-600" 
        />
      ))}
    </div>
  );
}

function MessageBubble({ role, text, isLast }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-6 py-4 text-[15px] leading-relaxed ${
          isUser
            ? "bg-zinc-950 text-white rounded-[2rem] rounded-tr-none shadow-lg shadow-zinc-100"
            : "bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-[2rem] rounded-tl-none"
        }`}
      >
        <p className="whitespace-pre-wrap font-medium">{text}</p>
      </div>
    </motion.div>
  );
}

export default function FaqChatbot() {
  const fileInputRef = useRef(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const faqEntries = Array.isArray(faqs) ? faqs : [];
  const quickQuestions = faqEntries.slice(0, 3).map((entry) => entry.question).filter(Boolean);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    setInput,
  } = useChat({
    api: "/api/chat",
  });

  const parsedMessages = useMemo(
    () =>
      messages
        .map((message) => ({
          id: message.id,
          role: message.role,
          text: getMessageText(message),
        }))
        .filter((message) => Boolean(message.text.trim())),
    [messages],
  );

  const isBusy = status === "submitted" || status === "streaming";
  const safeInput = typeof input === "string" ? input : "";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!safeInput.trim()) return;
    handleSubmit(e);
  };

  async function speakResponse(text) {
    if (!text) return;
    setIsSpeaking(true);
    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
        await audio.play();
      }
    } finally {
      setIsSpeaking(false);
    }
  }

  return (
    <div className="flex h-[750px] w-full flex-col bg-white">
      
      <header className="flex items-center justify-between border-b border-zinc-100 px-10 py-8 bg-zinc-50/50">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-100">
            <Send className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-zinc-950 uppercase">Session.active</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Grounded Context Engine</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-10 md:px-12 space-y-8 scrollbar-hide">
        {parsedMessages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center max-w-sm mx-auto">
            <div className="size-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <TypingAnimation 
                className="text-blue-600 text-2xl font-bold"
                duration={150}
                showCursor={false}
              >
                ?
              </TypingAnimation>
            </div>
            <TypingAnimation 
              className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400"
              duration={50}
            >
              System ready. Awaiting your first inquiry regarding documentation, pricing, or technical architecture.
            </TypingAnimation>
          </div>
        )}

        {parsedMessages.map((message, i) => (
          <MessageBubble key={message.id} role={message.role} text={message.text} isLast={i === parsedMessages.length - 1} />
        ))}

        <AnimatePresence>
          {isBusy && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-8 pb-8 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="shrink-0 px-5 py-2 rounded-full border border-zinc-100 bg-zinc-50 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-600 hover:border-blue-200 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        <form onSubmit={handleFormSubmit} className="relative group">
          <div className="flex items-end gap-3 rounded-[2.5rem] border border-zinc-200 bg-white p-2.5 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 shadow-xl shadow-zinc-100">
            <textarea
              name="prompt"
              rows={1}
              value={safeInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
              placeholder="Type your query..."
              className="flex-1 resize-none bg-transparent px-6 py-4 text-[15px] font-medium text-zinc-900 placeholder:text-zinc-400 outline-none min-h-[60px] max-h-40"
            />
            
            <div className="flex items-center gap-1.5 mb-2.5 pr-1.5">
              <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" />
              <button type="button" className="p-3 text-zinc-400 hover:text-blue-600 transition-colors">
                <Mic className="size-5" />
              </button>
              
              <button
                type="submit"
                disabled={!safeInput.trim() || isBusy}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white disabled:bg-zinc-100 disabled:text-zinc-300 transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-lg"
              >
                {isBusy ? <SquareSquare className="size-5" /> : <Send className="size-5" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
