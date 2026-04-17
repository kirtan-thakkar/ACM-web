"use client";

import { useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "motion/react";
import { Send, SquareSquare } from "lucide-react";

function getMessageText(message) {
  if (typeof message?.content === "string") {
    return message.content;
  }

  if (Array.isArray(message?.parts)) {
    return message.parts
      .filter((part) => part?.type === "text")
      .map((part) => part.text)
      .join("\n");
  }

  return "";
}

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2">
      {[0, 0.2, 0.4].map((delay) => (
        <motion.span
          key={delay}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 1.25, ease: "easeInOut", delay }}
          className="h-1.5 w-1.5 rounded-full bg-sky-400"
        />
      ))}
    </div>
  );
}

function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[78%] ${
          isUser
            ? "bg-sky-100 text-zinc-900"
            : "border border-zinc-700 bg-zinc-900 text-zinc-100"
        }`}
      >
        <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          {isUser ? "You" : "FAQ Assistant"}
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed md:text-[15px]">{text}</p>
      </div>
    </motion.div>
  );
}

export default function FaqChatbot() {
  const bottomRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    setInput,
    error,
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [parsedMessages.length, isBusy]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!safeInput.trim()) return;
    handleSubmit(event);
  };

  return (
    <section className="flex h-[78vh] min-h-155 w-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-b from-zinc-900 via-zinc-950 to-black">
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <AnimatePresence>
            {parsedMessages.length === 0 && !isBusy && !error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid min-h-[44vh] place-items-center"
              >
                <div className="max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 text-center">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">Ready</p>
                  <h3 className="mb-2 text-xl font-semibold text-zinc-100">Ask Anything In Your FAQ Scope</h3>
                  <p className="text-sm text-zinc-400">
                    Example topics: pricing, trial, refunds, security, support, and integrations.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {parsedMessages.map((message) => (
            <MessageBubble key={message.id} role={message.role} text={message.text} />
          ))}

          <AnimatePresence>
            {isBusy && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex justify-start"
              >
                <TypingDots />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900/80 px-4 py-4 md:px-6">
        {error && (
          <div className="mx-auto mb-3 w-full max-w-3xl rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error.message}
          </div>
        )}

        <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          <div className="relative rounded-2xl border border-zinc-700 bg-zinc-950/80 transition focus-within:border-sky-500/70">
            <textarea
              name="prompt"
              rows={2}
              value={safeInput}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  onSubmit(event);
                }
              }}
              placeholder="Ask your FAQ question..."
              className="w-full resize-none bg-transparent px-4 py-3 pr-28 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
              style={{ minHeight: "74px" }}
            />

            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              {isBusy ? (
                <motion.button
                  type="button"
                  onClick={stop}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-950/30 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-red-200 transition hover:bg-red-900/40"
                >
                  <SquareSquare className="size-3" /> Stop
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={!safeInput.trim()}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-900 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send <Send className="size-3" />
                </motion.button>
              )}
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">Press Enter to send and Shift+Enter for a new line.</p>
        </form>
      </div>
    </section>
  );
}
