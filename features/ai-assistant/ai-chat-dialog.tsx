"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIChat } from "@/hooks/use-ai-chat";
import { AI_SUGGESTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AIChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

function MessageContent({ content }: { content: string }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-200">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-primary/70"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function AIChatDialog({
  open,
  onOpenChange,
  initialQuery,
}: AIChatDialogProps) {
  const { messages, isTyping, sendMessage, resetChat } = useAIChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialSent = useRef(false);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    if (open && initialQuery && !initialSent.current) {
      initialSent.current = true;
      sendMessage(initialQuery);
    }
    if (!open) initialSent.current = false;
  }, [open, initialQuery, sendMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] max-h-[760px] w-[96vw] max-w-2xl flex-col gap-0 overflow-hidden rounded-3xl border-white/10 bg-card p-0">
        <DialogTitle className="sr-only">Titan AI Assistant</DialogTitle>

        <div className="flex items-center justify-between border-b border-white/10 bg-card px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <Sparkles className="h-5 w-5 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-white/10" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Titan AI</h2>
              <p className="text-xs text-muted">Your personal footwear expert</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetChat}
            className="rounded-xl text-slate-400 hover:text-white"
            aria-label="Reset chat"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 bg-background/60">
          <div className="space-y-5 p-5">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                      message.role === "user"
                        ? "bg-white/10"
                        : "bg-gradient-to-br from-primary/20 to-accent/15"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-slate-300" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-accent text-white shadow-md shadow-primary/20"
                        : "border border-white/10 bg-surface-elevated text-foreground shadow-sm"
                    )}
                  >
                    {message.role === "user" ? (
                      <p className="text-[15px] leading-relaxed">{message.content}</p>
                    ) : (
                      <MessageContent content={message.content} />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-surface-elevated px-4 py-2 shadow-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {messages.length <= 1 && !isTyping && (
          <div className="border-t border-white/10 bg-card px-5 py-3">
            <p className="mb-2.5 text-xs font-medium text-muted">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {AI_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-accent"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-white/10 bg-card p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Describe the shoes you're looking for..."
              className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              disabled={isTyping}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="h-9 w-9 shrink-0 rounded-xl"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2.5 text-center text-[11px] text-slate-500">
            Titan AI can make mistakes. Verify important product details.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
