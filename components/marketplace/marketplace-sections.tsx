"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import type { Product } from "./products-data";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  onAction,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1.5 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[32px] lg:text-[36px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#6B7280]">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[#111111] transition-opacity hover:opacity-70"
        >
          {action}
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}

/** Uniform 4-column product grid */
export function ProductGrid({
  products,
  onQuickView,
  className,
}: {
  products: Product[];
  onQuickView: (p: Product) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          onQuickView={onQuickView}
          size="small"
          aspect={i % 3 === 0 ? "1/1" : i % 3 === 1 ? "4/5" : "3/4"}
          priority={i < 4}
        />
      ))}
    </div>
  );
}

/** Horizontal scroll carousel */
export function ProductCarousel({
  products,
  onQuickView,
  className,
}: {
  products: Product[];
  onQuickView: (p: Product) => void;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.75, 360), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#111111] transition-colors hover:bg-black/[0.03]"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#111111] transition-colors hover:bg-black/[0.03]"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[72%] shrink-0 snap-start sm:w-[42%] md:w-[32%] lg:w-[23%]"
          >
            <ProductCard
              product={p}
              onQuickView={onQuickView}
              size="small"
              aspect="1/1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const BRAND_SPOTLIGHTS = [
  {
    name: "Nike",
    blurb: "Innovation from track to street",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
  },
  {
    name: "Adidas",
    blurb: "Three stripes, endless energy",
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&h=1000&fit=crop",
  },
  {
    name: "New Balance",
    blurb: "Made for the long haul",
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=1000&fit=crop",
  },
  {
    name: "Hoka",
    blurb: "Cushion that goes the distance",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=1000&fit=crop",
  },
];

export function BrandSpotlight({
  onSelect,
  className,
}: {
  onSelect?: (brand: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {BRAND_SPOTLIGHTS.map((b, i) => (
        <motion.button
          key={b.name}
          type="button"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect?.(b.name)}
          className="group relative aspect-[4/5] overflow-hidden rounded-[24px] text-left"
        >
          <img
            src={b.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[18px] font-semibold tracking-tight text-white">
              {b.name}
            </p>
            <p className="mt-1 text-[13px] text-white/75">{b.blurb}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
