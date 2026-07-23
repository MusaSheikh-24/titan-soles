"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Flame,
  Tag,
  Clapperboard,
  ChevronRight,
} from "lucide-react";
import { VideoFeed, type FeedFilters } from "@/features/videos/video-feed";
import { SELLER_VIDEOS } from "@/lib/constants";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "for-you" as const, label: "For You", icon: Sparkles },
  { id: "following" as const, label: "Following" },
  { id: "new" as const, label: "New Drops", icon: Tag },
  { id: "trending" as const, label: "Trending", icon: Flame },
];

export function VideosPage() {
  const pathname = usePathname();
  const [filters, setFilters] = useState<FeedFilters>({
    tab: "for-you",
    brand: null,
    store: null,
    category: null,
  });
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const brands = useMemo(
    () => [...new Set(SELLER_VIDEOS.map((v) => v.brand))],
    []
  );

  const set = (patch: Partial<FeedFilters>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const clearChips = () =>
    setFilters({ tab: filters.tab, brand: null, store: null, category: null });

  const hasChip =
    filters.brand !== null ||
    filters.store !== null ||
    filters.category !== null;

  return (
    <div className="relative h-dvh overflow-hidden bg-[#08111E]">
      <div className="flex h-full w-full">
        {/* ===== LEFT SIDEBAR — desktop ===== */}
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0B1729]/60 backdrop-blur-xl lg:flex">
          {/* Top: back + logo */}
          <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.06] px-4 py-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-[9px] font-bold text-white">
                T
              </span>
              <span className="text-[13px] font-semibold tracking-tight text-white">
                Videos
              </span>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
              Feed
            </p>
            {TABS.map((tab) => {
              const active = filters.tab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => set({ tab: tab.id })}
                  className={cn(
                    "cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                    active
                      ? "bg-gradient-to-r from-[#2563EB]/20 to-[#38BDF8]/10 text-white"
                      : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        active ? "text-[#38BDF8]" : "text-[#64748B]"
                      )}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Brand chips */}
          <div className="shrink-0 border-t border-white/[0.06] px-3 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Brands
              </p>
              {hasChip && (
                <button
                  type="button"
                  onClick={clearChips}
                  className="cursor-pointer text-[10px] font-medium text-[#38BDF8] hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={clearChips}
                className={cn(
                  "cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all",
                  !hasChip
                    ? "border-[#2563EB]/50 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white"
                    : "border-white/[0.06] text-[#94A3B8] hover:bg-white/5 hover:text-white"
                )}
              >
                All
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() =>
                    set({ brand: filters.brand === brand ? null : brand })
                  }
                  className={cn(
                    "cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all",
                    filters.brand === brand
                      ? "border-[#2563EB]/50 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white"
                      : "border-white/[0.06] text-[#94A3B8] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ===== MOBILE OVERLAY SIDEBAR ===== */}
        {mobileSidebar && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="flex-1 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileSidebar(false)}
            />
            <div className="w-64 bg-[#0B1729] border-l border-white/[0.06] p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-semibold text-white">
                  Filters
                </span>
                <button
                  type="button"
                  onClick={() => setMobileSidebar(false)}
                  className="cursor-pointer text-[#94A3B8] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              {/* Mobile sidebar same content as desktop */}
              <nav className="space-y-1">
                {TABS.map((tab) => {
                  const active = filters.tab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        set({ tab: tab.id });
                        setMobileSidebar(false);
                      }}
                      className={cn(
                        "cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                        active
                          ? "bg-gradient-to-r from-[#2563EB]/20 to-[#38BDF8]/10 text-white"
                          : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            active ? "text-[#38BDF8]" : "text-[#64748B]"
                          )}
                        />
                      )}
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                  Brands
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      clearChips();
                      setMobileSidebar(false);
                    }}
                    className={cn(
                      "cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all",
                      !hasChip
                        ? "border-[#2563EB]/50 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white"
                        : "border-white/[0.06] text-[#94A3B8] hover:bg-white/5 hover:text-white"
                    )}
                  >
                    All
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => {
                        set({ brand: filters.brand === brand ? null : brand });
                        setMobileSidebar(false);
                      }}
                      className={cn(
                        "cursor-pointer rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all",
                        filters.brand === brand
                          ? "border-[#2563EB]/50 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white"
                          : "border-white/[0.06] text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile top bar — minimal */}
        <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] lg:hidden">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-lg"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileSidebar(true)}
            className="cursor-pointer flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-lg"
          >
            <Clapperboard className="h-3 w-3 text-[#38BDF8]" />
            <span className="text-[11px] font-semibold text-white">Videos</span>
          </button>
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-lg"
            aria-label="Titan Soles home"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-[9px] font-bold text-white">
              T
            </span>
          </Link>
        </div>

        {/* ===== MAIN FEED ===== */}
        <main className="relative flex min-w-0 flex-1 flex-col">
          <VideoFeed filters={filters} />
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
