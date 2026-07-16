"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Heart,
  Eye,
  Star,
  Sparkles,
  ShoppingBag,
  GitCompare,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative flex h-full flex-col"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.aiMatch && (
                <Badge variant="ai" className="gap-1 shadow-md">
                  <Sparkles className="h-3 w-3" />
                  {product.aiMatch}% Match
                </Badge>
              )}
              {product.discount && (
                <Badge variant="discount">{product.discount}</Badge>
              )}
            </div>

            {product.verifiedStore && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="outline"
                  className="gap-1 border-success/30 bg-dark/70 text-success backdrop-blur-sm"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              </div>
            )}

            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 6 }}
              className="absolute top-12 right-3 flex flex-col gap-1.5"
            >
              {[
                {
                  icon: Heart,
                  label: "Wishlist",
                  active: wishlisted,
                  onClick: () => setWishlisted(!wishlisted),
                },
                { icon: Eye, label: "Quick View" },
                { icon: GitCompare, label: "Compare" },
              ].map(({ icon: Icon, label, active, onClick }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onClick}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl bg-dark/75 text-slate-200 shadow-md backdrop-blur-sm transition-all hover:text-white",
                        active && "text-danger"
                      )}
                      aria-label={label}
                    >
                      <Icon
                        className={cn("h-3.5 w-3.5", active && "fill-current")}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              ))}
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute inset-x-3 bottom-3 flex gap-2"
            >
              <Button className="flex-1 gap-1.5 rounded-2xl shadow-lg" size="sm">
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-2xl border-white/10 bg-dark/70 px-3 text-white backdrop-blur-sm"
                aria-label="Try with AI"
              >
                <Wand2 className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                  {product.brand}
                </p>
                <h3 className="mt-1 truncate text-[15px] font-semibold text-foreground">
                  {product.name}
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-base font-bold text-foreground">
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice && (
                  <p className="text-xs text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                {product.rating}
              </span>
              <span className="text-xs text-muted">
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>

            {product.seller && (
              <p className="mt-auto pt-3 text-xs text-muted">
                Seller:{" "}
                <span className="text-foreground/80">{product.seller}</span>
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </TooltipProvider>
  );
}
