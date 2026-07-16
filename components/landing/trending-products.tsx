"use client";

import { useState } from "react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionShell } from "@/components/ui/section-shell";
import { ProductCard } from "@/features/products/product-card";
import { TRENDING_PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Filter = "all" | "sneakers" | "running" | "formal" | "boots";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sneakers", label: "Sneakers" },
  { key: "running", label: "Running" },
  { key: "formal", label: "Formal" },
  { key: "boots", label: "Boots" },
];

export function TrendingProducts() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? TRENDING_PRODUCTS
      : TRENDING_PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <SectionShell theme="dark" id="trending">
      <div className="container-page">
        <FadeUp>
          <SectionHeader
            eyebrow="Marketplace"
            title="Featured Products"
            subtitle="Hand-picked by Titan AI from verified stores."
            href="/marketplace"
            linkLabel="View Marketplace"
          />
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === filter.key
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "border border-white/8 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {filter.label}
              </button>
            ))}
            <span className="ml-auto text-xs text-slate-500">
              Showing {filtered.length} of {TRENDING_PRODUCTS.length}
            </span>
          </div>
        </FadeUp>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
