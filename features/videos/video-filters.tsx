"use client";

import { Sparkles, Flame, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeedTab = "for-you" | "following" | "new" | "trending";

export type VideoFiltersState = {
  tab: FeedTab;
  brand: string | null;
  store: string | null;
  category: string | null;
};

interface VideoFiltersProps {
  value: VideoFiltersState;
  onChange: (next: VideoFiltersState) => void;
  brands: string[];
  stores?: string[];
  categories?: string[];
  resultCount?: number;
}

const TABS: { id: FeedTab; label: string; icon?: typeof Sparkles }[] = [
  { id: "for-you", label: "For You", icon: Sparkles },
  { id: "following", label: "Following" },
  { id: "new", label: "New Drops", icon: Tag },
  { id: "trending", label: "Trending", icon: Flame },
];

export function VideoFilters({
  value,
  onChange,
  brands,
}: VideoFiltersProps) {
  const set = (patch: Partial<VideoFiltersState>) =>
    onChange({ ...value, ...patch });

  const clearChips = () =>
    onChange({ ...value, brand: null, store: null, category: null });

  const hasChip =
    value.brand !== null || value.store !== null || value.category !== null;

  return (
    <div className="w-full border-b border-white/[0.06] bg-[#0B1729]/80 backdrop-blur-xl">
      <div className="mx-auto w-full px-3 py-1.5">
        {/* Tab row — tighter */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const active = value.tab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => set({ tab: tab.id })}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-tight transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-sm shadow-blue-500/25"
                    : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                )}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Chip row — tighter */}
        <div className="mt-1.5 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={clearChips}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-all duration-200",
              !hasChip
                ? "border-white/[0.08] bg-white/10 text-white"
                : "border-white/[0.06] text-[#94A3B8] hover:bg-white/5 hover:text-white"
            )}
          >
            All
          </button>

          {brands.slice(0, 6).map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() =>
                set({ brand: value.brand === brand ? null : brand })
              }
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-all duration-200",
                value.brand === brand
                  ? "border-[#2563EB]/50 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white"
                  : "border-white/[0.06] text-[#94A3B8] hover:bg-white/5 hover:text-white"
              )}
            >
              {brand}
            </button>
          ))}

          {brands.length > 6 && (
            <span className="shrink-0 text-[11px] text-[#64748B]">+{brands.length - 6}</span>
          )}
        </div>
      </div>
    </div>
  );
}
