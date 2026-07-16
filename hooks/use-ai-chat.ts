"use client";

import { useCallback, useState } from "react";
import { AI_RESPONSES } from "@/lib/constants";
import type { ChatMessage } from "@/types";

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (
    lower.includes("hiking") ||
    lower.includes("trail")
  ) {
    return AI_RESPONSES.hiking;
  }
  if (lower.includes("running") || lower.includes("run")) {
    return AI_RESPONSES.running;
  }
  if (lower.includes("wedding")) {
    return AI_RESPONSES.wedding;
  }
  if (lower.includes("office") || lower.includes("work")) {
    return AI_RESPONSES.office;
  }
  if (
    lower.includes("budget") ||
    lower.includes("cheap") ||
    lower.includes("under")
  ) {
    return AI_RESPONSES.budget;
  }
  return AI_RESPONSES.default;
}

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Titan AI, your personal footwear assistant. Tell me what you're looking for — style, occasion, budget, size — and I'll find the perfect shoes from our verified stores.",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200 + Math.random() * 800)
    );

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: getAIResponse(content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm Titan AI, your personal footwear assistant. Tell me what you're looking for — style, occasion, budget, size — and I'll find the perfect shoes from our verified stores.",
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
  }, []);

  return { messages, isTyping, sendMessage, resetChat };
}
