"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  MessageSquare,
  Send,
  Paperclip,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { motion } from "motion/react";

const initialConversations = [
  { id: 1, name: "Premium Kicks", lastMsg: "When will the new Air Max drop?", time: "2m ago", unread: 2, status: "seller", online: true },
  { id: 2, name: "Sarah Johnson", lastMsg: "I'd like to return my order #1042", time: "15m ago", unread: 0, status: "buyer", online: false },
  { id: 3, name: "Sneaker Vault", lastMsg: "Our weekly shipment has arrived!", time: "1h ago", unread: 1, status: "seller", online: true },
  { id: 4, name: "Alex Thompson", lastMsg: "Thanks for the help!", time: "3h ago", unread: 0, status: "buyer", online: false },
  { id: 5, name: "Urban Footwear", lastMsg: "We need to update our listing", time: "5h ago", unread: 0, status: "seller", online: false },
  { id: 6, name: "Jessica Park", lastMsg: "Do you have these in size 9?", time: "1d ago", unread: 0, status: "buyer", online: false },
];

const initialMessages: Record<number, { id: number; sender: string; text: string; time: string; isMe: boolean }[]> = {
  1: [
    { id: 1, sender: "Premium Kicks", text: "Hey! When will the new Air Max drop be available?", time: "10:32 AM", isMe: false },
    { id: 2, sender: "You", text: "Hi! The new Air Max drop is expected next Monday. We'll notify all verified sellers.", time: "10:33 AM", isMe: true },
    { id: 3, sender: "Premium Kicks", text: "Great, can we get early access for our store?", time: "10:35 AM", isMe: false },
    { id: 4, sender: "You", text: "Absolutely! I'll add your store to the early access list. Expect an invite by Friday.", time: "10:38 AM", isMe: true },
    { id: 5, sender: "Premium Kicks", text: "Perfect, thank you so much!", time: "10:40 AM", isMe: false },
    { id: 6, sender: "Premium Kicks", text: "When will the new Air Max drop?", time: "10:42 AM", isMe: false },
  ],
};

export default function AdminMessages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState(initialConversations);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredConvs = useMemo(() => {
    if (!searchQuery) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMsg.toLowerCase().includes(q)
    );
  }, [searchQuery, conversations]);

  const activeConv = conversations.find((c) => c.id === activeChat);
  const messages = activeChat ? allMessages[activeChat] ?? [] : [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim() || !activeChat) return;
    const newMsg = {
      id: (allMessages[activeChat]?.length ?? 0) + 1,
      sender: "You",
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    setAllMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] ?? []), newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? { ...c, lastMsg: messageText.trim(), time: "Just now", unread: 0 }
          : c
      )
    );
    setMessageText("");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 overflow-hidden rounded-3xl border border-border bg-card sm:gap-0">
      {/* Conversation list */}
      <div className={cn("flex w-full flex-col border-r border-border sm:w-80", activeChat && "hidden sm:flex")}>
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-2xl border-white/5 bg-white/[0.04] pl-9 text-sm placeholder:text-muted/60"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted">No conversations found</div>
          ) : (
            filteredConvs.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-3.5 text-left transition-colors hover:bg-white/[0.02]",
                  activeChat === conv.id && "bg-white/[0.03]"
                )}
              >
                <div className="relative shrink-0">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-bold", conv.status === "seller" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary")}>
                    {conv.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  {conv.online && <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{conv.name}</p>
                    <span className="text-[11px] text-muted">{conv.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && <Badge className="mt-0.5 h-5 min-w-5 rounded-full px-1.5 text-[10px]">{conv.unread}</Badge>}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className={cn("flex flex-1 flex-col", !activeChat && "hidden sm:flex")}>
        {activeChat && activeConv ? (
          <>
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground sm:hidden">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-bold", activeConv.status === "seller" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary")}>
                  {activeConv.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activeConv.name}</p>
                  <p className={cn("text-[11px]", activeConv.online ? "text-success" : "text-muted")}>{activeConv.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[80%] rounded-2xl px-4 py-2.5", msg.isMe ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-foreground")}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn("mt-1 text-[10px]", msg.isMe ? "text-primary-foreground/60" : "text-muted")}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </button>
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="h-10 rounded-2xl border-white/5 bg-white/[0.04] text-sm placeholder:text-muted/60"
                />
                <Button type="submit" size="sm" className="h-10 w-10 rounded-2xl p-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/[0.04]">
                <MessageSquare className="h-7 w-7 text-muted" />
              </div>
              <p className="text-lg font-medium text-foreground">Select a conversation</p>
              <p className="mt-1 text-sm text-muted">Choose a conversation from the sidebar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
