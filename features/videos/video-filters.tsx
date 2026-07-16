"use client";

import { Sparkles, Store, Flame, Tag } from "lucide-react";
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
  stores: string[];
  categories: string[];
  resultCount: number;
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
  stores,
  categories,
  resultCount,
}: VideoFiltersProps) {
  const set = (patch: Partial<VideoFiltersState>) =>
    onChange({ ...value, ...patch });

  const clearChips = () =>
    onChange({ ...value, brand: null, store: null, category: null });

  const hasChip =
    value.brand !== null || value.store !== null || value.category !== null;

  return (
    <div className="pointer-events-auto absolute inset-x-0 top-14 z-40 px-3 sm:top-[3.75rem]">
      <div className="mx-auto flex max-w-md flex-col gap-2 lg:max-w-lg">
        <div className="flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/45 p-1 backdrop-blur-xl scrollbar-hide">
          {TABS.map((tab) => {
            const active = value.tab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => set({ tab: tab.id })}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold tracking-tight transition-all duration-200",
                  active
                    ? "bg-white text-[#0F172A] shadow-lg shadow-black/20"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={clearChips}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-xl transition-all duration-200",
              !hasChip
                ? "border-white/25 bg-white text-[#0F172A]"
                : "border-white/10 bg-black/40 text-white/75 hover:bg-black/55 hover:text-white"
            )}
          >
            All
          </button>

          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() =>
                set({ brand: value.brand === brand ? null : brand })
              }
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-xl transition-all duration-200",
                value.brand === brand
                  ? "border-[#2563EB]/50 bg-[#2563EB] text-white shadow-lg shadow-blue-500/25"
                  : "border-white/10 bg-black/40 text-white/75 hover:bg-black/55 hover:text-white"
              )}
            >
              {brand}
            </button>
          ))}

          <span className="mx-0.5 h-4 w-px shrink-0 bg-white/15" aria-hidden />

          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                set({ category: value.category === cat ? null : cat })
              }
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-xl transition-all duration-200",
                value.category === cat
                  ? "border-white/30 bg-white/20 text-white"
                  : "border-white/10 bg-black/40 text-white/75 hover:bg-black/55 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}

          <span className="mx-0.5 h-4 w-px shrink-0 bg-white/15" aria-hidden />

          {stores.map((store) => (
            <button
              key={store}
              type="button"
              onClick={() =>
                set({ store: value.store === store ? null : store })
              }
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-xl transition-all duration-200",
                value.store === store
                  ? "border-[#38BDF8]/40 bg-[#38BDF8]/20 text-white"
                  : "border-white/10 bg-black/40 text-white/75 hover:bg-black/55 hover:text-white"
              )}
            >
              <Store className="h-3 w-3" />
              {store}
            </button>
          ))}
        </div>

        <p className="px-1 text-[10px] font-medium tracking-wide text-white/45">
          {resultCount} footwear {resultCount === 1 ? "video" : "videos"} ·
          verified stores only
        </p>
      </div>
    </div>
  );
}
