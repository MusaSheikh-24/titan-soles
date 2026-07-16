"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clapperboard, Sparkles, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onOpenAI: () => void;
  activeTab?: string;
}

const tabs = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "videos", label: "Videos", icon: Clapperboard, href: "/videos" },
  { id: "ai", label: "Titan AI", icon: Sparkles, href: null },
  { id: "wishlist", label: "Wishlist", icon: Heart, href: "/#wishlist" },
  { id: "profile", label: "Profile", icon: User, href: "/#signin" },
];

export function MobileNav({ onOpenAI, activeTab }: MobileNavProps) {
  const pathname = usePathname();
  const resolvedActive =
    activeTab ??
    (pathname === "/videos" ? "videos" : pathname === "/" ? "home" : "");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="glass border-t border-white/8 px-1 pb-3 pt-1">
        <div className="flex items-end justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isAI = tab.id === "ai";
            const isActive = resolvedActive === tab.id;

            if (isAI) {
              return (
                <button
                  key={tab.id}
                  onClick={onOpenAI}
                  className="relative -mt-5 flex flex-col items-center gap-1"
                  aria-label="Open Titan AI"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/30 transition-transform active:scale-95">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-accent">
                    Titan AI
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href ?? "/"}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-colors",
                  isActive ? "text-accent" : "text-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
