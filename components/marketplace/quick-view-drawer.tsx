"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";
import { getProductMedia, type Product } from "./products-data";
import { cn } from "@/lib/utils";

interface QuickViewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function QuickViewDrawer({
  isOpen,
  onClose,
  product,
}: QuickViewDrawerProps) {
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    setMediaIndex(0);
  }, [product?.id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!product) return null;

  const media = getProductMedia(product);
  const current = media[mediaIndex] ?? media[0];
  const hasMultiple = media.length > 1;

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const go = (dir: -1 | 1) => {
    if (!hasMultiple) return;
    setMediaIndex((i) => (i + dir + media.length) % media.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[98] cursor-pointer bg-[#111111]/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[99] flex h-full w-full max-w-md flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.12)]"
            role="dialog"
            aria-modal="true"
            aria-label="Quick view"
          >
            <div className="flex items-start justify-between px-8 py-6">
              <div>
                <p className="text-[12px] font-medium tracking-[0.04em] text-[#6B7280]">
                  {product.brand}
                </p>
                <h2 className="mt-1 text-[20px] font-medium tracking-tight text-[#111111]">
                  {product.name}
                </h2>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                  <Store className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span>{product.store}</span>
                  {product.verified && (
                    <span className="inline-flex items-center gap-1 text-[#111111]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
                      Verified store
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition-all duration-[250ms] hover:bg-black/[0.04] hover:text-[#111111]"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="relative aspect-square bg-[#F3F3F3]">
                {current?.type === "video" ? (
                  <video
                    key={current.src}
                    src={current.src}
                    poster={current.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : current ? (
                  <img
                    key={current.src}
                    src={current.src}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}

                <div className="absolute left-4 top-4 flex gap-1.5">
                  <span className="rounded-md bg-white/95 px-2 py-1 text-[12px] font-medium text-[#111111]">
                    {product.condition}
                  </span>
                  {product.aiRecommended && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#111111]/90 px-2 py-1 text-[12px] font-medium text-white">
                      <Sparkles className="h-3 w-3" />
                      AI
                    </span>
                  )}
                </div>

                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous"
                      onClick={() => go(-1)}
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next"
                      onClick={() => go(1)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-sm"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-sm">
                      <span className="text-[11px] font-medium text-white">
                        {mediaIndex + 1} / {media.length}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {hasMultiple && (
                <div className="flex gap-2 overflow-x-auto px-6 py-3 scrollbar-hide">
                  {media.map((item, i) => (
                    <button
                      key={`${item.type}-${i}`}
                      type="button"
                      onClick={() => setMediaIndex(i)}
                      className={cn(
                        "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 transition-all duration-200",
                        i === mediaIndex
                          ? "ring-[#111111]"
                          : "ring-transparent opacity-70 hover:opacity-100"
                      )}
                      aria-label={
                        item.type === "video"
                          ? `Video ${i + 1}`
                          : `Image ${i + 1}`
                      }
                    >
                      {item.type === "video" ? (
                        <>
                          <img
                            src={item.poster}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <Play className="h-3.5 w-3.5 fill-white text-white" />
                          </span>
                        </>
                      ) : (
                        <img
                          src={item.src}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-8 py-8">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[32px] font-medium tracking-tight text-[#111111]">
                    ${product.price}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-[16px] text-[#6B7280] line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="rounded-md bg-black/[0.04] px-2 py-0.5 text-[12px] font-medium">
                        −{discount}%
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-3 text-[14px]">
                  <span className="font-medium text-[#111111]">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[#6B7280]">
                    {product.reviews.toLocaleString()} reviews
                  </span>
                  {product.verified && (
                    <span className="inline-flex items-center gap-1 text-[#6B7280]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="mt-8">
                  <p className="text-[14px] font-medium text-[#111111]">
                    Color
                  </p>
                  <div className="mt-3 flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="h-9 w-9 rounded-full border border-black/[0.05] transition-transform duration-[250ms] hover:scale-105"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[14px] font-medium text-[#111111]">Size</p>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="h-12 rounded-2xl border border-black/[0.05] bg-[#FAFAFA] text-[14px] font-medium text-[#111111] transition-all duration-[250ms] hover:border-black/15 hover:bg-white"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-black/[0.05] px-8 py-5">
              <button
                type="button"
                className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#111111] text-[14px] font-medium text-white transition-all duration-[250ms] hover:bg-black active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                Add to bag
              </button>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.05] text-[#111111] transition-all duration-[250ms] hover:bg-[#FAFAFA]"
                aria-label="Save"
              >
                <Heart className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
