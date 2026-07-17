"use client";

import {
  ProductCard,
  type AspectRatio,
  type CardSize,
} from "./product-card";
import { LifestyleTile } from "./editorial-banner";
import type { Product } from "./products-data";
import { cn } from "@/lib/utils";

const GAP = "gap-6"; // 24px

interface BentoProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  lifestyleImage?: string;
  lifestyleLabel?: string;
  className?: string;
}

function Cell({
  product,
  onQuickView,
  size = "small",
  aspect,
  priority,
  className,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
  size?: CardSize;
  aspect?: AspectRatio;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <ProductCard
        product={product}
        onQuickView={onQuickView}
        size={size}
        aspect={aspect}
        priority={priority}
        className="h-full"
      />
    </div>
  );
}

/** Pattern A — Large + 2 Small · 4 Small · (promo added by page) */
export function PatternA({ products, onQuickView, className }: BentoProps) {
  const [large, s1, s2, ...rest] = products;
  if (!large) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", GAP)}>
        <Cell
          product={large}
          onQuickView={onQuickView}
          size="large"
          aspect="6/5"
          priority
          className="lg:col-span-2"
        />
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1",
            GAP
          )}
        >
          {s1 && (
            <Cell
              product={s1}
              onQuickView={onQuickView}
              size="small"
              aspect="1/1"
            />
          )}
          {s2 && (
            <Cell
              product={s2}
              onQuickView={onQuickView}
              size="small"
              aspect="4/5"
            />
          )}
        </div>
      </div>
      {rest.length > 0 && (
        <div
          className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", GAP)}
        >
          {rest.slice(0, 4).map((p, i) => (
            <Cell
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              size="small"
              aspect={(["1/1", "4/5", "3/4", "1/1"] as AspectRatio[])[i]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Pattern B — 2 Small + Large · 4 Small */
export function PatternB({ products, onQuickView, className }: BentoProps) {
  const [s1, s2, large, ...rest] = products;
  if (!s1) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", GAP)}>
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1",
            GAP
          )}
        >
          {s1 && (
            <Cell
              product={s1}
              onQuickView={onQuickView}
              size="small"
              aspect="1/1"
            />
          )}
          {s2 && (
            <Cell
              product={s2}
              onQuickView={onQuickView}
              size="small"
              aspect="3/4"
            />
          )}
        </div>
        {large && (
          <Cell
            product={large}
            onQuickView={onQuickView}
            size="large"
            aspect="6/5"
            className="lg:col-span-2"
          />
        )}
      </div>
      {rest.length > 0 && (
        <div
          className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", GAP)}
        >
          {rest.slice(0, 4).map((p, i) => (
            <Cell
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              size="small"
              aspect={(["1/1", "3/4", "4/5", "16/10"] as AspectRatio[])[i]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Pattern C — 4 Small · 2 Medium (2×1) — editorial added by page */
export function PatternC({ products, onQuickView, className }: BentoProps) {
  const small = products.slice(0, 4);
  const medium = products.slice(4, 6);
  if (!small.length) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <div
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", GAP)}
      >
        {small.map((p, i) => (
          <Cell
            key={p.id}
            product={p}
            onQuickView={onQuickView}
            size="small"
            aspect={(["1/1", "4/5", "3/4", "1/1"] as AspectRatio[])[i]}
          />
        ))}
      </div>
      {medium.length > 0 && (
        <div className={cn("grid grid-cols-1 md:grid-cols-2", GAP)}>
          {medium.map((p, i) => (
            <Cell
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              size="medium"
              aspect={i === 0 ? "16/10" : "6/5"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Pattern D — Large · 4 Small · Lifestyle · 4 Small */
export function PatternD({
  products,
  onQuickView,
  lifestyleImage,
  lifestyleLabel,
  className,
}: BentoProps) {
  const [featured, ...rest] = products;
  const row1 = rest.slice(0, 4);
  const row2 = rest.slice(4, 8);
  if (!featured) return null;

  return (
    <div className={cn("space-y-6", className)}>
      <div className={cn("grid grid-cols-1 lg:grid-cols-4", GAP)}>
        <Cell
          product={featured}
          onQuickView={onQuickView}
          size="large"
          aspect="6/5"
          className="lg:col-span-2"
        />
      </div>

      {row1.length > 0 && (
        <div
          className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", GAP)}
        >
          {row1.map((p, i) => (
            <Cell
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              size="small"
              aspect={(["1/1", "4/5", "3/4", "1/1"] as AspectRatio[])[i]}
            />
          ))}
        </div>
      )}

      {lifestyleImage && (
        <LifestyleTile
          image={lifestyleImage}
          label={lifestyleLabel ?? "In the wild"}
          className="aspect-[16/10] min-h-[200px] w-full sm:min-h-[240px] lg:min-h-[280px]"
        />
      )}

      {row2.length > 0 && (
        <div
          className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", GAP)}
        >
          {row2.map((p, i) => (
            <Cell
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              size="small"
              aspect={(["3/4", "1/1", "4/5", "1/1"] as AspectRatio[])[i]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Full-width lifestyle break (every 25–35 products) */
export function LifestyleBreak({
  image,
  label,
  className,
}: {
  image: string;
  label: string;
  className?: string;
}) {
  return (
    <LifestyleTile
      image={image}
      label={label}
      className={cn(
        "aspect-[16/10] min-h-[200px] w-full sm:min-h-[240px] lg:min-h-[280px]",
        className
      )}
    />
  );
}

export function ProductSkeleton({ aspect = "1/1" }: { aspect?: AspectRatio }) {
  const aspectClass =
    aspect === "4/5"
      ? "aspect-[4/5]"
      : aspect === "3/4"
        ? "aspect-[3/4]"
        : aspect === "16/10"
          ? "aspect-[16/10]"
          : aspect === "6/5"
            ? "aspect-[6/5]"
            : "aspect-square";

  return (
    <div className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div
        className={cn("max-h-[280px] animate-pulse bg-[#EBEBEB]", aspectClass)}
      />
      <div className="space-y-2 p-3.5">
        <div className="h-2.5 w-14 animate-pulse rounded bg-[#EBEBEB]" />
        <div className="h-3.5 w-3/4 animate-pulse rounded bg-[#EBEBEB]" />
        <div className="mt-2 h-4 w-16 animate-pulse rounded bg-[#EBEBEB]" />
      </div>
    </div>
  );
}
