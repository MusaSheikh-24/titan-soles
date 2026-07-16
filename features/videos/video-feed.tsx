"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { VideoSlide } from "@/features/videos/video-slide";
import {
  VideoFilters,
  type VideoFiltersState,
} from "@/features/videos/video-filters";
import { SELLER_VIDEOS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SellerVideo } from "@/types";

function filterVideos(
  videos: SellerVideo[],
  filters: VideoFiltersState
): SellerVideo[] {
  let list = [...videos];

  switch (filters.tab) {
    case "new":
      list = list.filter((v) => v.newDrop);
      break;
    case "trending":
      list = list.filter((v) => v.trending);
      break;
    case "following":
      list = list.filter((v) => v.seller.verified);
      break;
    default:
      break;
  }

  if (filters.brand) {
    list = list.filter((v) => v.brand === filters.brand);
  }
  if (filters.store) {
    list = list.filter((v) => v.store === filters.store);
  }
  if (filters.category) {
    list = list.filter((v) => v.category === filters.category);
  }

  return list;
}

export function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [filters, setFilters] = useState<VideoFiltersState>({
    tab: "for-you",
    brand: null,
    store: null,
    category: null,
  });

  const brands = useMemo(
    () => [...new Set(SELLER_VIDEOS.map((v) => v.brand))],
    []
  );
  const stores = useMemo(
    () => [...new Set(SELLER_VIDEOS.map((v) => v.store))],
    []
  );
  const categories = useMemo(
    () => [...new Set(SELLER_VIDEOS.map((v) => v.category))],
    []
  );

  const videos = useMemo(
    () => filterVideos(SELLER_VIDEOS, filters),
    [filters]
  );

  useEffect(() => {
    setActiveIndex(0);
    setShowHint(true);
    const el = containerRef.current;
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(
      container.querySelectorAll<HTMLElement>("[data-video-slide]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      {
        root: container,
        threshold: 0.65,
      }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    if (activeIndex > 0) setShowHint(false);
  }, [activeIndex]);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  return (
    <div className="relative h-full w-full bg-black">
      <VideoFilters
        value={filters}
        onChange={setFilters}
        brands={brands}
        stores={stores}
        categories={categories}
        resultCount={videos.length}
      />

      <div
        ref={containerRef}
        className={cn(
          "h-full w-full overflow-y-auto overscroll-y-contain",
          "snap-y snap-mandatory scroll-smooth",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
        aria-label="Footwear seller video feed"
      >
        {videos.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="text-[15px] font-semibold text-white">
              No footwear videos match
            </p>
            <p className="text-[13px] text-white/55">
              Try another brand, store, or style filter.
            </p>
            <button
              type="button"
              onClick={() =>
                setFilters({
                  tab: "for-you",
                  brand: null,
                  store: null,
                  category: null,
                })
              }
              className="mt-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#0F172A]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          videos.map((video, index) => (
            <div
              key={video.id}
              data-video-slide
              data-index={index}
              className="h-full w-full shrink-0"
            >
              <VideoSlide
                video={video}
                isActive={activeIndex === index}
                muted={muted}
                onToggleMute={toggleMute}
              />
            </div>
          ))
        )}
      </div>

      {showHint && videos.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-28 z-30 flex flex-col items-center gap-1 sm:bottom-32">
          <p className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
            Swipe up for next seller
          </p>
          <ChevronDown className="h-5 w-5 animate-bounce text-white/70" />
        </div>
      )}

      {videos.length > 1 && (
        <div className="pointer-events-none absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
          {videos.map((video, i) => (
            <span
              key={video.id}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                i === activeIndex ? "h-4 bg-white" : "bg-white/35"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
