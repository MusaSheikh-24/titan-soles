"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Clapperboard } from "lucide-react";
import { VideoFeed } from "@/features/videos/video-feed";
import { MobileNav } from "@/components/layout/mobile-nav";

export function VideosPage() {
  const pathname = usePathname();

  return (
    <div className="relative h-dvh overflow-hidden bg-black">
      <div className="mx-auto flex h-full w-full max-w-md flex-col lg:max-w-lg lg:border-x lg:border-white/10 lg:shadow-2xl lg:shadow-black/50">
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/50"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-md">
            <Clapperboard className="h-3.5 w-3.5 text-[#38BDF8]" />
            <span className="text-[13px] font-semibold tracking-tight text-white">
              Seller Videos
            </span>
          </div>

          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/35 backdrop-blur-md"
            aria-label="Titan Soles home"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-[11px] font-bold text-white">
              T
            </span>
          </Link>
        </header>

        <main className="relative min-h-0 flex-1">
          <VideoFeed />
        </main>
      </div>

      <MobileNav
        onOpenAI={() => {
          window.location.href = "/#ai";
        }}
        activeTab={pathname === "/videos" ? "videos" : "home"}
      />
    </div>
  );
}
