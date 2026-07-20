"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Bell,
  CheckCheck,
  Trash2,
  MessageSquare,
  Heart,
  Clock,
  ShoppingBag,
  Sparkles,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "request" | "wishlist" | "order" | "promo" | "system";
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "request", title: "Request Accepted", message: "Premium Kicks accepted your request for Nike Air Max 90.", time: "2 min ago", unread: true },
  { id: 2, type: "wishlist", title: "Price Drop Alert", message: "Ultraboost 5 is now $189 — down from $210!", time: "15 min ago", unread: true },
  { id: 3, type: "request", title: "Counter Offer Received", message: "Urban Footwear offered $135 for New Balance 574.", time: "32 min ago", unread: true },
  { id: 4, type: "order", title: "Order Shipped", message: "Your ASICS Gel-Kayano 30 has been shipped.", time: "1h ago", unread: false },
  { id: 5, type: "system", title: "Welcome to Titan Soles!", message: "Thanks for joining. Start exploring the marketplace.", time: "2h ago", unread: false },
  { id: 6, type: "promo", title: "Limited Edition Drop", message: "New限量版sneakers just landed — check them out.", time: "1d ago", unread: false },
  { id: 7, type: "request", title: "Request Declined", message: "Sneaker Vault declined your request for Converse Chuck 70.", time: "1d ago", unread: false },
];

const typeIcons: Record<string, React.ReactNode> = {
  request: <MessageSquare className="h-4 w-4" />,
  wishlist: <Heart className="h-4 w-4" />,
  order: <ShoppingBag className="h-4 w-4" />,
  promo: <Sparkles className="h-4 w-4" />,
  system: <Bell className="h-4 w-4" />,
};

const typeStyles: Record<string, string> = {
  request: "bg-blue-50 text-blue-600",
  wishlist: "bg-rose-50 text-rose-500",
  order: "bg-emerald-50 text-emerald-600",
  promo: "bg-amber-50 text-amber-600",
  system: "bg-purple-50 text-purple-600",
};

const tabFilters = ["all", "unread", "request", "wishlist", "order", "promo"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? notifications
    : activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications.` : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="gap-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl" onClick={markAllRead}>
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" className="gap-1.5 border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl" onClick={clearAll}>
              <Trash2 className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {tabFilters.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all",
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px]">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4 shadow-sm">
                <Inbox className="h-7 w-7 text-gray-400" />
              </div>
              <p className="text-base font-semibold text-gray-900">No notifications</p>
              <p className="text-sm text-gray-500 mt-1">You&apos;re all caught up for now.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((notif, i) => (
                <motion.button
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggleRead(notif.id)}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50 group",
                    notif.unread && "bg-blue-50/40"
                  )}
                >
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-105", typeStyles[notif.type])}>
                    {typeIcons[notif.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm", notif.unread ? "font-semibold text-gray-900" : "font-medium text-gray-600")}>
                        {notif.title}
                      </p>
                      {notif.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600 animate-pulse" />}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{notif.message}</p>
                    <p className="mt-1 text-[11px] text-gray-400 tabular-nums">{notif.time}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
