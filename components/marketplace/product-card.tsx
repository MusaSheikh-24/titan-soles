"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
} from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "./products-data";

export type CardLayout = "standard" | "feature" | "landscape";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  layout?: CardLayout;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  product,
  onQuickView,
  layout = "standard",
  className,
  priority = false,
}: ProductCardProps) {
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(priority);
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const images = product.images.length ? product.images : [product.image];
  const primary = images[0];
  const activeImage = imgFailed
    ? primary
    : (images[imageIndex] ?? primary);
  const hasVideo = Boolean(product.video);
  const hasMultiple = images.length > 1;
  const mediaCount = images.length + (hasVideo ? 1 : 0);

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const extraColors = Math.max(0, product.colors.length - 4);
  const visibleColors = product.colors.slice(0, 4);
  const visibleSizes = product.sizes.slice(0, 5);
  const extraSizes = Math.max(0, product.sizes.length - 5);

  useEffect(() => {
    setImageIndex(0);
    setImgFailed(false);
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

  /** Play video only while hovering — keeps first paint = solid image */
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

  const go = useCallback(
    (dir: -1 | 1, e?: MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      if (images.length < 2) return;
      setImgFailed(false);
      setImageIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  const onMediaMove = (e: MouseEvent<HTMLDivElement>) => {
    if (images.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(Math.max(x / rect.width, 0), 0.999);
    const next = Math.floor(ratio * images.length);
    if (next !== imageIndex) {
      setImgFailed(false);
      setImageIndex(next);
    }
  };

  const isFeature = layout === "feature";
  const isLandscape = layout === "landscape";

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setImageIndex(0);
        setImgFailed(false);
      }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card",
        "border border-border card-shadow",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:card-shadow-hover",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#F3F3F3]",
          /* ~20% shorter image height vs 4/3 */
          isLandscape ? "aspect-[2.4/1]" : "aspect-[5/3]"
        )}
        onMouseMove={onMediaMove}
      >
        {/* Always-visible image (never opacity-0) */}
        <img
          src={activeImage}
          alt={`${product.brand} ${product.name}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            if (activeImage !== primary) {
              setImgFailed(true);
              setImageIndex(0);
            }
          }}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out",
            hovered && !hasVideo ? "scale-[1.03]" : "scale-100",
            hovered && hasVideo ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Video sits on top only while hovering */}
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

        <div className="absolute left-4 top-4 z-10 flex max-w-[75%] flex-wrap gap-1.5">
          <span className="rounded-md bg-white/95 px-2 py-0.5 text-[12px] font-medium text-[#111111] shadow-sm backdrop-blur-sm">
            {product.condition}
          </span>
          {discount > 0 && (
            <span className="rounded-md bg-white/95 px-2 py-0.5 text-[12px] font-medium text-[#111111] shadow-sm backdrop-blur-sm">
              −{discount}%
            </span>
          )}
          {product.aiRecommended && (
            <span className="inline-flex items-center gap-1 rounded-md bg-[#111111]/90 px-2 py-0.5 text-[12px] font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              AI Pick
            </span>
          )}
          {hasVideo && (
            <span className="inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[12px] font-medium text-[#111111] shadow-sm backdrop-blur-sm">
              <Play className="h-3 w-3 fill-current" />
              Video
            </span>
          )}
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => go(-1, e)}
              className={cn(
                "absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full",
                "bg-white/95 text-[#111111] shadow-sm backdrop-blur-md",
                "opacity-0 transition-all duration-200 group-hover:opacity-100",
                "hover:bg-white"
              )}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => go(1, e)}
              className={cn(
                "absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full",
                "bg-white/95 text-[#111111] shadow-sm backdrop-blur-md",
                "opacity-0 transition-all duration-200 group-hover:opacity-100",
                "hover:bg-white"
              )}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </>
        )}

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            setSaved((v) => !v);
          }}
          className={cn(
            "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full",
            "bg-white/95 text-[#111111] shadow-sm backdrop-blur-md",
            "transition-all duration-200 ease-out",
            "opacity-100 md:opacity-0 md:translate-y-1",
            "md:group-hover:translate-y-0 md:group-hover:opacity-100",
            "hover:bg-white active:scale-95"
          )}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <div
          className={cn(
            "absolute inset-x-4 bottom-4 z-10",
            "transition-all duration-200 ease-out",
            "translate-y-0 opacity-100",
            "md:translate-y-2 md:opacity-0",
            "md:group-hover:translate-y-0 md:group-hover:opacity-100"
          )}
        >
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex h-11 w-full items-center justify-center rounded-full bg-[#111111] text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-black active:scale-[0.98]"
          >
            Quick Add
          </button>
        </div>

        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 z-[5] flex -translate-x-1/2 gap-1 md:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  i === imageIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-5", isFeature && "lg:p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[12px] font-medium tracking-[0.04em] text-[#6B7280]">
              {product.brand}
            </p>
            <h3
              className={cn(
                "mt-1 truncate font-medium tracking-tight text-[#111111]",
                isFeature || isLandscape ? "text-[20px]" : "text-[16px]"
              )}
            >
              {product.name}
            </h3>
            <p className="mt-1.5 flex min-w-0 items-center gap-1 text-[12px] text-[#6B7280]">
              <Store className="h-3 w-3 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{product.store}</span>
            </p>
          </div>
          {product.verified && (
            <span
              className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-[#6B7280]"
              title="Verified Authentic"
            >
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="hidden sm:inline">Verified</span>
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <svg
            className="h-3.5 w-3.5 text-[#111111]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[14px] font-medium text-[#111111]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[14px] text-[#6B7280]">
            ({product.reviews.toLocaleString()})
          </span>
          {mediaCount > 1 && (
            <span className="ml-auto text-[12px] font-medium text-[#6B7280]">
              {mediaCount} media
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          {visibleColors.map((color, i) => (
            <span
              key={`${color}-${i}`}
              className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: color }}
              aria-hidden
            />
          ))}
          {extraColors > 0 && (
            <span className="text-[12px] font-medium text-[#6B7280]">
              +{extraColors}
            </span>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {visibleSizes.map((size) => (
            <span
              key={size}
              className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-[#FAFAFA] px-1.5 text-[12px] font-medium tabular-nums text-[#6B7280]"
            >
              {size}
            </span>
          ))}
          {extraSizes > 0 && (
            <span className="text-[12px] font-medium text-[#6B7280]">
              +{extraSizes}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[16px] font-medium tabular-nums text-[#111111]">
            ${product.price}
          </span>
          {discount > 0 && (
            <span className="text-[14px] tabular-nums text-[#6B7280] line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export type { Product };
