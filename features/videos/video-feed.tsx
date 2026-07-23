"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Clapperboard, Heart, MessageCircle, Share2, ShoppingBag, BadgeCheck, Volume2, VolumeX } from "lucide-react";
import { VideoSlide } from "@/features/videos/video-slide";
import { SELLER_VIDEOS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SellerVideo } from "@/types";

export type FeedFilters = {
  tab: "for-you" | "following" | "new" | "trending";
  brand: string | null;
  store: string | null;
  category: string | null;
};

function filterVideos(videos: SellerVideo[], filters: FeedFilters): SellerVideo[] {
  let list = [...videos];
  switch (filters.tab) {
    case "new": list = list.filter((v) => v.newDrop); break;
    case "trending": list = list.filter((v) => v.trending); break;
    case "following": list = list.filter((v) => v.seller.verified); break;
    default: break;
  }
  if (filters.brand) list = list.filter((v) => v.brand === filters.brand);
  if (filters.store) list = list.filter((v) => v.store === filters.store);
  if (filters.category) list = list.filter((v) => v.category === filters.category);
  return list;
}

function VideoInfoPanel({ video }: { video: SellerVideo }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        {/* Seller */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white shadow-lg shadow-blue-500/30">
            {video.seller.logo}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[15px] font-semibold text-white">{video.seller.name}</p>
              {video.seller.verified && <BadgeCheck className="h-4 w-4 shrink-0 fill-[#2563EB] text-white" />}
            </div>
            <p className="text-[12px] text-[#94A3B8]">{video.seller.followers} followers</p>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-blue-500/25 transition-transform active:scale-95"
          >
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-[14px] leading-relaxed text-white/80">{video.caption}</p>

        {/* Product card */}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0F1E37]/80 p-3 backdrop-blur-xl">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
            <Image src={video.product.image} alt={video.product.name} fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-white">{video.product.name}</p>
            <p className="text-[13px] font-medium text-[#38BDF8]">${video.product.price}</p>
          </div>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-3 py-2 text-[12px] font-semibold text-white shadow-sm shadow-blue-500/25 transition-transform active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Shop
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className={cn("cursor-pointer flex items-center gap-2 transition-colors", liked ? "text-rose-400" : "text-[#94A3B8] hover:text-white")}
        >
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", liked ? "bg-rose-500/15" : "bg-white/5")}>
            <Heart className={cn("h-4 w-4", liked && "fill-rose-400")} />
          </div>
          <span className="text-[13px] font-semibold">{video.likes}</span>
        </button>
        <button type="button" className="cursor-pointer flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
            <MessageCircle className="h-4 w-4" />
          </div>
          <span className="text-[13px] font-semibold">{video.comments}</span>
        </button>
        <button type="button" className="cursor-pointer flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
            <Share2 className="h-4 w-4" />
          </div>
          <span className="text-[13px] font-semibold">{video.shares}</span>
        </button>
      </div>
    </div>
  );
}

interface VideoFeedProps {
  filters: FeedFilters;
}

export function VideoFeed({ filters }: VideoFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  const videos = useMemo(() => filterVideos(SELLER_VIDEOS, filters), [filters]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setActiveIndex(0);
    setShowHint(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    const el = containerRef.current;
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      { root: container, threshold: 0.4 }
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeIndex > 0) setShowHint(false);
  }, [activeIndex]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <div className="relative h-full w-full">
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
            <Clapperboard className="h-12 w-12 text-[#2563EB]/60" />
            <p className="text-[15px] font-semibold text-white">No footwear videos match</p>
            <p className="text-[13px] text-[#94A3B8]">Try another brand, store, or style filter.</p>
          </div>
        ) : (
          videos.map((video, index) => (
            <div key={video.id} data-slide data-index={index} className="h-full w-full shrink-0 snap-start snap-always relative">
              {/* ===== MOBILE: full-screen portrait feed ===== */}
              <div className="flex h-full w-full flex-col lg:hidden">
                {/* Video — vast majority of screen */}
                <div className="relative flex-[7.5] min-h-0 px-1 pt-1 pb-0.5">
                  <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0B1729]">
                    <VideoSlide video={video} isActive={activeIndex === index} muted={muted} />
                  </div>
                </div>
                {/* Info — below */}
                <div className="flex-[2.5] overflow-y-auto overscroll-y-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="h-full px-3 pb-2 pt-0.5">
                    <VideoInfoPanel video={video} />
                  </div>
                </div>
                {/* Mute — floating on dark bg */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="cursor-pointer absolute bottom-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-[#0B1729]/80 backdrop-blur-xl transition-colors hover:bg-[#0B1729]"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="h-3.5 w-3.5 text-white" /> : <Volume2 className="h-3.5 w-3.5 text-white" />}
                </button>
              </div>

              {/* ===== DESKTOP: phone frame center + info right ===== */}
              <div className="hidden h-full w-full lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-10">
                {/* Phone frame centered */}
                <div className="flex h-full flex-col items-center justify-center py-5">
                  <div className="relative h-full w-[340px] overflow-hidden rounded-[2.75rem] border-4 border-[#1E293B] bg-[#0B1729] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_80px_-15px_rgba(0,0,0,0.7)]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#1E293B]" />
                    <VideoSlide video={video} isActive={activeIndex === index} muted={muted} />
                  </div>
                  {/* Mute — below phone on dark bg */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="cursor-pointer mt-3 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0B1729]/80 px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur-xl transition-colors hover:bg-[#0B1729] hover:text-white"
                  >
                    {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    <span>{muted ? "Unmute" : "Muted"}</span>
                  </button>
                </div>

                {/* Info panel — right side */}
                <div className="h-[calc(100%-5rem)] w-[380px] shrink-0 overflow-y-auto overscroll-y-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <VideoInfoPanel video={video} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showHint && videos.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex flex-col items-center gap-1 lg:hidden">
          <p className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
            Swipe up for next seller
          </p>
          <ChevronDown className="h-5 w-5 animate-bounce text-white/70" />
        </div>
      )}
    </div>
  );
}
