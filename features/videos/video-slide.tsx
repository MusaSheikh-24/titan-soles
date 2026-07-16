"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Pause,
  Play,
  BadgeCheck,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SellerVideo } from "@/types";

interface VideoSlideProps {
  video: SellerVideo;
  isActive: boolean;
  muted: boolean;
  onToggleMute: () => void;
}

export function VideoSlide({
  video,
  isActive,
  muted,
  onToggleMute,
}: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive && !paused) {
      el.play().catch(() => {
        /* autoplay may be blocked until interaction */
      });
    } else {
      el.pause();
    }
  }, [isActive, paused]);

  useEffect(() => {
    if (!isActive) {
      setPaused(false);
      setProgress(0);
      const el = videoRef.current;
      if (el) el.currentTime = 0;
    }
  }, [isActive]);

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      setPaused(false);
      el.play().catch(() => undefined);
    } else {
      setPaused(true);
      el.pause();
    }
  };

  return (
    <article className="relative h-full w-full snap-start snap-always overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        loop
        playsInline
        muted={muted}
        preload={isActive ? "auto" : "metadata"}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        aria-label={video.caption}
      />

      {/* Soft gradients for readable UI */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />

      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-white/15">
        <div
          className="h-full bg-white transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Center play/pause hint */}
      {paused && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <Play className="h-7 w-7 fill-white text-white" />
          </div>
        </div>
      )}

      {/* Right action rail */}
      <div className="absolute right-3 bottom-36 z-20 flex flex-col items-center gap-5 sm:right-4 sm:bottom-40">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="flex flex-col items-center gap-1"
          aria-label={liked ? "Unlike" : "Like"}
        >
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors",
              liked && "bg-rose-500/90"
            )}
          >
            <Heart
              className={cn(
                "h-6 w-6 text-white",
                liked && "fill-white"
              )}
            />
          </span>
          <span className="text-[11px] font-semibold text-white/90">
            {liked ? "Liked" : video.likes}
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1"
          aria-label="Comments"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
            <MessageCircle className="h-6 w-6 text-white" />
          </span>
          <span className="text-[11px] font-semibold text-white/90">
            {video.comments}
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1"
          aria-label="Share"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
            <Share2 className="h-5 w-5 text-white" />
          </span>
          <span className="text-[11px] font-semibold text-white/90">
            {video.shares}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? (
            <Play className="h-5 w-5 fill-white text-white" />
          ) : (
            <Pause className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Bottom seller + product info */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-24 pt-16 md:pb-10 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white shadow-lg shadow-blue-500/30">
            {video.seller.logo}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[15px] font-semibold text-white">
                {video.seller.name}
              </p>
              {video.seller.verified && (
                <BadgeCheck className="h-4 w-4 shrink-0 fill-[#2563EB] text-white" />
              )}
            </div>
            <p className="text-[12px] text-white/60">
              {video.seller.followers} followers
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0F172A] transition-transform active:scale-95"
          >
            Follow
          </button>
        </div>

        <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-white/90">
          {video.caption}
        </p>

        {/* Product card CTA */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 p-2.5 backdrop-blur-xl">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={video.product.image}
              alt={video.product.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-white">
              {video.product.name}
            </p>
            <p className="text-[13px] font-medium text-[#38BDF8]">
              ${video.product.price}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-3 py-2 text-[12px] font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Shop
          </button>
        </div>
      </div>
    </article>
  );
}
