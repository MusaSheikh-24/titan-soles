"use client";

import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
} from "react";
import { Heart, Sparkles, Play } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "./products-data";

/** Bento cell size: Small 1×1 · Medium 2×1 · Large 2×2 */
export type CardSize = "small" | "medium" | "large";
export type AspectRatio = "1/1" | "4/5" | "3/4" | "16/10" | "6/5";

/** @deprecated use CardSize */
export type CardLayout = "standard" | "feature" | "medium" | "landscape";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  size?: CardSize;
  /** @deprecated prefer size */
  layout?: CardLayout;
  aspect?: AspectRatio;
  className?: string;
  priority?: boolean;
}

const ASPECT_CLASS: Record<AspectRatio, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  "6/5": "aspect-[6/5]",
};

function layoutToSize(layout?: CardLayout): CardSize {
  if (layout === "feature") return "large";
  if (layout === "medium" || layout === "landscape") return "medium";
  return "small";
}

export function ProductCard({
  product,
  onQuickView,
  size: sizeProp,
  layout,
  aspect,
  className,
  priority = false,
}: ProductCardProps) {
  const size = sizeProp ?? layoutToSize(layout);
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(priority);
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const images = product.images.length ? product.images : [product.image];
  const primary = images[0];
  const activeImage = imgFailed ? primary : (images[imageIndex] ?? primary);
  const hasVideo = Boolean(product.video);
  const hasMultiple = images.length > 1;

  const isLarge = size === "large";
  const isMedium = size === "medium";

  // Large ~30% shorter than prior 4/5 featured tiles → 6/5 (wider)
  const resolvedAspect: AspectRatio =
    aspect ??
    (isLarge ? "6/5" : isMedium ? "16/10" : "1/1");

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const visibleColors = product.colors.slice(0, 4);
  const extraColors = Math.max(0, product.colors.length - 4);

  useEffect(() => {
    setImageIndex(0);
    setImgFailed(false);
    setImgLoaded(false);
    setHovered(false);
  }, [product.id]);

  useEffect(() => {
    if (priority) {
      setVisible(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;
    if (hovered) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [hovered, hasVideo, product.video]);

  const onMediaMove = (e: MouseEvent<HTMLDivElement>) => {
    if (images.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      0.999
    );
    const next = Math.floor(ratio * images.length);
    if (next !== imageIndex) {
      setImgFailed(false);
      setImageIndex(next);
    }
  };

  return (
    <motion.article
      ref={cardRef}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 10,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setImageIndex(0);
        setImgFailed(false);
      }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white",
        "border border-black/[0.05]",
        "shadow-[0_1px_2px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)]",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.09),0_4px_12px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#F3F3F3]",
          ASPECT_CLASS[resolvedAspect],
          // Large featured ~25–30% shorter — more products above the fold
          isLarge && "max-h-[220px] sm:max-h-[250px] lg:max-h-[280px] w-full",
          isMedium && "max-h-[180px] sm:max-h-[210px] lg:max-h-[230px] w-full"
        )}
        onMouseMove={onMediaMove}
      >
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[#EBEBEB]" />
        )}

        <img
          src={activeImage}
          alt={`${product.brand} ${product.name}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            if (activeImage !== primary) {
              setImgFailed(true);
              setImageIndex(0);
            }
          }}
          className={cn(
            "h-full w-full object-cover transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            hovered ? "scale-[1.05]" : "scale-100",
            !imgLoaded || (hovered && hasVideo) ? "opacity-0" : "opacity-100"
          )}
        />

        {hasVideo && product.video && (
          <video
            ref={videoRef}
            src={product.video}
            poster={primary}
            muted
            loop
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
        )}

        {hasMultiple && (
          <div className="pointer-events-none absolute inset-x-3 top-2 z-[5] flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors duration-200",
                  i === imageIndex ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        )}

        <div className="absolute left-3 top-3 z-10 flex max-w-[70%] flex-wrap gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-[#111111] px-2.5 py-1 text-[11px] font-semibold text-white">
              −{discount}%
            </span>
          )}
          {product.aiRecommended && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold text-white">
              <Sparkles className="h-3 w-3" />
              AI
            </span>
          )}
          {hasVideo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-medium text-[#111111] shadow-sm">
              <Play className="h-3 w-3 fill-current" />
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            setSaved((v) => !v);
          }}
          className={cn(
            "absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full",
            "bg-white/95 text-[#111111] shadow-sm backdrop-blur-md",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "opacity-100 scale-100",
            "md:opacity-0 md:scale-90 md:rotate-[-8deg]",
            "md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:rotate-0",
            "hover:bg-white active:scale-95",
            saved && "text-rose-500"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform duration-300 ease-out",
              saved && "scale-125"
            )}
            strokeWidth={1.75}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <div
          className={cn(
            "absolute inset-x-3 bottom-3 z-10",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "translate-y-0 opacity-100",
            "md:translate-y-3 md:opacity-0",
            "md:group-hover:translate-y-0 md:group-hover:opacity-100"
          )}
        >
          <div className="flex gap-2">
            <Link
              href={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-10 flex-1 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/95 text-[13px] font-semibold text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md transition-transform duration-200 hover:bg-white active:scale-[0.98]"
            >
              Detail
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="relative flex h-10 flex-1 items-center justify-center overflow-hidden rounded-full bg-[#111111] text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:bg-black active:scale-[0.98] before:absolute before:inset-0 before:bg-white/0 before:transition-colors hover:before:bg-white/[0.06]"
            >
              Quick Add
            </button>
          </div>
        </div>
      </div>

      <div className={cn("flex flex-col p-4", isLarge && "sm:p-5")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
          {product.brand}
        </p>
        <Link
          href={`/product/${product.id}`}
          className={cn(
            "mt-1.5 line-clamp-2 font-semibold tracking-tight text-[#111111] transition-opacity hover:opacity-70",
            isLarge ? "text-[17px] sm:text-[18px]" : "text-[15px] sm:text-[16px]"
          )}
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center gap-1.5">
          <svg
            className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[13px] font-semibold tabular-nums text-[#111111]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[12px] text-[#6B7280]">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5">
          {visibleColors.map((color, i) => (
            <span
              key={`${color}-${i}`}
              className="h-3 w-3 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: color }}
              aria-hidden
            />
          ))}
          {extraColors > 0 && (
            <span className="text-[11px] font-medium text-[#6B7280]">
              +{extraColors}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[18px] font-semibold tabular-nums tracking-tight text-[#111111]">
            ${product.price}
          </span>
          {discount > 0 && (
            <span className="text-[13px] tabular-nums text-[#6B7280] line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export type { Product };
