"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminHeaderProps {
  title: string;
  onMenuToggle?: () => void;
  onOpenAI?: () => void;
}

export function AdminHeader({ title, onMenuToggle, onOpenAI }: AdminHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    { id: 1, text: "New order #1042 — $189.00", time: "2m ago", unread: true },
    { id: 2, text: "Product 'Air Max 90' is low stock", time: "15m ago", unread: true },
    { id: 3, text: "New seller application received", time: "1h ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      {/* Left: menu + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      {/* Right: search + notifications + profile */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-56 rounded-2xl border-white/5 bg-white/[0.04] pl-9 text-sm placeholder:text-muted/60 focus-visible:w-72 focus-visible:bg-white/[0.06]"
          />
        </div>

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/30"
                >
                  <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-medium text-foreground">Notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        className={cn(
                          "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-white/[0.03]",
                          n.unread && "bg-primary/[0.03]"
                        )}
                      >
                        <div
                          className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            n.unread ? "bg-primary" : "bg-transparent"
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-foreground">{n.text}</p>
                          <p className="mt-0.5 text-xs text-muted">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border p-2">
                    <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Quick AI */}
        <Button
          variant="accent"
          size="sm"
          className="hidden gap-1.5 md:inline-flex"
          onClick={onOpenAI}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs">Titan AI</span>
        </Button>

        {/* Profile */}
        <button className="group flex items-center gap-2 rounded-2xl border border-border bg-white/[0.03] px-3 py-1.5 transition-colors hover:bg-white/[0.06]">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">
            JD
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-medium text-foreground">John Doe</p>
            <p className="text-[10px] text-muted">Admin</p>
          </div>
          <ChevronDown className="hidden h-3 w-3 text-muted md:block" />
        </button>
      </div>
    </header>
  );
}
