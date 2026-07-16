"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { SlidersHorizontal, ChevronDown, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TitanSearch } from "@/components/search/titan-search";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";
import { ProductCard } from "./product-card";
import { FilterDrawer } from "./filter-drawer";
import { QuickViewDrawer } from "./quick-view-drawer";
import { MarketplacePagination } from "./marketplace-pagination";
import {
  PRODUCTS,
  TOTAL_CATALOG_COUNT,
  PAGE_SIZE,
  type Product,
  type Condition,
} from "./products-data";
import { cn } from "@/lib/utils";

type QuickId =
  | "trending"
  | "nike"
  | "new-balance"
  | "vans"
  | "adidas"
  | "sale"
  | "ai-picks";

const QUICK_FILTERS: { id: QuickId; label: string }[] = [
  { id: "trending", label: "Trending" },
  { id: "nike", label: "Nike" },
  { id: "new-balance", label: "New Balance" },
  { id: "vans", label: "Vans" },
  { id: "adidas", label: "Adidas" },
  { id: "sale", label: "Sale" },
  { id: "ai-picks", label: "AI Picks" },
];

export function MarketplacePage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState<string | undefined>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilters, setQuickFilters] = useState<QuickId[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>(
    []
  );
  const [priceMax, setPriceMax] = useState(500);
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    const prevScheme = html.style.colorScheme;
    html.style.backgroundColor = "#FAFAFA";
    html.style.colorScheme = "light";
    body.style.backgroundColor = "#FAFAFA";
    return () => {
      html.style.backgroundColor = prevHtml;
      html.style.colorScheme = prevScheme;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  const handleOpenAI = useCallback((query?: string) => {
    if (query) setAiQuery(query);
    setAiOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setAiOpen(open);
    if (!open) setAiQuery(undefined);
  }, []);

  const toggleQuick = (id: QuickId) => {
    setQuickFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    const q = searchQuery.toLowerCase().trim();

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (selectedBrands.length) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedGenders.length) {
      list = list.filter((p) => selectedGenders.includes(p.gender));
    }
    if (selectedCategories.length) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedConditions.length) {
      list = list.filter((p) => selectedConditions.includes(p.condition));
    }
    list = list.filter((p) => p.price <= priceMax);

    if (quickFilters.includes("trending")) {
      list = list.filter((p) => p.trending);
    }
    if (quickFilters.includes("nike")) {
      list = list.filter((p) => p.brand === "Nike");
    }
    if (quickFilters.includes("new-balance")) {
      list = list.filter((p) => p.brand === "New Balance");
    }
    if (quickFilters.includes("vans")) {
      list = list.filter((p) => p.brand === "Vans");
    }
    if (quickFilters.includes("adidas")) {
      list = list.filter((p) => p.brand === "Adidas");
    }
    if (quickFilters.includes("sale")) {
      list = list.filter((p) => p.onSale || p.price < p.originalPrice);
    }
    if (quickFilters.includes("ai-picks")) {
      list = list.filter((p) => p.aiRecommended);
    }

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => b.id - a.id);
        break;
    }

    return list;
  }, [
    searchQuery,
    selectedBrands,
    selectedGenders,
    selectedCategories,
    selectedConditions,
    priceMax,
    quickFilters,
    sortBy,
  ]);

  const displayTotal =
    filteredProducts.length === PRODUCTS.length
      ? TOTAL_CATALOG_COUNT
      : Math.max(filteredProducts.length, filteredProducts.length * 18);

  const totalPages = Math.max(1, Math.ceil(displayTotal / PAGE_SIZE));

  const pageProducts = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    const offset = ((page - 1) * PAGE_SIZE) % filteredProducts.length;
    const out: Product[] = [];
    for (let i = 0; i < PAGE_SIZE; i++) {
      out.push(filteredProducts[(offset + i) % filteredProducts.length]);
    }
    return out;
  }, [filteredProducts, page]);

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedGenders([]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setPriceMax(500);
    setQuickFilters([]);
    setSearchQuery("");
    setSortBy("relevance");
    setPage(1);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedGenders.length > 0 ||
    selectedCategories.length > 0 ||
    selectedConditions.length > 0 ||
    priceMax !== 500 ||
    quickFilters.length > 0 ||
    searchQuery.length > 0;

  const openQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setIsDrawerOpen(true);
  };

  // Editorial rhythm (not masonry):
  // Row1: feature + 2 standards | Row2: landscape | Row3: 4 standards
  // Row4: 2 standards + feature | trailing
  const feature = pageProducts[0];
  const side = pageProducts.slice(1, 3);
  const landscape = pageProducts[3];
  const quartet = pageProducts.slice(4, 8);
  const mirrorSide = pageProducts.slice(8, 10);
  const mirrorFeature = pageProducts[10];
  const trailing = pageProducts.slice(11);

  return (
    <div className="theme-light min-h-screen bg-background text-foreground antialiased selection:bg-primary/15">
      <Navbar variant="light" offsetTop={0} onOpenAI={() => handleOpenAI()} />

      <main>
        {/* Compact discovery hero (~40% shorter) */}
        <section className="relative z-50 overflow-visible">
          <div className="container-page flex flex-col items-center pb-5 pt-20 sm:pb-6 sm:pt-22 lg:pt-24">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Marketplace
            </div>
            <h1 className="text-center text-[28px] font-semibold leading-none tracking-[-0.035em] text-foreground sm:text-[36px]">
              Find your next pair
            </h1>
            <p className="mt-2 max-w-md text-center text-[14px] text-muted">
              AI-curated sneakers from verified stores.
            </p>
            <div className="relative z-50 mt-5 w-full">
              <TitanSearch
                variant="light"
                value={searchQuery}
                onChange={(v) => {
                  setSearchQuery(v);
                  setPage(1);
                }}
                onAskAI={handleOpenAI}
                onSubmit={() => {
                  const q = searchQuery.trim();
                  if (q.length > 12) handleOpenAI(q);
                }}
              />
            </div>
          </div>
        </section>

        {/* Sticky filters — shared chip DNA */}
        <div className="sticky top-14 z-40 border-b border-border bg-[#FAFAFA]/90 backdrop-blur-2xl">
          <div className="container-page flex flex-col gap-2.5 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_FILTERS.map((f) => {
                const active = quickFilters.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleQuick(f.id)}
                    className={cn(
                      "chip",
                      active ? "chip-active" : "chip-idle"
                    )}
                  >
                    {f.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="chip chip-idle inline-flex items-center gap-1.5"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                All filters
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-2 py-1.5 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="h-9 appearance-none rounded-full border border-border bg-card py-1.5 pl-3.5 pr-8 text-[13px] font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Sort by"
              >
                <option value="relevance">Sort by</option>
                <option value="price-low">Price · Low</option>
                <option value="price-high">Price · High</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Editorial grid — 16px gaps, more above the fold */}
        <section className="py-6 lg:py-8">
          <div className="container-page">
            {pageProducts.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-xl font-semibold text-foreground">
                  Nothing matched
                </p>
                <p className="mt-2 text-sm text-muted">
                  Try clearing filters or asking Titan AI.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 h-11 rounded-full bg-ink px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-black"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {feature && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr]">
                    <ProductCard
                      product={feature}
                      layout="feature"
                      priority
                      onQuickView={openQuickView}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                      {side.map((p, i) => (
                        <ProductCard
                          key={`s-${page}-${p.id}-${i}`}
                          product={p}
                          layout="standard"
                          priority
                          onQuickView={openQuickView}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {landscape && (
                  <ProductCard
                    product={landscape}
                    layout="landscape"
                    onQuickView={openQuickView}
                  />
                )}

                {quartet.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {quartet.map((p, i) => (
                      <ProductCard
                        key={`q-${page}-${p.id}-${i}`}
                        product={p}
                        layout="standard"
                        onQuickView={openQuickView}
                      />
                    ))}
                  </div>
                )}

                {(mirrorFeature || mirrorSide.length > 0) && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr]">
                    <div className="order-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:order-1 md:grid-cols-1">
                      {mirrorSide.map((p, i) => (
                        <ProductCard
                          key={`m-${page}-${p.id}-${i}`}
                          product={p}
                          layout="standard"
                          onQuickView={openQuickView}
                        />
                      ))}
                    </div>
                    {mirrorFeature && (
                      <ProductCard
                        product={mirrorFeature}
                        layout="feature"
                        className="order-1 md:order-2"
                        onQuickView={openQuickView}
                      />
                    )}
                  </div>
                )}

                {trailing.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {trailing.map((p, i) => (
                      <ProductCard
                        key={`t-${page}-${p.id}-${i}`}
                        product={p}
                        layout="standard"
                        onQuickView={openQuickView}
                      />
                    ))}
                  </div>
                )}

                <div className="pb-2 pt-8">
                  <MarketplacePagination
                    page={page}
                    totalPages={Math.min(totalPages, 18)}
                    totalItems={displayTotal}
                    pageSize={PAGE_SIZE}
                    onPageChange={(p) => {
                      setPage(p);
                      window.scrollTo({ top: 220, behavior: "smooth" });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav onOpenAI={() => handleOpenAI()} />

      <FilterDrawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        selectedBrands={selectedBrands}
        setSelectedBrands={(v) => {
          setSelectedBrands(v);
          setPage(1);
        }}
        selectedGenders={selectedGenders}
        setSelectedGenders={(v) => {
          setSelectedGenders(v);
          setPage(1);
        }}
        selectedCategories={selectedCategories}
        setSelectedCategories={(v) => {
          setSelectedCategories(v);
          setPage(1);
        }}
        selectedConditions={selectedConditions}
        setSelectedConditions={(v) => {
          setSelectedConditions(v);
          setPage(1);
        }}
        priceMax={priceMax}
        setPriceMax={(v) => {
          setPriceMax(v);
          setPage(1);
        }}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <QuickViewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={quickViewProduct}
      />

      <AIChatDialog
        open={aiOpen}
        onOpenChange={handleOpenChange}
        initialQuery={aiQuery}
      />
    </div>
  );
}
